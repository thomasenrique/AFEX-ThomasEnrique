import { ref, computed } from "vue";

export default function () {
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

    return { counter, counterComputed, increment, decrement }
}