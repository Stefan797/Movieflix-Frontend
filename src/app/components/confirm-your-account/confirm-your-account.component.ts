import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-confirm-your-account',
  templateUrl: './confirm-your-account.component.html',
  styleUrls: ['./confirm-your-account.component.sass']
})
export class ConfirmYourAccountComponent implements OnInit, OnDestroy {
  isRegistered = false;
  private isRegisteredSubscription: Subscription;

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
    this.isRegistered = this.registerService.handleRegisterComponent();
    this.isRegisteredSubscription = this.registerService.getIsRegisteredChanged().subscribe(
      (isRegistered: boolean) => {
        this.isRegistered = isRegistered;
      }
    );
  }

  ngOnDestroy(): void {
    this.isRegisteredSubscription.unsubscribe();
  }
}
