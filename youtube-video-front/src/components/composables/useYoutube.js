import { reactive, toRefs } from 'vue';

export default function () {
    const data = reactive({
        newVideoUrl: "",
        arrayVideo: [],
        videos: [],
        mensajeModal: "",
    })

    const env = process.env;
    const API_GET = process.env.VUE_APP_API_GET;
    const API_ADD = process.env.VUE_APP_API_ADD;
    const API_DELETE = process.env.VUE_APP_API_DELETE;
    const API_GOOGLE_KEY = process.env.VUE_APP_API_GOOGLE_KEY;
    const API_GOOGLE_URL = process.env.VUE_APP_API_GOOGLE_URL;

    console.log(env)

    const GetAllVideos = async () => {
        const options = {
            method: 'GET', // Especificar el método HTTP que deseas utilizar
            headers: {
                "content-type": "text/plain; charset=utf-8",
            },
        }
        //const response = await fetch("https://opmj4tizn1.execute-api.us-east-1.amazonaws.com/GetAll", options);
        const response = await fetch(API_GET, options);
        const datos = await response.json();
        console.log(datos)

        data.videos = await datos;
    }

    const addVideo = async () => {
        var youtubeResult = await validarVideo(data.newVideoUrl);

        if (youtubeResult != null) {
            if (youtubeResult.id == "existe") {
                data.mensajeModal = "El video ya existe."
                data.newVideoUrl = "";
                openModal();
            } else {
                //utilizar url devuelta por el api de youtube 
                const videoResult = await fetch(youtubeResult.response.url);
                const videoResultJson = await videoResult.json();
                console.log(videoResultJson)

                if (videoResultJson.items.length > 0) {
                    var videoFinalData = videoResultJson.items[0];

                    var title = videoFinalData.snippet.title;
                    var channelTitle = videoFinalData.snippet.channelTitle;
                    var description = videoFinalData.snippet.description;
                    var thumbnailsUrl = videoFinalData.snippet.thumbnails.standard.url;

                    var videoFinalObject = {
                        title: title,
                        channelTitle: channelTitle,
                        description: description,
                        thumbnails: thumbnailsUrl,
                        url: data.newVideoUrl,
                        id_share: youtubeResult.id,
                    }

                    const options = {
                        method: 'POST',
                        headers: {
                            "content-type": "text/plain; charset=utf-8",
                        },
                        body: JSON.stringify(videoFinalObject)
                    }
                    await fetch(API_ADD, options);
                    data.mensajeModal = "¡Video guardado!"
                    openModal();

                    data.newVideoUrl = "";
                    GetAllVideos();
                } else {
                    data.mensajeModal = "El enlace no es valido"
                    openModal();
                    data.newVideoUrl = "";
                }
            }
        } else {
            data.mensajeModal = "El enlace no es valido"
            openModal();
            data.newVideoUrl = "";
        }
    }

    const deleteVideo = async (id) => {
        console.log(id)
        try {
            const options = {
                method: 'Delete', // Especificar el método HTTP que deseas utilizar
                headers: {
                    "content-type": "text/plain; charset=utf-8",
                },
                body: JSON.stringify({ "id_video": id })
            }
            const response = await fetch(API_DELETE, options);
            const datos = await response.json();
            data.mensajeModal = "¡Video eliminado!"
            openModal();
            GetAllVideos();
            console.log(datos)
            //TODO enviar peticion http y eliminar de la base de datos dynamos con lambda
        } catch (error) {
            data.mensajeModal = "Error al eliminar"
            openModal();
            GetAllVideos();
            console.log(error.message)
        }
    }
    /* Sirve para validad el video que desean guardar */
    const validarVideo = async (url) => {
        try {
            const id = ObtenerId(url);

            //TODO validar existencia

            const existe = data.videos.filter(video => video.id_share.S == id).length == 0 ? false : true;
            console.log(id)

            if (!existe) { /* si no existe, adelante */
                if (id.length > 0) {
                    const videoId = id;
                    const options = {
                        method: 'GET', // Especificar el método HTTP que deseas utilizar
                        headers: {
                            "content-type": "text/plain; charset=utf-8",
                        },
                    }
                    const response = await fetch(`${API_GOOGLE_URL}?id=${videoId}&key=${API_GOOGLE_KEY}&part=snippet`, options);
                    console.log(response)
                    return { response: response, id: id };
                } else {
                    return null;
                }
            } else {
                return { response: null, id: "existe" };
            }


        } catch (error) {
            return null;
        }
    }

    const ObtenerId = (url) => {
        var id = "";
        try {
            if (url.length > 30) { // https://www.youtube.com/watch?v=RQQSk3nLFZE&ab_channel=Deividcat
                id = url.split("=")[1].split("&")[0];
            } else if (url.length < 30) { //https://youtu.be/0EtgwIajVqs
                id = url.split("/")[3];
            } else {
                //url no valida
                id = null;
            }
            return id
        } catch (error) {
            return null;
        }
    }

    const openModal = () => {
        $("#modalMensaje").modal("show");
    }

    const closeModal = () => {
        $("#modalMensaje").modal("hide");
    }

    return { ...toRefs(data), addVideo, deleteVideo, GetAllVideos, openModal, closeModal }
}