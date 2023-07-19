import { collections, realmApp } from ".";
import * as Realm from "realm-web";
import { User } from "../models/user";
const {
  BSON: { ObjectId },
} = Realm;

export const user = {
  getCurrentUser: async () => {
    if (!collections.users || !realmApp.currentUser) {
      throw new Error('Not authenticated');
    };

    const result = await collections.users.findOne({ _id: new ObjectId(realmApp.currentUser.id) });
    return new User(result);
  },

  saveCurrentUser: async (user: User) => {
    if (!collections.users || !realmApp.currentUser) {
      throw new Error('Not authenticated');
    };

    await collections.users.updateOne({ _id: new ObjectId(realmApp.currentUser.id) }, {
      $set: {
        name: user.name,
        description: user.description,
        profileImg: user.profileImg,
        siteUrl: user.siteUrl,
      }
    })
  },

  getUser: async (id: string) => {
    if (!collections.users) {
      throw new Error('Not authenticated');
    };

    const result = await collections.users.findOne({ _id: new ObjectId(id) });
    return new User(result);
  }
}