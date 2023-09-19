import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-is-confirmed',
  templateUrl: './email-is-confirmed.component.html',
  styleUrls: ['./email-is-confirmed.component.sass']
})
export class EmailIsConfirmedComponent implements OnInit, OnDestroy {
  
  private timer: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.timer = setTimeout(() => {
      this.router.navigate(['de/login']);
    }, 4000);
  };

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
