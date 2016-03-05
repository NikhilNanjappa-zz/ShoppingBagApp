'use strict';

angular.module('sapientApp')
    .factory('promoCodeService', function ($http) {
        return {
            applyCode : function(promo_code){

                var data = { promo_name: promo_code, promo_discount: 0, status: false }

                if(promo_code == "JF10") {
                    data.promo_discount = 7;
                    data.status = true;
                } else if (promo_code == "MZ49") {
                    data.promo_discount = 4;
                    data.status = true;
                } else {
                    alert('Invalid promo code. Please try again');
                    data.status = false;
                }

                return data;
            }
        };
    });