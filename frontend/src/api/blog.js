import { collection, query, limit, orderBy, getDocs, Timestamp, startAt } from "firebase/firestore";
import { db } from ".";

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
   *    dateUpdated: Timestamp
   *  }
   * }} param0 
   */
  constructor ({id = '', data: { title = '', content = '', dateCreated = new Timestamp(0, 0), dateUpdated = new Timestamp(0, 0) } = {}}) {
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
    return docs.map(doc => {
      return new BlogPost({id: doc.id, data: doc.data()})
    })
  }
}