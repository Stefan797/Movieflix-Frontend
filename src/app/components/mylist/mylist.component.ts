import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoadSingleMovieService } from 'src/app/services/load-single-movie.service';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.sass']
})
export class MylistComponent implements OnInit {
  
  public results: boolean = false;
  public mylistEmpty: boolean = true;
  furtherInformations: boolean = false;
  startMovie: boolean = false;
  currentUserResponse: any = [];
  myListMovieDict: any = [];
  currentMoviePreviewDataRecord: any = [];
  error = '';

  constructor(private router: Router, private httpService: HttpService, private loadSingleMovieService: LoadSingleMovieService, public generalFunctionsService: GeneralFunctionsService) {}

  async ngOnInit(): Promise<void> {
    await this.loadCurrentUser();
    await this.loadAllMyListMovies();
    this.checkIfResultsTrue();
  }

  async loadCurrentUser() {
    let currentuserID = localStorage.getItem('CurrentUserID');
    this.currentUserResponse = await this.generalFunctionsService.tryLoading(`/userAPI/${currentuserID}/`);
  }

  async loadAllMyListMovies() {
    try {
      for (let i = 0; i < this.currentUserResponse['favorite_movies'].length; i++) {
        const movieId = this.currentUserResponse['favorite_movies'][i];
        const url = `${environment.baseUrl}/movieAPI/${movieId}`;
        const response = await lastValueFrom(this.httpService.getrequest(url));
        this.myListMovieDict[i] = response;
      }
      // console.log('Full MyListMovie Dict', this.myListMovieDict);
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  checkIfResultsTrue() {
    if (this.currentUserResponse['favorite_movies'] && this.currentUserResponse['favorite_movies'][0]) { 
      this.results = true;
      this.mylistEmpty = false;
    }
  }


  showMovieFullscreen() {
    this.loadSingleMovieService.loadSingleM(this.currentMoviePreviewDataRecord.id, 'mylist').then(()=> {
      this.router.navigate(['/watch/' + this.currentMoviePreviewDataRecord.title]);
    });
  }

  // startMovieInThisView() {
  //   this.startMovie = true;
  // }

  showMovieInfos(i) {
    this.furtherInformations = true;
    this.currentMoviePreviewDataRecord = this.myListMovieDict[i];
  }

  closeMovieInfos() {
    this.furtherInformations = false;
  }
}
