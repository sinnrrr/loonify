FROM nginx

LABEL maintainer="Dmytro Soltusyuk <dimasoltusyuk@gmail.com>"

COPY nginx.conf /etc/nginx/nginx.conf

# RUN apk update \
#     && apk upgrade \
#     && apk add --no-cache bash \
# #    && adduser -D -H -u 1000 -s /bin/bash www-data
#     && adduser -D -H -u 1000 -s /bin/bash www-data -G www-data

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80 443