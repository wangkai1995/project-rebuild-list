'use strict';

module.exports = ['$http', '$state', '$q',  'Constants', function($http, $state, $q, Constants) {

    var httpHandler = function (oConfig, sCallback) {
            var deferred = $q.defer();

            // send request
            $http(oConfig).then(function(oRes) {
                if (sCallback) {
                    deferred.resolve(sCallback(oRes.data))
                } else {
                    deferred.resolve(oRes.data);
                }
            }, function(oRes) {
                var sName = $state.current.name,
                    isIndex = true;//sName.match('login') === null && sName.match('activation') === null;

                // if index page, no need redirect stuff
                if (isIndex) {
                    switch (oRes.status) {
                        case 401: break;
                        case 403: break;
                        case 500: break;
                        case 501: break;
                        case 502: break;
                        default:
                            deferred.reject({
                                message: oRes.data && oRes.data.message ? oRes.data.message : '通信失败, 请检查网络或请稍后再试!',
                                status: oRes.status
                            });
                    }
                } else {
                    deferred.reject({
                        message: oRes.data && oRes.data.message ? oRes.data.message : '通信失败, 请检查网络或请稍后再试!',
                        status: oRes.status
                    });
                }
            })

            return deferred.promise;
        };

    return {
        // normal request
        request : function(method, params, sCallback) {
            var parameters = {
                "jsonrpc": "2.0",
                "method": method,
                "params": params,
                "id": 1,
            };
            var config = {};
            // update config url
            config.url = Constants.settings.host;
            config.method = 'POST';
            config.data = parameters;
            
            return httpHandler(config, sCallback);
        }
    }
}]
