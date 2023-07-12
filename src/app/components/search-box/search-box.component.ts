import { Component } from '@angular/core';
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

  constructor(private searchService: SearchService) {}

  search(): void {
    this.searchService.searchByTitle(this.searchTerm)
      .pipe(debounceTime(300)) // Verzögert die Suche um 300 ms
      .subscribe(results => {
        this.searchResults = results;
      });
  }
}
