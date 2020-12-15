define( [], function(){ return selectOnClick; } );
 
/**
 * Select on Click Directive
 */
function selectOnClick() {
	return {
        restrict: 'A',
        link: function (scope, element) {
            var focusedElement;
            element.on('click', function () {
                if (focusedElement != this) {
                    this.select();
                    focusedElement = this;
                    try {
                        var successful = document.execCommand('copy');
                        if (!successful) throw successful;
                    } catch (err) {
                        console.log(err);
                    }
                }
            });
            element.on('blur', function () {
                focusedElement = null;
            });
        }
    };
};