import { Component, OnInit, ViewChild } from '@angular/core';
import { HoverService } from 'src/app/services/hover.service';
import { TransferMovieDatasService } from 'src/app/services/transfer-movie-datas.service';

@Component({
  selector: 'app-movie-hover-container',
  templateUrl: './movie-hover-container.component.html',
  styleUrls: ['./movie-hover-container.component.sass']
})
export class MovieHoverContainerComponent implements OnInit {
  
  response: any = [];
  categorieImgIsHovered = false;

  constructor(public hoverService: HoverService, private transferMovieDatas: TransferMovieDatasService) {}
  
  ngOnInit(): void {
    this.initMovieDataResponse();
  };

  initMovieDataResponse() {
    let response: any =  this.transferMovieDatas.getMovieDataResponse();
    console.log(this.response);
  };
}
