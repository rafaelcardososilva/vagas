<template>
	<div class="modal fade" id="videoModal" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<button type="button" class="close" data-dismiss="modal">&times;</button>

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
					<p>{{ video.snippet.description }} </p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import InfoPop from '../../shared/info/Info.vue';

export default{

	props: ["video"],
	components:{
		"info-pop" : InfoPop
	},
	data(){
		return{
			viewTime: false,
			viewCount: false
		}
	}
}	

</script>

<style scoped lang="sass">
	@import '../../../assets/scss/utils.scss';
	@import './style.scss';
</style>
