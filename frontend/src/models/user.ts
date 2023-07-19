import * as Realm from "realm-web";

const {
  BSON: { ObjectId },
} = Realm;

interface IUser {
  _id?: typeof ObjectId;
  firebaseUID: string;
  email: string;
  name: string;
  description: string;
  profileImg: string;
  siteUrl: string;
  role?: 'user' | 'admin';
};

export class User {
  id?: string;
  firebaseUID: string;
  email: string;
  name: string;
  description: string;
  profileImg: string;
  siteUrl: string;
  role?: 'user' | 'admin';

  constructor();
  constructor(user: IUser)
  constructor(user?: IUser) {
    this.id = user?._id?.toString();
    this.firebaseUID = user?.firebaseUID ?? '';
    this.email = user?.email ?? '';
    this.role = user?.role;
    this.name = user?.name ?? '';
    this.description = user?.description ?? '';
    this.profileImg = user?.profileImg ?? '';
    this.siteUrl = user?.siteUrl ?? '';
  }
}