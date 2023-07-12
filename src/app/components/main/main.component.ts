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
    // this.loadFirstMovie();
  };

  async loadFirstMovie() {
    this.firstMovieResponses = await this.load();
    console.log(this.firstMovieResponses);
  }

  load() {
    try {
      const url = environment.baseUrl + "/movieST/qualle-33995.mp4/";
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  showMovieFullscreen() {
    this.router.navigate(['/watch/nameofmovie']);
  }
}
