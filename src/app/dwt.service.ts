import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './account';
import { Transaction } from './transaction';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root',
})
export class DWTService {
  updateAccUrl: string = 'http://localhost:8080/accounts';
  addNewTransactionUrl: string = 'http://localhost:8080/transactions/';
  getAllTransactionUrl: string = 'http://localhost:8080/transactions';
  allTransactions!: any;
  arr!: Transaction[];
  last5!: any;
  // alltransactionsList: Transaction[] = [];
  // filteredListTrans: Transaction[] = [];
  constructor(
    private httpClient: HttpClient,
    private service: LoginServiceService
  ) {}

  // filterTransactions() {
  //   this.alltransactionsList = this.allTransactions;
  //   this.alltransactionsList.forEach((transaction) => {
  //     console.log(
  //       `${transaction.account_no.account_no} ?? ${this.service.loggedInAccount.account_no}`
  //     );
  //     // if (
  //     //   transaction.account_no_account_no ==
  //     //   this.service.loggedInAccount.account_no
  //     // ) {
  //     //   this.filteredListTrans.push(transaction);
  //     // }
  //   });
  // }
  // filterUserTransactions() {
  //   this.filteredListTrans = this.allTransactions.filter(
  //     (transaction: { account_no: { account_no: any } }) =>
  //       transaction.account_no.account_no ==
  //       this.service.loggedInAccount.account_no
  //   );
  // }
  updateAccount(updatedAccount: Account) {
    console.log(
      ` accountno :${updatedAccount.account_no}, balance :${updatedAccount.balance},civil :${updatedAccount.civil_id},first :${updatedAccount.first_name},last :${updatedAccount.last_name}`
    );
    this.httpClient
      .put(this.updateAccUrl, updatedAccount)
      .subscribe((response) => {
        console.log(response);
        console.log('account updated successfully');
      });
  }

  addTransaction(transaction: any, accountNumber: number) {
    this.httpClient
      .post(this.addNewTransactionUrl + accountNumber, transaction)
      .subscribe((response) => {
        console.log(response);
        console.log('transaction added successfully');
      });
  }

  addTransferTransaction(
    transaction: any,
    accountNumber: number,
    transferToAccount: number
  ) {
    this.httpClient
      .post(
        this.addNewTransactionUrl + accountNumber + '/' + transferToAccount,
        transaction
      )
      .subscribe((response) => {
        console.log(response);
        console.log('transaction added successfully');
      });
  }

  getAllTransactions() {
    this.httpClient.get(this.getAllTransactionUrl).subscribe((response) => {
      console.log(response);
      this.allTransactions = response;
      this.allTransactions = this.allTransactions.reverse();
      this.arr = this.allTransactions;
      this.last5 = this.arr.slice(0, 5);
      console.log('get all transactions');
      this;
    });
  }

  getAllTransactionsForHistory() {
    return this.allTransactions;
  }
}
