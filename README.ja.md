# api-gateway-util

API Gateway 用のユーティリティパッケージ。

## Installation

```
npm i api-gateway-util -S
```

## matchBy(resources, options, callback = Array)

この関数は `resources` から引数 `options` にマッチしたリソースを見つける。

### arguments

- `resources`
    - [APIGateway](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/APIGateway.html) の `getResources` によって返されるリソースの配列。
- `options.path`
    - 見つけるリソースのパス。
- `options.method`
    - 見つけるリソースが持つメソッド定義。
- `callback(err, result)`
    - 探索が完了した時、あるいはエラーが起きた時に呼ばれる関数。
    - `err`
        - エラーが起きた時のエラーオブジェクト。
          成功した場合は `null` が渡される。
    - `result`
        - `path` にマッチしたリソースのオブジェクト。
        - マッチしなかった場合は `null` が渡される。

### returning value

`callback` を省略した場合、この関数は以下の配列を返す。

``` javascript
[err, result]
```

`err` と `result` の定義は、`callback` の説明を参照。

## License

MIT
