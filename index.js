// moduleインポート
const server = require("express")();
const line = require("@line/bot-sdk"); 
const request = require('request');

// パラメータ設定
const line_config = {
channelAccessToken: 'LineDeveloperで取得したアクセストークン値',
channelSecret: 'LineDeveloperで取得したChannel Secret値'
// 環境変数に設定しているアクセストークンをセット
// channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
// 環境変数に設定しているChannel Secretをセット 
// channelSecret: process.env.CHANNEL_SECRET
};

// APIクライアント作成
const bot = new line.Client(line_config);

// サーバー設定
server.listen(process.env.PORT || 3000);

server.post('/webhook', line.middleware(line_config), (req, res, next) => {

    res.sendStatus(200);

    // イベント処理プロミスを格納
    let events_processed = [];

    // イベント処理
    req.body.events.forEach((event) => {
        // イベントのタイプがメッセージかつ、テキストタイプだった場合
        if (event.type == "message" && event.message.type == "text"){
            events_processed.push(bot.replyMessage(event.replyToken, {
              type: "text",
              text: "Hello"
            }));
         }
    });

    // イベント処理終了後、イベント数を出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );

});