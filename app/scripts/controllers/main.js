'use strict';

/**
 * @ngdoc function
 * @name sapientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sapientApp
 */
angular.module('sapientApp')
  .controller('MainCtrl', function ($scope, $http, $modal, $rootScope, $filter, promoCodeService) {

    //Fetch the data
    $http.get('/scripts/cart.json').then(function(response) {
		$scope.products = response.data.productsInCart;
		$scope.number_of_products = $scope.products.length;

    	$scope.updateCart();
	});

	$scope.updateCart = function() {
		$scope.total = 0;
		$scope.discount_rate = "No"
		angular.forEach($scope.products, function(filterObj , filterKey) { console.log($scope.total); $scope.total += filterObj.p_originalprice * filterObj.p_quantity; });
		$scope.number_of_products = $scope.products.length;

		// Discount rate logic
		if($scope.products.length > 2) {
			$scope.total = $scope.total * 0.95;
			$scope.discount_rate = "5%";
		}
	};

	$scope.applyCode = function() {
		//Calling the promotional code service
		var result = promoCodeService.applyCode($scope.promo_code);
		$scope.promo_discount = result.promo_discount;
		$scope.promo_applied = result.status; // to hide/show the promo code row
		$scope.promo_name = result.promo_name;
	};

	$scope.editDetails = function(details) { //passing the values to the modal
		$rootScope.selectedSize = details.p_selected_size.code;
		$rootScope.details_p_quantity = details.p_quantity;
		$rootScope.details_p_id = details.p_id;
		$rootScope.details_p_name = details.p_name;
		$rootScope.details_c_currency = details.c_currency;
		$rootScope.details_p_originalprice = details.p_originalprice;
		$rootScope.details_p_available_options = details.p_available_options;
		$rootScope.details_p_src = details.p_src;
	};

	$scope.details_p_quantity = [1,2,3,4];
	$scope.selectedSize = $rootScope.selectedSize;
	$scope.selectedQuantity = $rootScope.details_p_quantity;

	$scope.setSize = function(size) {
		$scope.selectedSize = size;
	};

	$scope.setQuantity = function(quantity) {
		$scope.selectedQuantity = quantity;
	};

	$scope.updateDetails = function(size, quantity, id, price) {
		($filter('filter')($scope.products, { p_id: id })[0].p_quantity) = quantity;
		($filter('filter')($scope.products, { p_id: id })[0].p_selected_size.code) = size;
		($filter('filter')($scope.products, { p_id: id })[0].p_originalprice) = price;
		$scope.updateCart();
		$('.edit-modal').modal('hide');
	};

  });
