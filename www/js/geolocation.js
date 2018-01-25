// This is a JavaScript file

// 現在地情報取得メソッド
function getCurrentPosition() {
    console.log("getCurrentPosition");
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
  
// 取得成功コールバック
function successCallback(position) {
    console.log("位置取得成功");
    createMap(position);
}

// 取得失敗コールバック
function errorCallback(e) {
    alert("現在位置取得失敗:" + e.code);
}

// 地図取得メソッド
function createMap(position) {
    
    // 緯度・経度を指定
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    // 地図オプションを指定
    var option = {
        zoom:16,
        center:latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // 地図を取得
    var map = new google.maps.Map(document.getElementById("map"), option);
    
    // マーカーを設定
    var marker = new google.maps.Marker({
        position: latlng, 
        map: map
    }); 
}



////////////////////////////////////////////////////////////////////////

//もうひとつのサンプル
var count = 1;
var currentWindow = null;
var map;
var marker;
var sampleMarker;
var geoOptions = {
  enableHighAccuracy : true, //精度を高める
	timeout : 6000, //タイムアウトは6秒
	maximumAge : 0 //キャッシュはさせない
}
getNowGps(); //1回目は自動で取得

//現在位置の取得
function getNowGps(){
  
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
		function (pos) {
			//取得状況
			//$('#n').html((count++) + "回目");
			$('#x').html(pos.coords.latitude);
			$('#y').html(pos.coords.longitude);

			var mapData = { 'x':pos.coords.latitude, 'y':pos.coords.longitude, 'balloon':'現在位置' };
			var latlng = new google.maps.LatLng(mapData.x, mapData.y);
			
      if( !map ){ //初回のみマップ生成
				var myOptions = { zoom: 10, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP };
				map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
			}
      
			if( marker ){ //現在地マーカーが設置されている場合は消去
				marker.setMap(null);
			}
      
			if( !sampleMarker ){ //初回のみ目的地マーカーを設置
				sampleMarker = { 'x':'34.687315', 'y':'135.526201', 'balloon':'大阪城' };
				makeMarker2( sampleMarker );
			}
      
			makeMarker( mapData ); //現在地マーカーを設置
		},
		
    function (error) {
			var msg;
			switch( error.code ){
				case 1: msg = "位置情報の利用が許可されていません"; break;
				case 2: msg = "位置が判定できません"; break;
				case 3: msg = "タイムアウトしました"; break;
			}
			alert(msg);
		});
	} else {
		alert("Geolocationが使えません");
	}
}

//マーカー作成
function makeMarker( mapData ){
	marker = new google.maps.Marker({
		position : new google.maps.LatLng(mapData.x,mapData.y), 
		map: map
	});

	var infoWindow = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, 'click', function() {
		if (currentWindow) {
			currentWindow.close();
		}
		infoWindow.setContent(mapData.balloon);
		infoWindow.open(map,marker);
		currentWindow = infoWindow;
	});
}

//マーカー作成
function makeMarker2( mapData ){
	var marker2 = new google.maps.Marker({
		position : new google.maps.LatLng(mapData.x,mapData.y), 
		map: map
	});

	var infoWindow = new google.maps.InfoWindow();
	google.maps.event.addListener(marker2, 'click', function() {
		if (currentWindow) {
			currentWindow.close();
		}
		infoWindow.setContent(mapData.balloon);
		infoWindow.open(map,marker2);
		currentWindow = infoWindow;
	});  
}

function msg(){
  alert('ボタンを押しましたね');
}

