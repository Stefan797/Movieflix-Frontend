import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HoverService } from 'src/app/services/hover.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-header-notification-container',
  templateUrl: './header-notification-container.component.html',
  styleUrls: ['./header-notification-container.component.sass']
})
export class HeaderNotificationContainerComponent implements OnInit {
  
  UserAccountIsConfirmed: boolean = false; 
  UserAccountIsnotConfirmed: boolean = true; 
  UserIsGuest: boolean = true;
  notificationResponses: any = [] || undefined;

  error = '';
  
  constructor(public hoverService: HoverService, private httpService: HttpService) {}

  ngOnInit(): void {
    // this.loadNotifications();
  };

  // async loadNotifications() {
  //   this.notificationResponses = await this.load();
  //   console.log(this.notificationResponses);
  // }

  // load() {
  //   try {
  //     const url = environment.baseUrl + "/notifications/";
  //     return lastValueFrom(this.httpService.getrequest(url));
  //   } catch (e) {
  //     this.error = 'Fehler beim Laden!';
  //     return null;
  //   }
  // }
}
