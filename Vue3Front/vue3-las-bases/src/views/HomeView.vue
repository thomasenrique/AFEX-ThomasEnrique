<template>
  <SimpleFetch />
  <HR />

  <TodoList />
  <HR />

  <SimpleCounterCompositionApi />
  <HR />

  <WatchCounter />
  <HR />

  <ReactiveCounter />
  <HR />

  <!-- <hr /> me da error al dejar este hr: TODO: crear componente HR-->
  <SimpleCounter />
  <HR />
  <!-- BUG: Al resolver un bug, en la web el componente Hello World estaba repetido  -->

  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <HelloWorld />
  <HR />
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from '@/components/HelloWorld.vue' */
import HR from '@/components/HR.vue'
import HelloWorld from "@/components/00HelloWord.vue"
import SimpleCounter from '@/components/01SimpleCounter.vue'
import ReactiveCounter from '@/components/02ReactiveCounter.vue'
import WatchCounter from '@/components/03WatchCounter.vue'
import SimpleCounterCompositionApi from '@/components/04SimpleCounterCompositionApi.vue'
import TodoList from '@/components/05TodoList.vue'
import SimpleFetch from '@/components/06SimpleFetch.vue'

export default {
  name: 'HomeView',
  components: {
    HR,
    HelloWorld,
    SimpleCounter,
    ReactiveCounter,
    WatchCounter,
    SimpleCounterCompositionApi,
    TodoList,
    SimpleFetch
  }
}
</script>
