import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.sass']
})
export class SearchBoxComponent {
  
  searchTerm: string;
  searchResults: any[];

  constructor(private router: Router, private searchService: SearchService) {}

  closeSearchInput() {
    document.getElementById('search')?.classList.add('hide');
    document.getElementById('test')?.classList.remove('hide');
  }

  search(): void {
    this.router.navigate(['/search']);
    this.searchService.searchByTitle(this.searchTerm)
      .pipe(debounceTime(300)) // Verzögert die Suche um 300 ms
      .subscribe(results => {
        this.searchResults = results;
      });
  }
}
