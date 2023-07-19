<template>
    <h2>Simple Counter Composition API</h2>
    <h3> {{ counter }}</h3>
    <button @click="increment">Incrementar</button>
    <button @click="decrement">Decrementar</button>
</template>

<script>
import useCounter from '@/components/composables/useCounter'
export default {
    name: "SimpleCounterCompositionApi",
    setup() {
        const { counter, increment, decrement } = useCounter()
        return { counter, increment, decrement }
        /* 
            Tres formas de llamar un composable
            const { counter, counterComputed, increment, decrement } = useCounter()
            const composable = useCounter()
            return useCounter()
        */

        /* la mejor forma es esta por que sabemos todo lo que tiene */
    }
}
</script>