export interface EventModel {
  authorId: string;
  date: number;
  description: string;
  endAt: number;
  imageUrl: string;
  location: Location;
  startAt: string;
  title: string;
  users: string[];
}

export interface Location {
  address: string;
  title: string;
}
