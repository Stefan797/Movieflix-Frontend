import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { debounceTime, lastValueFrom } from 'rxjs';
// import { HttpService } from 'src/app/services/http.service';
// import { SearchService } from 'src/app/services/search.service';
// import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.sass']
})
export class SearchBoxComponent {

  // error = '';
  // searchTerm: string;
  // searchResults: any = [];

  // public url1: string = "";

  // constructor(public router: Router, private searchService: SearchService, private httpService: HttpService) { }

  // ngOnInit() {
  //   this.url1 = this.router.url;
  // }

  // closeSearchInput() {
  //   document.getElementById('search')?.classList.add('hide');
  //   document.getElementById('test')?.classList.remove('hide');
  // }

  // search(): void {
  //   this.router.navigate(['/search']);
  //   document.getElementById('search')?.classList.remove('hide');
  
  //   this.searchService.searchByTitle(this.searchTerm)
  //     .pipe(debounceTime(300)) // Verzögert die Suche um 300 ms
  //     .subscribe(results => {
  //       this.searchResults = results;
  //     });

  //   if (this.searchTerm = '') {
  //     this.router.navigate(['/home']);
  //   }
  // }

  // postData(formData: any) {
  //   try {
  //     const url = environment.baseUrl + "/api/movies/search/";
  //     return lastValueFrom(this.httpService.getrequest(url));
  //   } catch (e) {
  //     this.error = 'Fehler beim Laden!';
  //     return null;
  //   }
  // }
}
