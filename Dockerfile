FROM php:fpm

RUN apt-get update && apt-get install -y \
  && apt-get install -y libzip-dev mariadb-client unzip \
  && docker-php-ext-install zip pdo_mysql \
  && rm -rf /var/lib/apt/lists/*

COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /app
