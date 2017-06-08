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

export default{

	components:{
		'item-video' : Video
	},
	data(){
		return{
			videos: [],
			nextPage: ""
		}
	},
	methods:{
		loadVideos(){
			var scope = this,
				channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw",
				apiKey = "AIzaSyAV_AkA0fP_RRaJU2YjzbGXGghQ6xdNBAE",
				urlListVideos = "https://www.googleapis.com/youtube/v3/search?key="+apiKey+"&channelId="+channelId+"&part=snippet&order=date&maxResults=12";

			// get videos
			let promise = scope.$http.get(urlListVideos + "&pageToken=" + scope.nextPage);
			promise.then(res => {

				// save next page
				scope.nextPage = res.data.nextPageToken;
				
				// get details video
				res.data.items.forEach(function(item, i){
					let promise = scope.$http.get("https://www.googleapis.com/youtube/v3/videos?id="+item.id.videoId+"&key="+apiKey+"&part=snippet,contentDetails,statistics,status");
					promise.then(res => {
						scope.videos.push(res.data.items[0]);
					});
				});
			});
		}
	},
	created(){
		this.loadVideos();			
	}
}
</script>

<style scoped lang="sass">
	@import './style.scss';
</style>