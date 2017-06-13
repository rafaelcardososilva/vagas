<template>
	<div class="item">
		<div class="thumb">
			<img :src="video.snippet.thumbnails.medium.url">
			<span class="video-duracao">{{ video.contentDetails.duration | duracao }}</span>
		</div>
		<div class="content">			
			<h4>{{ video.snippet.title | abreviado }}</h4>
			<div class="view-container">
				<span class="glyphicon glyphicon-eye-open"></span>
				<span>{{ video.statistics.viewCount | milhar }} views</span>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	props: ["video"]
}
</script>

<style scoped lang="sass">
	@import '../../../assets/scss/utils.scss';
	@import './style.scss';
</style>