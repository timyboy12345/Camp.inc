<template>
  <div>

    <div class="w-screen h-screen">
      <l-map
          :use-global-leaflet="false"
          ref="map"
          :bounds="[[-1500, -1500], [1500, 1500]]"
          :crs="crs"
          v-model:zoom="zoom"
          :center="[0, 0]"
          class="bg-grass z-10"
          :options="{zoomControl: false}"
          :min-zoom="-2"
          :max-zoom="1"
          @click="handleClick"
      >
        <l-rectangle :lat-lngs="[[-700, -700], [700, 700]]" color="white" :opacity="0.2" :weight="2"></l-rectangle>
        <l-rectangle v-for="collision in collisions" :lat-lngs="collision" color="red" :weight="2"></l-rectangle>
        <l-control-zoom position="bottomleft"></l-control-zoom>
        <l-image-overlay :url="'/map.png'" :bounds="[[-1500, -1500], [1500, 1500]]"></l-image-overlay>

        <l-image-overlay
            v-for="plot in buildingsStore.emptyPlots" :url="'/buildings/plot.png'"
            :bounds="[[plot.location[0] - tentSize / 2, plot.location[1] - tentSize / 2], [plot.location[0] + tentSize / 2, plot.location[1] + tentSize / 2]]"
        ></l-image-overlay>

        <l-image-overlay
            v-for="tent in buildingsStore.buildings" :url="'/' + tent.building.image"
            :bounds="[[tent.plot.location[0] - tentSize / 2, tent.plot.location[1] - tentSize / 2], [tent.plot.location[0] + tentSize / 2, tent.plot.location[1] + tentSize / 2]]"
        ></l-image-overlay>
      </l-map>
    </div>

    <div class="absolute flex flex-row gap-x-4 right-4 bottom-4 z-50">
      <div @click="building = 'accommodation'"
           class="shadow p-2 hover:shadow transition duration-100 cursor-pointer"
           style="background-image: url('/panel_beige.png'); background-size: cover;"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"
             class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
        </svg>
      </div>
      <div @click="building = 'facility'"
           class="shadow p-2 hover:shadow transition duration-100 cursor-pointer"
           style="background-image: url('/panel_beige.png'); background-size: cover;"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"
             class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"/>
        </svg>
      </div>
    </div>

    <BuyBuildingOverlay
        v-if="building && !buildingToBuild"
        @close="building = null"
        @selectBuilding="selectBuildingToBuild"
    ></BuyBuildingOverlay>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import {LControlZoom, LImageOverlay, LMap, LMarker, LRectangle, LTileLayer} from "@vue-leaflet/vue-leaflet";
import {CRS} from "leaflet";
import {useBuildingsStore} from "@/stores/buildings";
import BuyBuildingOverlay from "@/components/overlays/BuyBuildingOverlay.vue";
import {useProgressStore} from "@/stores/progress";

export default {
  components: {
    BuyBuildingOverlay,
    LMap,
    LTileLayer,
    LMarker,
    LControlZoom,
    LRectangle,
    LImageOverlay
  },
  setup() {
    const buildingsStore = useBuildingsStore();
    const progressStore = useProgressStore();

    return {buildingsStore, progressStore};
  },
  created() {
    const id = Math.round(Math.random() * 1000);
    this.buildingsStore.addBuilding({
      id: id,
      name: id,
      building: this.buildingsStore.availableBuildings[0],
      plot_id: 'plot-1'
    });

    this.progressStore.addXP(100);

    this.progressStore.startTime();
  },
  data() {
    return {
      zoom: -1,
      building: null,
      selectedBuilding: null,
      buildingToBuild: null,
      crs: CRS.Simple,
      collisions: [],
      tentSize: 256,
      plotss: []
    };
  },
  methods: {
    handleClick: function (event) {
      if (!event.latlng) {
        return;
      }

      this.plotss.push({
        location: [
          event.latlng.lat,
          event.latlng.lng
        ],
        id: 'plot-' + this.plotss.length + 1
      })

      let collidesWith = null;
      this.buildingsStore.buildings.forEach((tent) => {
        if (event.latlng.lat >= tent.plot.location[0] - this.tentSize && event.latlng.lat <= tent.plot.location[0] + this.tentSize) {
          if (event.latlng.lng >= tent.plot.location[1] - this.tentSize && event.latlng.lng <= tent.plot.location[1] + this.tentSize) {
            collidesWith = tent;
          }
        }
      })

      if (collidesWith) {
        const bounds = [[collidesWith.plot.location[0] - this.tentSize / 2, collidesWith.plot.location[1] - this.tentSize / 2], [collidesWith.plot.location[0] + this.tentSize / 2, collidesWith.plot.location[1] + this.tentSize / 2]];
        this.collisions.push(bounds);

        setTimeout(() => {
          this.collisions.shift();
        }, 1000);

        this.selectedBuilding = collidesWith.id;
        return;
      }

      if (this.buildingToBuild && this.buildingToBuild.type === 'accommodation') {
        const id = Math.round(Math.random() * 1000);

        // TODO: Add plot ID
        this.buildingsStore.addBuilding({
          id: id,
          name: id,
          building: this.buildingToBuild,
          location: [event.latlng.lat, event.latlng.lng]
        });

        this.progressStore.addXP(this.buildingToBuild.xp);
      }

      this.building = null;
      this.buildingToBuild = null;
    },
    selectBuildingToBuild(building) {
      this.buildingToBuild = building;
    }
  }
};
</script>
