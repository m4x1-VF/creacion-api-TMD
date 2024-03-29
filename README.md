<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# API REST - The Movie Database

## Descripción

Crear un servicio REST que:

- Muestre información sobre una película indicando su título
- Muestre una lista de películas similares

Para esto, consumir la API de The Movie Database (TMD) (necesario registrarse):
https://developers.themoviedb.org/3/getting-started/introduction. Hay que registrar un usuario en la API de The Movie Database y obtener un API Key para poder consumir la API. Dicha API Key debe ser agregada en el archivo .env.example y renombrado a .env

La información a devolver es la siguiente:

- Título
- Título original
- Puntuación media
- Fecha de estreno
- Sinopsis / Descripción
- Lista (máximo 5) de películas de temática similar. NOTA: tendrás que utilizar otra operación para recuperarlas. Mostrarla en este formato, por ejemplo:
  - Título película 1 (1969), Título película 2 (1998)
    Título de película y entre paréntesis el año de estreno.

\*\* Si para una búsqueda por título la API de TMD devuelve más de un resultado, devolver los resultados sobre el primero de ellos.

## Instalación

```bash
$ yarn install
```

## Levantar el servidor

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Url de la API

- http://localhost:3000/movie

## Contacto

- Autor - [Maximiliano Vilariño](https://www.linkedin.com/in/maxi-vilarino/)
