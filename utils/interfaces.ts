export interface Vote {
  _id: string;
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
  summons: string;
  totalBonds: number;
  investors: User[];
  votes: Vote[];
}

export interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  broker: boolean;
}

export interface Company {
  _id: string;
  name: string;
  bondholders: User[];
}
