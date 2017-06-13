import Vue from 'vue'
import moment from 'moment'

Vue.filter("dataBr", function(value) {
 	if (value) {
	    return moment(String(value)).locale("pt-br").format("LL");
	}
});

Vue.filter("abreviado", function(value) {
 	if (value) {
	    if(value.length > 58){
	    	return value.slice(0,40)+" ..."
	    }else{
	    	return value;
	    }
	}
});

Vue.filter("duracao", function(value) {
 	if (value) {
 		if(value.indexOf("M") != -1){
 			return value.replace("M", ":").replace(/[a-zA-Z]+/g, "")
 		}else{
 			return value.replace("PT", "0:").replace(/[a-zA-Z]+/g, "")
 		}	    	
	}
});

Vue.filter("milhar", function(value){
	if (value >= 1000) {
	    return Math.round(value/1000, 1) + "k";
	} else {
	    return value;
	}
});