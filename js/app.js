var myApp = angular.module('myApp', ['ui-leaflet', 'ngAnimate', 'asideModule', 'ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/place/:id', {
    template: " ",
    controller: 'AppCtrl'
  });
}]);

myApp.controller("AppCtrl", function($scope, $routeParams, $rootScope, $sce, Markers){

    console.log($routeParams.id);

    $scope.markers = Markers;
         
    $rootScope.currentProjectUrl = $sce.trustAsResourceUrl($scope.markers[$routeParams.id].src);

    $rootScope.titleWebcam = $scope.markers[$routeParams.id].title;

    $rootScope.descrWebcam = $scope.markers[$routeParams.id].descr;

    $rootScope.map.lat = $scope.markers[$routeParams.id].lat;

    $rootScope.map.lng = $scope.markers[$routeParams.id].lng;

    $rootScope.map.zoom = 20;

});

myApp.factory("Markers", function(){
  var Markers = [{
                        id: 0,
                        group: "ipcams",
                        lat: 52.089971,
                        lng: 23.694642,
                        title: "Vitacci",
                        descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        src: "http://lideo.ru/embed/2237",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                        }
                    },
                    {
                        id: 1,
                        group: "ipcams",
                        lat: 52.090974,
                        lng: 23.694484,
                        message: 'Кинотеатр Беларусь г. Брест',
                        title: "Кинотеатр Беларусь г. Брест",
                        descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        src: "http://lideo.ru/embed/2298",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                        }

                    }
  ]
  return Markers;
});