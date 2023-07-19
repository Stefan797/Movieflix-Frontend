import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent {
  // arrayurlmovies = [] = any;

  firstMovieResponses: any = [];

  error = '';

  constructor(private router: Router, private httpService: HttpService) {}

  ngOnInit(): void {
    this.loadFirstMovie();
  };

  async loadFirstMovie() {
    this.firstMovieResponses = await this.load();

    console.log(this.firstMovieResponses);
  }

  load() {
    const id = 40;
    try {
      const url = environment.baseUrl + `/movie/${id}/load_movie/`; //"/movieAPI/"; movie/${id}/load_movie/ movie/{id}/load_movie/
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  showMovieFullscreen() {
    this.router.navigate(['/watch/' + this.firstMovieResponses[0].title]);
  }
}
