export default class VideoService{

	constructor( http ){

		this._http = http,
		this._channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw",
		this._apiKey = "AIzaSyAV_AkA0fP_RRaJU2YjzbGXGghQ6xdNBAE",
		this._nextPage = "",
		this._maxVideos = 12;
	}

	lista(){


		// salva a proxima pagina
		// this._nextPage = res.data.nextPageToken;

		// get videos
		let promise = this._http.get("https://www.googleapis.com/youtube/v3/search?key="+this._apiKey+"&channelId="+this._channelId+"&part=snippet&order=date&maxResults="+this._maxVideos+"&pageToken="+this._nextPage);
		return promise.then(res => res.data.items);
		
	}

	getVideosDetalhes(item){

		var scope = this,
			videos = [];

		// percorre todos os videos para pegar os detalhes
		
		items.forEach(function(item, i){
			let promise = scope._http.get("https://www.googleapis.com/youtube/v3/videos?id="+item.id.videoId+"&key="+scope._apiKey+"&part=snippet,contentDetails,statistics,status");
			promise.then(res => {
				videos.push(res.data.items[0]);
			});
		});

	}

}