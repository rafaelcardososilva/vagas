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
								{{ video.snippet.title }} 
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
						<button @click="carregaVideos()"><span>Carregas mais vídeos...</span></button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import Video from '../shared/video/Video.vue';
import VideoService from '../../services/VideoService.js'

export default{

	components:{
		'item-video' : Video
	},
	data(){
		return{
			videos: [],
			videoPlay: [],
			nextPage: "",
		}
	},
	methods:{
		carregaVideos(){
			this.videoService
				.lista()
				.then(videos => {
					// exibe mais videos
					this.videos = this.videos.concat(videos)

					// exibe video em destaque (considero o primeiro)
					this.videoPlay = this.videoPlay.concat(videos[0])
				});
		},
		assistir(video){
			this.videoPlay = [];
			this.videoPlay = this.videoPlay.concat(video)
		}
	},
	created(){

		this.videoService = new VideoService(this.$http);
		this.carregaVideos();
	}
}

</script>

<style scoped lang="sass">
	@import './style.scss';
</style>