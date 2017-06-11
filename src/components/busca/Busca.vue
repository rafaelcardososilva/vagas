	<template>
	<div class="container">
		<h1>Todos os vídeos do Canal</h1>
		<div v-if="videos.length > 0">
			<div class="row videos">
				<div class="col-md-4 col-xs-2" v-for="video in videos">
					<item-video :video="video"></item-video>
				</div>
			</div>
		</div>
		<div v-else>
		  <h3>Nenhum resultado encontrado para sua busca :(</h3>
		</div>
		<div class="row">
			<carregar-mais @click.native="proximosVideos()" ref="bt"></carregar-mais>
		</div>
	</div>
</template>

<script>

import Botao from '../shared/botao/Botao.vue'
import Video from '../shared/video/Video.vue';
import VideoService from '../../services/VideoService.js'

export default{

	components:{
		"item-video" : Video,
		'carregar-mais' : Botao
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
						.listaComBusca(scope.filtro)
						.then(videos => scope.videos = videos);
			    }, 500); 
			}
		}
	},
	methods:{
		proximosVideos(){
			// inicia spinner
			this.$refs.bt.iniciaSpinner(false, true);

			this.videoService
				.listaMaisVideos()
				.then(videos => {
					this.videos = this.videos.concat(videos)

					// para spinner
					this.$refs.bt.iniciaSpinner(true, false);
				});
		}
	},
	created(){
		// cria servico de videos api
		this.videoService = new VideoService(this.$http);
		this.videoService
			.lista()
			.then(videos => this.videos = this.videos.concat(videos));
	}
}
</script>

<style scoped lang="sass">
	@import './style.scss';
</style>