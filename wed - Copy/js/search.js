// search.js
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('searchInput');
    const list = document.getElementById('areasList');
    
    if (input && list) {
        const items = list.getElementsByTagName('li');
        
        input.addEventListener('input', function() {
            const filter = input.value.toLowerCase();
            
            for (let i = 0; i < items.length; i++) {
                const name = items[i].textContent || items[i].innerText;
                
                if (name.toLowerCase().includes(filter)) {
                    items[i].classList.remove('hidden');
                } else {
                    items[i].classList.add('hidden');
                }
            }
        });
    }
});