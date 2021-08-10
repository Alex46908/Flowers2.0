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
    <div class="card">
  <img class="card-img-top" src="./img/card/${flower.img}" alt="Card image cap">
  <div class="card-body">
    <div class="form-group">
    <input value="${flower.titleRu}" class="form-control" id="${flower.img}titleRu" placeholder="Название (Ru)">
  </div>
  <div class="form-group">
    <input value="${flower.titleEn}" class="form-control" id="${flower.img}titleEn" placeholder="Название (En)">
  </div>
    <div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">Описание (Ru)</span>
  </div>
  <textarea id="${flower.img}descriptionRu" class="form-control" aria-label="Описание">${flower.descriptionRu}</textarea>
</div>
   <div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">Описание (En)</span>
  </div>
  <textarea id="${flower.img}descriptionEn" class="form-control" aria-label="Описание">${flower.descriptionEn}</textarea>
</div>
<button onclick="Update('${flower.img}')" type="button" class="btn btn-primary ">Сохранить</button>
<button onclick="Delete('${flower.img}')" type="button" class="btn btn-danger"><img src="./img/icon/trash.svg" alt=""></button>
  </div>
</div>`
                }
                content.innerHTML += `<div class="card" >
        <form id="filef" method="post" enctype="multipart/form-data">
            <div align="center" class="form-group">
                <label for="exampleFormControlFile1">Выберите фото цветка (512x512)</label>
                <input type="file" class="form-control-file" id="exampleFormControlFile1" name="filedata" />
            </div>
        <div class="card-body">
            <div class="form-group">
                <input name="titleRu" class="form-control" placeholder="Название (Ru)">
            </div>
            <div class="form-group">
                <input name="titleEn" class="form-control" placeholder="Название (En)">
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Описание (Ru)</span>
                </div>
                <textarea name="descriptionRu" class="form-control" aria-label="Описание (Ru)"></textarea>
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Описание (En)</span>
                </div>
                <textarea name="descriptionEn" class="form-control" aria-label="Описание (En)"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Создать</button>
        </div>
        </form>
    </div>`
            });
    }
})
}
Content()
