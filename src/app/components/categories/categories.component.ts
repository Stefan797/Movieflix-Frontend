import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HoverService } from 'src/app/services/hover.service';
import { HttpService } from 'src/app/services/http.service';
import { LoadSingleMovieService } from 'src/app/services/load-single-movie.service';
import { TransferMovieDatasService } from 'src/app/services/transfer-movie-datas.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  @ViewChild('moviePreviewVideo', { static: false }) moviePreviewVideo!: ElementRef<HTMLVideoElement>;
  movieDict: any = [];
  currentMoviePreviewDataRecord: any = [];
  userEmailResponse: any = [];
  error = '';

  public showPreview: boolean = false;
  public currentXPosition: number = 0;
  public currentYPosition: number = 0;
  private pageIsScrolled: boolean = false;

  imgIsHovered: boolean[] = [];

  showHover: boolean = false;

  urls = [
    environment.baseUrl + "/movieAPI/?category=popularatpresent",
    environment.baseUrl + "/movieAPI/?category=sea",
    environment.baseUrl + "/movieAPI/?category=nature",
    environment.baseUrl + "/movieAPI/?category=funny",
  ];

  constructor(private router: Router, private httpService: HttpService, public hoverService: HoverService, private transferMovieDatas: TransferMovieDatasService, private loadSingleMovieService: LoadSingleMovieService) {}
   
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.pageIsScrolled = true;
    if (this.pageIsScrolled) {
      this.showPreview = false;
    }
  }

  async ngOnInit(): Promise<void> {
    this.loadUserEmail();
    await this.loadContent();
  }

  async handleMoviePreviewHover(i: number, movieDictcategory: string){
    await this.setMoviePreviewContainer(i, movieDictcategory);
    let currentMoviePreviewDataRecord = this.movieDict[movieDictcategory][i];
    //console.log('', currentMoviePreviewDataRecord);
    
    const videoElement: HTMLVideoElement | null = this.moviePreviewVideo.nativeElement;
    if (videoElement) {
      videoElement.src = currentMoviePreviewDataRecord['movie_file'];
    }
  }

  setMoviePreviewContainer(i: number, movieDictcategory: string) {
    let categoryImageCoordinates = document.getElementById(`${movieDictcategory}_Images_${i}`)?.getBoundingClientRect();
    this.currentXPosition = categoryImageCoordinates.x;
    this.currentYPosition = categoryImageCoordinates.y;
    this.showPreview = true;
  }

  handleCloseMoviePreviewHover() {
    this.showPreview = false;
    let currentMoviePreviewDataRecord = '';
    //console.log('', currentMoviePreviewDataRecord); // gibt es eine saubere Methode?
  }

  async loadUserEmail() {
    this.userEmailResponse = await this.load();
    console.log(this.userEmailResponse);
  }

  load() {
    try {
      const url = environment.baseUrl + "/useremail/";
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  async loadContent() {
    await this.loadAllCategories();
  }

  async loadAllCategories() {
    try {
      for (let i = 0; i < this.urls.length; i++) {

       const response = await lastValueFrom(this.httpService.getrequest(this.urls[i]));
       const category = response[0].category;
       this.movieDict[category] = response;
      }
      console.log(this.movieDict);
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  showMovieFullscreen() {
    this.loadSingleMovieService.loadSingleM(this.currentMoviePreviewDataRecord.id).then(()=> {
      this.router.navigate(['/watch/' + this.currentMoviePreviewDataRecord.title]);
    });
  }

  async addMovieToMyList() {
    let myList = await this.changeMovieToMyListBackend();
  }

  async changeMovieToMyListBackend() {
    let movieID = this.currentMoviePreviewDataRecord.id;
    try {
      const url = environment.baseUrl + `movies/<int:pk>/change-category/`;
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  async increaseLikes() {
    let likes = await this.increaseLikesBackend();
  }

  async increaseLikesBackend() {
    let movieID = this.currentMoviePreviewDataRecord.id;
    try {
      const url = environment.baseUrl + `movie/${movieID}/increase_likes/`;
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  contentmoveleft(id: string) {
    let htmlContainer: any = document.getElementById(id);
    let scrollAmount = 300;
    htmlContainer.scrollLeft += scrollAmount;
    console.log(htmlContainer.scrollLeft);
  }

  contentmoveright(id: string) {
    let htmlContainer: any = document.getElementById(id);
    let scrollAmount = 100;
    htmlContainer.scrollLeft -= scrollAmount;
    console.log(htmlContainer.scrollLeft);
  }

}
