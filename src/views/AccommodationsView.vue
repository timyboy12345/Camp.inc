<template>
  <main class="mx-4 lg:mx-auto lg:max-w-4xl xl:max-w-6xl pt-20">
    <div class="grid gap-4 divide-y divide-gray-200">
      <Card title="Tenten">
        <div class="divide-y divide-y-200 -mx-4">
          <RouterLink :to="'/accommodations/' + tent.id" v-for="tent of tents" class="block px-4 py-2">
            {{ tent.name }}
          </RouterLink>
        </div>
      </Card>
    </div>
  </main>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import {useBuildingsStore} from "@/stores/buildings";
import Card from "@/components/Card.vue";

export default {
  components: {
    Card,
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
