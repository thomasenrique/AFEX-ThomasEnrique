<template>
    <div class="container-fluid">
        <header class="d-flex justify-content-center m" style="margin: 2em 0 2em 0;">
            <h1>Albúm online - Thomás Enrique Miño Pradel</h1>
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
                        @click="SeleccionarVideo(video)" data-bs-toggle="modal" data-bs-target="#modalYoutube">
                        
                    <button type="button" class="btn-close" aria-label="Close" @click="abrirModalEliminar(video.id_video.S)"
                        style="position: relative; right: 28px; bottom: 71px; background-color: aliceblue;"></button>

                </div>
            </div>
        </section>

        <!-- Modal youtube-->
        <div class="modal fade" id="modalYoutube" tabindex="-1" aria-labelledby="modalYoutubeLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" @click="deleteVideo" data-bs-dismiss="modal"
                            aria-label="Close"></button>
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
                                <div class="form-floating">
                                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                                        style="height: 250px">
                                        {{ videoSeleccionado.description.S }}
                                    </textarea>
                                    <label for="floatingTextarea2">Descripción</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            @click="cerrarModal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal mensajes-->
        <div class="modal fade" id="modalMensaje" tabindex="-1" aria-labelledby="modalMensajeLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalMensajeLabel">Mensaje</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        {{ mensajeModal }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            @click="closeModal">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal eliminar-->
        <div class="modal fade" id="modalMensajeEliminar" tabindex="-1" aria-labelledby="modalMensajeEliminar"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalMensajeEliminar">Mensaje</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="cerrarModalEliminar"></button>
                    </div>
                    <div class="modal-body">
                        ¿Seguro que desea eliminar el video?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            @click="cerrarModalEliminar">Cancelar</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="deleteVideo(idEliminar)" 
                            >Aceptar</button>
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
        const idEliminar = ref("");
        const cerrarModal = () => {
            videoSeleccionado.value = videoLimpio;
        }
        const abrirModalEliminar = (id) => {
            $("#modalMensajeEliminar").modal("show");
            idEliminar.value = id;
        }
        const cerrarModalEliminar = () => {
            $("#modalMensajeEliminar").modal("hide");
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



        const { mensajeModal, newVideoUrl, videos, addVideo, deleteVideo, GetAllVideos, openModal, closeModal } = useYoutube();
        return { idEliminar, abrirModalEliminar, cerrarModalEliminar, mensajeModal, cerrarModal, SeleccionarVideo, videoSeleccionado, newVideoUrl, videos, addVideo, deleteVideo, GetAllVideos, openModal, closeModal }
    }
}
</script>