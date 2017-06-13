<template>

	<div class="site">
		<header>
			<div class="container">
				<div class="row">
					<div class="logo-container col-xs-6">
						<router-link to="/">
							<span class="glyphicon glyphicon-expand icone"></span>
							<span class="nome hidden-xs">Fictícia vídeos</span>
						</router-link>
					</div>

					<ul class="menu-container col-xs-6">
						<li class="busca-container hidden-xs">
							<div class="busca">
								<router-link to="/busca">
									<input type="search" @input="filtro = $event.target.value" @blur="limpaInput()" :class="{ visiblehidden: !exibeInput}" autofocus />
									<span class="glyphicon glyphicon-search link" @click="exibeInput = !exibeInput"></span>
								</router-link>
							</div>
						</li>
						<li class="dropdown">
							<div class="dropdown-toggle link" data-toggle="dropdown">
								<label class="hidden-xs">Menu</label>
								<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
							</div>
							<ul class="dropdown-menu dropdown-menu-right">
								<li><a href="#"><span class="glyphicon glyphicon-star-empty"></span>Destaques</a></li>
								<li><router-link to="/busca"><span class="glyphicon glyphicon-play-circle"></span>Vídeos</router-link></li>
							</ul>
						</li>		
					</ul>
				</div>
			</div>
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
	@import './assets/scss/utils.scss';
	@import './style.scss';
</style>
