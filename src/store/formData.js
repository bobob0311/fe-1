const formData = {
    date: null,
    amount: '',
    description: '',
    payment: null,
    isPaymentOpen: false,
    isCategoryOpen: false,
    category: null,
    sign: false,
    isValid: false,
    isEdit: false,
    dailyId: null,
    modal: null,
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
        this.description = '';
        this.payment = null;
        this.isPaymentOpen = false;
        this.category = null;
        this.isCategoryOpen = false;
        this.sign = false;
        this.isEdit = false;
        this.dailyId = null;
        this.modal = null;
        this.updateValidity();
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
        this.updateValidity();
        this.notifyAll();
    },

    setSign(value) {
        this.sign = value;
        this.notify('amount');
    },

    setDate(dateValue) {
        this.date = dateValue;
        this.updateValidity();
        this.notify('date');
    },
    setAmount(amountValue) {
        this.amount = amountValue;
        this.updateValidity();
        this.notify('amount');
    },
    setDescription(descriptionValue) {
        this.description = descriptionValue;
        this.updateValidity();
        this.notify('description');
    },
    setPayment(paymentValue) {
        this.payment = paymentValue;
        this.updateValidity();
        this.notify('payment');
    },
    setCategory(categoryValue) {
        this.category = categoryValue;
        this.updateValidity();
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

    setIsPaymentOpen(value) {
        this.isPaymentOpen = value;
        this.notify('payment');
    },

    setIsCategoryOpen(value) {
        this.isCategoryOpen = value;
        this.notify('category');
    },

    setModal(modalState) {
        this.modal = modalState;
        this.notify('modal');
    },

    updateValidity() {
        const next = !!(
            this.date &&
            this.amount &&
            this.description &&
            this.category
        );

        if (this.isValid !== next) {
            this.isValid = next;
            this.notify('validity');
        }
    },
};

export default formData;
