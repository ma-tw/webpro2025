// node.jsの標準ライブラリであるhttpモジュールをインポートします
import http from 'node:http';

// 環境変数 `PORT` が設定されていればその値を、なければ 8888 をポート番号として使用します
const PORT = process.env.PORT || 8888;

// httpサーバーを作成します。リクエストが来るたびに中の処理が実行されます。
const server = http.createServer((req, res) => {
  // リクエストURLを解析するためにURLオブジェクトを作成します
  // 'http://localhost' はダミーのベースURLで、パスやクエリパラメータを正しく解釈するために必要です
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // レスポンスヘッダーに、文字コードがUTF-8のHTMLであることを設定します
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // ルートパス ('/') へのアクセスの場合
  if (pathname === '/') {
    console.log("ルートパスへのアクセスがありました。");
    // ステータスコード200 (成功) を設定してヘッダーを送信
    res.writeHead(200);
    // "こんにちは！" という文字列をレスポンスとして返します
    res.write('7/2の授業を受けた');
    res.end('こんにちは！');

  // '/ask' パスへのアクセスの場合
  } else if (pathname === '/ask') {
    // URLのクエリパラメータから 'q' の値を取得します
    const question = url.searchParams.get('q');
    console.log(`質問を受け付けました: ${question}`);
    res.writeHead(200);
    // "Your question is '...'" という形式の文字列を返します
    res.end(`Your question is '${question}'`);

  // それ以外のパスへのアクセスの場合
  } else {
    console.log("未定義のパスへアクセスがありました。");
    // ステータスコード404 (Not Found) を設定してヘッダーを送信
    res.writeHead(404);
    res.end('ページが見つかりません');
  }
});

// 指定したポート番号でサーバーを起動し、リクエストの待ち受けを開始します
server.listen(PORT, () => {
  // この行を修正します
  console.log(`サーバーがポート ${PORT} で起動しました。 http://localhost:${PORT}`);
});