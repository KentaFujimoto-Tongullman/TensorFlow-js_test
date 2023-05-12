# TensorFlow-js_test
TensorFlow.jsを用いた画像転移学習のテストページです

### 概要
TensorFlow.jsの画像転移学習チュートリアルに学習データ保存機能を付けた簡単な画像分類webアプリです

#### アプリ概要
- webブラウザ上で画像学習ができて、それらを分類する
  - 学習方法は事前トレーニング済みモデルを用いた転移学習
  - 学習データは保存、読込み可能
    - localStorageを用いる

### 参考サイト
- https://codelabs.developers.google.com/codelabs/tensorflowjs-teachablemachine-codelab?hl=ja#0
- https://github.com/tensorflow/tfjs-models/tree/master/knn-classifier
- https://github.com/tensorflow/tfjs/issues/633

### 使い方
1. カメラの使用を許可する
1. 既に転移学習させたデータが存在し、そのデータを使用する場合は「Data Load」ボタンを押下
1. 学習させたい対象物をカメラに捉え、「Add ...」ボタンを押下
1. 同じAddボタンで上記を数回繰り返す
1. 比較したい対象物をカメラに捉え、別のAddボタンで上記を繰り返す
1.学習させたデータを保存したい場合は「Data Save」ボタンを押下

上記を行った後に判定させたい対象物をカメラに捉えると、どの学習データに一番近いかを判別して結果を出力します

### 免責事項等
本ソースコードの利用者に生じたあらゆる損害に対して本ソースコード作成者は責任を負いません
