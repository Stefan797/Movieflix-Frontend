import { Directive, HostListener } from '@angular/core';
import { HoverService } from '../services/hover.service';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private hoverservice: HoverService) { }

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
        document.getElementById('notificationID')?.classList.add('hide');
        document.getElementById('profilesettingsID')?.classList.add('hide');
      }
    }, 100);
  }
}
