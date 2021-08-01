const key = document.location.href.split('?')[1]
const content = document.getElementById('product_content');
function Content(){
    content.innerHTML = ''
    fetch(`/api/checkadminkey/${key}`)
.then((response) => response.json())
.then((data) => {
    if (key == data[0].key){
        fetch('/api/flowers')
            .then((response) => response.json())
            .then((json) => {
                for ( let flower of json ) {
                    content.innerHTML += `
    <div class="card" style="width: 80%; margin-top: 10px; margin-bottom: 10px;">
  <img class="card-img-top" src="./img/card/${flower.img}" alt="Card image cap">
  <div class="card-body">
    <div class="form-group">
    <input value="${flower.title}" class="form-control" id="${flower.img}title" placeholder="Название">
  </div>
    <div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">Описание</span>
  </div>
  <textarea id="${flower.img}description" class="form-control" aria-label="Описание">${flower.description}</textarea>
</div>
<button onclick="Update('${flower.img}')" style="margin-top: 15px;" type="button" class="btn btn-primary">Сохранить</button>
<button onclick="Delete('${flower.img}')" style="margin-top: 15px;" type="button" class="btn btn-danger"><img src="./img/icon/trash.svg" alt=""></button>
  </div>
</div>`
                }
                content.innerHTML += `<div class="card" style="width: 80%; margin-top: 10px; margin-bottom: 10px;">
        <form id="filef" method="post" enctype="multipart/form-data">
            <div align="center" class="form-group">
                <label for="exampleFormControlFile1">Выберите фото цветка (512x512)</label>
                <input style="width: 60%;" type="file" class="form-control-file" id="exampleFormControlFile1" name="filedata" />
            </div>
        <div class="card-body">
            <div class="form-group">
                <input name="title" class="form-control" placeholder="Название">
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Описание</span>
                </div>
                <textarea name="description" class="form-control" aria-label="Описание"></textarea>
            </div>
            <button  style="margin-top: 15px;" type="submit" class="btn btn-primary">Создать</button>
        </div>
        </form>
    </div>`
            });
    }
})
}
Content()
