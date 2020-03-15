

export interface IInvestor {
    investorId: number;
    name: string;
    surname: string;
    dateCreated: Date;
}

export interface IAccount {
    accountId: number;
    investorId: number;
    amountHeld: number;
    type: AccountType;
    dateCreated: Date;
}

export interface ITableProperty {
    columnName: string;
    key: string;
}

export type AccountType = 'Pension' | 'Bond' | 'GIA' | 'ISA';

export interface IOption<T> {
    value: T;
    viewValue: string;
}