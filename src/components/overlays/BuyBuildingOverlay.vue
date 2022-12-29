<template>
  <Overlay>
    <h2 class="text-lg text-white font-bold mb-8">Nieuw object plaatsen</h2>

    <div class="grid gap-4 grid-cols-3 lg:grid-cols-4">
      <div
          v-for="building in buildings()"
          :class="{'opacity-40': progressStore.level < building.requiredLevel, 'cursor-pointer': progressStore.level >= building.requiredLevel}"
          class="bg-gray-500 border-2 border-gray-700 rounded p-4"
          @click="handleBuildingSelect(building)"
      >
        {{ building.name }}
      </div>
    </div>
  </Overlay>
</template>
<script>
import Overlay from "./Overlay.vue";
import {useBuildingsStore} from "@/stores/buildings";
import {useProgressStore} from "@/stores/progress";

export default {
  components: {Overlay},
  setup() {
    const buildingsStore = useBuildingsStore();
    const progressStore = useProgressStore();
    return {buildingsStore, progressStore};
  },
  methods: {
    handleBuildingSelect(building) {
      if (this.progressStore.level < building.requiredLevel) {
        console.log("Not the required level");
        return;
      }

      this.$emit('selectBuilding', building)
    },
    buildings() {
      return this.buildingsStore
          .availableBuildings
          .filter((b) => b.type === 'accommodation');
    }
  }
}
</script>
