FROM php:fpm

RUN apt-get update && apt-get install -y \
  && apt-get install -y unzip libzip-dev mariadb-client \
  && docker-php-ext-install zip pdo_mysql \
  && rm -rf /var/lib/apt/lists/*

COPY --from=composer /usr/bin/composer /usr/bin/composer

COPY ./mhsendmail_linux_amd64 /usr/local/bin/mhsendmail

COPY ./sendmail.ini $PHP_INI_DIR/conf.d/

WORKDIR /app
