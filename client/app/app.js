angular.module("fitness", ["ngRoute", "controllers", "factories"])
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
        .when("/calendar", {
            templateUrl: "../views/calendar.html", 
            controller: "calendarController"
        })
        .when("/newlogin", {
            templateUrl: "../views/newlogin.html"
        })
        .when("/login", {
            templateUrl: "../views/login.html"
        })
        .when("/user", {
            templateUrl: "../views/user.html"
        })
});

angular.module('controllers', []);
angular.module('factories', []);