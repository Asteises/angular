export interface AccountStatement {

  account: string;
  retrieveDate: Date | string | number;
  dateType: string;
  receipts: number;
  refunds: number;
  credits: number;
  refundsOutstanding: number;
  creditsOutstanding: number;

}
