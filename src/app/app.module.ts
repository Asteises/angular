import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { DxDataGridModule } from 'devextreme-angular';
import { HttpClientModule  } from '@angular/common/http';
import {IncomeAccountStatementAdbListComponent} from "./account-statement/income-account-statement-adb-list.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DxDataGridModule,
    HttpClientModule,
    IncomeAccountStatementAdbListComponent
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
