ymaps.ready(init);
function init() {

  var map = new ymaps.Map('map', {
      center: [ 29.86293697871366,-95.2850092837251],
      zoom: 8,  
       behaviors: ['drag']
  });

//first marker
  var placemark = new ymaps.Placemark([ 29.76293697871366, -95.2850092837251],{   
    hintContent:'<div class="map__hint">This is hint</div>',
    balloonContent:[
      '<div class="map__balloon">',
      '<img class="map__burger-img" src="../img/burger.png" />',
      '</div>'
  ]
  },
  {
            iconLayout: 'default#image',
              iconImageHref: '../img/location.svg',
              iconImageSize: [33, 48],
              iconImageOffset: [-17, -48]
  });


  map.geoObjects.add(placemark);

}
