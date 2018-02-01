// This is a JavaScript file
//グローバル変数一元管理用

var count = 1;
var currentWindow = null;
var gpsmarker;
var sampleMarker;

var map, urlLanguage, URL;


var geoOptions = {
  enableHighAccuracy : true, //精度を高める
  timeout : 6000, //タイムアウトは6秒
	maximumAge : 0 //キャッシュはさせない
}

