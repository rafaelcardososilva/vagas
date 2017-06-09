export default class VideoService{

	constructor( http ){

		this._http = http,
		this._channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw",
		this._apiKey = "AIzaSyAV_AkA0fP_RRaJU2YjzbGXGghQ6xdNBAE",
		this._nextPage = "",
		this._maxVideos = 12;
	}

	lista(filtro){

		// confere se tem filtro
		filtro = filtro != undefined ? "&q="+filtro : "";

		// "&pageToken="+this._nextPage+ paginacao


		// get videos
		var promise = this._http.get("https://www.googleapis.com/youtube/v3/search?key="+this._apiKey+"&channelId="+this._channelId+"&part=snippet&order=date&maxResults="+this._maxVideos+"&"+filtro);
		
		console.log("https://www.googleapis.com/youtube/v3/search?key="+this._apiKey+"&channelId="+this._channelId+"&part=snippet&order=date&maxResults="+this._maxVideos+"&"+filtro);

		// salva a proxima pagina
		promise.then(res =>{
			this._nextPage = res.data.nextPageToken == undefined ? "" : res.data.nextPageToken
		});

		// retorna os videos
		return promise.then(res => this.getVideoDetalhe(res.data.items))
	}

	getVideoDetalhe(items){

		var scope = this;

		// percorre todos os videos para pega o detalhe
		var promise = items.map(function(item){

			return scope._http.get("https://www.googleapis.com/youtube/v3/videos?id="+item.id.videoId+"&key="+scope._apiKey+"&part=snippet,contentDetails,statistics,status")
			.then(res => res.data.items[0])
		});

		return Promise.all(promise);
	}
}