const en_lang = document.getElementById('en_lang');
const ru_lang = document.getElementById('ru_lang')
if (localStorage.getItem('lang') == null){
    localStorage.setItem('lang', 'ru')
}
if (localStorage.getItem('lang') == 'ru'){
    en_lang.classList.add("breadcrumb-item");
    en_lang.classList.add("active");
    ru_lang.classList.add("breadcrumb-item");
}
if (localStorage.getItem('lang') == 'en'){
    ru_lang.classList.add("breadcrumb-item");
    ru_lang.classList.add("active");
    en_lang.classList.add("breadcrumb-item");
}
function setLang(lang){
    console.log('start')
    localStorage.setItem('lang', lang)
    document.location.href = window.location.href
}