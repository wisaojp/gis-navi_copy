// This is a JavaScript file

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  navigator.globalization.getPreferredLanguage(
    function (language) {
      console.log('language: ' + language.value + '\n');
      myfuncWebSiteSelect(language.value);
    },
    function () {
      console.log('Error getting language\n');
    }
  );
}



function myfuncWebSiteSelect(language){
  var langCheck, result, url;
  
  langCheck = language.substring(0, 2);//左2文字を取り出す
  
  if(langCheck === "zh"){ //中国語の場合は文字取り出す
      result = language.substring(0, 7);
  }
  else{　//それ以外の場合はlangcheckの値そのまま
    result=langCheck;
  }
    
  //言語による条件分岐
  if(result === 'ja'){
    url = 'ja';  
  }
  else if(result === 'en'){
    url = 'en';
  }
  else if(result === 'zh-CN' || result === 'zh-Hans'){ //簡体中国語
    url = 'zh-CN';//中国語（中華人民共和国)のページを開く
  }
  else if(result === 'zh-HK' || result === 'zh-TW' || result === 'zh-Hant'){　//繁体中国語
    url = 'zh-TW';//中国語（台湾)のページを開く
  }
  else{
    url = 'en';
  }
  urlLanguage = 'data/'+url+'.json';
  console.log("url:" + urlLanguage);
  
  init();//ここで呼び出し
}

function init() {
  if (navigator.geolocation) {
      // 現在の位置情報取得
      navigator.geolocation.getCurrentPosition(
          function(pos) {
              lat = 0;
              lng = 0;
              init_map(lat, lng);
          },
          function() {
              init_map(lat, lng);
          }
      );
  } else {
      init_map(lat, lng);
  }
}

function init_map(lat, lng) {
  var mapOptions = {
      //中心地設定
      center: new google.maps.LatLng(lat, lng),
      //ズーム設定
      zoom: 15,
      //地図のタイプを指定
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
  getWindowSize();
  init_info();
}


function getWindowSize() {
  var sW,sH;
  sW = window.innerWidth;//ウィンドウ幅を取得
  sH = window.innerHeight;//ウインドウ高さを取得
  document.getElementById("map_canvas").style.height = (sH - 113) + 'px';
}


function init_info() {
  var info_canvas = document.getElementById("info_canvas");

  getNowGPS();

  //Ajax通信
  $.ajax({
    type: 'GET',
    url: urlLanguage,
    dataType: 'json',
    
    success: function(json){
      var len = json.length;
      
      for(var i=0; i < len; i++){//複数登録するのでfor
        pos = {
          lat: json[i][2],
          lng: json[i][3]
        };
        var marker = new google.maps.Marker({
          position: pos,
          map: map
        });
        URL = json[i][0];                    
        var infowindow = new google.maps.InfoWindow({
          content:"<div><button onclick='browserOpen()'>THE JUNEI HOTEL</button></div>"
            //content:"<div><a href=" + json[i][0] + "height=500,>THE JUNEI HOTEL</a></div>"
        });
        infowindow.open(map, marker);
      }
      
    },
      //エラー処理
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert(textStatus);
    }
  });
}

function browserOpen(){//システムのブラウザを開く
  //window.open("http://yahoo.com", "", "width=500,height=500");
  cordova.InAppBrowser.open(URL,'_system', '');
}

function msg(){
  alert("ようこそ！！");
}
//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・

//現在位置の取得
function getNowGPS(){
  
  if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(
		function (pos) {
			//取得状況
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
		alert("本ブラウザではGeolocationが使えません");
	}
}

//現在地マーカー作成
function gpsMarker( mapData ){
	marker = new google.maps.Marker({
		position : new google.maps.LatLng(mapData.x,mapData.y), 
		map: map, 
		icon: "1.png"
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

//目的地マーカー作成
function targetMarker( mapData ){
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

