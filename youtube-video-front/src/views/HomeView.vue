<template>
  <div class="home">
    <YoutubeVideoSaver />
  </div>
</template>

<script>
// @ is an alias to /src
import YoutubeVideoSaver from '@/components/YoutubeVideoSaver.vue'

export default {
  name: 'HomeView',
  components: {
    YoutubeVideoSaver
  }
}
</script>
