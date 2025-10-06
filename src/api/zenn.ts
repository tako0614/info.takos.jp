import type { ZennApiResponse, DisplayArticle } from '../types/zenn';

const USERNAME = 'takoserver';

/**
 * Zenn APIから記事を取得する
 * @param page ページ番号 (デフォルト: 1)
 * @param order 並び順 (latest | liked)
 * @returns 記事の配列
 */
export async function fetchZennArticles(
  page: number = 1,
  order: 'latest' | 'liked' = 'latest'
): Promise<DisplayArticle[]> {
  try {
    // 開発環境ではViteプロキシを使用、本番環境では直接APIを叩く
    const isDev = import.meta.env.DEV;
    const url = isDev 
      ? `/api/zenn?username=${USERNAME}&order=${order}&page=${page}`
      : `https://zenn.dev/api/articles?username=${USERNAME}&order=${order}&page=${page}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }
    
    const data: ZennApiResponse = await response.json();
    
    // 表示用のデータに変換
    const articles: DisplayArticle[] = (data.articles || []).map((article) => ({
      title: article.title,
      link: `https://zenn.dev/${article.user.username}/articles/${article.slug}`,
      emoji: article.emoji,
      likedCount: article.liked_count,
      publishedAt: article.published_at,
    }));
    
    return articles;
  } catch (error) {
    console.error('Error fetching Zenn articles:', error);
    return [];
  }
}

/**
 * RSSフィードから記事を取得する（代替手段）
 * Note: ブラウザ環境ではCORSの制約があるため、サーバーサイドでの利用を推奨
 */
export async function fetchZennRSS(): Promise<string> {
  const RSS_URL = `https://zenn.dev/${USERNAME}/feed`;
  
  try {
    const response = await fetch(RSS_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error('Error fetching Zenn RSS:', error);
    return '';
  }
}
