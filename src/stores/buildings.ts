import {defineStore} from 'pinia'

export const useBuildingsStore = defineStore('buildings', {
    state: () => ({
        allBuildings: [],
        plots: [
            {
                "location": [360, -504],
                "id": "plot-1"
            },
            {
                "location": [412, -50],
                "id": "plot-2"
            },
            {
                "location": [144, -20],
                "id": "plot-3"
            },
            {
                "location": [-94, -354],
                "id": "plot-4"
            },
            {
                "location": [100, 550],
                "id": "plot-5"
            },
            {
                "location": [20, 300],
                "id": "plot-6"
            },
            {
                "location": [-450, 220],
                "id": "plot-7"
            },
            {
                "location": [-532, 596],
                "id": "plot-8"
            }
        ],
        availableBuildings: [
            {
                type: 'accommodation',
                name: '4-person Tent',
                image: 'buildings/tent.png',
                requiredLevel: 0,
                xp: 10
            },
            {
                type: 'accommodation',
                name: '6-person tent',
                image: 'buildings/bungalow.png',
                requiredLevel: 1,
                xp: 15
            },
            {
                type: 'facility',
                name: 'Supermarket',
                image: 'buildings/tent.png',
                requiredLevel: 0,
                xp: 20
            }
        ]
    }),
    getters: {
        buildings: (state) => state.allBuildings.map((building: any) => {
            return {
                ...building,
                plot: state.plots.find((p) => p.id === building.plot_id)
            }
        }),
        emptyPlots: (state) => {
            return state.plots.filter((plot) => {
                return state.allBuildings.filter((building: any) => building.plot_id === plot.id).length === 0;
            })
        }
    },
    actions: {
        addBuilding(building: any) {
            // @ts-ignore
            this.allBuildings.push(building);
        }
    }
})
