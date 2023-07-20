<template>
    <div class="container-fluid">
        <header class="d-flex justify-content-center m" style="margin: 2em 0 2em 0;">
            <h1>Videos Favoritos - AFEX Dev Thomás Enrique Miño Pradel</h1>
        </header>
        <section class="container">
            <h2 for="videoUrl">Añadir nuevo video</h2> <br />
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Enlace</span>
                <input class="form-control" id="videoUrl" v-model="newVideoUrl" @keypress.enter="addVideo"
                    style="width: 15em;" />
                <button class="btn btn-success" @click="addVideo">Añadir</button>
            </div>
        </section>


       <!--  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style="cursor: pointer;">
            Launch demo modal
        </button> -->



        <section class="container-fluid">
            <div v-if="videos"
                style="display: flex;overflow-x: auto;padding: 1em 4em;flex-direction: row;flex-wrap: wrap;justify-content: center;align-items: flex-start;">
                <div v-for="(video, index) in videos" :key="video.id_video.S" style="margin: .5em; cursor: pointer;" >
                    <img :src="video.thumbnails.S" style="width: 360px; height: 180px; object-fit: cover;" data-bs-toggle="modal"  data-bs-target="#exampleModal" >
                </div>
            </div>
        </section>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>



<script>
import { onMounted } from 'vue'
import useYoutube from '@/components/composables/useYoutube'
export default {
    name: "YoutubeVideoSaver",
    setup() {
        onMounted(async () => {
            console.log("Mounted")
            await GetAllVideos();
        })
        const { newVideoUrl, videos, addVideo, deleteVideo, GetAllVideos } = useYoutube();
        return { newVideoUrl, videos, addVideo, deleteVideo, GetAllVideos }
    }
}
</script>