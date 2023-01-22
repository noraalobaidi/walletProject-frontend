import { Component } from '@angular/core';
import { DWTService } from './dwt.service';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'walletProject';

  ngOnInit() {
    this.service.getAllAccounts();
    this.dwtService.getAllTransactions();
    this.service.autoLogin();
  }
  constructor(
    private service: LoginServiceService,
    private dwtService: DWTService
  ) {}
}
