export type Comment = {
  createdTime : string;
  modifiedTime : string;
  id : number;
  comment : string;
  accountId : string;
  commentLike : number;
  commentLikeUse : boolean;
  commentUse : boolean;
  childcommentList : Comment[];
}

export type ChildComment = {
  createdTime : string;
  modifiedTime : string;
  id : number;
  comment : string;
  accountId : string;
  commentLike : number;
  commentLikeUse : boolean;
  commentUse : boolean;
  childcommentList : [];
}
export type Coordinates = [number, number];
export type Category = { id : number, name: string};

export type Store = {
  id: number;
  title: string;
  accountId:string;
  contents:string;
  fishtype:string;
  coordinates: Coordinates;
  category : Category;
  locationdate: string;
  createdTime:string;
  modefiedTime:string;
  postLike:number;
  commentList : Comment[];
};
