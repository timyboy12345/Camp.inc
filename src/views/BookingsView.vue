<template>
  <main class="pt-20">
    <div class="max-w-6xl mx-auto divide-y divide-gray-200">
      <div v-for="tent of tents">
        {{ tent }}
      </div>
    </div>
  </main>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import {useBuildingsStore} from "@/stores/buildings";

export default {
  components: {
    LMap,
    LTileLayer,
  },
  setup() {
    const buildingsStore = useBuildingsStore();
    return { buildingsStore };
  },
  data() {
    return {
      zoom: 2,
    };
  },
  computed: {
    tents() {
      return this.buildingsStore.buildings;
    }
  }
};
</script>
