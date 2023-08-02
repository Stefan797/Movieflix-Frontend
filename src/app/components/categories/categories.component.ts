import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HoverService } from 'src/app/services/hover.service';
import { HttpService } from 'src/app/services/http.service';
import { TransferMovieDatasService } from 'src/app/services/transfer-movie-datas.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {
  
  // @ViewChild('categoriescontainer') div?: ElementRef;
  movieDict: any = [];
  userEmailResponse: any = [];
  error = '';

  showHover: boolean = false;

  urls = [
    environment.baseUrl + "/movieAPI/?category=popularatpresent",
    environment.baseUrl + "/movieAPI/?category=sea",
    environment.baseUrl + "/movieAPI/?category=nature",
    environment.baseUrl + "/movieAPI/?category=funny",
  ];

  constructor(private httpService: HttpService, public hoverService: HoverService, private transferMovieDatas: TransferMovieDatasService) { }

  async ngOnInit(): Promise<void> {
    this.loadUserEmail();
    await this.loadContent();
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

  handleMoviePreviewHover(i: number, movieDictcategory: string){
    console.log("Mouse Over Image");
    document.getElementById(`movieImgHover_${i}`)?.classList.remove('hide');
    this.hoverService.categorieImgIsHovered = true;
    this.hoverService.isHovered = true;
    debugger;
    this.transferMovieDatas.setMovieDataResponse(this.movieDict[movieDictcategory][i]);
    // console.log(test);
  }
 
  contentmoveleft(id: string) {
    let htmlContainer: any = document.getElementById(id);
    let scrollAmount = 300;
    htmlContainer.scrollLeft += scrollAmount;
    console.log(htmlContainer.scrollLeft);
  }

  contentmoveright(id: string) {
    // debugger;
    let htmlContainer: any = document.getElementById(id);
    let scrollAmount = 100;
    htmlContainer.scrollLeft -= scrollAmount;
    console.log(htmlContainer.scrollLeft);
  }

  // ngAfterViewInit() {
  //   console.log(this.div?.nativeElement);
  // }
}
