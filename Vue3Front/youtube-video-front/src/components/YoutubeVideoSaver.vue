<template>
    <h2>Videos Favoritos</h2>
    <h3></h3>
    <section>
        <label for="videoUrl">Añadir nuevo video</label> <br />
        <input id="videoUrl" v-model="newVideoUrl" @keypress.enter="addVideo" />
    </section>

    <section>
        <ul v-if="videos">
            <li v-for="(video, index) in videos" :key="video.id_video.S">
                {{ index }} - {{ video.id_video.S }} - {{ video.url.S }} <!-- - {{ user.descripcion.S || "" }} -->
            </li>
        </ul>
    </section>
</template>

<script>
import { reactive, toRefs, ref, onMounted, computed } from 'vue'
import useYoutube from '@/components/composables/useYoutube'
export default {
    name: "YoutubeVideoSaver",
    setup() {

        const videos = ref([])

        

        

        onMounted(async () => {
            const options = {
                method: 'GET', // Especificar el método HTTP que deseas utilizar
                headers: {
                    "content-type": "text/plain; charset=utf-8",
                },
            }
            const response = await fetch("https://opmj4tizn1.execute-api.us-east-1.amazonaws.com/GetAll", options);
            const datos = await response.json();
            console.log(datos)

            datos.forEach(async video => {
                /* const res = await validarVideo(video.url.S); */
                console.log(video)
            });


            videos.value = datos
        })
        const { newVideoUrl, arrayVideo, addVideo, deleteVideo } = useYoutube();
        return { videos, newVideoUrl, arrayVideo, addVideo, deleteVideo }
    }
}
</script>