<template>
	<div class="container">
		<div class="row">
			<div class="col-md-8">
				<h1>Vídeo em destaque</h1>
				<div v-for="video in videoPlay">
					<div>
						<iframe width="560" height="315" :src='"https://www.youtube.com/embed/"+video.id' frameborder="0" allowfullscreen></iframe>
					</div>
					<div>
						<div>
							<div class="col-md-10">
								{{ video.snippet.title }} <br>
								{{ video.statistics.viewCount }} views <br>
								{{ video.snippet.publishedAt | formataData }}
							</div>
							<div class="col-md-2">
							</div>
						</div>
						<p>{{ video.snippet.description }} </p>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<h2>+ Vídeos</h2>
				<div>
					<div>
						<div class="col-md-12" v-for="video in videos">
							<item-video :video="video" @click.native="assistir(video)"></item-video>
						</div>
						<carregar-mais @click.native="proximosVideos()" ref="bt"></carregar-mais>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import Botao from '../shared/botao/Botao.vue'
import Video from '../shared/video/Video.vue';
import VideoService from '../../services/VideoService.js'

export default{

	components:{
		'item-video' : Video, 
		'carregar-mais' : Botao
	},
	data(){
		return{
			videos: [],
			videoPlay: [],
			nextPage: ""
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
	@import './style.scss';
</style>