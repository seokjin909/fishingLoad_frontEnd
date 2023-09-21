type Lat = number;
type Lng = number;

export type Comment = {
  createTime : string;
  modifiedTime : string;
  id : number;
  comment : string;
  accountId : string;
  commentLike : number;
  commentUse : boolean;
}
export type Coordinates = [Lat, Lng];
export type Category = { id : number, name: string};

export type Store = {
  id: number;
  title: string;
  accountId:string;
  contents:string;
  fishtype?:string;
  coordinates?: Coordinates;
  category : Category;
  locationdate?: string;
  createdTime:string;
  modefiedTime:string;
  postLike:number;
  commentList : Comment[];
};

