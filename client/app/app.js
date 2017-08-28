document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMCONTENTLOADED')
})
var Fitness = angular.module("Fitness", ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: ""
            })
            .when("/StrengthTraining", {
                templateUrl: ""
            })
            .when("/Many/:type", {
                templateUrl: ""
            })
            .when("/All", {
                templateUrl: ""
            })
            .when("/About", {
                templateUrl: ""
            })
            .when("/one/:id", {
                templateUrl: ""
            });
    })
    