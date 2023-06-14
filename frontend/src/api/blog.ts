import { collection, query, limit, orderBy, getDoc, getDocs, Timestamp, startAt, DocumentReference, addDoc, doc, setDoc, DocumentData, Query } from "firebase/firestore";
import { firebaseAuth, db } from ".";

interface IBlogPost {
  id?: string;
  data?: {
    title?: string;
    content?: string;
    dateCreated?: Timestamp;
    dateUpdated?: Timestamp;
    createdByUser?: DocumentReference;
    updatedByUser?: DocumentReference;
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
  dateCreated: Date | null;
  dateUpdated: Date | null;
  createdByUser: DocumentReference | null;
  updatedByUser: DocumentReference | null;

  constructor();
  constructor(post: IBlogPost)
  constructor(post?: IBlogPost) {
    this.id = post?.id ?? null;
    this.title = post?.data?.title ?? null;
    this.content = post?.data?.content ?? null;
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
  getPosts: async (page: number, resultsPerPage: number) => {
    let q: Query<DocumentData>;
    if (!page || !resultsPerPage) {
      q = query(collection(db, "blog-posts"), orderBy("dateUpdated"))
    } else {
      q = query(collection(db, "blog-posts"), orderBy("dateUpdated"), startAt(page * resultsPerPage), limit(resultsPerPage))
    }
    const docs = (await getDocs<DocumentData>(q)).docs;
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
    for (const fieldName of ['createdByUser', 'updatedByUser', 'blog-content']) {
      if (data[fieldName]) {
        data[fieldName] = (await getDoc(data[fieldName])).data();
      }
    }
    return new BlogPost({ id: post.id, data: data });
  },

  /**
   * 
   * @param {BlogPost} blog 
   */
  createPost: async (blog: BlogPost) => {
    if (!firebaseAuth.currentUser) {
      throw new Error('Not authenticated');
    };
    const blogContent = await addDoc(collection(db, "blog-content"), {
      content: blog.content,
    });
    return await setDoc(doc(db, "blog-posts", blogContent.id), {
      title: blog.title,
      content: blogContent,
      dateCreated: Timestamp.now(),
      dateUpdated: Timestamp.now(),
      createdByUser: doc(db, 'users', firebaseAuth.currentUser.uid),
      updatedByUser: doc(db, 'users', firebaseAuth.currentUser.uid),
    });
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
      updatedByUser: doc(db, 'users', firebaseAuth.currentUser.uid),
    })
    await setDoc(doc(db, "blog-content", blog.id), {
      content: blog.content
    })
  }
}