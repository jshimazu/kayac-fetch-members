// モジュール読み込み
var HttpClient = require('cheerio-httpcli');
var EventEmitter = require('events').EventEmitter;

// スクレイピング開始
var SITE_ROOT = "https://www.kayac.com";
var TARGET_URL = "https://www.kayac.com/team";
var EVENT_DONE = 'done';

var members = [];
var ev = new EventEmitter;
var fetchFunc = fetchMembers('/team?page=1');
fetchFunc.on(EVENT_DONE, function(){
    showRandomMember(members);
});

// メンバー取得(ページングは再起的に)
function fetchMembers(uri) {
    var full_url = SITE_ROOT + uri;
    HttpClient.fetch(full_url, {}, function (err, $, res) {
    
      // 記事のタイトルを取得
      $('.portfolio-card__cell__title__name').each(function() {
        var name = $(this).text();
        members.push(name);
      });
    
      var next_uri = $('.pagination__next').attr('href');
      if (next_uri) {
          fetchMembers(next_uri);
      } else {
          // 次のページがなかったら終了イベント
          ev.emit(EVENT_DONE);
      }
    });
    return ev;
}

// ランダム表示
function showRandomMember(members) {
    // TODO ランダムに選択して表示する処理をここに書く
    console.log(members);
}
