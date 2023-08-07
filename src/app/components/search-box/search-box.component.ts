import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, lastValueFrom } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { SearchService } from 'src/app/services/search.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.sass']
})
export class SearchBoxComponent {

  error = '';
  searchTerm: string;
  searchResults: any = [];

  public currentpath: string = '';

  constructor(public router: Router, private searchService: SearchService, private httpService: HttpService) { }

  ngOnInit() {
    this.currentpath = this.router.url;
  }

  closeSearchInput() {
    this.router.navigate(['/home']);
    document.getElementById('loupe')?.classList.remove('hide');
  }

  search(): void {
    this.navigateToSearch();
    this.searchService.setSearchTerm(this.searchTerm);
    // saveInput
  
    // this.searchService.searchByTitle(this.searchTerm)
    //   .pipe(debounceTime(300)) // Verzögert die Suche um 300 ms
    //   .subscribe(results => {
    //     this.searchResults = results;
    //   });

    // if (this.searchTerm = '') {
    //   this.router.navigate(['/home']);
    // }
  }

  navigateToSearch() {
    if (this.currentpath !== '/search' && this.searchTerm.length > 3) {
      this.router.navigate(['/search']);
    }
  }

  postData(formData: any) {
    try {
      const url = environment.baseUrl + "/api/movies/search/";
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }
}
