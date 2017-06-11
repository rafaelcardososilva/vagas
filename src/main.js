import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { routes } from './routes';
import moment from 'moment'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './assets/js/util.js'

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
	routes: routes,
	mode: "history"
});

Vue.filter("formataData", function(value) {
 	if (value) {
	    return moment(String(value)).locale("pt-br").format("LL");
	}
});

Vue.filter("abreviaMilhar", function(value){
	if (value >= 1000) {
	    return Math.round(value/1000, 1) + "k";
	} else {
	    return value;
	}
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});