define([], function() {
	return [ '$log', '$http', function($log, $http) {
		
    return {
			doTaskOne: doTaskOne,
			doTaskTwo: doTaskTwo
		};

		/**
		 * Task One
		 */
		function doTaskOne() {
			return $http.get('https://jsonplaceholder.typicode.com/users')
				.then(function(res) {
					return res.data;
			}, function(res) {
            return res.statusText;
			});
		}

		/**
		 * Task Two
		 */
		function doTaskTwo() {
			return $http.get('https://jsonplaceholder.typicode.com/todos')
				.then(function(res) {
					return res.data;
			}, function(res) {
            return res.statusText;
			});
		}

	}];
});