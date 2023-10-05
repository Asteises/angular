import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxFileUploaderModule, DxRadioGroupModule,
    DxTextBoxModule, DxToolbarModule
} from "devextreme-angular";
import {
    DxiButtonModule,
    DxiColumnModule,
    DxiGroupItemModule,
    DxiTotalItemModule,
    DxoColumnFixingModule,
    DxoFilterRowModule,
    DxoGroupingModule,
    DxoLoadPanelModule,
    DxoPagingModule,
    DxoScrollingModule,
    DxoSelectionModule,
    DxoSortingModule,
    DxoSummaryModule
} from "devextreme-angular/ui/nested";
import { firstValueFrom, map } from "rxjs";
import {SelectPeriodComponent} from "../select-period/select-period.component";
import {AccountStatement} from "../models/AccountStatement";
import {AppConfig} from "../config/AppConfig";
import {IOutputOptionsSelectPeriod} from "../models/interfaces";

@Component({
    selector: "lib-personal-account-statement-adb-list",
    standalone: true,
    imports: [
        CommonModule,
        DxButtonModule,
        DxFileUploaderModule,
        DxDataGridModule,
        DxiButtonModule,
        DxiColumnModule,
        DxiGroupItemModule,
        DxiTotalItemModule,
        DxoColumnFixingModule,
        DxoFilterRowModule,
        DxoGroupingModule,
        DxoLoadPanelModule,
        DxoPagingModule,
        DxoScrollingModule,
        DxoSelectionModule,
        DxoSortingModule,
        DxoSummaryModule,
        DxDropDownButtonModule,
        DxTextBoxModule,
        DxRadioGroupModule,
        DxToolbarModule,
        SelectPeriodComponent,
    ],
    templateUrl: "./income-account-statement-adb-list.component.html",
    styleUrls: ["./income-account-statement-adb-list.component.scss"]
})
export class IncomeAccountStatementAdbListComponent implements OnInit {

    protected tabs: string[] = [];
    accountStatements: AccountStatement[] = [];
    accountStatementsActual: AccountStatement[] = [];
    groupByRetrieveDate: boolean = false;
    selectedYear = new Date().getFullYear();
    account: string = "04731000920";

    constructor(private appConfig: AppConfig) {
        // super();
        this.load().then();
    }

    async load(): Promise<any> {
        const accountStatements = await firstValueFrom(this.appConfig.getAccountStatement());
      accountStatements.forEach(account => account.dateType = this.dateTypeToStringType(account.dateType));
        this.setAccountStatements(accountStatements);
        this.setTabs();
    }

    public refreshDataGrid(e: any): void {
        this.load().then();
    }

    private dateTypeToStringType(type: string): string {
        let word = '';

        switch (type) {
            case "BEGIN_DAY":
                word = "на начало дня";
                break;
            case "END_DAY":
                word = "на конец дня";
                break;
        }

        return word;
    }

    setAccountStatements(data: AccountStatement[]): void {
        this.accountStatements = data;
        this.accountStatementsActual = data;

      console.log(this.accountStatementsActual)
    }

    setTabs(): void {
        this.tabs = [
            'Изменение остатков на лицевом счёте',
            'Неисполненные поручения администратора доходов'
        ];
    }

    ngOnInit(): void {
        // this.headerService.setTitle("Документы ФК - Выписка из лицевого счёта АДБ");
    }

    dateOptionsChanged(options: IOutputOptionsSelectPeriod): void {
      console.log(options);

      const dateStart = options.dateStart;
      const dateEnd = options.dateEnd;

      this.accountStatements = this.accountStatementsActual.slice().filter(accountStatement => {
        const retrieveDate = new Date(accountStatement.retrieveDate);

        console.log(retrieveDate);

        return retrieveDate > dateStart && retrieveDate < dateEnd;
      });
    }
}
