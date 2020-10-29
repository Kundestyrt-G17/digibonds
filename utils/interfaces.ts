export interface Vote {
  _id: string;
  ISIN: string;
  company: string;
  custodianName?: string;
  bondsOwned: number;
  accountNumber?: number;
  phoneNumber?: number;
  favor: string;
  checked?: boolean;
  hasCustodian: string;
}

export interface Meeting {
  _id: string;
  meetingName: string;
  isin: string;
  date: Date;
  votes: number;
  investors: User[];
}

export interface User {
  _id: string;
  email: string;
  password: string;
  broker: boolean;
}
