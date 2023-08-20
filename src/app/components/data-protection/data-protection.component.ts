import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';

@Component({
  selector: 'app-data-protection',
  templateUrl: './data-protection.component.html',
  styleUrls: ['./data-protection.component.sass']
})
export class DataProtectionComponent {
  
  constructor(private router: Router, public generalFunctionsService: GeneralFunctionsService) { }

}
