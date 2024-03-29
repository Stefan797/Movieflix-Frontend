import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';
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
  currentMovieID: number = 0;
  currentUserResponse: any = [];
  isMylistTextVisible = false;
  error = '';
  currentloading = false;
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

  constructor(private router: Router, private httpService: HttpService, public hoverService: HoverService, private transferMovieDatas: TransferMovieDatasService, private loadSingleMovieService: LoadSingleMovieService, public generalFunctionsService: GeneralFunctionsService) { }

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
    await this.loadCurrentUser();
  }

  async loadCurrentUser() {
    let currentuserID = this.generalFunctionsService.handleGetLocalStorageUserID();
    this.currentUserResponse = await this.generalFunctionsService.tryLoading(`/userAPI/${currentuserID}/`);
  }

  async loadAllCategories() {
    try {
      for (let i = 0; i < this.urls.length; i++) {
        const response = await lastValueFrom(this.httpService.getrequest(this.urls[i]));
        const category = response[0].category;
        this.movieDict[category] = response;
      }
      // console.log('Full Movie Dict', this.movieDict);
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
    this.setCurrentMovieID(currentMoviePreviewDataRecord);
    this.setElementsInHoverContainer(currentMoviePreviewDataRecord);
    this.checkMovieIsLikedStatus(currentMoviePreviewDataRecord);
  }

  setCurrentMovieID(currentMoviePreviewDataRecord) {
    this.currentMovieID = currentMoviePreviewDataRecord['id'];
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
    if (this.currentUserResponse['liked_movies']) {
      const likedMovieIDs = this.currentUserResponse['liked_movies'];
      const currentMovieID = currentMoviePreviewDataRecord['id'];
      this.likeIsTrue = likedMovieIDs.includes(currentMovieID);
    } else {
      this.likeIsTrue = false;
    }
  }

  handleCloseMoviePreviewHover() {
    this.showPreview = false;
    this.currentMoviePreviewDataRecord = [];
    this.likeIsTrue = false;
  }

  // End set Hover Container loading 

  showMovieFullscreen() {
    this.loadSingleMovieService.loadSingleM(this.currentMoviePreviewDataRecord[0].id, 'home').then(() => {
      this.router.navigate(['/watch/' + this.currentMoviePreviewDataRecord[0].title]);
    });
  }

  public myListResponse: string = '';

  async addMovieToMyList() {
    let myList = await this.generalFunctionsService.tryLoading(`/movie/${this.currentMovieID}/change-category/`);
    this.myListResponse = myList['movie_myList_response']
    this.isMylistTextVisible = true;
    let hidetext = setTimeout(() => {
      this.isMylistTextVisible = false;
    }, 2500);
    // clearTimeout(hidetext);
  }

  async increaseLikes() {
    this.likeIsTrue = true;
    if (this.likeNumberRef) {
      this.likeNumberRef.nativeElement.classList.add('hide');
    }
    this.currentloading = true;
    let likesResponse = await this.generalFunctionsService.tryLoading(`/movie/${this.currentMovieID}/increase_likes/`);
    await this.updateUser();
    await this.updateMovie();
    this.currentloading = false;
    if (this.likeNumberRef) {
      this.likeNumberRef.nativeElement.innerHTML = likesResponse['movieLikes'];
      this.likeNumberRef.nativeElement.classList.remove('hide');
    }
  }

  async updateUser() {
    let currentuserID = localStorage.getItem('CurrentUserID');
    this.currentUserResponse = await this.generalFunctionsService.tryLoading(`/userAPI/${currentuserID}/`);
  }

  async updateMovie() {
    this.currentMoviePreviewDataRecord = [];
    this.currentMoviePreviewDataRecord[0] = await this.generalFunctionsService.tryLoading(`/movieAPI/${this.currentMovieID}/`);

    const categoriesToUpdate = ['nature', 'popularatpresent', 'sea'];

    for (const category of categoriesToUpdate) {
      const indexToUpdate = this.movieDict[category].findIndex(movie => movie.id === this.currentMoviePreviewDataRecord[0].id);

      if (indexToUpdate !== -1) {
        this.movieDict[category][indexToUpdate] = this.currentMoviePreviewDataRecord[0];
      }
    }
  }

  // End change movie properties and use HoverContainer functions

  contentmoveleft(id: string) {
    let htmlContainer: any = document.getElementById(id);
    let scrollAmount = 300;
    htmlContainer.scrollLeft -= scrollAmount;
  }

  contentmoveright(id: string) {
    let htmlContainer: any = document.getElementById(id);
    let scrollAmount = 100;
    htmlContainer.scrollLeft += scrollAmount;
  }

  // End scroll between categories divs

}
