<template>

	<div class="bt">
		<button v-if="exibeBotao">
			<span>Carregar mais vídeos...</span>
		</button>
		<i class="fa fa-spinner fa-spin" v-if="exibeSpinner"></i>
	</div>
</template>

<script>

export default{
	data(){
		return{
			exibeBotao: true,
			exibeSpinner: false
		}
	},
	methods:{
		iniciaSpinner(botao, spinner){
			this.exibeBotao = botao;
			this.exibeSpinner = spinner;
		}
	}
}

</script>

<style scoped lang="sass">
	@import '../../../assets/scss/utils.scss';
	@import './style.scss';
</style>