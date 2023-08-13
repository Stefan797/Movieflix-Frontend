import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.sass']
})
export class MylistComponent implements OnInit {
  public results: boolean = false;
  public mylistEmpty: boolean = true;

  myListResponseArray: any = [];
  error = '';

  constructor(private router: Router, private httpService: HttpService) {}


  async ngOnInit(): Promise<void> {
    let myListResponse = await this.loadMyListElements();
    this.myListResponseArray.push(myListResponse);
    // debugger;
    console.log(this.myListResponseArray);
    this.checkIfResultsTrue();
  }

  checkIfResultsTrue() {
    if (this.myListResponseArray[0]) { 
      this.results = true;
      this.mylistEmpty = false;
      // console.log(this.results);
      // console.log(this.mylistEmpty);
    }
  }

  loadMyListElements() {
    try {
      const url = environment.baseUrl + "/movieAPI/?special_category_mylist=mylist";
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }
}
