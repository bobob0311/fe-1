const dateData = {
    year: null,
    month: null,

    listeners: new Set(),

    init() {
        const today = new Date();
        this.year = today.getFullYear();
        this.month = today.getMonth() + 1;
        this.notify();
    },

    subscribe(fn) {
        this.listeners.add(fn);
        return () => this.listeners.delete(fn);
    },

    notify() {
        this.listeners.forEach((fn) => fn(this));
    },

    changeMonth(offset) {
        this.month += offset;

        if (this.month > 12) {
            this.month = 1;
            this.year += 1;
        } else if (this.month < 1) {
            this.month = 12;
            this.year -= 1;
        }

        this.notify();
    },

    increaseMonth() {
        this.changeMonth(1);
    },

    decreaseMonth() {
        this.changeMonth(-1);
    },
};

export default dateData;
