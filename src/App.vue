<!--<script setup lang="ts">-->
<!--// import { RouterLink, RouterView } from 'vue-router'-->
<!--// import HelloWorld from './components/HelloWorld.vue'-->
<!--</script>-->

<template>
  <header class="px-8 py-4 z-50 fixed w-full flex flex-row justify-between items-start">
    <div class="flex flex-col gap-y-2">
      <div class="text-xs text-brown-900 w-28 h-8 pt-1.5 text-center bg-no-repeat bg-contain"
           style="background-image: url('/buttonLong_beige.png')">
        Dag {{ progressStore.day }} <span class="text-brown-700">/</span> Uur {{ progressStore.time }}
      </div>
      <div class="text-xs text-brown-900 w-28 h-8 pt-1.5 text-center bg-no-repeat bg-contain"
           style="background-image: url('/buttonLong_beige.png')">
        Level {{ progressStore.level }} <span class="text-brown-700">/</span> {{ progressStore.xp }} XP
<!--        <span class="text-gray-400">/</span> {{ progressStore.requiredXP() }} XP for next level-->
      </div>
    </div>

    <nav class="flex flex-row gap-x-4">
      <RouterLink class="bg-no-repeat bg-contain text-center w-28 h-8 text-xs pt-1.5" style="background-image: url('/buttonLong_beige.png')" to="/">Home</RouterLink>
      <RouterLink class="bg-no-repeat bg-contain text-center w-28 h-8 text-xs pt-1.5" style="background-image: url('/buttonLong_beige.png')" to="/accommodations">Accommodaties</RouterLink>
      <RouterLink class="bg-no-repeat bg-contain text-center w-28 h-8 text-xs pt-1.5" style="background-image: url('/buttonLong_beige.png')" to="/bookings">Boekingen</RouterLink>
      <RouterLink class="bg-no-repeat bg-contain text-center w-28 h-8 text-xs pt-1.5" style="background-image: url('/buttonLong_beige.png')" to="/demo">Demo</RouterLink>
<!--      <RouterLink class="bg-brown-200 border border-brown-400 outline outline-brown-200 text-xs py-1.5 px-3 rounded" to="/demo">Demo</RouterLink>-->
      <!--      <RouterLink to="/about">About</RouterLink>-->
    </nav>
  </header>

  <RouterView/>
</template>

<script>
import {useProgressStore} from "@/stores/progress";

export default {
  setup() {
    const progressStore = useProgressStore();
    return {progressStore};
  }
}
</script>
