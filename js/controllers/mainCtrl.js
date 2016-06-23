'use strict';

myApp.controller("mainCtrl",function($scope,$sce,$timeout,Markers,$http,leafletData){




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
                        icon: leaf_icon
                    },
                    m2: {
                        group: "ipcams",
                        lat: 52.090974,
                        lng: 23.694484,
                        title: "Кинотеатр Беларусь г. Брест",
                        descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        src: "http://lideo.ru/embed/2298",
                        icon: leaf_icon

                    },
                    m3: {
                        group: "ipcams",
                        lat: 52.090974,
                        lng: 23.694484,
                        title: "Кинотеатр Беларусь г. Брест",
                        descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        src: "http://lideo.ru/embed/2298",
                        icon: leaf_icon

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

        $scope.$on('leafletDirectiveMarker.click', function(e, args) {

            // Args will contain the marker name and other relevant information

            $scope.currentProjectUrl = $sce.trustAsResourceUrl(args.model.src);

            $scope.visible = false;

            $timeout(function(){
              
                $scope.titleWebcam = args.model.title;

                $scope.descrWebcam = args.model.descr;

                $scope.visible = true;

            }, 400);

        });


        $scope.userLocation = function() {


            var MyControl = new L.control();
            MyControl.setPosition('bottomleft');
            MyControl.onAdd = function () {
            var className = 'leaflet-custom-control', 
            container = L.DomUtil.create('div', className + ' leaflet-bar');
            //angular.element(container).append(' Something' ); to see it

            // L.DomEvent.addListener(container, 'click', function(e){alert('My button first Click')});
            // Search a lot for this click also.
            return container;
            }

            $scope.controls['custom'] = MyControl;



            var url = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + key;
            $http.post(url)
                .then(function(result) { 
                    $scope.brest.lat = result.data.location.lat;
                    $scope.brest.lng = result.data.location.lng;

                    $scope.markers['location']={
                    lat: $scope.brest.lat, 
                    lng: $scope.brest.lng,
                    focus: true,
                    message: 'Ваше примерное местоположение',
                    group: "ipcams" 
                    };


                });
        }





  

});