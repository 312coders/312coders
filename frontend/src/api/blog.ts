import * as Realm from "realm-web";
import { api, collections, realmApp } from ".";
import { BlogPost } from "../models/blogPost";
const {
  BSON: { ObjectId },
} = Realm;


export const blog = {
  /**
   * Gets multiple posts
   * 
   * @param {number} page 
   * @param {number} resultsPerPage 
   * @returns 
   */
  getPosts: async (page?: number, resultsPerPage?: number) => {
    if (!collections.blogPosts) {
      throw new Error('Not authenticated');
    };

    const posts = await collections.blogPosts
      .find({} , {
        projection: {
          content: 0,
        }
      })
    return await Promise.all(posts.map(async post => await new BlogPost().create(post)));
  },

  /**
   * Gets a post by id
   * 
   * @param {string} id 
   * @returns 
   */
  getPost: async (id: string) => {
    if (!collections.blogPosts) {
      throw new Error('Not authenticated');
    };

    const post = await collections.blogPosts.findOne({ _id: new ObjectId(id) });
    console.log(post, id)
    return await new BlogPost().create(post);
  },

  /**
   * Creates a new blog post, returns the id
   * 
   * @param {BlogPost} blog 
   */
  createPost: async (blog: BlogPost): Promise<string> => {
    if (!collections.blogPosts || !realmApp.currentUser) {
      throw new Error('Not authenticated');
    };

    const result = await collections.blogPosts.insertOne({
        title: blog.title ?? '',
        content: blog.content ?? '',
        isPublic: false,
        tags: [],
        dateCreated: new Date(),
        dateUpdated: new Date(),
        owner_id: new ObjectId(realmApp.currentUser.id)
      })
    return result.insertedId
  },

  /**
   * Updates a blog post
   * 
   * @param {BlogPost} blog 
   */
  updatePost: async (blog: BlogPost) => {
    if (!collections.blogPosts) {
      throw new Error('Not authenticated');
    };
    if (!blog.id) {
      throw new Error("Blog post doesn't have an ID")
    }
    console.log(blog.id)
    await collections.blogPosts.updateOne({ _id: new ObjectId(blog.id) }, {
        $set: {
          title: blog.title,
          content: blog.content,
          isPublic: blog.isPublic,
          tags: blog.tags,
          dateUpdated: new Date(),
        }
      })
  },

  /**
   * Deletes a post from MongoDB and any associated images from Firebase Storage
   * 
   * @param id 
   * @returns 
   */
  deletePost: async (id: string) => {
    if (!collections.blogPosts) {
      throw new Error('Not authenticated');
    };

    const post = await blog.getPost(id);
    const regx = /<img.*?src="([^">]*\/([^">]*?))".*?>/g;
    
    let url: RegExpExecArray | null;
    let urls = [];
    while (url = regx.exec(post.content)) {
      urls.push(url[1]);
    }

    return await Promise.all([
      collections.blogPosts.deleteOne({ _id: new ObjectId(id) }),
      ...urls.map((url) => api.storage.deleteImage(url))
    ])
  }
}