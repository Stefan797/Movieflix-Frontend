import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';
import { HttpService } from 'src/app/services/http.service';
import { LoadSingleMovieService } from 'src/app/services/load-single-movie.service';

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

  constructor(private router: Router, private httpService: HttpService, private loadSingleMovieService: LoadSingleMovieService, public generalFunctionsService: GeneralFunctionsService) {}

  async ngOnInit(): Promise<void> {
    this.firstMovieResponses = await this.generalFunctionsService.tryLoading(`/movieAPI/17/`); // 3L 17Serv
  };

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
