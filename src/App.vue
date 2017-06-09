<template>

	<div class="site">
		<header>
			<router-link to="/">
				<div class="logo">
					<span class="glyphicon glyphicon-expand "></span>
				</div>
			</router-link>

			<ul class="menu">
				<li>
					<router-link to="/busca">
						<input type="search" @input="filtro = $event.target.value" @blur="limpaInput()" v-if="exibeInput" autofocus />
						<span class="glyphicon glyphicon-search" v-on:click="exibeInput = !exibeInput"></span>
					</router-link>
				</li>
				<li>
					<label>Menu</label>
					<span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
				</li>		
			</ul>
		</header>
	  
		<router-view :filtro="filtro"></router-view>
	</div>

</template>

<script>
export default {
	data(){
		return{
			exibeInput: false,
			filtro: ""
		}
	},
	methods:{
		limpaInput(){
			this.filtro = "";
			this.exibeInput = false;
		}
	}
}
</script>

<style lang="sass">
  @import './style.scss';
</style>
