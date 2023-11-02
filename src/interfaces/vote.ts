export interface Vote {
    id:           number;
    image_id:     string;
    sub_id:       string;
    created_at:   Date;
    value:        number;
    country_code: string;
    image:        ImageVote
}

export interface ImageVote {
    id:  string;
    url: string;
}