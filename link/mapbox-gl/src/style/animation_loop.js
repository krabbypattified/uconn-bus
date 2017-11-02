// @flow

class AnimationLoop {
    n: number;
    times: Array<{ id: number, time: number }>;

    constructor() {
        this.n = 0;
        this.times = [];
    }

    // Are all animations done?
    stopped() {
        this.times = this.times.filter((t) => {
            return t.time >= (new Date()).getTime();
        });
        return !this.times.length;
    }

    // Add a new animation that will run t milliseconds
    // Returns an id that can be used to cancel it layer
    set(t: number) {
        this.times.push({ id: this.n, time: t + (new Date()).getTime() });
        return this.n++;
    }

    // Cancel an animation
    cancel(n: number) {
        this.times = this.times.filter((t) => {
            return t.id !== n;
        });
    }
}

module.exports = AnimationLoop;
