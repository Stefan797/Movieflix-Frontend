import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent {
  constructor(private router: Router, public generalFunctionsService: GeneralFunctionsService) { }
}
