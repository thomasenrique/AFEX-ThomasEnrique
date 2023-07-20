# AFEX-ThomasEnrique
Prueba para postulación AFEX de Thomas Enrique Miño Pradel

## Authors

- [@thomasenrique](https://www.github.com/thomasenrique)



## Enlace

- [Demo online](http://lab.thomasenrique.cl/)
# Afex prueba técnica

Requisitos

| Parameter |  Description                       |   Estado   |
| :-------- |  :-------------------------------- | :--------  |
| `Vue 3 con composition API`   |  `Utilizando la versión 3 con Composition API`   |  ✔  |
| `Crear un backend en Node.js`   |  `Utilizando Lambda y el código en NodeJs`   |  ✔  |
| `Usar la nube de AWS para el backend`   |  `Lambda es un servicio de AWS`   |  ✔  |
| `Base de datos`   |  `El sistema utiliza la base de datos DynamoDB`   |  ✔  |
| `Usar la API de YouTube`   |  `Actualmente en uso con su porpio token`   |  ✔  |
| `Publicar tu código en Github`   |  `Presente!`   |  ✔  |
| `Un README claro que contenga screenshots`   |  `Las screenshots estan mas abajo`   |  ✔  |
| `Una demo funcionando en línea`   |  `Demo funcional: http://lab.thomasenrique.cl/`   |  ✔  |

Criterios de evaluación

| Parameter |  Description                       |   Estado   |
| :-------- |  :-------------------------------- | :--------  |
| `Seguir cuidadosamente el Figma`   |  `Diseño y estructura badados en Figma y mi aporte con el tema oscuro`   |  ✔  |
| `Compatibilidad con enlaces`   |  `Capaz de procesar enlaces completos y enlaces cortos de YouTube`   |  ✔  |
| `Casos de uso con el enlace`   |  `Cuenta con mensajes de: Agregado, Eliminado, Video repetido, Enlace invalido.`   |  ✔  |
| `Componentes (separación de responsabilidades)`   |  `Se separa la logica relacionada al API en el archivo useYoutube.js`   |  ✔  |

## Screenshots

Agregar video
![App Screenshot](https://i.imgur.com/PspymyQ.png)

Video agregado
![App Screenshot](https://i.imgur.com/NLhAFE4.png)

Ver video
![App Screenshot](https://i.imgur.com/VlQ6rE5.png)

Confirmar eliminar video
![App Screenshot](https://i.imgur.com/dNkkUTt.png)

Video eliminado
![App Screenshot](https://i.imgur.com/UrTBFNv.png)



## API Reference

#### Get all items

```http
  GET /GetAll
``` 

#### Add item

```http
  POST /Add
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Titulo del video |
| `channelTitle`      | `string` | **Required**. Nombre del canal de YouTube |
| `description`      | `string` | **Required**. Descripción del video |
| `thumbnails`      | `string` | **Required**. Url de la miniatura del video |
| `url`      | `string` | **Required**. url del video a YouTube |
| `id_share`      | `string` | **Required**. Id del video desde YouTube |

 
#### Delete item

```http
  DELETE /Delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_video`      | `string` | **Required**. Id de la base de datos DynamoBD tabla: video_info |

## Related

Here are some related projects

[Awesome README](https://github.com/matiassingers/awesome-readme)

