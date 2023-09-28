
//天気情報をリクエストする処理を追記する
// （API_KEY には、"取得したAPIキー" を記述）
const API_KEY = "87bc08a5e21e8c1add426d97a19b69f1";

//検索」ボタン（#btn）がクリックされたときの処理を記述します。
$(function(){
  $('#btn').on('click', function() {
    //「検索」ボタンは、index.htmlファイルで<button id="btn">で設定しているので、script.jsファイルでは$('#btn')で取得します。
    //.on('click', function()の記述は、すでにおなじみですね。「検索」ボタンがクリックされたときの処理を、それ以後の行に記述します。

    // 入力された都市名でWebAPIに天気情報をリクエスト
    $.ajax({
      //$.ajax()は、Ajaxを実装するメソッドです。
      //オプション（パラメータ）も設定できます。今回は、urlとdataTypeの2つを設定しています。
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + $('#cityname').val() + "&units=metric&appid=" + API_KEY,
      //url:では、APIにリクエストするURLを指定します。
      //$('#cityname').val()で#citynameの値を受け取り、URLを結合させています。（val()は、HTMLのvalue属性を取得するメソッド）
      dataType : 'jsonp',
    //成功時と失敗時の処理を追記する
    }).done(function (data){
      //$('#id名').text(JSONから欲しい値)の形で指定すると、指定したidのテキストを、JSONから受け取った値に変換されます。
      // 位置
      $('#place').text(data.name);
      // 最高気温
      $('#temp_max').text(data.main.temp_max);
      // 最低気温
      $('#temp_min').text(data.main.temp_min);
      //湿度
      $('#humidity').text(data.main.humidity);
      //風速
      $('#speed').text(data.wind.speed);
      // 天気
      $('#weather').text(data.weather[0].main);
      // 天気アイコン
      $('img').attr("src","http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
      $('img').attr("alt",data.weather[0].main);
      //通信成功
    }).fail(function (data) {
      //通信失敗
      alert('通信に失敗しました。');
    })
  });
});