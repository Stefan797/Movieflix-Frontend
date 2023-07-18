import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent {

  error = '';

  formData = {
    search_terms: '',
    title: '',
    description: '',
    movie_file: '',
    screenshot: '',
    category: ''
  };

  sendeResponse: any = [];

  constructor(private http: HttpClient) { }

  submitForm() {
    const endpointUrl = 'http://127.0.0.1:8000/upload_movie/'; // Ersetzen Sie dies durch die tatsächliche URL Ihres Django-Endpunkts

    const formData = new FormData();
    formData.append('search_terms', this.formData.search_terms);
    formData.append('title', this.formData.title);
    formData.append('description', this.formData.description);
    formData.append('category', this.formData.category);
    formData.append('movie_file', this.formData.movie_file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data'); // Setzen Sie den entsprechenden Content-Type für den Dateiupload

    this.sendeResponse = this.http.post(endpointUrl, formData, { headers });
  }
}
