import { Component } from '@angular/core';

@Component({
  selector: 'app-search-response',
  templateUrl: './search-response.component.html',
  styleUrls: ['./search-response.component.sass']
})
export class SearchResponseComponent {
  results: boolean = true;
  nothingFound: boolean = false;
  searchResult: string = 'Eingegebener Input Text';
}
