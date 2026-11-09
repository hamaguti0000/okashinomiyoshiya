# sweets-lp

長崎県諫早市の和洋菓子店「お菓子のみよしや」のランディングページです。商品紹介・お知らせ・店舗アクセス情報の掲載に加え、店舗スタッフが商品やお知らせを更新できる管理画面を備えています。

- **デモURL**: https://okashinomiyoshiya.com

## 担当範囲

個人開発。企画・設計・実装・インフラ構築（VPSへのDocker Composeデプロイ）・運用まですべて一人で担当しました。

## 主な機能

- 商品一覧・カテゴリ別一覧・商品詳細ページ
- お知らせ一覧・詳細ページ
- 店舗アクセス（地図・最寄りテレビ出演歴等の紹介）
- 店舗スタッフ向け管理画面（`/admin`）から商品・お知らせを直接更新可能

## 工夫した点

- 管理画面をCookieベースの簡易認証で保護しつつ、専用の認証基盤を持たない小規模サイトでも安全に運用できる構成にした
- 画像アップロードをローカルファイルシステム + Docker named volumeで完結させ、外部ストレージサービスへの依存・コストを排除
- `docker-compose.yml`（開発）/ `docker-compose.prod.yml`（本番）を分離し、`deploy.sh` 一本でVPSへのデプロイを完結
- Next.jsのメタデータAPI（`layout.tsx` 等）でOGP・sitemap用のBASE_URLを環境変数化し、開発・本番で切り替え可能に

## 技術スタック

- **言語 / フレームワーク**: TypeScript, [Next.js](https://nextjs.org/)（App Router）
- **ORM / DB**: [Prisma](https://www.prisma.io/) / PostgreSQL
- **スタイリング**: Tailwind CSS
- **ホスティング**: セルフホストVPS上でDocker Compose運用

## アーキテクチャ

- `frontend/` にNext.jsアプリ本体（商品・お知らせ・FAQ・アクセス等の公開ページと `/admin` 配下の管理画面）
- 管理画面はCookieベースの簡易認証（`ADMIN_PASSWORD` 環境変数）で保護
- 画像アップロードはローカルファイルシステム（`public/uploads/`）に保存し、本番ではDocker named volumeで永続化
- `docker-compose.yml`（ローカル開発用）と `docker-compose.prod.yml`（本番用）を用意。本番は `deploy.sh` で `git pull` → イメージビルド → コンテナ再起動を行う

## ローカルでの起動方法

Docker Composeを使う方法（推奨、PostgreSQLも含めて一括起動）:

```bash
docker compose up -d
```

`http://localhost:3000` で確認できます。

Node.jsを直接使う場合:

```bash
cd frontend
npm install
cp .env.example .env   # DATABASE_URL 等を編集
npm run prisma:migrate
npm run prisma:seed    # サンプル商品データを投入
npm run dev
```

その他のコマンド（`frontend/` 配下で実行）:

```bash
npm run build           # 本番ビルド
npm run lint             # ESLint
npm run prisma:studio    # Prisma Studio（DBの中身をGUIで確認）
```

## 環境変数

必要な環境変数は `frontend/.env.example`（ローカル開発用）・`.env.production.example`（本番用）を参照してください。値はすべてダミーです。
