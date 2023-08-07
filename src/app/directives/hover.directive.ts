import { Directive, HostListener, OnInit } from '@angular/core';
import { HoverService } from '../services/hover.service';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit {

  constructor(private hoverservice: HoverService) { }

  ngOnInit() {
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
        //this.hoverservice.categorieImgIsHovered = false;
        document.getElementById('notificationID')?.classList.add('hide');
        document.getElementById('profilesettingsID')?.classList.add('hide');
        //this.test.nativeElement.classList.add('hide');
      }
    }, 100);
  }
}
