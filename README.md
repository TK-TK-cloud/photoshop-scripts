# photoshop-scripts
Photoshop用の無料スクリプト
# Photoshop 画像縦分割スクリプト（2〜20分割）

Adobe Photoshopで画像を縦方向に均等分割し、個別のPNGファイルとして自動保存するJSXスクリプト集です。

画像のリサイズや補間を行わず、元のピクセルを欠け・重複なく分割できます。

## 主な機能

- **2〜20分割に対応（全19種類）**
- 画像サイズに自動対応
- リサイズ・補間なし
- ピクセルの欠け・重複なし
- 端数が出る場合は幅を自動調整
- PNG形式で自動保存
- 01、02、03…の連番ファイル名
- 元画像は変更しない
- Windows / Mac向けのPhotoshop JSXスクリプト

## 使い方

### 1. スクリプトをダウンロード

このリポジトリから、必要な分割数の `.jsx` ファイルをダウンロードしてください。

例：

| ファイル名 | 分割数 |
|---|---|
| `split_vertical_2_lossless.jsx` | 2分割 |
| `split_vertical_5_lossless.jsx` | 5分割 |
| `split_vertical_10_lossless.jsx` | 10分割 |
| `split_vertical_16_lossless.jsx` | 16分割 |
| `split_vertical_19_lossless.jsx` | 19分割 |
| `split_vertical_20_lossless.jsx` | 20分割 |

2〜20分割の各ファイルを用意しています。

### 2. Photoshopで画像を開く

分割したい画像をPhotoshopで開いてください。

### 3. スクリプトを実行

Photoshopのメニューから次を選択します。

**ファイル → スクリプト → 参照**

ダウンロードした `.jsx` ファイルを選択してください。

### 4. 保存先を選択

保存先のフォルダを指定すると、自動的に分割処理が始まります。

処理が完了すると、分割されたPNG画像が保存されます。

## 分割の仕組み

例えば、横幅5758pxの画像を20分割する場合、

5758 ÷ 20 = 287.9px

整数ピクセルで分割するため、以下のように自動調整します。

- 288px幅 × 18枚
- 287px幅 × 2枚

合計5758pxとなり、画像の横幅を完全に維持します。

画像の拡大・縮小は行いません。

## 保存ファイル

元画像が `image.png` で20分割した場合、次のように保存されます。

```text
image_20parts/
├── image_01.png
├── image_02.png
├── image_03.png
├── ...
└── image_20.png
```

同名フォルダが存在する場合は、別名フォルダを作成して保存します。

## 注意事項

- 画像の横幅は分割数以上のピクセル数が必要です。
- 処理用に複製した画像を統合してから分割するため、レイヤー構造は出力されません。
- 元のPhotoshopドキュメントは変更しません。
- PNGで保存するため、JPEGのような再圧縮による画質劣化はありません。ただし元画像がJPEGの場合、元の圧縮による劣化は復元されません。
- PNGのファイル容量（KB・MB）は分割画像ごとに異なります。
- Photoshopでの動作検証は未実施です。環境によっては動作しない場合があります。

## 対応環境

Adobe PhotoshopのJSX（ExtendScript）実行機能を使用します。

Windows / macOS

※ Photoshopのバージョンによってスクリプトの対応状況が異なる場合があります。

## ファイル構成

```text
split_vertical_2_lossless.jsx
split_vertical_3_lossless.jsx
split_vertical_4_lossless.jsx
...
split_vertical_18_lossless.jsx
split_vertical_19_lossless.jsx
split_vertical_20_lossless.jsx
```

全19種類のスクリプトが収録されています。
