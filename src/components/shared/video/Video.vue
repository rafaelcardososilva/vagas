<template>
	<div class="item">
		<div class="thumb">
			<img :src="video.snippet.thumbnails.medium.url" width="170" height="96">
		</div>
		<div class="content">
			duration {{ video.contentDetails.duration }} <br>
			{{ video.snippet.title }} <br>
			<span class="glyphicon glyphicon-eye-open"></span>{{ video.statistics.viewCount | abreviaMilhar }} views
		</div>
	</div>
</template>

<script>
export default{
	props: ["video"]
}
</script>

<style scoped lang="sass">
	@import './style.scss';
</style>