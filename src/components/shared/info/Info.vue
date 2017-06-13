<template>
	<div class="info-pop">{{ info }}</div>
</template>

<script>
export default{
	props: ["info"]
}	

</script>

<style scoped lang="sass">
	@import '../../../assets/scss/utils.scss';
	@import './style.scss';
</style>