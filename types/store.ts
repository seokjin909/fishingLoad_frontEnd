type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];
export type Category = { id : number, name: string};

export type Store = {
  id: number;
  title: string;
  userId:string;
  contents:string;
  fishtype:string;
  coordinates: Coordinates;
  category : Category;
  Locationdate: string;
};

