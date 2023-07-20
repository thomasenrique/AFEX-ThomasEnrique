<template>
    <div class="container-fluid">
        <header class="d-flex justify-content-center m" style="margin: 2em 0 2em 0;">
            <h1>Videos Favoritos - AFEX Dev Thomás Enrique Miño Pradel</h1>
        </header>
        <section class="container">
            <h4 for="videoUrl">Añadir nuevo video</h4>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Enlace</span>
                <input class="form-control" id="videoUrl" v-model="newVideoUrl" @keypress.enter="addVideo"
                    style="width: 15em;" />
                <button class="btn btn-success" @click="addVideo">Añadir</button>
            </div>
        </section>

        <section class="container-fluid">
            <div v-if="videos"
                style="display: flex;overflow-x: auto;padding: 1em 4em;flex-direction: row;flex-wrap: wrap;justify-content: center;align-items: flex-start;">
                <div v-for="(video, index) in videos" :key="video.id_video.S" style="margin: .5em; cursor: pointer;">
                    <img :src="video.thumbnails.S" style="width: 360px; height: 180px; object-fit: cover;"
                        @click="SeleccionarVideo(video)" data-bs-toggle="modal" data-bs-target="#exampleModal">

                </div>
            </div>
        </section>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">



                    <div class="modal-header">
                        <!-- <h5 class="modal-title" id="exampleModalLabel"> {{ videoSeleccionado.title.S }} </h5> -->
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">

                        <div class="row">
                            <div class="col">
                                <iframe width="560" height="315"
                                    :src="`https://www.youtube.com/embed/${videoSeleccionado.id_share.S}`"
                                    title="YouTube video player" frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen></iframe>
                            </div>
                            <div class="col">
                                <h4>{{ videoSeleccionado.title.S }}</h4>
                                <p style="max-height: 250px;  overflow-y: auto;">{{ videoSeleccionado.description.S }}</p>
                            </div>
                        </div>



                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            @click="cerrarModal">Cerrar</button>
                        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>



<script>
import { onMounted, ref } from 'vue'
import useYoutube from '@/components/composables/useYoutube'
export default {
    name: "YoutubeVideoSaver",
    setup() {
        const videoLimpio = {
            title: { S: "" },
            channelTitle: { S: "" },
            description: { S: "" },
            id_video: { S: "" },
            thumbnails: { S: "" },
            url: { S: "" },
            id_share: { S: "" }
        }
        const cerrarModal = () => {
            videoSeleccionado.value = videoLimpio;
        }
        const videoSeleccionado = ref(videoLimpio)
        const SeleccionarVideo = (video) => {
            const videoSelect = JSON.parse(JSON.stringify(video)); /* Se vel extraño el proceso, pero me estaba retornando la info dentro de un [[target]] y asi lo obtuve rapido, el tiempo es oro en estos momentos */
            console.log(videoSelect)
            videoSeleccionado.value = videoSelect;

        }
        onMounted(async () => {
            console.log("Mounted")
            await GetAllVideos();
        })
        const { newVideoUrl, videos, addVideo, deleteVideo, GetAllVideos } = useYoutube();
        return { cerrarModal, SeleccionarVideo, videoSeleccionado, newVideoUrl, videos, addVideo, deleteVideo, GetAllVideos }
    }
}
</script>