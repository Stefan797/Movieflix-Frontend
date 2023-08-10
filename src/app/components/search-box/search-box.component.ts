import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, lastValueFrom, map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { SearchService } from 'src/app/services/search.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.sass']
})
export class SearchBoxComponent {

  result: any = [];  
  error = '';
  searchTerm: string;
  searchResults: any = [];

  public currentpath: string = '';

  constructor(public router: Router, private searchService: SearchService, private httpService: HttpService, private route: ActivatedRoute) { 
    // this.route.paramMap.subscribe(pm => {
    //   if(pm['q']){
    //     this.searchrequest(pm['q'])
    //   }
    // })
  }

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
    this.result = this.searchrequest(this.searchTerm);
    console.log('', this.result);
  }

  // sendNewRequestIfInputIsChanging() {
    // debugger;
    // this.result = this.searchService.searchTerm$.pipe(
    //   map((searchTerm)=> this.searchrequest(searchTerm))
    // );
    // console.log('', this.result);
  // }

  searchrequest(searchTerm) {
    try {
      const url = environment.baseUrl + `/api/movieAPI/search?q=${searchTerm}`;
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  // www.strato.de/hosting/ holen vllt

  navigateToSearch() {
    if (this.currentpath !== '/search' && this.searchTerm.length > 2) {
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
