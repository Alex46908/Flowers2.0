const lang = localStorage.getItem('lang');
const ititle0 = document.getElementById('ititle0');
const ih0 = document.getElementById('ih0');
const ih1 = document.getElementById('product');
fetch(`./api/langstatic/${lang}`)
    .then(response => response.json())
    .then(data => {
        ititle0.innerHTML = data[0].index.title0;
        ih0.innerHTML = data[0].index.h0;
        ih1.innerHTML = data[0].index.h1;
        });
