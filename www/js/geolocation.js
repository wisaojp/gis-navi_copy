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
 