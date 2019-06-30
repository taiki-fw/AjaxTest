var xhr = new XMLHttpRequest(); //HTTPリクエストを送る本体のインスタンス
var btn = document.getElementById('btn');
var dataContainer = document.getElementById('dataContainer');
var list = document.getElementById('list')
var state = document.createElement('p');
state.textContent = "通信中";

btn.addEventListener('click', () => {
  //リクエストの初期化。リクエスト形式・リクエスト先・非同期通信
  xhr.open('GET', "./data.json", true); 
  // リクエスト先に送信するデータ無し
  xhr.send(null);

  // サーバーとの通信中のイベント
  xhr.onprogress = () => { 
    dataContainer.appendChild(state);
  }

  // サーバーからの受信が成功した際のイベント
  xhr.onload = () => {
    setTimeout(() => {
      dataContainer.removeChild(state);
      var data = JSON.parse(xhr.responseText);
      for(let i = 0; i < data.length; i ++) {
        var term = document.createElement('dt');
        var description = document.createElement('dd');
        term.textContent = data[i].name;
        description.textContent = data[i].description;
        dataContainer.appendChild(term);
        dataContainer.appendChild(description);
      }
      btn.style = "display: none;"
    }, 3000);
  }
  
  // サーバーからの受信に失敗した際のイベント
  xhr.error = () => {
    state.textContent = "サーバーとの接続に失敗しました。"
  }
})