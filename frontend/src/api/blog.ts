import { DocumentData, Query, Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, setDoc, startAt } from "firebase/firestore";
import { api, db, firebaseAuth } from ".";

interface IBlogPost {
  id?: string;
  data?: {
    title?: string;
    content?: string;
    isPublic?: boolean;
    tags?: string[];
    dateCreated?: Timestamp;
    dateUpdated?: Timestamp;
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
    this.dateCreated = post?.data?.dateCreated?.toDate() ?? null;
    this.dateUpdated = post?.data?.dateUpdated?.toDate() ?? null;
    this.createdByUser = post?.data?.createdByUser ?? null;
    this.updatedByUser = post?.data?.updatedByUser ?? null;
  }
}


export const blog = {
  /**
   * 
   * @param {number} page 
   * @param {number} resultsPerPage 
   * @returns 
   */
  getPosts: async (page?: number, resultsPerPage?: number) => {
    let q: Query<DocumentData>;
    if (!page || !resultsPerPage) {
      q = query(collection(db, "blog-posts"), orderBy("dateUpdated"))
    } else {
      q = query(collection(db, "blog-posts"), orderBy("dateUpdated"), startAt(page * resultsPerPage), limit(resultsPerPage))
    }
    const docs = (await getDocs(q)).docs;
    return await Promise.all(docs.map(async doc => {
      let data = doc.data();
      if (data['createdByUser']) {
        data['createdByUser'] = (await getDoc(data['createdByUser'])).data();
      }
      if (data['updatedByUser']) {
        data['updatedByUser'] = (await getDoc(data['updatedByUser'])).data();
      }
      return new BlogPost({ id: doc.id, data: data });
    }))
  },

  /**
   * 
   * @param {string} id 
   * @returns 
   */
  getPost: async (id: string) => {
    const post = await getDoc(doc(db, "blog-posts", id));
    let data = post.data();
    if (!post || !data) {
      throw new Error('Could not get post');
    }
    for (const fieldName of ['createdByUser', 'updatedByUser', 'content']) {
      if (fieldName === 'content') {
        const blogContent = (await getDoc(data[fieldName])).data() as Record<string, string>;
        data['content'] = blogContent['content'];
      } else if (data[fieldName]) {
        data[fieldName] = (await getDoc(data[fieldName])).data();
      }
    }
    console.log(data)
    return new BlogPost({ id: post.id, data: data });
  },

  /**
   * 
   * @param {BlogPost} blog 
   */
  createPost: async (blog: BlogPost): Promise<string> => {
    if (!firebaseAuth.currentUser) {
      throw new Error('Not authenticated');
    };
    const blogContent = await addDoc(collection(db, "blog-content"), {
      content: blog.content ?? '',
    });
    
    await setDoc(doc(db, "blog-posts", blogContent.id), {
      title: blog.title ?? '',
      content: blogContent,
      isPublic: false,
      tags: [],
      dateCreated: Timestamp.now(),
      dateUpdated: Timestamp.now(),
      createdByUser: doc(db, 'users', firebaseAuth.currentUser.uid),
      updatedByUser: doc(db, 'users', firebaseAuth.currentUser.uid),
    });

    return blogContent.id;
  },

  /**
   * 
   * @param {BlogPost} blog 
   */
  updatePost: async (blog: BlogPost) => {
    if (!firebaseAuth.currentUser) {
      throw new Error('Not authenticated');
    };
    if (!blog.id) {
      throw new Error("Blog post doesn't have an ID")
    }
    await setDoc(doc(db, "blog-posts", blog.id), {
      title: blog.title,
      dateUpdated: Timestamp.now(),
      isPublic: blog.isPublic,
      tags: blog.tags,
      updatedByUser: doc(db, 'users', firebaseAuth.currentUser.uid),
    }, { merge: true })
    await setDoc(doc(db, "blog-content", blog.id), {
      content: blog.content
    })
  },

  deletePost: async (id: string) => {
    const post = await getDoc(doc(db, "blog-content", id));
    const data = post.data();
    if (!post || !data) {
      throw new Error('Could not get post');
    }
    const content = data['content'];
    const regx = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
    
    let url: RegExpExecArray | null;
    let urls = [];
    while (url = regx.exec(content)) {
      urls.push(url[1]);
    }
    console.log(urls)
    // delete the blog-posts and blog-content entry, but also delete the images
    return await Promise.all([
      deleteDoc(doc(db, 'blog-posts', id)),
      deleteDoc(doc(db, 'blog-content', id)),
      urls.map((url) => api.storage.deleteImage(url))
    ])
  }
}