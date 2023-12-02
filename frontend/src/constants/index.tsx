import { RatingType } from "../contexts/PlaceContext";

export const DEFAULT_COUNTRY = "Worldwide";

export enum PLACE_CATEGORY {
  "ALL_PLACES",
  "MY_PLACES",
  "FAVORITE_PLACES",
  "LIKED_PLACES",
}

export enum PLACE_SORT {
  "RATINGS",
  "LIKES",
  "VISITORS",
}

export type PLACE_FILTER = {
  country: string;
  city: string;
};

export type RatingProps = {
  ratings: RatingType[];
  placeId: string;
  userId: string;
};

export type CommentaryType = {
  _id: string;
  placeId: string;
  commentMsg: string;
  datePosted: Date;
  user: {
    userId: string;
    username: string;
    profilePhoto: string;
  };
};

export enum NAVBAR_VARIANT {
  "SOLID",
  "TRANSPARENT",
}

export type LoginInputType = {
  email: string;
  password: string;
};

export type ContactInputType = {
  email: string;
  name: string;
  message: string;
};

export enum FormType {
  CONTACT,
  LOGIN,
  REGISTER,
}
