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
  
  @ViewChild('categoriescontainer') div?: ElementRef;
  movieDict: any = [];
  userEmailResponse: any = [];
  error = '';

  moviesrows: any = [
    {
      "firstpart": "let",
      "secondpart": "movieskeepwatching",
      "thirdpart": "keepwatching"
    },
    {
      "firstpart": "let",
      "secondpart": "moviespopularatpresent",
      "thirdpart": "popularatpresent"
    },
    {
      "firstpart": "let",
      "secondpart": "movieswatchagain",
      "thirdpart": "watchagain"
    },
    {
      "firstpart": "let",
      "secondpart": "moviesmylist",
      "thirdpart": "mylist"
    }
  ];

  categoriesText = [
    'Mit dem Profil {{ userEmailResponse.email }} weiterschauen',
    'Derzeit beliebt',
    'Nochmal ansehen',
    'Meine Liste',
  ];

  urls = [
    environment.baseUrl + "/movieAPI/?category=keepwatching",
    environment.baseUrl + "/movieAPI/?category=popularatpresent",
    environment.baseUrl + "/movieAPI/?category=watchagain",
    environment.baseUrl + "/movieAPI/?category=mylist",
  ];

  constructor(private httpService: HttpService) { }

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
