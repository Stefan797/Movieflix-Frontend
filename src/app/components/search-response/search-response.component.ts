import { Component, OnInit } from '@angular/core';
// import { debounceTime, map } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-response',
  templateUrl: './search-response.component.html',
  styleUrls: ['./search-response.component.sass']
})
export class SearchResponseComponent implements OnInit {
  
  searchResults: any[] = [];
  results: boolean = false;
  nothingFound: boolean = true;
  searchResult: string = 'Eingegebener Input Text';

  constructor(private searchService: SearchService) {
    
  }

  ngOnInit() {
    // this.searchService.searchTerm$.subscribe(searchTerm => {
    //   // Hier kannst du den gespeicherten Suchbegriff verwenden
    //   this.searchResults = []; // Führe deine Suche mit dem Suchbegriff aus und aktualisiere die Ergebnisse
      
    //   console.log('Neue Suche: ', searchTerm);
    // });
  }
}
