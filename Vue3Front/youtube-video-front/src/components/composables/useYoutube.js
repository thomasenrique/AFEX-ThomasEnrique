import { reactive, toRefs } from 'vue';

export default function () {
    const data = reactive({
        newVideoUrl: "",
        arrayVideo: []
    })

    const addVideo = async () => {
        var youtubeResult = await validarVideo(data.newVideoUrl);
        if (youtubeResult != null) {

            //utilizar url devuelta por el api de youtube 
            const videoResult = await fetch(youtubeResult.url);
            const videoResultJson = await videoResult.json();

            if (videoResultJson.items.length > 0) {
                var videoFinalData = videoResultJson.items[0];

                var title = videoFinalData.snippet.title;
                var channelTitle = videoFinalData.snippet.channelTitle;
                var description = videoFinalData.snippet.description;
                var thumbnails = videoFinalData.snippet.thumbnails.standard;

                var videoFinalObject = {
                    title: title,
                    channelTitle: channelTitle,
                    description: description,
                    thumbnails: thumbnails,
                }

                console.log('videoFinalData', videoFinalData)
                console.log('videoFinalObject', videoFinalObject)
            }
        } else {
            alert("El enlace no es valido");
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
                return response;
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

    return { ...toRefs(data), addVideo, deleteVideo }
}