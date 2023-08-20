import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';
@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.sass']
})
export class ImprintComponent {
  constructor(private router: Router, public generalFunctionsService: GeneralFunctionsService) { }
}
