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
.controller('singleCtrl', function($http, $scope,$routeParams, $location, $sce){
    var id = $routeParams.id
    $http.get('http://localhost:3000/api/coach/'+id)
        .then(function(success) {

            let data = success.data;
            
            if (data.video) {
                data.video = $sce.trustAsResourceUrl(data.video);
            }

            $scope.coach = data;
            console.log(success.data)
        }, function (err){
            alert('something else went wrong')
        })
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