class HolidayController {
    constructor() {
        this.holidays = [];
    }

    getAllHolidays() {
        return this.holidays;
    }

    getHolidayById(id) {
        return this.holidays.find(holiday => holiday.id === id);
    }

    createHoliday(newHoliday) {
        const id = this.holidays.length + 1;
        const holiday = { id, ...newHoliday };
        this.holidays.push(holiday);
        return holiday;
    }

    updateHoliday(id, updatedHoliday) {
        const index = this.holidays.findIndex(holiday => holiday.id === id);

        if (index !== -1) {
            this.holidays[index] = { id, ...updatedHoliday };
            return { success: true, holiday: this.holidays[index] };
        } else {
            return { success: false };
        }
    }

    deleteHoliday(id) {
        const index = this.holidays.findIndex(holiday => holiday.id === id);

        if (index !== -1) {
            this.holidays.splice(index, 1);
            return { success: true };
        } else {
            return { success: false };
        }
    }
}

module.exports = HolidayController;
