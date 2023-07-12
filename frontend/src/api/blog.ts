import * as Realm from "realm-web";
import { api, firebaseAuth, realmApp } from ".";
import { BlogPost } from "../models/blogPost";
const {
  BSON: { ObjectId },
} = Realm;


export const blog = {
  /**
   * 
   * @param {number} page 
   * @param {number} resultsPerPage 
   * @returns 
   */
  getPosts: async (page?: number, resultsPerPage?: number) => {
    console.log(realmApp.currentUser, firebaseAuth.currentUser)
    if (!realmApp.currentUser) {
      throw new Error('Not authenticated');
    };

    const posts = await realmApp.currentUser
      .mongoClient(import.meta.env.VITE_MONGO_CLUSTER_NAME).db(import.meta.env.VITE_MONGO_DB_NAME).collection('blog-posts')
      .find({} , {
        projection: {
          content: 0,
        }
      })
    const blogPosts = await Promise.all(posts.map(async post => await new BlogPost().create(post)));
    return blogPosts
  },

  /**
   * 
   * @param {string} id 
   * @returns 
   */
  getPost: async (id: string) => {
    if (!realmApp.currentUser) {
      throw new Error('Not authenticated');
    };

    const post = await realmApp.currentUser
    .mongoClient(import.meta.env.VITE_MONGO_CLUSTER_NAME).db(import.meta.env.VITE_MONGO_DB_NAME).collection('blog-posts')
      .findOne({ _id: new ObjectId(id) });
    console.log(post, id)
    return await new BlogPost().create(post);
  },

  /**
   * 
   * @param {BlogPost} blog 
   */
  createPost: async (blog: BlogPost): Promise<string> => {
    if (!realmApp.currentUser) {
      throw new Error('Not authenticated');
    };

    const result = await realmApp.currentUser
      .mongoClient(import.meta.env.VITE_MONGO_CLUSTER_NAME).db(import.meta.env.VITE_MONGO_DB_NAME).collection('blog-posts')
      .insertOne({
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
   * 
   * @param {BlogPost} blog 
   */
  updatePost: async (blog: BlogPost) => {
    if (!realmApp.currentUser) {
      throw new Error('Not authenticated');
    };
    if (!blog.id) {
      throw new Error("Blog post doesn't have an ID")
    }
    console.log(blog.id)
    await realmApp.currentUser
      .mongoClient(import.meta.env.VITE_MONGO_CLUSTER_NAME).db(import.meta.env.VITE_MONGO_DB_NAME).collection('blog-posts')
      .updateOne({ _id: new ObjectId(blog.id) }, {
        $set: {
          title: blog.title,
          content: blog.content,
          isPublic: blog.isPublic,
          tags: blog.tags,
          dateUpdated: new Date(),
        }
      })
  },

  deletePost: async (id: string) => {
    if (!realmApp.currentUser) {
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
      realmApp.currentUser
        .mongoClient(import.meta.env.VITE_MONGO_CLUSTER_NAME).db(import.meta.env.VITE_MONGO_DB_NAME).collection('blog-posts')
        .deleteOne({ _id: new ObjectId(id) }),
      ...urls.map((url) => api.storage.deleteImage(url))
    ])
  }
}