import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { LoadSingleMovieService } from 'src/app/services/load-single-movie.service';
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

  myListResponseArray: any = [];
  error = '';

  currentMoviePreviewDataRecord: any = [];

  constructor(private router: Router, private httpService: HttpService, private loadSingleMovieService: LoadSingleMovieService) {}


  async ngOnInit(): Promise<void> {
    let myListResponse = await this.loadMyListElements();
    this.myListResponseArray.push(myListResponse);
    // debugger;
    console.log(this.myListResponseArray);
    this.checkIfResultsTrue();
  }

  checkIfResultsTrue() {
    if (this.myListResponseArray[0]) { 
      this.results = true;
      this.mylistEmpty = false;
    }
  }

  loadMyListElements() {
    try {
      const url = environment.baseUrl + "/movieAPI/?special_category_mylist=mylist";
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
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
    this.currentMoviePreviewDataRecord = this.myListResponseArray[0][i];
    console.log(this.currentMoviePreviewDataRecord);
  }

  closeMovieInfos() {
    this.furtherInformations = false;
  }
}
