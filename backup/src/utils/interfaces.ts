export interface Vote {
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
