import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  async onSubmit(data) {

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);

    let apiUrl = 'https://stefanhuebner97.de/SendMail/send_mail.php';

    let result = await fetch(apiUrl, { method: 'POST', body: formData})
    .then((response) => response.text());
  
    this.showEmailSendInformation(result);
  }

  showEmailSendInformation(result) {
    if ('Unfortunately, the e-mail could not be sent.' == result) {
      document.getElementById('resultcontainer').classList.add('errorred');
    } 
    document.getElementById('resultcontainer').classList.remove('hide');
    document.getElementById('resulttext').innerHTML = result;
    document.getElementById('resultcontainer').classList.add('buttonanimation');
    
    setTimeout(() => {
      document.getElementById('resultcontainer').classList.add('hide');
      document.getElementById('resultcontainer').classList.remove('buttonanimation');
      if ('Unfortunately, the e-mail could not be sent.' == result) {
        document.getElementById('resultcontainer').classList.remove('errorred');
      }
    }, 5000);
  }
}
