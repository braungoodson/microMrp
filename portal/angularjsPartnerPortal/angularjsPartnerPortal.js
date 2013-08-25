var app = angular.module('angularPartnerPortal',['$controllerProvider',function ($controllerProvider) {
	$controllerProvider.register(
		'Home',
		['$scope', function ($scope) {$scope.title = "Home Page";}]
	);
}]);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/home',{
			controller: 'homeController',
			templateUrl: 'home.html'
		})
		.otherwise({redirectTo:'/home'});
});

app.controller('homeController',function ($scope,$http) {
	console.log($scope,$http);
});

