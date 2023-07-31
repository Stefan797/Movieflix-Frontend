import { Component } from '@angular/core';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.sass']
})
export class MylistComponent {
  results: boolean = false;
  mylistEmpty: boolean = true;
}
