angular.module("fitness", ["ngRoute", "controllers"])
.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "../views/home.html"
        })
        .when("/type/:type", {
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
        .when("/category/:type", {
            templateUrl: "../views/category.html"
        })
});

angular.module('controllers', []);
