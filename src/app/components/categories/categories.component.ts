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

  popularAtPresent: any[] = [];

  @ViewChild('categoriescontainer') div?: ElementRef;


  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    // this.loadContent();
    
    // popularAtPresent.forEach((popularOnMovieflixMovies) => {
    //   this.popularAtPresent.push(Object.assign({}, popularOnMovieflixMovies));
    // });
  }

  // async loadContent() {
  //   await this.loadAllCategories();
  // }

  // loadAllCategories() {
  //   try {
  //     // for (let index = 0; index < array.length; index++) {
  //     //   const element = array[index];
        
  //     // }
  //     const url = environment.baseUrl + "/movies/popularatpresent";
  //     return lastValueFrom(this.httpService.getrequest(url));
  //   } catch (e) {
  //     this.error = 'Fehler beim Laden!';
  //     return null;
  //   }
  // }

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
