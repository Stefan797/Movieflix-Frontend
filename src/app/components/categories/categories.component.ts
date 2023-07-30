import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HoverService } from 'src/app/services/hover.service';
import { HttpService } from 'src/app/services/http.service';
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
    environment.baseUrl + "/movieAPI/?category=keepwatching",
    environment.baseUrl + "/movieAPI/?category=popularatpresent",
    environment.baseUrl + "/movieAPI/?category=watchagain",
    environment.baseUrl + "/movieAPI/?category=mylist",
  ];

  constructor(private httpService: HttpService, public hoverService: HoverService) { }

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

  handleMoviePreviewHover(i: number){
    console.log("Mouse Over Image");
    document.getElementById(`movieImgHover_${i}`)?.classList.remove('hide');
    this.hoverService.categorieImgIsHovered = true;
    this.hoverService.isHovered = true;
  }

  // startIndex = 0;
  // numVisibleMovies = 3;
  // currentShift = 0;
 

  movecontent(showMoreContentDirection: string) {
    console.log(showMoreContentDirection);

    // const containerElement = this.div?.nativeElement;

    // const visibleAreaWidth = containerElement.offsetWidth;

    // const maxShift = (containerElement.scrollWidth - containerElement.clientWidth) * -1;

    // if (showMoreContentDirection === 'left') {
    //   // Verschiebe den Inhalt nach links, aber nicht weiter als das Ende.
    //   this.currentShift = Math.min(this.currentShift + visibleAreaWidth, 0);
    // } else if (showMoreContentDirection === 'right') {
    //   // Verschiebe den Inhalt nach rechts, aber nicht weiter als den Anfang.
    //   this.currentShift = Math.max(this.currentShift - visibleAreaWidth, maxShift);
    // }

    // // Aktualisiere die Verschiebung des containers.
    // containerElement.style.transform = `translateX(${this.currentShift}px)`;
  }

  // ngAfterViewInit() {
  //   console.log(this.div?.nativeElement);
  // }
}
