
export interface Author {
    name: string;
    avatar: string;
    bio: string;
    followers: string;
    posts: string;
}

export interface BlogPost {
    id: number;
    category: string;
    views: string;
    comments: number;
    title: string;
    subtitle: string;
    author: Author;
    date: string;
    readTime: string;
    coverImage: string;
    tags: string[];
    content: string;
}

export interface BlogHeroProps {
    blogPost: {
        category: string;
        views: string;
        comments: number;
        title: string;
        subtitle: string;
        author: {
            avatar: string;
            name: string;
        };
        date: string;
        readTime: string;
        coverImage: string;
    };
}

export interface AuthorBioProps {
    author: {
        name: string;
        avatar: string;
        bio: string;
        followers: string;
        posts: string;
    };
}

export interface BlogContentProps {
    content: string;
    tags: string[];
}

export interface RecommendedPost {
    id: number;
    title: string;
    description: string;
    author: string;
    date: string;
    category: string;
    image: string;
    readTime: string;
    views: string;
}

export interface RecommendedPostsProps {
    posts: RecommendedPost[];
}