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

  notificationResponses: any = [];

  error = '';
  
  constructor(public hoverService: HoverService, private httpService: HttpService) {}

  ngOnInit(): void {
    this.loadNotifications();
  };

  async loadNotifications() {
    this.notificationResponses = await this.load();
    console.log(this.notificationResponses);
  }

  load() {
    try {
      const url = environment.baseUrl + "/notifications/";
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }
  
  movierecommendation = [
    {id: 1, imgpath:'test1.jpg', text:'Durchstöbern Sie ihre Empfehlungen'},
    {id: 2, imgpath:'test2.jpg', text:'Neu auf Movieflix Water Example: The Story'},
    {id: 3, imgpath:'test3.jpg', text:'Jetzt verfügbar Neue Folgen von You. '},
    {id: 4, imgpath:'test4.jpg', text:'Dieser Titel könnte auch zu ihrem Geschmack passen '},
    {id: 5, imgpath:'test3.jpg', text:'Jetzt verfügbar Neue Folgen von You. '},
    {id: 6, imgpath:'test4.jpg', text:'Dieser Titel könnte auch zu ihrem Geschmack passen '}
  ];
}
