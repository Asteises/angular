import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {AccountStatement} from "../models/AccountStatement";

@Injectable({providedIn: "root"})
export class AppConfig {

  URL: string = "./assets/db.json";

  constructor(private http: HttpClient) {
  }

  public getAccountStatement(): Observable<AccountStatement[]> {
    return this.http.get<{account_statements: AccountStatement[]}>(this.URL)
    .pipe(
      map(item => item.account_statements)
    )
  }
}
