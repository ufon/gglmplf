'use strict';

myApp.controller("mainCtrl", 
    function(
    $scope,
    $sce,
    $timeout,
    Markers,
    $http,
    leafletData,
    $window,
    $location,
    $routeParams,
    $rootScope,
    $filter
    ){

        $scope.markers = Markers;

        $scope.currentUrl = $location.absUrl();

        $scope.selectedPlace = function(selected) {
          if (selected) {
            window.alert('You have selected ' + selected.title);
          } else {
            console.log('cleared');
          }
        };

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

    


            $rootScope.map = {
                    lat: 52.094,
                    lng: 23.69,
                    zoom: 12
            },

            $scope.layers = {
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



    $scope.visible = true;

    $rootScope.currentProjectUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/UVismUIJi4A');

    $rootScope.titleWebcam = 'Test';

    $rootScope.descrWebcam = 'testdescr';

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

            console.log(args);

            $scope.currentProjectUrl = $sce.trustAsResourceUrl(args.model.src);

            $scope.visible = false;

            $timeout(function(){
              
                $scope.titleWebcam = args.model.title;

                $scope.descrWebcam = args.model.descr;

                $scope.visible = true;

            }, 400);

            $location.path('/place/'+args.modelName );

            $scope.currentUrl = $location.absUrl();

            

        });

        $scope.redirectToNew = function(url){
            $window.open(url, '_blank');
        };


        $scope.userLocation = function() {

            var url = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + key;

            $http.post(url)
                .then(function(result) { 

                    $scope.map.lat = result.data.location.lat;
                    $scope.map.lng = result.data.location.lng;
                    $scope.map.zoom = 20;

                    $scope.nearPlaces(result.data.location.lat, result.data.location.lng);

                    $scope.markers.push({
                    lat: $scope.map.lat, 
                    lng: $scope.map.lng,
                    focus: true,
                    message: 'Ваше примерное местоположение',
                    group: "ipcams",
                    icon: {
                        type: 'awesomeMarker',
                        icon: 'globe',
                        prefix: 'fa',
                        markerColor: '#D32F2F'
                    }
                    });


                });

        }

        $scope.nearPlaces = function(lat, lng){

            function distanceCof(lat, lng, val, key){


                var x = lat - lng; // наше место 
                var y = val.lat - val.lng; // место камеры


                var cof = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));//расстояние по пифагора

                return cof;

            }

            var places = [];

                angular.forEach($scope.markers, function (val, key) {

                    console.log(val);

                    var form = {
                        id: key,
                        distanceCof: distanceCof(lat, lng, val, key),
                        lat: lat,
                        lng: lng,
                        title: val.title
                    };

                    this.push(form); // much wow

                }, places);

            places = $filter('orderBy')(places, 'distanceCof');

            var placesList = angular.element( document.querySelector( '#places' ) );

            angular.forEach(places, function(value, key) {
            placesList.append('<li class="mdl-list__item mdl-js-ripple-effect"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">videocam</i>'+value.title+'</span><a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a></li>');     
            });
            
            console.log($scope.sortPlaces);

        }


});