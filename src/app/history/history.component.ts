import { Component } from '@angular/core';
import { DWTService } from '../dwt.service';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  loggedInAccountNo: number = this.service.loggedInAccount.account_no;
  filteredList!: any;
  alltransactions: any = this.dwtService.allTransactions;

  // runhistory() {
  //   // this.dwtService.filterUserTransactions();
  //   // console.log(`length ${this.dwtService.filteredListTrans.length}`);
  //   // this.filteredList = this.dwtService.filteredListTrans;
  //   this.dwtService.getAllTransactions();
  //   this.alltransactions = this.dwtService.allTransactions;
  // }

  // filterUserTransactions() {
  //   console.log('all transactions from history ' + this.alltransactions);
  //   this.filteredList = this.dwtService.allTransactions.filter(
  //     (transaction: { account_no: { account_no: any } }) =>
  //       transaction.account_no.account_no ==
  //       this.service.loggedInAccount.account_no
  //   );
  //   console.log(this.filteredList);
  // }

  // ngOnInit() {
  //   console.log(this.route.snapshot.queryParams);
  // }

  constructor(
    private service: LoginServiceService,
    private dwtService: DWTService
  ) {}
}
