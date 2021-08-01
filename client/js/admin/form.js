function SendForm(){
    const mail = document.getElementById('exampleInputEmail1').value;
    const password = document.getElementById('exampleInputPassword1').value;
    fetch(`/api/checkadmin/${mail}/${password}`)
        .then((response) => response.json())
        .then((response) => {
            if(response[0].key !== undefined){
                document.location.href = `./admin_manager?${response[0].key}`
            }

        });
}
