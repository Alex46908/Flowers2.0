function getTextAll() {
    const lang = localStorage.getItem('lang');
    const nametxt = document.getElementById('nametxt');
    const name = document.getElementById('name');
    const NameHelp = document.getElementById('NameHelp');
    const phonetxt = document.getElementById('phonetxt');
    const phone = document.getElementById('phone');
    const sendbtn = document.getElementById('sendbtn');
    const title0 = document.getElementById('title0');
    const title1 = document.getElementById('title1');
    const title2 = document.getElementById('title2');
    const title3 = document.getElementById('title3');
    const byebtn = document.getElementById('byebtn');
    fetch(`./api/langstatic/${lang}`)
        .then(response => response.json())
        .then(data => {
            console.log(data[0])
            nametxt.innerHTML = data[0].form.FullName;
            name.placeholder = data[0].form.FullName;
            NameHelp.innerHTML = data[0].form.FullNameDes;
            phonetxt.innerHTML = data[0].form.Phone;
            phone.placeholder = data[0].form.Phone;
            sendbtn.innerHTML = data[0].form.Btn;
            title0.innerHTML = data[0].header.title0;
            title1.innerHTML = data[0].header.title1;
            title2.innerHTML = data[0].header.title2;
            title3.innerHTML = data[0].header.title3;
            byebtn.innerHTML = data[0].header.ByeBtn;
        })
}
