<template>
	<div class="container">
		<div class="row">
			<div class="destaque-container col-md-7">
				<h1>Vídeo em destaque</h1>
				<div v-for="video in videoPlay">
					<div class="embed-responsive embed-responsive-16by9">
						<iframe :src='"https://www.youtube.com/embed/"+video.id' class="embed-responsive-item" frameborder="0" allowfullscreen></iframe>
					</div>
					<div class="detalhe">
						<div class="row">
							<div class="col-md-10">
								<h4>{{ video.snippet.title }}</h4>
							</div>
							<div class="icones col-md-2">
								<span class="glyphicon glyphicon-eye-open" @mouseover="viewCount = !viewCount" @mouseleave="viewCount = !viewCount">
									<info-pop v-if="viewCount" :info='video.statistics.viewCount + " views"'></info-pop>
								</span>
								<span class="glyphicon glyphicon-time" @mouseover="viewTime = !viewTime" @mouseleave="viewTime = !viewTime">
									<info-pop v-if="viewTime" :info="video.snippet.publishedAt | dataBr"></info-pop>
								</span>
							</div>
						</div>
						<p :class="{ textosegredo : !viewDesricao }" @click="viewDesricao = !viewDesricao">{{ video.snippet.description }} </p>
					</div>
				</div>
			</div>
			<div class="col-md-5">
				<h2>+ Vídeos</h2>
				<div class="videos-container">
					<div class="wrapper">
						<item-video :video="video" @click.native="assistir(video)" v-for="video in videos"></item-video>
					</div>
					<carregar-mais @click.native="proximosVideos()" ref="bt"></carregar-mais>
				</div>
			</div>
		</div>
	</div>



</template>

<script>

import Botao from '../shared/botao/Botao.vue'
import Video from '../shared/video/Video.vue';
import InfoPop from '../shared/info/Info.vue';
import VideoService from '../../services/VideoService.js'

export default{

	components:{
		'item-video' : Video, 
		'carregar-mais' : Botao,
		"info-pop" : InfoPop
	},
	data(){
		return{
			videos: [],
			videoPlay: [],
			nextPage: "",
			viewTime: false,
			viewCount: false,
			viewDesricao: false
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
		},
		assistir(video){
			this.videoPlay = [];
			this.videoPlay = this.videoPlay.concat(video)
		}
	},
	created(){
		// cria servico de videos api
		this.videoService = new VideoService(this.$http);
		this.videoService
			.lista()
			.then(videos => {
				this.videos = this.videos.concat(videos)

				// exibe video em destaque (considero o primeiro)
				this.videoPlay = this.videoPlay.concat(videos[0])
			});
	}
}

</script>

<style scoped lang="sass">
	@import '../../assets/scss/utils.scss';
	@import './style.scss';
</style>