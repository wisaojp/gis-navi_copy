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

var map, urlLanguage;


function myfuncWebSiteSelect(language){
  let langCheck, result;
  
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
  sW = window.innerWidth;
  sH = window.innerHeight;
  document.getElementById("map_canvas").style.height = (sH - 113) + 'px';
}

function init_info() {
  var info_canvas = document.getElementById("info_canvas");

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
          
          
          var infowindow = new google.maps.InfoWindow({
            content:"<div><button onclick='myFunction()'>Click me</button></div>"
            //"<a href='https://yahoo.com' onclick=\"cordova.InAppBrowser.open('http://yahoo.com','_blank', '');\">yahoo</a>"
            //"<div><script language='JavaScript' type='text/javascript'>function openWin(){newWin = window.open('http://www.yahoo.co.jp/','sampleWin','width=400,height=300,scrollbars=no,status=no,toolbar=no,location=no,menubar=no,resizable=yes');'newWin.focus();'"
              //  "<div><a href=" + json[i][0] + "height=500,>THE JUNEI HOTEL(ja)</a></div>"
            //<a href="./window.html" onclick="window.open('./window.html', '', 'width=500,height=400'); return false;">新しいウィンドウ</a>
            //
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

function myFunction(){
  //window.open("http://yahoo.com", "", "width=500,height=500");
  cordova.InAppBrowser.open('http://yahoo.com','_system', '');
}