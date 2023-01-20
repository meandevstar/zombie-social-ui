import { ItemType } from 'definitions/enums';

export interface Statistics {
  normal: number;
  infected: number;
  lostPoints: number;
  resourceAverage: {
    [key in ItemType]: number;
  };
}