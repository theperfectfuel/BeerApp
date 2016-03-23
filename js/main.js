angular.module('beerApp', ['ngRoute', 'ngAnimate', 'firebase'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: './views/home.html',
			controller: 'beerCtrl'
		})
		.when('/new-recipe', {
			templateUrl: './views/new-recipe.html',
			controller: 'newRecipeCtrl'
		})
		.when('/list-recipes', {
			templateUrl: './views/list-recipes.html',
			controller: 'listRecipesCtrl'
		})
		.when('/list-recipes/:recipeID', {
			templateUrl: './views/beer-recipe.html',
			controller: 'showBeerCtrl'
		})
		.when('/shopping-list/:recipeID', {
			templateUrl: './views/shopping-list.html',
			controller: 'shoppingListCtrl'
		})
		.when('/shopping-lists', {
			templateUrl: './views/shopping-lists.html',
			controller: 'listShoppingListsCtrl'
		})
		.otherwise('/home');
	}])

	.factory('recipeRequest', function() {

		return function(recipeID) {
			return ("Hello: " + recipeID);
		};

	})

	.controller('navCtrl', ['$scope', function($scope) {
		$scope.title = "Make Beer!";
	}])

	.controller('beerCtrl', ['$scope', function($scope) {
		$scope.maintitle = "Let's Brew Some Beer!";

	}])

	.controller('newRecipeCtrl', ['$scope', function($scope) {
		$scope.recipetitle = "Create a New Recipe";

		$scope.grains_list = [];
		$scope.grains_list_obj = {};

		$scope.hops_list = [];
		$scope.hops_list_obj = {};

		$scope.yeast_list = [];
		$scope.yeast_list_obj = {};

		$scope.other_list = [];
		$scope.other_list_obj = {};

		$scope.pushGrains = function() {
	      $scope.grains_list.push({grains_type:$scope.grains_type, grains_amount:$scope.grains_amount});
	      $scope.grains_type = "";
	      $scope.grains_amount = "";
	      $scope.grains_list_obj = angular.copy($scope.grains_list);
	    };

		$scope.pushHops = function() {
	      $scope.hops_list.push({hops_type:$scope.hops_type, hops_amount:$scope.hops_amount});
	      $scope.hops_type = "";
	      $scope.hops_amount = "";
	      $scope.hops_list_obj = angular.copy($scope.hops_list);
	    };

		$scope.pushYeast = function() {
	      $scope.yeast_list.push({yeast_type:$scope.yeast_type, yeast_amount:$scope.yeast_amount});
	      $scope.yeast_type = "";
	      $scope.yeast_amount = "";
	      $scope.yeast_list_obj = angular.copy($scope.yeast_list);
	    };

		$scope.pushOther = function() {
	      $scope.other_list.push({other_ingredient:$scope.other_ingredient, other_amount:$scope.other_amount});
	      $scope.other_ingredient = "";
	      $scope.other_amount = "";
	      $scope.other_list_obj = angular.copy($scope.other_list);
	    };

		$scope.recipes = new Firebase("https://fiery-torch-5303.firebaseio.com/Recipes");

		$scope.addRecipe = function() {
			$scope.recipes.push({
				beer_name: $scope.beer_name,
				beer_style: $scope.beer_style,
				beer_abv: $scope.beer_abv,
				grains_list: $scope.grains_list_obj,
				hops_list: $scope.hops_list_obj,
				yeast_list: $scope.yeast_list_obj,
				other_list: $scope.other_list_obj,
				orig_grav: $scope.orig_grav,
				final_grav: $scope.final_grav,
				brew_difficulty: $scope.brew_difficulty,
				batch_size: $scope.batch_size,
				brew_instructions: $scope.brew_instructions

			});
			$scope.beer_name = "";
			$scope.beer_style = "";
			$scope.beer_abv = "";
			$scope.grains_type = "";
			$scope.grains_amount = "";
			$scope.hops_type = "";
			$scope.hops_amount = "";
			$scope.yeast_type = "";
			$scope.yeast_amount = "";
			$scope.orig_grav = "";
			$scope.final_grav = "";
			$scope.brew_difficulty = "";
			$scope.batch_size = "";
			$scope.other_ingredient = "";
			$scope.other_amount = "";
			$scope.brew_instructions = "";
		};


	}])

	.controller('listRecipesCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

		var recList = new Firebase("https://fiery-torch-5303.firebaseio.com/Recipes");
		$scope.datas = $firebaseArray(recList);
		//$scope.datas.$loaded().then(function(array) {});
	}])

	.controller('showBeerCtrl', ['$scope', '$routeParams', '$route', '$firebaseObject', 'recipeRequest', function($scope, $routeParams, $route, $firebaseObject, recipeRequest) {

		$scope.recipeID = $routeParams.recipeID;

		var beerRecipe = new Firebase("https://fiery-torch-5303.firebaseio.com/Recipes/" + $scope.recipeID);
		$scope.beer_recipe = $firebaseObject(beerRecipe);

		$scope.beer_recipe.$loaded().then(function(object) {

		});


	}])

	.controller('shoppingListCtrl', ['$scope', '$route', '$routeParams', '$firebaseObject', function($scope, $route, $routeParams, $firebaseObject) {

		$scope.recipeID = $routeParams.recipeID;



		var beerRecipe = new Firebase("https://fiery-torch-5303.firebaseio.com/Recipes/" + $scope.recipeID);
		$scope.beer_recipe = $firebaseObject(beerRecipe);


		$scope.newShoppingList = function() {
			$scope.shoppingList = new Firebase("https://fiery-torch-5303.firebaseio.com/ShoppingLists");

			$scope.beer_recipe.$loaded().then(function() {

				$scope.shoppingList.push({
				beer_name: $scope.beer_recipe.beer_name,
				grains_list: $scope.beer_recipe.grains_list,
				hops_list: $scope.beer_recipe.hops_list,
				yeast_list: $scope.beer_recipe.yeast_list,
				other_list: $scope.beer_recipe.other_list,
				batch_size: $scope.beer_recipe.batch_size
				});

			});

	    };

    	$scope.newShoppingList();

	}])

	.controller('listShoppingListsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

		var shopLists = new Firebase("https://fiery-torch-5303.firebaseio.com/ShoppingLists");
		$scope.datas = $firebaseArray(shopLists);
		//$scope.datas.$loaded().then(function(array) {});
	}]);



