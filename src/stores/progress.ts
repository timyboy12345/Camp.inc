import {defineStore} from 'pinia'

export const useProgressStore = defineStore('progress', {
    state: () => ({
        xp: 0,
        level: 0,
        day: 1,
        time: 0,
        timeInterval: null
    }),
    actions: {
        addXP(xp: number) {
            this.xp += xp;

            while (this.xp >= this.requiredXP()) {
                const xpToSubtract = this.requiredXP();
                this.xp -= xpToSubtract;
                this.level += 1;
            }
        },
        retractXP(xp: number) {
            this.xp -= xp;

            if (this.xp <= 0) {
                this.xp = 0;
            }
        },
        requiredXP(){
            return Math.round(Math.pow(this.level + 1, 1.5) * 10);
        },
        startTime() {
            // Don't res-start the interval if it is already running
            if (this.timeInterval) {
                return;
            }

            // @ts-ignore
            this.timeInterval = setInterval(() => {
                this.time += 1;

                if (this.time >= 25) {
                    this.time = 0;
                    this.day += 1;
                }
            }, 1000);
        },
        pauseTime() {
            // @ts-ignore
            clearInterval(this.timeInterval);
        }
    }
})
