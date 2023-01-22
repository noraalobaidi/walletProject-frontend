import { Account } from './account';

export class Transaction {
  transaction_id!: number;
  amount!: number;
  date!: string | null;
  new_balance!: number;
  pre_balance!: number;
  type!: string;
  account_no!: Account;
  transfer_acc_no!: Account;
}
