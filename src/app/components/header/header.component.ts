import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HoverService } from 'src/app/services/hover.service';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  @Input() inputSearchFieldIsOpen: boolean = false;

  public currentpath: string = '';

  constructor(private router: Router, public hoverService: HoverService, public generalFunctionsService: GeneralFunctionsService) { }

  ngOnInit(): void {
    this.currentpath = this.router.url;
    this.checkpath();
    // console.log('', this.currentpath);
  }

  checkpath() {
    if (this.currentpath !== '/search') {
      document.getElementById('loupe')?.classList.remove('hide');
    }
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
    this.inputSearchFieldIsOpen = true;
    document.getElementById('loupe')?.classList.add('hide');
  }

  handleNotificationHover(){
    // console.log("Mouse Over Notification Icon");
    document.getElementById('notificationID')?.classList.remove('hide');
    this.hoverService.notificationIconIsHovered = true;
    this.hoverService.isHovered = true;
  }

  handleProfileSettingsHover(){
    // console.log("Mouse Over Profile Settings Icon");
    document.getElementById('profilesettingsID')?.classList.remove('hide');
    this.hoverService.profileSettingsIconIsHovered = true;
    this.hoverService.isHovered = true;
  }
}
