import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent {
  // arrayurlmovies = [] = any;

  constructor() { }

  ngOnInit(): void {
    // this.fetchGet();
    // this.fetchMoviesByCategory('sdf');
    // this.fetchGetMovieById(5);
  }

  // fetchGet()  {
  //   this.dataService.fetchGet('http://127.0.0.1:8000/api/movieAPI/').then(response => response.json()).then(allMovies => console.log(allMovies));
  // };

  // fetchMoviesByCategory(categoryName: string){
  //   this.dataService.fetchGet('http://127.0.0.1:8000/api/movieAPI/?category=' + categoryName)
  //   .then(response => response.json())
  //   .then(moviesByCategory => console.log(moviesByCategory));
  // }

  // fetchGetMovieById(id: number){
  //   this.dataService.fetchGet('http://127.0.0.1:8000/api/movieAPI/' + id + '/')
  //   .then(response => response.json())
  //   .then(movie => console.log(movie));
  // }
}
