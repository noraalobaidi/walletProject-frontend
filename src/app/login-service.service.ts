import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  urlToHit: string = 'http://localhost:8080/accounts';
  accountsList!: any;
  constructor(private httpClient: HttpClient) {}
  getAllAccounts() {
    // console.log(`accountno:${accountno},civil${civilId} ,pass${password}`);
    this.httpClient.get(this.urlToHit).subscribe((response) => {
      this.accountsList = response;
      console.log(response);
    });
  }
  // ngOnInit() {
  //   this.getAllAccounts();
  // }
}
