import { Component } from '@angular/core';
import { HoverService } from 'src/app/services/hover.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  constructor(public hoverService: HoverService) { }

  ngOnInit(): void {
   
  }

  handleNotificationHover(){
    console.log("Mouse Over Notification Icon");
    document.getElementById('notificationID')?.classList.remove('hide');
    this.hoverService.notificationIconIsHovered = true;
    this.hoverService.isHovered = true;
  }

  handleProfileSettingsHover(){
    console.log("Mouse Over Profile Settings Icon");
    document.getElementById('profilesettingsID')?.classList.remove('hide');
    this.hoverService.profileSettingsIconIsHovered = true;
    this.hoverService.isHovered = true;
  }
}
