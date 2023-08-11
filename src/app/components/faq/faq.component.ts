import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenerallyFunctionsService } from 'src/app/services/generally-functions.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent {
  constructor(private router: Router, public generallyFunctionsService: GenerallyFunctionsService) { }
}
