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

  @ViewChild('likenumber', { static: false }) likeNumberRef: ElementRef;
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
  likeIsTrue: boolean = false;

  urls = [
    environment.baseUrl + "/movieAPI/?category=popularatpresent",
    environment.baseUrl + "/movieAPI/?category=sea",
    environment.baseUrl + "/movieAPI/?category=nature",
    // environment.baseUrl + "/movieAPI/?category=funny",
  ];

  constructor(private router: Router, private httpService: HttpService, public hoverService: HoverService, private transferMovieDatas: TransferMovieDatasService, private loadSingleMovieService: LoadSingleMovieService) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.pageIsScrolled = true;
    if (this.pageIsScrolled) {
      this.showPreview = false;
    }
  }

  // End scroll event is using for hide hover Container if user is scrolling.  

  async ngOnInit(): Promise<void> {
    await this.loadAllCategories();
  }

  async loadAllCategories() {
    try {
      for (let i = 0; i < this.urls.length; i++) {
        const response = await lastValueFrom(this.httpService.getrequest(this.urls[i]));
        const category = response[0].category;
        this.movieDict[category] = response;
      }
      // console.log(this.movieDict);
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  // End Movies loading 

  async handleMoviePreviewHover(i: number, movieDictcategory: string) {
    await this.setMoviePreviewContainer(i, movieDictcategory);
    let currentMoviePreviewDataRecord = this.movieDict[movieDictcategory][i];
    this.currentMoviePreviewDataRecord.push(this.movieDict[movieDictcategory][i]);
    //console.log(this.currentMoviePreviewDataRecord);
    this.setElementsInHoverContainer(currentMoviePreviewDataRecord);
    this.checkMovieIsLikedStatus(currentMoviePreviewDataRecord);
  }

  setMoviePreviewContainer(i: number, movieDictcategory: string) {
    let categoryImageCoordinates = document.getElementById(`${movieDictcategory}_Images_${i}`)?.getBoundingClientRect();
    this.currentXPosition = categoryImageCoordinates.x;
    this.currentYPosition = categoryImageCoordinates.y;
    this.showPreview = true;
  }

  setElementsInHoverContainer(currentMoviePreviewDataRecord: any) {
    const videoElement: HTMLVideoElement | null = this.moviePreviewVideo.nativeElement;
    if (videoElement) {
      videoElement.src = currentMoviePreviewDataRecord['movie_file'];
    }
    const likeNumberElement: HTMLElement = this.likeNumberRef.nativeElement;
    likeNumberElement.innerHTML = currentMoviePreviewDataRecord['likes'];
  }

  checkMovieIsLikedStatus(currentMoviePreviewDataRecord: any) {
    if (currentMoviePreviewDataRecord['is_liked'] == true) {
      this.likeIsTrue = true;
    }
    if (currentMoviePreviewDataRecord['is_liked'] == false) {
      this.likeIsTrue = false;
    }
  }

  handleCloseMoviePreviewHover() {
    this.showPreview = false;
    this.currentMoviePreviewDataRecord = [];
    // console.log(this.currentMoviePreviewDataRecord);
  }

  // End set Hover Container loading 

  showMovieFullscreen() {
    this.loadSingleMovieService.loadSingleM(this.currentMoviePreviewDataRecord[0].id).then(() => {
      this.router.navigate(['/watch/' + this.currentMoviePreviewDataRecord[0].title]);
    });
  }

  async addMovieToMyList() {
    let myList = await this.changeMovieToMyListBackend();
  }

  async changeMovieToMyListBackend() {
    let movieID = this.currentMoviePreviewDataRecord[0].id;
    try {
      const url = environment.baseUrl + `/movie/${movieID}/change-category/`;
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  async increaseLikes() {
    let likesResponse = await this.increaseLikesBackend();
    //console.log(likesResponse);
    this.currentMoviePreviewDataRecord[0].likes = likesResponse['movieLikes'];
    this.currentMoviePreviewDataRecord[0].is_liked = likesResponse['movieLikeStatus'];
    this.checkMovieIsLikedStatus(this.currentMoviePreviewDataRecord[0]);
    if (this.likeNumberRef) {
      this.likeNumberRef.nativeElement.innerHTML = likesResponse['movieLikes'];
    }
  }

  increaseLikesBackend() {
    let movieID = this.currentMoviePreviewDataRecord[0].id;
    console.log(movieID);
    try {
      const url = environment.baseUrl + `/movie/${movieID}/increase_likes/`;
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  // End change movie properties and use HoverContainer functions

  contentmoveleft(id: string) {
    let htmlContainer: any = document.getElementById(id);
    let scrollAmount = 300;
    htmlContainer.scrollLeft += scrollAmount;
  }

  contentmoveright(id: string) {
    let htmlContainer: any = document.getElementById(id);
    let scrollAmount = 100;
    htmlContainer.scrollLeft -= scrollAmount;
  }

  // End scroll between categories divs

}
