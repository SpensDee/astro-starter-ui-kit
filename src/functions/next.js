function incrementDay() {
    const storedDay = localStorage.getItem('day');
    const currentDay = storedDay ? parseInt(storedDay, 10) : 1; // Если нет данных, начинаем с 1
    const newDay = currentDay + 1;

    localStorage.setItem('day', newDay.toString());
    return newDay;
}

export default incrementDay;