import * as Realm from "realm-web";
import { collections } from "../api";
import { User } from "./user";

const {
  BSON: { ObjectId },
} = Realm;

interface IBlogPost {
  _id?: typeof ObjectId;
  owner_id?: typeof ObjectId;
  title?: string;
  content?: string;
  isPublic?: boolean;
  tags?: string[];
  dateCreated?: Date;
  dateUpdated?: Date;
}

/**
 * Class representing a blog post
 * @class
 */
export class BlogPost {
  id?: string;
  owner_id?: string;
  owner?: User;
  title: string;
  content: string;
  isPublic: boolean;
  tags: string[];
  dateCreated: Date;
  dateUpdated: Date;

  constructor();
  constructor(post: IBlogPost)
  constructor(post?: IBlogPost) {
    this.id = post?._id?.toString();
    this.owner_id = post?.owner_id?.toString();
    this.title = post?.title ?? '';
    this.content = post?.content ?? '';
    this.isPublic = post?.isPublic ?? false;
    this.tags = post?.tags ?? [];
    this.dateCreated = post?.dateCreated ?? new Date();
    this.dateUpdated = post?.dateUpdated ?? new Date();
  }

  async create(post?: IBlogPost) {
    this.id = post?._id?.toString();
    this.owner_id = post?.owner_id?.toString();
    this.title = post?.title ?? '';
    this.content = post?.content ?? '';
    this.isPublic = post?.isPublic ?? false;
    this.tags = post?.tags ?? [];
    this.dateCreated = post?.dateCreated ?? new Date();
    this.dateUpdated = post?.dateUpdated ?? new Date();
    await this.setOwner();
    return this;
  }

  async setOwner() {
    const result = await collections.users?.findOne({ _id: new ObjectId(this.owner_id) });
    this.owner = new User(result);
  }
}