import { defineStore } from "pinia";
import {computed, ref} from "vue";

export const useCounterStore = defineStore('counter',() => {
    // using Setup Stores
    const count= ref(0) // state

    // getter
    const double = computed((state) => { state.count * 2})

    // action
    function increment() {
        count.value++
    }

    return { count, double , increment }
})