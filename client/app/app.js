var Fitness = angular.module("Fitness" ['ngRoute'])

Fitness.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "../views/home.html"
        })
        .when("/coach/:type", {
            templateUrl: "../views/list.html"
        })
        .when("/coach", {
            templateUrl: "../views/list.html"
        })
        .when("/About", {
            templateUrl: "../views/about.html"
        })
        .when("/coach/:id", {
            templateUrl: "../views/single.html"
        })
});

Fitness.controller('listCtrl', function ($http, $scope, $routeParams, $location) {
    var id = $routeParams.id
    $http.get('http://localhost:3000/api/coach', {
    })
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

Fitness.controller('singleCtrl', function($http, $scope, $location){
    var id = $routeParams.id
    http.get('http://localhost:3000/api/coach'+id,{
    })
        .then(function(success) {
            $scope.data=success.data
            HTMLFormControlsCollection.log(success.data)
        }, function (err){
            alert('something else went wrong')
        })
});

Fitness.controller('typeCtrl', function ($http, $scope, $routeParams, $location) {
    var type = $routeParams.type
    $http.get('http://localhost:3000/api/coach' + type, {
    })
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