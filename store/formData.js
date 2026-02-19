const formData = {
    date: null,
    amount: null,
    description: null,
    payment: null,
    category: null,
    sign: false,
    isValid: false,
    isEdit: false,
    dailyId: null,
    listeners: {},

    subscribe(key, listener) {
        if (!this.listeners[key]) this.listeners[key] = new Set();
        this.listeners[key].add(listener);
        return () => this.listeners[key].delete(listener);
    },

    notify(key) {
        if (this.listeners[key]) {
            this.listeners[key].forEach((fn) => fn(this[key], this));
        }
    },

    notifyAll() {
        Object.keys(this.listeners).forEach((key) => this.notify(key));
    },

    init() {
        this.date = new Date().toISOString().split('T')[0];
        this.amount = '';
        this.description = null;
        this.payment = null;
        this.category = null;
        this.sign = false;
        this.checkAndNotify();
        this.isEdit = false;
        this.dailyId = null;
        this.notifyAll();
    },

    isValidListeners: new Set(),

    setFormData(date, formData) {
        const { amount, description, payment, category, sign } = formData;
        this.date = date;
        this.amount = amount;
        this.description = description;
        this.payment = payment;
        this.category = category;
        this.sign = sign;
        this.notifyAll();
    },

    setSign(value) {
        this.sign = value;
        this.notify('amount');
    },

    setDate(dateValue) {
        this.date = dateValue;
        this.checkAndNotify();
        this.notify('date');
    },
    setAmount(amountValue) {
        this.amount = amountValue;
        this.checkAndNotify();
        this.notify('amount');
    },
    setDescription(descriptionValue) {
        this.description = descriptionValue;
        this.checkAndNotify();
        this.notify('description');
    },
    setPayment(paymentValue) {
        this.payment = paymentValue;
        this.checkAndNotify();
        this.notify('payment');
    },
    setCategory(categoryValue) {
        this.category = categoryValue;
        this.checkAndNotify();
        this.notify('category');
    },
    setEdit(editValue) {
        this.isEdit = editValue;
        this.notify('isEdit');
    },
    setDailyId(idValue) {
        this.dailyId = idValue;
        this.notify('dailyId');
    },

    checkValid() {
        this.isValid =
            this.date && this.amount && this.description && this.category;
    },

    subscribeIsValid(listener) {
        this.isValidListeners.add(listener);
        return () => this.isValidListeners.delete(listener);
    },

    checkAndNotify() {
        const prev = this.isValid;
        this.isValid = !!(
            this.date &&
            this.amount &&
            this.description &&
            this.category
        );
        if (prev != this.isValid)
            this.isValidListeners.forEach((fn) => fn(this.isValid, this));
    },
};

export default formData;
