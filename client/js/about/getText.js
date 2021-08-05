const lang = localStorage.getItem('lang');
const about = document.getElementById('about');
const about_txt0 = document.getElementById('about_txt0');
const about_txt1 = document.getElementById('about_txt1');
fetch(`./api/langstatic/${lang}`)
    .then(response => response.json())
    .then(data => {
        about.innerHTML = data[0].about.h0;
        about_txt0.innerHTML = data[0].about.about0;
        about_txt1.innerHTML = data[0].about.about1;
    });
