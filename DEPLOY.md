# Cloudflare Workers デプロイガイド

このプロジェクトはCloudflare Workersを使用してZenn APIのプロキシと静的アセットの配信を行います。

## � Workers 使用料の最適化

このプロジェクトは **`_routes.json`** を使用して、Workers の実行回数を最小限に抑えています。

### 仕組み

- **`/api/zenn*`**: Workers で処理（APIプロキシ）
- **その他すべて**: Cloudflare CDN から直接配信（Workers を実行しない）

これにより、画像・CSS・JSなどの静的ファイルはWorkers の実行回数にカウントされず、**無料枠を効率的に利用**できます。

詳細: `public/_routes.json` を参照

## �📦 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Cloudflareにログイン

```bash
npx wrangler login
```

## 🚀 デプロイ

### ビルド & デプロイ

```bash
npm run deploy
```

または個別に実行：

```bash
# ビルド
npm run build

# デプロイ
npx wrangler deploy
```

## 🛠️ ローカル開発

### Vite開発サーバー（推奨）

```bash
npm run dev
```

- ViteのHMR（Hot Module Replacement）が使用可能
- `http://localhost:5173` でアクセス
- `/api/zenn` はViteプロキシ経由でZenn APIに転送されます

### Cloudflare Workers ローカル環境

```bash
npm run cf:dev
```

- 本番環境と同じWorkers環境でテスト
- ビルドされた静的ファイルとWorkers APIが動作

## 📁 プロジェクト構成

```
info.takos.jp/
├── worker/
│   ├── index.ts          # Cloudflare Workers エントリーポイント
│   └── tsconfig.json     # Workers用TypeScript設定
├── src/
│   ├── api/
│   │   └── zenn.ts       # Zenn API呼び出し
│   └── ...
├── public/
│   └── _routes.json      # Workers ルーティング設定（重要!）
├── dist/                 # ビルド出力（Assetsとして配信）
│   └── _routes.json      # ビルド時にpublicからコピーされる
├── wrangler.toml         # Cloudflare Workers設定
└── vite.config.ts        # Vite設定
```

### `_routes.json` について

このファイルは Workers の実行を特定のパスに限定します:

```json
{
  "version": 1,
  "include": ["/api/zenn*"],  // このパスのみ Workers を実行
  "exclude": ["/*"]            // それ以外は直接 CDN 配信
}
```

**重要**: このファイルは `public/` フォルダに配置し、ビルド時に `dist/` にコピーされます。

## 🌐 API エンドポイント

### `/api/zenn`

Zenn記事APIのプロキシ

**パラメータ:**
- `username`: Zennユーザー名（デフォルト: takoserver）
- `order`: 並び順 `latest` または `liked`（デフォルト: latest）
- `page`: ページ番号（デフォルト: 1）

**例:**
```
GET /api/zenn?username=takoserver&order=latest&page=1
```

**レスポンス:**
```json
{
  "articles": [
    {
      "id": 123,
      "title": "記事タイトル",
      "emoji": "🐙",
      "liked_count": 42,
      "published_at": "2025-01-01T00:00:00.000Z",
      ...
    }
  ]
}
```

## ⚙️ 環境変数

`wrangler.toml` で設定：

```toml
[vars]
ZENN_USERNAME = "takoserver"
```

## 🔧 トラブルシューティング

### CORS エラーが発生する場合

Workers APIが正しく設定されているか確認してください：
- 開発環境: Viteプロキシが `/api/zenn` を処理
- 本番環境: Workers APIが `/api/zenn` を処理

### ビルドエラーが発生する場合

```bash
# キャッシュをクリア
rm -rf node_modules dist .wrangler
npm install
npm run build
```

## 📝 カスタマイズ

### Zennユーザー名を変更

`wrangler.toml`:
```toml
[vars]
ZENN_USERNAME = "your-username"
```

### キャッシュ時間の変更

`worker/index.ts`:
```typescript
'Cache-Control': 'public, max-age=300', // 5分 → 変更
```

## 📚 参考リンク

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Zenn API](https://zenn.dev/api/articles)
