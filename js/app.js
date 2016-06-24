var myApp = angular.module('myApp', ['ui-leaflet', 'ngAnimate', 'asideModule']);

myApp.factory("Markers", function(){
  var Markers = [
    {
      "id": "0",
      "coords": {
        "latitude": "52.089971",
        "longitude": "23.694642"
      },
      "window": {
        "title": "Vitacci"
      },
      "options": {
        "icon": "img/cam.png"
      },
      "src": "http://lideo.ru/embed/2237"
    },
    {
      "id": "1",
      "coords": {
        "latitude": "52.090974",
        "longitude": "23.694484"
      },
      "window" : {
        "title": "Кинотеатр Беларусь г. Брест"
      },
      "options": {
        "icon": "img/cam.png"
      },
      "src": "http://lideo.ru/embed/2298"
    }
  ];
  return Markers;
});
