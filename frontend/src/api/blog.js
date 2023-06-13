import { collection, query, limit, orderBy, getDoc, getDocs, Timestamp, startAt, DocumentReference, addDoc, doc, FieldValue } from "firebase/firestore";
import { firebaseAuth, db } from ".";

/**
 * Class representing a blog post
 * @class
 */
export class BlogPost {
  /**
   * 
   * @param {{
   *  id: string,
   *  data: {
   *    title: string,
   *    content: string,
   *    dateCreated: Timestamp,
   *    dateUpdated: Timestamp,
   *  }
   * }} param0 
   */
  constructor ({
    id = '',
    data: {
      title = '',
      content = '',
      dateCreated = new Timestamp(0, 0),
      dateUpdated = new Timestamp(0, 0),
      createdByUser = new DocumentReference(),
      updatedByUser = new DocumentReference(),
    } = {}
  }) {
    /**
     * ID of the post
     * @type {string}
     */
    this.id = id;

    /**
     * Title of the post
     * @type {string}
     */
    this.title = title;

    /**
     * Post content
     * @type {string}
     */
    this.content = content;

    /**
     * Date when the post was created
     * @type {Date}
     */
    this.dateCreated = dateCreated.toDate();

    /**
     * Date when the post was updated
     * @type {Date}
     */
    this.dateUpdated = dateUpdated.toDate();

    /**
     * @type {DocumentReference}
     */
    this.createdByUser = createdByUser;

    /**
     * @type {DocumentReference}
     */
    this.updatedByUser = updatedByUser;
  }
}


export const blog = {
  /**
   * 
   * @param {number} page 
   * @param {number} resultsPerPage 
   * @returns 
   */
  getPosts: async (page, resultsPerPage) => {
    let q;
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
      return new BlogPost({id: doc.id, data: data})
    }))
  },

  /**
   * 
   * @param {BlogPost} blog 
   */
  createPost: async (blog) => {
    return await addDoc(collection(db, "blog-posts"), {
      title: blog.title,
      content: blog.content,
      dateCreated: Timestamp.now(),
      dateUpdated: Timestamp.now(),
      createdByUser: doc(db, 'users', firebaseAuth.currentUser.uid),
      updatedByUser: doc(db, 'users', firebaseAuth.currentUser.uid),
    });
  }
}