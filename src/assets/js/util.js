module.exports = function(Vue){
	
	Vue.filter('formatDate', function(value) {
	  if (value) {
	    return moment(String(value)).format('MM/DD/YYYY hh:mm')
	  }
	});

}