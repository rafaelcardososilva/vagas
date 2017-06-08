<template>

	<div class="site">
		<header>
			<div class="logo">
				<span class="glyphicon glyphicon-expand "></span>
			</div>

			<ul class="menu">
				<li><router-link to="/busca"><span class="glyphicon glyphicon-search"></span></router-link></li>
				<li>
					<label>Menu</label>
					<span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
				</li>		
			</ul>
		</header>
	  
		<router-view></router-view>
	</div>

</template>

<script>
export default {
}
</script>

<style lang="sass">
  @import './style.scss';
</style>
