import { Component, OnInit, ViewChild } from '@angular/core';
import { HoverService } from 'src/app/services/hover.service';

@Component({
  selector: 'app-movie-hover-container',
  templateUrl: './movie-hover-container.component.html',
  styleUrls: ['./movie-hover-container.component.sass']
})
export class MovieHoverContainerComponent implements OnInit {
  
  categorieImgIsHovered = false;

  constructor(public hoverService: HoverService) {}
  
  ngOnInit(): void {
  };
}
