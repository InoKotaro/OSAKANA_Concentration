//整数乱数作成
function rand(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

//カード作成
let cards = [
"鯛", "鰍", "鮪", "鮭", "鰈", "鰹", "鰻", "鯲", "鰕", "鰯", "鰣", "鯰", "鱏", "鯣", "鮴", "鰺", "鯏", "鮑", "鯖", "魚",
"鯛", "鰍", "鮪", "鮭", "鰈", "鰹", "鰻", "鯲", "鰕", "鰯", "鰣", "鯰", "鱏", "鯣", "鮴", "鰺", "鯏", "鮑", "鯖", "魚",
  // "<ruby><rb>鯛</rb><rt>たい</rt></ruby>",  
  // "<ruby><rb>鯛</rb><rt>たい</rt></ruby>",   
  // "<ruby><rb>鮪</rb><rt>まぐろ</rt></ruby>",
  // "<ruby><rb>鮪</rb><rt>まぐろ</rt></ruby>",
  // "<ruby><rb>鰍</rb><rt>かじか</rt></ruby>",
  // "<ruby><rb>鰍</rb><rt>かじか</rt></ruby>",
  // "<ruby><rb>鮭</rb><rt>さけ</rt></ruby>",
  // "<ruby><rb>鮭</rb><rt>さけ</rt></ruby>",
  // "<ruby><rb>鰈</rb><rt>かれい</rt></ruby>",
  // "<ruby><rb>鰈</rb><rt>かれい</rt></ruby>",
  // "<ruby><rb>鰹</rb><rt>かつお</rt></ruby>",
  // "<ruby><rb>鰹</rb><rt>かつお</rt></ruby>",
  // "<ruby><rb>鰻</rb><rt>うなぎ</rt></ruby>",
  // "<ruby><rb>鰻</rb><rt>うなぎ</rt></ruby>",
  // "<ruby><rb>鯲</rb><rt>どじょう</rt></ruby>",
  // "<ruby><rb>鯲</rb><rt>どじょう</rt></ruby>",
  // "<ruby><rb>鰕</rb><rt>えび</rt></ruby>",
  // "<ruby><rb>鰕</rb><rt>えび</rt></ruby>",
  // "<ruby><rb>鰯</rb><rt>いわし</rt></ruby>",
  // "<ruby><rb>鰯</rb><rt>いわし</rt></ruby>",
  // "<ruby><rb>鰣</rb><rt>はす</rt></ruby>",
  // "<ruby><rb>鰣</rb><rt>はす</rt></ruby>",
  // "<ruby><rb>鯰</rb><rt>なまず</rt></ruby>",
  // "<ruby><rb>鯰</rb><rt>なまず</rt></ruby>",
  // "<ruby><rb>鱏</rb><rt>えい</rt></ruby>",
  // "<ruby><rb>鱏</rb><rt>えい</rt></ruby>",
  // "<ruby><rb>鯣</rb><rt>するめ</rt></ruby>",
  // "<ruby><rb>鯣</rb><rt>するめ</rt></ruby>",
  // "<ruby><rb>鮴</rb><rt>めばる</rt></ruby>",
  // "<ruby><rb>鮴</rb><rt>めばる</rt></ruby>",
  // "<ruby><rb>鰺</rb><rt>あじ</rt></ruby>",
  // "<ruby><rb>鰺</rb><rt>あじ</rt></ruby>",
  // "<ruby><rb>鯏</rb><rt>あさり</rt></ruby>",
  // "<ruby><rb>鯏</rb><rt>あさり</rt></ruby>",
  // "<ruby><rb>鮑</rb><rt>あわび</rt></ruby>",
  // "<ruby><rb>鮑</rb><rt>あわび</rt></ruby>",
  // "<ruby><rb>鯖</rb><rt>さば</rt></ruby>",
  // "<ruby><rb>鯖</rb><rt>さば</rt></ruby>",
  // "<ruby><rb>魚</rb><rt>さかな</rt></ruby>",
  // "<ruby><rb>魚</rb><rt>さかな</rt></ruby>",
];

//シャッフル
for (let i = cards.length-1; i > 0; i--){ //最後から順に繰り返す
  let r = rand(0,i); //上で作成した乱数メソッドに引数を渡す
  let tmp = cards[i]; //最後の一枚もシャッフルする為に定義
  cards[i] = cards[r];
  cards[r] = tmp;
}

//カードをfieldへ格納
let field = document.getElementById('field')
for(let i = 0; i < cards.length; i++){
  let card = document.createElement('div'); //div設定
  card.className = 'card'; //class名設定
  card.innerHTML = ''//cards[i]; //記載する文字設定(デフォルトは非表示)
  card.index = i;
  card.onclick = click; //DOM設定(今回はクリックされた際の処理。「click」と命名)
  field.appendChild(card);
}

//最初に定義する時点では「null」としておく
let first = null; //選択一枚目
let second = null; //選択二枚目
let timer = null; //ジャッジ秒数

//経過時間表示
let count = 0; //デフォルト値設定
let clock = document.getElementById('clock') //HTMLにあるid取得
let timer2 = setInterval(function(){
  clock.innerHTML = "経過時間："+(++count)+"秒";
}, 1000);

//ペア成功
let success = 0; //デフォルト値設定

function click(c){ //上で定義したクリック時の処理
  if (timer){
    clearTimeout(timer); //ジャッジ中に他のカードクリックされるとバグの原因なるので、timer強制終了(clearTimeout)
    judge(); //judge即実行
  }
  
  let card = c.target;
  card.innerHTML = cards[card.index];

  if (!first){ //もし一枚目が選択されていない(null)パターン
    first = card; //選択一枚目にcardを格納
  }else if (first.index === card.index){ //一枚目と二枚目が一致パターン(不正操作)
    return; //初期値に戻す
  }else{ //一枚目と二枚目が不一致パターン(正規操作)
    second = card;//選択二枚目にcardを格納
    timer = setTimeout(judge, 1000); //1秒後にジャッジ、judge関数は以下にある
  }

  function judge(){
    if (first.innerHTML === second.innerHTML){ //カードが同じであれば「style.visibility」で消す
      first.style.visibility = 'hidden'; //一枚目
      second.style.visibility = 'hidden'; //二枚目
      success += 2;
        if (success === cards.length){ //全ペア揃った際パターン
          clearInterval(timer2); //「clearInterval」でtimer2停止
          clock.remove(); //clock要素削除
          field.remove(); //field要素削除
          clear.innerHTML = "CLEAR<br>スコア"+" "+(count)+"秒"; //クリア後表示
          
        }
    }else{
      first.innerHTML = ''; //元に戻す(白紙にする)
      second.innerHTML = ''; //元に戻す(白紙にする)
    }
    //処理の最後で初期化して次の操作に備える
    first = null; 
    second = null;
    timer = null;
   }
}

//「#container」に「#」不足で数時間悩む。
//特にjQueryはid,classで識別する為、書き忘れに要警戒。これ教訓
$(document).ready(function() {
	$('#container').ripples({ //波紋をつける要素を指定
		resolution: 300, //波紋が広がる速さ
		dropRadius: 20, //波紋の大きさ
		perturbance: 0.01 //波紋の揺れの量
	});
});