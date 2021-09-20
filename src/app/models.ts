export interface Game {
    background_image: string;
    name: string;
    released: string;
    metacritic_url: string
    website: string;
    description: string;
    metacritic: number;
    genres: Genre[];
    parent_platforms: ParentPlatform[];
    publishers: Publishers[];
    ratings: Rating[];
    screenshots: Screenshots[];
    trailers: Trailer[];
    id: string;
}

export interface APIResponse<T> {
    results: T[]
}

interface Genre {
    name: string
}

interface ParentPlatform {
    platform: {
        name: string;
        slug: string;
    }
}

interface Publishers {
    name: string
}

interface Rating {
    id: number;
    count: number;
    title: string
}

interface Screenshots {
    image: string;
}

interface Trailer {
    data: {
        max: string
    }
}