export interface Favorite {
    id:         number;
    user_id:    string;
    image_id:   string;
    sub_id:     string;
    created_at: Date;
    image:      ImageFav;
}

export interface ImageFav {
    id:  string;
    url: string;
}
