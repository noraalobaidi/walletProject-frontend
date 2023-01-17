import { Component } from '@angular/core';
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
  }
  constructor(private service: LoginServiceService) {}
}
