import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { LoadSingleMovieService } from 'src/app/services/load-single-movie.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  // arrayurlmovies = [] = any;

  furtherInformations: boolean = false;
  firstMovieResponses: any = [];

  error = '';

  constructor(private router: Router, private httpService: HttpService, private loadSingleMovieService: LoadSingleMovieService) {}

  async ngOnInit(): Promise<void> {
    //this.loadFirstMovie();
    this.firstMovieResponses = await this.load();
    // console.log(this.firstMovieResponses);
  };

  // async loadFirstMovie() {
  //   this.firstMovieResponses = await this.load();

  //   console.log(this.firstMovieResponses);
  // }

  load() {
    const id = 3; // 3 local // 17 ist Server
    try {
      const url = environment.baseUrl + `/movie/${id}/load_movie/`; //"/movieAPI/"; movie/${id}/load_movie/ movie/{id}/load_movie/
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  showMovieFullscreen() {
    this.loadSingleMovieService.loadSingleM(this.firstMovieResponses.id, 'home').then(()=> {
      this.router.navigate(['/watch/' + this.firstMovieResponses.title]);
    });
  }
 
  showMovieInfos() {
    this.furtherInformations = true;
    document.getElementById('arrow-left-1').classList.add('index-unset');
    document.getElementById('arrow-right-1').classList.add('index-unset');
    document.getElementById('arrow-left-img-1').classList.add('index-unset');
    document.getElementById('arrow-right-img-1').classList.add('index-unset');
    document.getElementById('arrow-left-2').classList.add('index-unset');
    document.getElementById('arrow-right-2').classList.add('index-unset');
    document.getElementById('arrow-left-img-2').classList.add('index-unset');
    document.getElementById('arrow-right-img-2').classList.add('index-unset');
    document.getElementById('arrow-left-3').classList.add('index-unset');
    document.getElementById('arrow-right-3').classList.add('index-unset');
    document.getElementById('arrow-left-img-3').classList.add('index-unset');
    document.getElementById('arrow-right-img-3').classList.add('index-unset');
  }

  closeMovieInfos() {
    this.furtherInformations = false;
    document.getElementById('arrow-left-1').classList.remove('index-unset');
    document.getElementById('arrow-right-1').classList.remove('index-unset');
    document.getElementById('arrow-left-img-1').classList.remove('index-unset');
    document.getElementById('arrow-right-img-1').classList.remove('index-unset');
    document.getElementById('arrow-left-2').classList.remove('index-unset');
    document.getElementById('arrow-right-2').classList.remove('index-unset');
    document.getElementById('arrow-left-img-2').classList.remove('index-unset');
    document.getElementById('arrow-right-img-2').classList.remove('index-unset');
    document.getElementById('arrow-left-3').classList.remove('index-unset');
    document.getElementById('arrow-right-3').classList.remove('index-unset');
    document.getElementById('arrow-left-img-3').classList.remove('index-unset');
    document.getElementById('arrow-right-img-3').classList.remove('index-unset');
  }
 
}
