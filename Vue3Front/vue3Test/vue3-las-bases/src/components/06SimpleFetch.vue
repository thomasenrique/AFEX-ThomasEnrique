<template>
    <h2>Simple Fetch</h2>
    <ul v-if="users">
        <li v-for="(user, index) in users" :key="user.id_video.S">
            {{ index }} - {{ user.id_video.S }} <!-- - {{ user.descripcion.S || "" }} -->
        </li>
    </ul>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
    name: "SimpleFetch",
    setup() {
        const users = ref(null)
        onMounted(async () => {
            //const response = await fetch("https://jsonplaceholder.typicode.com/users");

            const options = {
                method: 'GET', // Especificar el método HTTP que deseas utilizar
                headers: {
                    "content-type": "text/plain; charset=utf-8",
                },
            }
            const response = await fetch("https://opmj4tizn1.execute-api.us-east-1.amazonaws.com/GetAll", options);
            /* const res = await response.json() */
            const datos = await response.json();
            console.log(datos)
            users.value = datos
        })

        return { users }
    }
}
</script>