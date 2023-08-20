import { Component, OnInit } from '@angular/core';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent { // implements OnInit
  
 constructor(public generalFunctionsService: GeneralFunctionsService) { }

  // async ngOnInit(): Promise<void> {
  // }
}
