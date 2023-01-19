import type { Item } from '../item';

export interface Trade {
  sender: string;
  receiver: string;
  sendItems: Item[];
  receivedItems: Item[];
};
