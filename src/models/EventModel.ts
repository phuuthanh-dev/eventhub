export interface EventModel {
  __v: number;
  _id: string;
  authorId: string;
  category: string;
  createdAt: string;
  description: string;
  endAt: number;
  locationAddress: string;
  locationTitle: string;
  photo: string;
  position: Position;
  price: string;
  date: number;
  startAt: number;
  title: string;
  updatedAt: string;
  users: string[];
  followers?: string[];
  joined: string[];
}

export interface Position {
  _id: string;
  lat: number;
  long: number;
}