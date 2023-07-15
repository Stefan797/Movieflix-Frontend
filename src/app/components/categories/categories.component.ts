import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  error = '';

  // MovieResponse: any = [];
  popularAtPresent: any = [];

  urls = [
    environment.baseUrl + "/movieAPI/?category=keepwatching",
    environment.baseUrl + "/movieAPI/?category=popularatpresent",
    // environment.baseUrl + "/movies/popularatpresent/",
    // environment.baseUrl + "/movies/watchagain/",
    // environment.baseUrl + "/movies/mylist/"
  ];

  movieArrays: any = [];
  
  userEmailResponse: any = [];

  @ViewChild('categoriescontainer') div?: ElementRef;


  constructor(private httpService: HttpService) { }

  async ngOnInit(): Promise<void> {
    this.loadUserEmail();
    await this.loadContent();

    // popularAtPresent.forEach((popularOnMovieflixMovies) => {
    //   this.popularAtPresent.push(Object.assign({}, popularOnMovieflixMovies));
    // });
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
       this.movieArrays[i] = response;
      }
      console.log(this.movieArrays);
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  movecontent(showMoreContentDirection: string) {
    console.log(showMoreContentDirection);
  }

  // prevBtn.addEventListener('click', function() {
  //   menuList.scrollLeft -= 100;
  // });

  // nextBtn.addEventListener('click', function() {
  //   menuList.scrollLeft += 100;
  // });

  ngAfterViewInit() {
    console.log(this.div?.nativeElement);
  }
}
