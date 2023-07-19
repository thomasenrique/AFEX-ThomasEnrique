<template>
    <h2>Hola Mundo</h2>
    <p> {{ message }} </p>
    <label for="message">Mensaje</label> <br />
    <!-- v-model comunica la visca con la logica / Data Binding-->
    <input id="message" v-model="message" />
</template>

<script>
import { ref } from "vue";

export default {

    name: "HelloWord",
    setup() {
        const message = ref("Hello World")
        /* 
            En el curso utiliza "ref(value: "Hello World")" pero sin el "value:" me funciona a mi 
            Resuelto: El problema no era de codigo sino del editor de codigo que usal el instructor, agrega texto representando la propiedad
        */ 

        return { message }
    }
}

</script>