'use strict';

myApp.controller("mainCtrl", function($scope,$sce,$timeout,Markers,$http,leafletData){

    $scope.checked = false;

    $scope.size = '100px';

    $scope.visible = true;

    $scope.toggle = function() {

                    $scope.checked = !$scope.checked

    }

    $scope.currentProjectUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/UVismUIJi4A');

    $scope.titleWebcam = 'Test';

    $scope.descrWebcam = 'testdescr';

    var key = 'AIzaSyCs10dAlmjtE8VPAJYqvkep7QTXcNmVzQE';

    var leaf_icon = {
                iconUrl: 'img/pin.png',
                shadowUrl: 'css/assets/1.png',
                iconSize:     [25, 37], // size of the icon
                shadowSize:   [45, 45], // size of the shadow
                iconAnchor:   [25, 37], // point of the icon which will correspond to marker's location
                shadowAnchor: [26, 45],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    };

    $scope.markers = {
                    m1: {
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
                    m2: {
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
                };



            angular.extend($scope, {
                brest: {
                    lat: 52.094,
                    lng: 23.69,
                    zoom: 12
                },
                layers: {
                    baselayers: {
                        googleRoadmap: {
                            name: 'Google Streets',
                            layerType: 'ROADMAP',
                            type: 'google'
                        },
                        googleHybrid: {
                          name: 'Google Hybrid',
                          layerType: 'HYBRID',
                          type: 'google'
                        }

                    },
                    overlays: {
                        ipcams: {
                          type: "markercluster",
                          visible: true,
                          layerOptions:{
                           maxClusterRadius: 60, // Modify here.
                          }
                        }
                    },
                    controls: {}
                }
            });


        $scope.$on('leafletDirectiveMap.load', function(e) {

             leafletData.getMap().then(
                function (map) {


                    var customControl =  L.Control.extend({

                      options: {
                        position: 'bottomright'
                      },

                      onAdd: function (map) {
                        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom cursor');
                    

                        container.innerHTML = '<i style="font-size:28pt;     margin: 9px; " class="material-icons">location_searching</i>';
                        container.style.backgroundColor = 'white';     
                        //container.style.backgroundImage = "url(http://t1.gstatic.com/images?q=tbn:ANd9GcR6FCUMW5bPn8C4PbKak2BJQQsmC-K9-mbYBeFZm1ZM2w2GRy40Ew)";
                        container.style.backgroundSize = "56px 56px";
                        container.style.width = '56px';
                        container.style.height = '56px';
                        
                        container.onmouseover = function(){
                          container.style.backgroundColor = '#f4f4f4'; 
                        }
                        container.onmouseout = function(){
                          container.style.backgroundColor = 'white'; 
                        }

                        container.onclick = function(){
                            $scope.userLocation();
                        }

                        return container;
                      }
                    });

                    map.addControl(new customControl());
                }
            );


        });


        $scope.$on('leafletDirectiveMarker.click', function(e, args) {

            // Args will contain the marker name and other relevant information
            if ($scope.titleWebcam == args.model.title) {
                return;
            }

            $scope.currentProjectUrl = $sce.trustAsResourceUrl(args.model.src);

            $scope.visible = false;

            $timeout(function(){
              
                $scope.titleWebcam = args.model.title;

                $scope.descrWebcam = args.model.descr;

                $scope.visible = true;

            }, 400);

        });


        $scope.userLocation = function() {

            var url = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + key;

            $http.post(url)
                .then(function(result) { 

                    $scope.brest.lat = result.data.location.lat;
                    $scope.brest.lng = result.data.location.lng;
                    $scope.brest.zoom = 20;


                    $scope.markers['location']={
                    lat: $scope.brest.lat, 
                    lng: $scope.brest.lng,
                    focus: true,
                    message: 'Ваше примерное местоположение',
                    group: "ipcams",
                    icon: {
                        type: 'awesomeMarker',
                        icon: 'globe',
                        prefix: 'fa',
                        markerColor: '#D32F2F'
                        }
                    };


                });

        }

});