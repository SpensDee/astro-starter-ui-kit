export function startTimer(selector, seconds) {
    const storageKey = 'countdown_timer';
    if (localStorage.getItem(storageKey)) return; // Проверка на запущенный таймер
    
    const endTime = Date.now() + seconds * 1000;
    localStorage.setItem(storageKey, endTime);
    const el = document.querySelector(selector);
    if (!el) return;
    
    function update() {
        const diff = localStorage.getItem(storageKey) - Date.now();
        if (diff <= 0) {
            localStorage.removeItem(storageKey);
            el.textContent = '';
            return;
        }
        const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
        const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        el.textContent = `${h}:${m}:${s}`;
        requestAnimationFrame(update);
    }
    update();
}