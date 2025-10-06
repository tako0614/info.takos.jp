export interface ZennArticle {
  id: number;
  post_type: string;
  title: string;
  slug: string;
  published: boolean;
  comments_count: number;
  liked_count: number;
  body_letters_count: number;
  article_type: string;
  emoji: string;
  is_suspending_private: boolean;
  published_at: string;
  body_updated_at: string;
  source_repo_updated_at: string | null;
  pinned: boolean;
  path: string;
  user: {
    id: number;
    username: string;
    name: string;
    avatar_small_url: string;
  };
  publication: any | null;
}

export interface ZennApiResponse {
  articles: ZennArticle[];
  next_page: number | null;
}

export interface DisplayArticle {
  title: string;
  link: string;
  emoji: string;
  likedCount: number;
  publishedAt: string;
}
