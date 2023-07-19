<template>
    <h2>Reactive Counter</h2>
    <h3>{{ counter }} </h3>
    <h3>{{ counterComputed }} </h3>
    <button @click="increment">Incrementar</button>
    <button @click="decrement">Decrementar</button>
</template>

<script>
import { reactive, ref, computed, toRefs } from 'vue'; /* Ojo al realizar el impor toRefs, es con "S" al final */
export default {
    name: "ReactiveCounter",
    setup() {
        /* Realizar este proceso de datos reactivos a toRef me ayuda a pasar mayor cantidad de datos a referencia de una forma mas facil */
        /* Datos reactivos sin necesidad de referencia */
        /* Evitamos tener que crear muchas referencias */
        const data = reactive({
            counter: 0,
            titulo: "strike",
            counterComputed: computed(() => {
                return `El valor de counter es ${data.counter}`
            })
        });

        const increment = () => {
            data.counter++;
        };

        const decrement = () => {
            data.counter--;
        };

        /* Transformar datos reactivos a referencia */
        return { ...toRefs(data), increment, decrement }
    }
}
</script>