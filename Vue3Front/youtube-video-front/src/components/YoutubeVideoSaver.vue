<template>
    <h2>Videos Favoritos</h2>
    <h3></h3>
    <section>
        <label for="videoUrl">Añadir nuevo video</label> <br />
        <input id="videoUrl" v-model="newVideoUrl" @keypress.enter="addVideo" />
    </section>

    <section>
        <div v-if="videos" style="display: flex;overflow-x: auto;padding: 1em 4em;flex-direction: row;flex-wrap: wrap;justify-content: center;align-items: flex-start;">
            <div v-for="(video, index) in videos" :key="video.id_video.S" style="margin: .5em;">
                <img :src="video.thumbnails.S" style="width: 360px; height: 180px; object-fit: cover;">
            </div>
        </div>
    </section>

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