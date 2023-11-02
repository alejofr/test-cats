import { Breed } from "./breed";

export interface ImageCat {
    id:     string;
    url:    string;
    width:  number;
    height: number;
}

export interface ParamsSearchImages{
    limit:              number;
    breed_id?:          string;
    order?:              'RANDOM' | 'ASC' | 'DESC';
    category_ids?:      number;
}


export interface SearchImages extends ImageCat{
    breeds:     Breed[]; 
}