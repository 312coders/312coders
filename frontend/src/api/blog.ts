

interface IBlogPost {
  id?: string;
  data?: {
    title?: string;
    content?: string;
    isPublic?: boolean;
    tags?: string[];
    dateCreated?: Date;
    dateUpdated?: Date;
    createdByUser?: Record<string, string>;
    updatedByUser?: Record<string, string>;
  }
}

/**
 * Class representing a blog post
 * @class
 */
export class BlogPost {
  id: string | null;
  title: string | null;
  content: string | null;
  isPublic: boolean;
  tags: string[];
  dateCreated: Date | null;
  dateUpdated: Date | null;
  createdByUser: Record<string, string> | null;
  updatedByUser: Record<string, string> | null;

  constructor();
  constructor(post: IBlogPost)
  constructor(post?: IBlogPost) {
    this.id = post?.id ?? null;
    this.title = post?.data?.title ?? null;
    this.content = post?.data?.content ?? null;
    this.isPublic = post?.data?.isPublic ?? false;
    this.tags = post?.data?.tags ?? [];
    this.dateCreated = post?.data?.dateCreated ?? null;
    this.dateUpdated = post?.data?.dateUpdated ?? null;
    this.createdByUser = post?.data?.createdByUser ?? null;
    this.updatedByUser = post?.data?.updatedByUser ?? null;
  }
}


export const blog = {
}