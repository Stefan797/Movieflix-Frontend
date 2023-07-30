import { Directive, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HoverService } from '../services/hover.service';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit {

  @ViewChild('movieHoverContainer', { static: false }) movieHoverContainer!: ElementRef;
  test = this.movieHoverContainer;
  
  constructor(private hoverservice: HoverService) { }

  ngOnInit() {
    let test = this.movieHoverContainer;
    console.log(test);
  }

  timeoutID: any;

  @HostListener('mouseover')
  onMouseOver() {
    // debugger;
    // console.log("Mouse Over Element");
    this.hoverservice.isHovered = true;
    clearTimeout(this.timeoutID);
  }

  @HostListener('mouseout')
  onMouseOut() {
    // debugger;
    // console.log("Mouse Out Element");
    this.hoverservice.isHovered = false;
    this.timeoutID = setTimeout(() => {
      if (!this.hoverservice.isHovered) {
        this.hoverservice.notificationIconIsHovered = false;
        this.hoverservice.profileSettingsIconIsHovered = false;
        this.hoverservice.categorieImgIsHovered = false;
        document.getElementById('notificationID')?.classList.add('hide');
        document.getElementById('profilesettingsID')?.classList.add('hide');
        this.test.nativeElement.classList.add('hide');
      }
    }, 100);
  }
}
