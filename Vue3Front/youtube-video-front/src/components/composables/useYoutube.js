import { reactive, toRefs } from 'vue';

export default function () {
    const data = reactive({
        newVideoUrl: "",
        arrayVideo: [],
        videos: []
    })

    const GetAllVideos = async () => {
        const options = {
            method: 'GET', // Especificar el método HTTP que deseas utilizar
            headers: {
                "content-type": "text/plain; charset=utf-8",
            },
        }
        const response = await fetch("https://opmj4tizn1.execute-api.us-east-1.amazonaws.com/GetAll", options);
        const datos = await response.json();
        console.log(datos)

        data.videos = await datos;
    }

    const addVideo = async () => {
        var youtubeResult = await validarVideo(data.newVideoUrl);
        if (youtubeResult != null) {

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

                console.log('video Final Data', videoFinalData)
                console.log('video Final Object', videoFinalObject)

                const response = await fetch(`https://opmj4tizn1.execute-api.us-east-1.amazonaws.com/Add`, options);
                console.log(response)
                //TODO agregar mensaje de exito
                alert("Video guardado!");
                data.newVideoUrl = "";
                GetAllVideos();
            } else {
                alert("El enlace no es valido");
                data.newVideoUrl = "";
            }
        } else {
            alert("El enlace no es valido");
            data.newVideoUrl = "";
        }
    }

    const deleteVideo = (index) => {
        data.arrayVideo.splice(index, 1)

        //TODO enviar peticion http y eliminar de la base de datos dynamos con lambda
    }
    /* Sirve para validad el video que desean guardar */
    const validarVideo = async (url) => {
        try {
            const id = ObtenerId(url);
            console.log(id)
            if (id.length > 0) {
                const apiKey = 'AIzaSyCbOI5m-EgH27x0iihdn1cF-VdwfvKVJ1M';
                const videoId = id;
                const options = {
                    method: 'GET', // Especificar el método HTTP que deseas utilizar
                    headers: {
                        "content-type": "text/plain; charset=utf-8",
                    },
                }
                const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`, options);
                console.log(response)
                return { response: response, id: id };
            } else {
                return null;
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

    return { ...toRefs(data), addVideo, deleteVideo, GetAllVideos }
}