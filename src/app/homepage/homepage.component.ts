import { Component } from '@angular/core';
import { DWTService } from '../dwt.service';
import { LoginServiceService } from '../login-service.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  // allTransactions!: any;
  userBalance: any = this.service.loggedInAccount.balance;
  loggedInAccountNo: number = this.service.loggedInAccount.account_no;
  last5: any = this.dwtService.last5;
  // Last3transactions:any=alltransactions.slice
  // runhistory() {
  //   this.allTransactions = this.dwtService.allTransactions.filter(
  //     (transaction: { account_no: { account_no: any } }) =>
  //       transaction.account_no.account_no ==
  //       this.service.loggedInAccount.account_no
  //   );
  // }
  constructor(
    private dwtService: DWTService,
    private service: LoginServiceService
  ) {}
}
