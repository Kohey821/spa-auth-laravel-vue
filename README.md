# Laravel Vue Login

## セットアップ

- .env.defaultをコピーして.envを作成

```sh
cp .env.default .env
```

- appコンテナにアタッチ

```sh
docker-compose run app bash
```

- Laravelインストール

```sh
composer install
```

- DBテーブル作成

```sh
php artisan migrate
```

- appコンテナからデタッチしてコンテナをストップ

```sh
docker-compose down
```

- Vueをインストール

```sh
cd ./frontend
npm install
```

## 起動

- コンテナを起動

```sh
docker-compose up -d
```

- devServerを起動

```sh
cd ./frontend
npm run serve
```
