import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HoverService } from 'src/app/services/hover.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  constructor(private router: Router, public hoverService: HoverService) { }

  ngOnInit(): void {
   
  }

  scroll(id: string){
    document.getElementById(id).scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  loadSearchCategoriesPage() {
    this.router.navigate(['search/categories']);
  }

  loadMylistPage() {
    this.router.navigate(['mylist']);
  }

  showSearchInput() {
    document.getElementById('search')?.classList.remove('hide');
    document.getElementById('test')?.classList.add('hide');
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
