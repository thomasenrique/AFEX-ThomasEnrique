<template>
    <div class="container-fluid">
        <header class="d-flex justify-content-center m titleWeb">
            <h1>Albúm online - Thomás Enrique Miño Pradel</h1>
        </header>
        <section class="container">
            <h4 for="videoUrl">Añadir nuevo video</h4>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Enlace</span>
                <input class="form-control w15" id="videoUrl" placeholder="Link de youtube" v-model="newVideoUrl"
                    @keypress.enter="addVideo" />
                <button class="btn btn-success" @click="addVideo">Añadir</button>
            </div>
        </section>

        <section class="container-fluid">
            <div v-if="videos" class="video">
                <div v-for="(video, index) in videos" :key="video.id_video.S" class="let"
                    style="margin: .5em; cursor: pointer;">

                    <img :src="video.thumbnails.S" class="imagen" @click="SeleccionarVideo(video)" data-bs-toggle="modal"
                        data-bs-target="#modalYoutube">

                    <button type="button" class="btn-close btnCerrar" aria-label="Close"
                        @click="abrirModalEliminar(video.id_video.S)"></button>

                    <p class="title" @click="SeleccionarVideo(video)" data-bs-toggle="modal" data-bs-target="#modalYoutube">
                        {{ video.title.S.toLowerCase() }}</p>

                </div>
            </div>
        </section>

        <!-- Modal youtube-->
        <div class="modal fade" id="modalYoutube" tabindex="-1" aria-labelledby="modalYoutubeLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <!-- <button type="button" class="btn-close" @click="cerrarModal" data-bs-dismiss="modal"
                            aria-label="Close"></button> -->
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
                                    <textarea class="form-control h250 textAreaDescripcion"  placeholder="Sin descripción."
                                        readonly id="floatingTextarea2">{{ videoSeleccionado.description.S }}</textarea>
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
                            @click="deleteVideo(idEliminar)">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import { onMounted, ref } from 'vue'
import useYoutube from '@/components/composables/useYoutube'
import '@/components/style.css'
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