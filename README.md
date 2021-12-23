# SPA認証サンプル（LaravelとVue）

## セットアップ

- Laravelをインストール

```sh
docker-compose run --rm app composer install
```

- テーブルを作成

```sh
docker-compose run --rm app php artisan migrate
```

- Vueをインストール

```sh
cd ./frontend
npm install
```

## 起動

- コンテナを起動

```sh
docker-compose up
```

- devServerを起動

```sh
cd ./frontend
npm run serve
```

[localhost:3000](localhost:3000)で閲覧

メールは[localhost:8025](localhost:8025)で閲覧
