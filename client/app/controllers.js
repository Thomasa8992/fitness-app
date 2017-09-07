angular.module('controllers')
.controller('listCtrl', function ($http, $scope, $routeParams, $location) {
    var id = $routeParams.id
    $http.get('http://localhost:3000/api/coach')
        .then(function (success) {
            $scope.data = success.data
        }, function (err) {
            alert('api not showing up')
        })
    $scope.getId = function (id) {
        $location.path('/coach/' + id)
    }
})
.controller('listUserCtrl', function ($http, $scope) {
    $http.get('http://localhost:3000/api/user')
        .then(function (success) {
            $scope.data = success.data
        }, function (err) {
            alert('api not showing up')
        })
})
.controller('singleCtrl', function($http, $scope,$routeParams, $location, $sce){
    var id = $routeParams.id;

    $("#datepicker").datepicker({dateFormat: "yy-mm-dd"});

    $scope.book = function() {
        var date = $("#datepicker").val();

        if (date === '') {
            return;
        }

        $http({
            method: 'POST',
            url: '/api/user',
            data: {
                title: `Workout with ${$scope.coach.name}`,
                start: date
            }
        })
        .then(function() {
            $location.path('/calendar');
        });
    }

    $http.get('http://localhost:3000/api/coach/'+id)
    .then(function(success) {

        let data = success.data;
        $scope.coach = data;

        if (data.video) {
            data.video = $sce.trustAsResourceUrl(data.video);
        }

        findLatLng(Number(data.lat), Number(data.lng));
        console.log(data)
    }, function (err){
        alert('something else went wrong')
    })  
    var findLatLng = function(lat,lng){
        console.log(lat,lng);
            var uluru = {lat, lng};
            console.log(uluru)
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
                center: uluru
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
        }
    
})
.controller('typeCtrl', function ($http, $scope, $routeParams, $location) {
    var type = $routeParams.type
    $http.get('http://localhost:3000/api/category/' + type)
        .then(function (success) {
            $scope.data = success.data
            console.log(success.data)
        }, function (err) {
            alert('something went wrong')
        })
    $scope.getId = function (id) {
        $location.path('/coach/' + id)
    }
});