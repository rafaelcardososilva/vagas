	<template>
	<div class="container">
		<h1>Todos os vídeos do Canal</h1>
		<div class="row videos">
			<div class="col-md-4 col-xs-2" v-for="video in videos">
				<item-video :video="video"></item-video>
			</div>
		</div>
		<div class="row">
			<button @click="loadVideos()"><span>Carregas mais vídeos...</span></button>
		</div>
	</div>
</template>

<script>

import Video from '../shared/video/Video.vue';
import VideoService from '../../services/VideoService.js'

export default{

	components:{
		"item-video" : Video
	},
	props:["filtro"],
	data(){
		return{ 
			videos: [],
			nextPage: "",
		}
	},
	watch:{
		filtro: function(value){
			var scope = this;

			// faz a busca com filtro e delay para buscar com string maior
			clearTimeout(this.delayTimer);
			if( value != "" ){
			    this.delayTimer = setTimeout(function() {
			        
					// lista videos com busca
					scope.videoService
						.lista(scope.filtro)
						.then(videos => scope.videos = videos);
			    }, 500); 
			}
		}
	},
	methods:{
		loadVideos(){
			this.videoService
				.lista()
				.then(videos => this.videos = this.videos.concat(videos));
		}
	},
	created(){

		this.videoService = new VideoService(this.$http);
		this.loadVideos();
	}
}
</script>

<style scoped lang="sass">
	@import './style.scss';
</style>