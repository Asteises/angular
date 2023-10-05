import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DxDateBoxModule, DxRadioGroupModule, DxSelectBoxModule } from "devextreme-angular";
import {IOutputOptionsSelectPeriod} from "../models/interfaces";

@Component({
    standalone: true,
    imports: [CommonModule, DxDateBoxModule, DxRadioGroupModule, DxSelectBoxModule],
    selector: "lib-select-period",
    templateUrl: "./select-period.component.html",
    styleUrls: ["./select-period.component.scss"],
})
export class SelectPeriodComponent implements OnInit {
    @Input() public reportType: number = 0;
    @Input() public selectedMonth: string = '';
    @Output() optionsChanged = new EventEmitter<IOutputOptionsSelectPeriod>();
    // @Output() reportTypeEvent = new EventEmitter<{ reportType: number }>();
    public selectedYear: number = new Date().getFullYear();
    public selectedQuarter = 0;
    public months: string[] = [];
    public dateStart: string | Date | number = 0;
    public dateEnd: string | Date | number = 0;
    public years: number[] = [];

    public radioButtons = [
        { text: "за год", value: 0 },
        { text: "за квартал", value: 1 },
        { text: "за месяц", value: 2 },
        { text: "за произвольный период", value: 3 },
    ];

    public quarters = [
        { text: "1 квартал", value: 0 },
        { text: "2 квартал", value: 1 },
        { text: "3 квартал", value: 2 },
        { text: "4 квартал", value: 3 },
    ];

    constructor(
      // public formatService: FormatService
    ) {

    }

    ngOnInit(): void {
      this.calcSelectedDate();
      this.onOptionsChanged();
    }

    calcSelectedDate() {
      const startYear = 1995;
      const currentYear = new Date().getFullYear();
      for (let i = currentYear; i >= startYear; i--) {
        this.years.push(i);
      }
      this.selectedYear = currentYear;
      this.months = [...Array(12).keys()].map((key) => new Date(0, key).toLocaleString("ru", { month: "long" }));
      this.selectedMonth = this.months[0];
    }

    public onOptionsChanged(): void {
        switch (this.reportType) {
            case 0: {
                this.dateStart = new Date(this.selectedYear, 0, 1);
                this.dateEnd = new Date(this.selectedYear, 11, 31);
                break;
            }
            case 1: {
                const month = this.selectedQuarter * 3;
                const monthNumberDay = 33 - new Date(this.selectedYear, month + 2, 33).getDate();
                this.dateStart = new Date(this.selectedYear, month, 1);
                this.dateEnd = new Date(this.selectedYear, month + 2, monthNumberDay);
                break;
            }
            case 2: {
                const tM = this.months.indexOf(this.selectedMonth);
                const monthNumberDay = 33 - new Date(this.selectedYear, tM, 33).getDate();
                this.dateStart = new Date(this.selectedYear, tM, 1);
                this.dateEnd = new Date(this.selectedYear, tM, monthNumberDay);
                break;
            }
        }
        const result = { dateStart: this.dateStart, dateEnd: this.dateEnd, reportType: this.reportType };
        this.optionsChanged.emit(result);
        // this.reportTypeEvent.emit({reportType: this.reportType});
    }
}
