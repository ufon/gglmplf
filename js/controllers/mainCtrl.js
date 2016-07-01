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

    $scope.markerLocation = false;

    $scope.lengthMarkers = $scope.markers.length;        

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

            $scope.nearPlaces(args.model.lat, args.model.lng, args.model.id, false);

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

                    $scope.markers[$scope.lengthMarkers+1]={
                    lat: $scope.map.lat, 
                    lng: $scope.map.lng,
                    id: $scope.lengthMarkers+1,
                    title: 'Ваше примерное местоположение',
                    descr: '',
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

                    $scope.markerLocation = true;

                    $scope.nearPlaces(result.data.location.lat, result.data.location.lng, $scope.markers.length+1);


                });

        }

        $scope.nearPlaces = function(lat, lng, id, locationMarker){

            var placesList = angular.element( document.querySelector( '#places' ) );

            placesList.empty();

            function distanceCof(lat, lng, val, key){

                // перевести координаты в радианы
                var lat1 = lat * Math.PI / 180;
                var lat2 = val.lat * Math.PI / 180;
                var long1 = lng * Math.PI / 180;
                var long2 = val.lng * Math.PI / 180;

                // косинусы и синусы широт и разницы долгот
                var cl1 = Math.cos(lat1);
                var cl2 = Math.cos(lat2);
                var sl1 = Math.sin(lat1);
                var sl2 = Math.sin(lat2);
                var delta = long2 - long1;
                var cdelta = Math.cos(delta);
                var sdelta = Math.sin(delta);

                // вычисления длины большого круга
                var y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
                var x = sl1 * sl2 + cl1 * cl2 * cdelta;

                //
                var ad = Math.atan2(y, x);
                var dist = ad * 6372795;

                return dist/1000;
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

            places.splice(id, 1);

            if ($scope.markerLocation) { places.splice(-1, 1); }

            places = $filter('orderBy')(places, 'distanceCof');

            angular.forEach(places, function(value, key) {
            placesList.append('<li class="mdl-list__item "><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">videocam</i>'+value.title+'</span><button ng-click="goTo('+value.id+')" style="min-width:36px;width: 36px;height:36px;" class="mdl-button mdl-js-button mdl-button--fab"><i class="material-icons">add</i></button></li>');     
            });
            
            console.log(id);

        }


         /**
           * Center map on specific saved location
           * @param lat, lng
           */
        $scope.goTo = function(id) {

            $scope.map.lat  = lat;
            $scope.map.lng  = lng;
            $scope.map.zoom  = 20;

        };



});