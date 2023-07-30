import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoverService {

  constructor() { }

  private _isHovered = new BehaviorSubject<boolean>(false);
  isHovered$ = this._isHovered.asObservable();

  notificationIconIsHovered = false;
  profileSettingsIconIsHovered = false;
  categorieImgIsHovered = false;

  showNotificationContainer = false;
  showProfilesettingsContainer = false;
  showMovieHoverContainer = false;

  set isHovered(value: boolean) {
    this._isHovered.next(value);
    if (this.notificationIconIsHovered == true) {
      this.showNotificationContainer = value;
    } 
    if (this.profileSettingsIconIsHovered == true) {
      this.showProfilesettingsContainer = value;
    }
    if (this.categorieImgIsHovered == true) {
      this.showMovieHoverContainer = value;
    } 
  }
}
