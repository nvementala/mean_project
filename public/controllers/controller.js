var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
    console.log("Hello World from Controller");

    var refresh = function (){
        $http.get("/contactlist").then( function(response){
            console.log("received data from server");
            $scope.contactList = response.data;
            $scope.contact = {};
        });
    };

    refresh();

    $scope.addContact = function(){
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact).then(function (response){
            console.log(response);
            refresh();
        });
    }
}]);

