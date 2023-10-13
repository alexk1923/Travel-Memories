export const DEFAULT_COUNTRY = "Worldwide"

export enum PLACE_CATEGORY {
    'ALL_PLACES',
    'MY_PLACES',
    'FAVORITE_PLACES',
    'LIKED_PLACES'
}

export enum PLACE_SORT {
    'RATINGS',
    'LIKES',
    'VISITORS'
}


export type PLACE_FILTER = {
    country: string;
    city: string;
}
