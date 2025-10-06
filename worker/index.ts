/**
 * Cloudflare Workers エントリーポイント
 * - /api/zenn: Zenn APIのプロキシ(Workerで処理)
 * - その他: 静的アセット(_routes.jsonでバイパス、Workerを通さない)
 */

export interface Env {
  ASSETS: Fetcher;
  ZENN_USERNAME?: string;
}

const ZENN_API_BASE = 'https://zenn.dev/api/articles';
const DEFAULT_USERNAME = 'takoserver';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Zenn API プロキシのみWorkerで処理
    // その他の静的ファイルは_routes.jsonでバイパスされる
    if (url.pathname.startsWith('/api/zenn')) {
      // CORS headers
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      };

      // Preflight request
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: corsHeaders,
        });
      }

      try {
        const username = env.ZENN_USERNAME || DEFAULT_USERNAME;
        const order = url.searchParams.get('order') || 'latest';
        const page = url.searchParams.get('page') || '1';

        const zennUrl = `${ZENN_API_BASE}?username=${username}&order=${order}&page=${page}`;
        
        const response = await fetch(zennUrl, {
          headers: {
            'User-Agent': 'info.takos.jp',
          },
        });

        if (!response.ok) {
          return new Response(JSON.stringify({ error: 'Failed to fetch from Zenn' }), {
            status: response.status,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          });
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=300', // 5分キャッシュ
            ...corsHeaders,
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({ 
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'Unknown error'
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }
    }

    // それ以外のリクエストは静的アセットとして配信
    // 注: _routes.jsonにより、通常このコードは実行されない(直接CDN配信される)
    return env.ASSETS.fetch(request);
  },
};
