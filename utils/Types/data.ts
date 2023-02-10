export type DataPosts = {
    id?: number | undefined
    title?: string | undefined;
    authorName?: string | undefined
    content?: string | undefined
    published?: boolean | undefined
    creatdate?: Date | string | any;
    updatedAt?: Date;
    authorId?: number | undefined
    viewCount?: number | undefined
    author?: string | undefined
    categoriesId?: number;
    categorie?: {
      id?: number 
      name?: string,
      url?:string
    }
    like?: number;
    deslike?: number;
    url?: string | undefined;
    key?:number | undefined
    
  };
  export type Categoreis ={
    id?:number,
    name?:string,
    url?:string,
    posts?:DataPosts | undefined
  }