import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenerallyFunctionsService } from 'src/app/services/generally-functions.service';

@Component({
  selector: 'app-data-protection',
  templateUrl: './data-protection.component.html',
  styleUrls: ['./data-protection.component.sass']
})
export class DataProtectionComponent {
  
  constructor(private router: Router, public generallyFunctionsService: GenerallyFunctionsService) { }

}
