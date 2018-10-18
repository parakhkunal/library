'use strict';

export default function createYearArray(numberOfYears) {
    const date = new Date();
    const currentYear = date.getFullYear();
    const yearArray = [];
    for (let i = 0; i <= numberOfYears; i++) {
        yearArray.push(currentYear + i);
    }
    return yearArray;
}