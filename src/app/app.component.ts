import { Component } from '@angular/core';
import {AppConfig} from "./config/AppConfig";
import {AccountStatement} from "./models/AccountStatement";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-root',
  // standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  accountStatements: AccountStatement[] = [];

  constructor(private appConfig: AppConfig) {
    this.load().then();
  }

  async load(): Promise<any> {
    const accountStatements = await firstValueFrom(this.appConfig.getAccountStatement());
    this.setAccountStatements(accountStatements);
  }

  setAccountStatements(data: AccountStatement[]) : void {
    this.accountStatements = data;
  }

}
