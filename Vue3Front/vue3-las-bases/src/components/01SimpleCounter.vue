<!-- 
    como usar computed property a traves del setup con composition API
 -->

<template>
    <h2>Contador simple</h2>
    <p>{{ counterComputed }}</p>
    <button @click="increment">Incrementar</button>
    <button @click="decrement">Decrementar</button>
</template>

<script>

import { ref, computed } from "vue";
export default {
    name: "SimpleCounter",
    setup() {
        const counter = ref(0)

        const counterComputed = computed(() => {
            return `El valor de counter es ${counter.value}`
        })

        const increment = () => {
            counter.value++;
        }

        const decrement = () => {
            counter.value--;
        }
 

        /* Retornar las constantes sean variables o funciones para ponerlas a disposición de la >template> */
        return { counter, counterComputed, increment, decrement }
    }
}

</script>