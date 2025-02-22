export interface ProfileModel {
    bio: string;
    createdAt: string;
    email: string;
    fullName: string;
    photo: string;
    updatedAt: string;
    following: string[];
    uid: string;
    interests?: string[];
    type?: 'Organizer' | 'Personal' | undefined;
  }