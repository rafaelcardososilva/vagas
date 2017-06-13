	<template>
	<div class="container">
		<div v-if="videos.length > 0">
			<h1>{{ titulo }}</h1>
			<ul class="videos row"> 
				<li class="col-lg-4 col-md-6 col-xs-12" data-toggle="modal" data-target="#videoModal" v-for="video in videos"> 
					<item-video :video="video" @click.native="videoShow = video" ></item-video>
				</li>
				<video-modal v-if="videoShow" :video="videoShow"></video-modal>
			</ul>
		</div>
		<div v-else>
		  <h2>Nenhum resultado encontrado para sua busca :(</h2>
		</div>
		
		<carregar-mais @click.native="proximosVideos()" ref="bt"></carregar-mais>
	</div>
</template>

<script>

import Botao from '../shared/botao/Botao.vue'
import Video from '../shared/video/Video.vue';
import VideoModal from '../shared/video-modal/VideoModal.vue';
import VideoService from '../../services/VideoService.js'

export default{

	components:{
		"item-video" : Video,
		"carregar-mais" : Botao,
		"video-modal" : VideoModal

	},
	props:["filtro"],
	data(){
		return{ 
			videos: [],
			nextPage: "",
			videoShow: null,
			titulo: "Todos os vídeos do Canal"
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
						.then(videos => {
							scope.videos = videos;	

							// atualiza o titulo
							scope.titulo = "Resultados para: \""+scope.filtro+"\"";
						}); 
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