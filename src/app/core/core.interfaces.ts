

export interface IInvestor {
    investorId: number;
    name: string;
    surname: string;
    dateCreated: Date;
}

export interface ITableProperty {
    columnName: string;
    key: string;
    formatFunc?: () => any
}