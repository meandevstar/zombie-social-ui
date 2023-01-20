import { Gender } from 'definitions/enums';

import { ItemType, UserStatus, UserType } from 'definitions/enums';

export interface User {
  _id: string;
  id: string;
  name: string;
  age: number;
  gender: Gender;
  type: UserType; // default UserType.Suvivor
  status: UserStatus; // default UserStatus.Normal,
  lastLocation: {
    lat: number;
    long: number;
  };
  flaggedUsers: User[]; // default 0
  inventory: {
    [key in ItemType]: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateUser {
  name: string;
  age: number;
  gender: Gender;
  lastLocation: {
    lat: number;
    long: number;
  };
  inventory: {
    [key in ItemType]: number;
  };
}

export interface UpdateUser {
  id: string;
  data: Partial<CreateUser>,
}
