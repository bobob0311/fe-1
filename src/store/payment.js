const payment = {
    data: ['현금', '신용카드'],

    listeners: {},

    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
    },

    notify(key) {
        this.listeners[key]?.forEach((cb) => cb());
    },

    addPayment(value) {
        this.data.push(value);
        this.notify('payment');
    },
    deletePayment(modalState) {
        this.data = this.data.filter((item) => item !== modalState.value);
        this.notify('payment');
        return this.data;
    },
};

export default payment;
