//Recuperación de los objetos a través del archivo JSON.

function getJSONVideos(){
  $.getJSON('data/video.json', function(data) {
    jsonVideos = data.video;
    printFilms(jsonVideos.films);
    printSeries(jsonVideos.series);
  });
}

//Imprimir los valores series

function printSeries(listSeries){

  $('#listSeries').html("");

  $.each( listSeries, function( key, oSerie){
    let card = `
                <div class="col-md-3 col-sm-6">
                  <div class="card text-center">
                    <div class="card-block">
                    <img src="${oSerie.cover}" alt="" width="600" class="img-fluid">


                    <div class="card-body">

                      <h4 class="card-title">${oSerie.name}</h4>

                      <p class="card-text">Precio: ${oSerie.price}</p>
                      <button class="btn btn-primary" data-toggle="modal" data-target="#cantidades" onclick="modalVideo(${oSerie.id}, '${oSerie.name}', '${oSerie.price}')">pedir</button>
                  </div>
                  </div>
                </div>
                <br>`;
    $('#listSeries').append(card);
  });
}

//Imprimir los valores pelis.

function printFilms(listPelis){

  $('#listPelis').html("");

  $.each( listPelis, function( key, oFilm){
    let card = `
                <div class="col-md-3 col-sm-6">
                  <div class="card text-center">
                    <div class="card-block">
                    <img src="${oFilm.cover}" alt="" width="600" class="img-fluid">


                    <div class="card-body">

                      <h4 class="card-title">${oFilm.name}</h4>

                      <p class="card-text">Precio: ${oFilm.price}</p>
                      <button class="btn btn-primary" data-toggle="modal" data-target="#cantidades" onclick="modalVideo(${oFilm.id}, '${oFilm.name}','${oFilm.price}')">pedir</button>
                  </div>
                  </div>
                </div>
                <br>`;
    $('#listPelis').append(card);
  });
}

//Ejecución y recuperación de pedidos y calcular la cantidad del pedido x coste.

function modalVideo(id, name, price){
  $('#infFilms').html(`<form class="col-md-12">
    <div class="form-group row">
      <label class="control-label col-lg-3">Poster:</label>
      <div class="col-lg-6">
        <label class="control-label">${name}</label>
      </div>
    </div>
    <div class="form-group row">
      <label class="control-label col-lg-3" for="preu">Precio:</label>
      <div class="col-lg-6">
        <label class="control-label" id="price">${price}</label>
      </div>
    </div>
    <div class="form-group row">
      <label class="control-label col-lg-3" for="cant">Cantidad: </label>
      <div class="col-lg-6">
        <select class="form-control" id="cant" onChange="calculaPreuFinal()">
          <option value="0">Seleccione una cantidad</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>

    <div class="form-group row">
      <label class="control-label col-lg-3" for="totol">TOTAL: </label>
      <div class="col-lg-6">
        <input type="text" class="form-control" id="preuTotal" disabled>
      </div>
    </div>
  </form>
  <a href="#">Leer condiciones</a>`);
}

//Función de busqueda de posters.

function searchFilms(){

  let list = document.getElementById("myMovie").innerHTML;

  $.getJSON('data/video.json', function(data){

    let txtMovie = ($("#myMovie").val()).toLowerCase();
    let lFilms = $(data.video.films).filter(function (i, oFilm){
                        let nom = oFilm.name.toLowerCase();
                        return (nom.indexOf(txtMovie)!=-1);
                    });
    if(lFilms.length==0 ){
      $("#listPelis").html("Lo siento. El poster que estas buscando, no esta en nuestra tienda");
    }else{
      printFilms(lFilms);
    }

    let txtSerie = ($("#myMovie").val()).toLowerCase();
    let lSeries = $(data.video.series).filter(function (i, oSerie){
                        let nom = oSerie.name.toLowerCase();
                        return (nom.indexOf(txtSerie)!=-1);
                    });
    if(lSeries.length==0){
      $("#listSeries").html("Lo siento. El poster que estas buscando, no esta en nuestra tienda");
    }else{
      printSeries(lSeries);
    }

  });
}

//Calcular en total la unidad * precio

function calculaPreuFinal(){
  let cantidad = $("#cant").val();
  let preu = $("#price").html();
  console.log(cantidad, preu);
  let preuTotal = parseInt(preu, 10) * parseInt(cantidad, 10) ;
  $("#preuTotal").val(preuTotal);

}
