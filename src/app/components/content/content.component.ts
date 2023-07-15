import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit, OnDestroy {
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