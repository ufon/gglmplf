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

    $scope.markers[$routeParams.id].focus = true;
         
    $rootScope.currentProjectUrl = $sce.trustAsResourceUrl($scope.markers[$routeParams.id].src);

    $rootScope.titleWebcam = $scope.markers[$routeParams.id].title;

    $rootScope.descrWebcam = $scope.markers[$routeParams.id].descr;

    $rootScope.map.lat = $scope.markers[$routeParams.id].lat;

    $rootScope.map.lng = $scope.markers[$routeParams.id].lng;

    $rootScope.map.zoom = 20;

    $rootScope.nearPlaces($scope.markers[$routeParams.id].lat, $scope.markers[$routeParams.id].lng, $scope.markers[$routeParams.id].id, $scope.markers.length+1);

});

myApp.factory("Markers", function(){
  var Markers = [{
                        id: 0,
                        group: "ipcams",
                        lat: 52.090294,
                        lng: 23.694470,
                        title: "ул. Советская",
                        descr: "",
                        src: "http://ipeye.ru/ipeye_service/api/api.php?dev=4l5t8h7Ed2VJckzapSyOo2p0Qe007Y&tupe=rtmp&autoplay=0&logo=1",
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
                        message: 'Кинотеатр «Беларусь» №2',
                        title: "Кинотеатр «Беларусь» №2",
                        descr: "г. Брест, ул. Советская, 62",
                        src: "http://lideo.ru/embed/2298",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                        }

                    },
                    {
                        id: 2,
                        group: "ipcams",
                        lat: 52.089766,
                        lng: 23.694744, 
                        message: "Магазин обуви «ВИТАЧЧИ»", 
                        title: "Магазин обуви «ВИТАЧЧИ»",
                        descr: "г. Брест, ул. Советская,  85 (ТД «Миллионный»)",
                        src: "http://lideo.ru/embed/2237",
                        website: "www.modny.by",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                        }

                    },
                    {
                        id: 3,
                        group: "ipcams",
                        lat: 52.067775,
                        lng: 23.718743, 
                        message: 'Екельчика 1 Брест',
                        title: "Екельчика 1 Брест",
                        descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        src: "http://ipeye.ru/ipeye_service/api/api.php?dev=tyVXnGj1lqWL1JbM16CObMMuO5mcpe&tupe=rtmp&autoplay=0&logo=1",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                        }

                    },
                    {
                        id: 4,
                        group: "ipcams",
                        lat: 52.061312,
                        lng: 23.731926,  
                        message: 'Жукова 7 Брест',
                        title: "Жукова 7 Брест",
                        descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        src: "http://lideo.ru/embed/2324",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                        }

                    },
                    {
                        id: 5,
                        group: "ipcams",
                        lat: 52.087996,
                        lng: 23.702010, 
                        message: 'Машерова 72 Брест',
                        title: "Машерова 72 Брест",
                        descr: "",
                        src: "http://lideo.ru/embed/2218",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                        }

                    },
                    {
                        id: 6,
                        group: "ipcams",
                        lat: 52.090001,
                        lng: 23.694337, 
                        message: 'Гриль-бар «КОРОВА»',
                        title: "Гриль-бар «КОРОВА»",
                        descr: "г. Брест, ул. Советская, 73",
                        src: "http://ipeye.ru/ipeye_service/api/api.php?dev=AgaJfE2LBUtlvQuMmgTphAw1yvZbJz&tupe=rtmp&autoplay=0&logo=1",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                        }

                    },
                    {
                        id: 7,
                        group: "ipcams",
                        lat: 52.090678,
                        lng: 23.694533, 
                        message: 'Кинотеатр «Беларусь» №1',
                        title: "Кинотеатр «Беларусь» №1",
                        descr: "г. Брест, ул. Советская, 62",
                        src: "http://lideo.ru/embed/2265",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                        }

                    },
                    {
                        id: 8,
                        group: "ipcams",
                        lat: 52.099046, 
                        lng: 23.767857, 
                        message: 'Центр красоты «Гламур»',
                        title: "Центр красоты «Гламур»",
                        descr: "г. Брест, ул. Московская, 275А",
                        src: "http://ipeye.ru/ipeye_service/api/api.php?dev=aRtoiUuoALvhufBOPvsb8SoTQ578ES&tupe=rtmp&autoplay=0&logo=1",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                        }

                    },
                    {
                        id: 9,
                        group: "ipcams",
                        lat: 52.089985, 
                        lng: 23.694833, 
                        message: 'Лазертаг-клуб «Белый лис»',
                        title: "Лазертаг-клуб «Белый лис»",
                        descr: "г. Брест, ул. Советская, 68 (ТЦ «Атис Холл»)",
                        src: "http://ipeye.ru/ipeye_service/api/api.php?dev=ecCvnDGkV2uCEYeYBM8iLfuDOH8gG5&tupe=rtmp&autoplay=0&logo=1",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                        }

                    },
                    {
                        id: 10,
                        group: "ipcams",
                        lat: 52.094701,
                        lng: 23.732146, 
                        message: 'Интернет-провайдер «ELNET»',
                        title: "Интернет-провайдер «ELNET»",
                        descr: "г. Брест, ул. Московская, 202",
                        src: "https://www.youtube.com/embed/Rcx2UW4_nFE",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                        }
                    },
                    {
                        id: 11,
                        group: "ipcams",
                        lat: 52.110894,
                        lng: 23.717967, 
                        message: 'Шиномонтаж «Pit-Stop»',
                        title: "Шиномонтаж «Pit-Stop»", 
                        descr: "г. Брест, ул. Мошенского, 66 (р-н автозаправки)",
                        src: "http://ipeye.ru/ipeye_service/api/api.php?dev=dtZERv722KcC9UES0xlpA98FVb1GLj&tupe=rtmp&autoplay=0&logo=1",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                        }
                    },
                    {
                        id: 13,
                        group: "ipcams",
                        lat: 52.088379, 
                        lng: 23.692930, 
                        message: 'Первое праздничное агентство «Бюро праздников»',
                        title: "Первое праздничное агентство «Бюро праздников»", 
                        descr: "г. Брест, ул. Дзержинского, 21",
                        src: "http://ipeye.ru/ipeye_service/api/api.php?dev=l8FSaTppZuRs1dXB05YkUPWjTaxiQg&tupe=rtmp&autoplay=0&logo=1",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                      }
                    },
                    {
                        id: 14,
                        group: "ipcams",
                        lat: 52.095953,  
                        lng: 23.741184, 
                        message: 'Казино «Метелица»',
                        title: "Казино «Метелица»", 
                        descr: "г. Брест, ул. Московская, 206",
                        src: "http://ipeye.ru/ipeye_service/api/api.php?dev=G8k8XxsjeOb669WzHh4pYT9ZIdcGpe&tupe=rtmp&autoplay=0&logo=1",
                        icon: {
                        type: 'awesomeMarker',
                        icon: 'video-camera',
                        prefix: 'fa',
                        markerColor: '#3F51B5'
                    }

                    }
  ];
  return Markers;
});