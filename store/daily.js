export const dailyData = {
    data: [],
    filteredIncome: false,
    filteredExpense: false,
    totalIncome: 0,
    totalExpense: 0,
    totalCount: 0,
    listeners: new Set(),

    async init() {
        await this.fetch();
        this.notify();
    },
    async fetch() {
        try {
            const response = await fetch('/data/DailyInfo.json');
            if (!response.ok)
                throw new Error('수입/지출 내역 데이터 로딩 실패');
            this.data = await response.json();
        } catch (error) {
            console.error('데이터 로딩 중 오류 발생:', error?.message ?? error);
        }
    },

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    },

    notify() {
        this.listeners.forEach((fn) => fn(this));
    },

    uploadDailyData(data) {
        const { amount, category, date, description, payment, sign } = data;
        const newItems = {
            id: crypto.randomUUID(),
            category,
            description,
            payment,
            amount: sign ? Math.abs(amount) : Math.abs(amount) * -1,
            createAt: new Date().toISOString(),
        };

        const targetDateObj = this.data.find((item) => item.date === date);
        if (targetDateObj) {
            targetDateObj.items.push(newItems);
        } else {
            const newGroup = { date, items: [newItems] };
            const index = this.data.findIndex(
                (item) => new Date(date) < new Date(item.date),
            );
            if (index === -1) {
                this.data.push(newGroup);
            } else {
                this.data.splice(index, 0, newGroup);
            }
        }
        this.notify();
    },

    changeDailyData(data) {
        const { amount, category, date, description, payment, sign } = data;
        const newItems = {
            id: crypto.randomUUID(),
            category,
            description,
            payment,
            amount: sign ? Math.abs(amount) : Math.abs(amount) * -1,
            createAt: new Date().toISOString(),
        };

        const targetDateObj = this.data.find((item) => item.date === date);
        const index = targetDateObj.items.findIndex(
            (item) => item.id === data.dailyId,
        );
        if (index !== -1) {
            targetDateObj.items[index] = newItems;
        }
        this.notify();
    },

    removeDailyData(id) {
        this.data = this.data.reduce((acc, day) => {
            const filteredItems = day.items.filter((item) => item.id !== id);
            if (filteredItems.length > 0) {
                acc.push({
                    ...day,
                    items: filteredItems,
                });
            }
            return acc;
        }, []);
        this.notify();
    },

    findDailyDataById(id) {
        for (const day of this.data) {
            const item = day.items.find((item) => item.id === id);
            if (item) {
                return { date: day.date, items: item };
            }
        }
        return null;
    },

    getDailyByYearAndMonth(year, month) {
        return this.data.filter((item) => {
            const date = new Date(item.date);
            return date.getMonth() + 1 === month && date.getFullYear() === year;
        });
    },

    toggleIncomeFilter() {
        this.filteredIncome = !this.filteredIncome;
        this.notify();
    },

    toggleExpenseFilter() {
        this.filteredExpense = !this.filteredExpense;
        this.notify();
    },
};
