# 情侣两周年网页纪念册

这是一个可以直接部署到 Vercel 的静态网页项目，不需要后端、不需要数据库、不依赖外部 CDN。

## 本地预览

最简单：

1. 直接双击 `index.html`
2. 或者用 VS Code 的 Live Server 打开

也可以在项目目录运行：

```bash
python -m http.server 3000
```

然后打开：

```text
http://localhost:3000
```

## 部署到 Vercel

方法一：拖拽部署

1. 打开 https://vercel.com/new
2. 选择 `anniversary-vercel` 文件夹上传或导入
3. Framework Preset 选择 `Other`
4. Build Command 留空
5. Output Directory 留空
6. 点击 Deploy

方法二：GitHub 部署

1. 把整个 `anniversary-vercel` 文件夹上传到 GitHub 仓库
2. 在 Vercel 里 Import Project
3. Framework Preset 选择 `Other`
4. Build Command 留空
5. Output Directory 留空
6. 点击 Deploy

部署完成后，把 Vercel 给你的网址发给她就可以。

## 替换和增加照片

现在 `assets` 里是 SVG 占位图。你可以用自己的照片替换它们，也可以增加更多照片。

推荐做法：

1. 把照片放进 `assets`
2. 命名为 `photo1.jpg`、`photo2.jpg`、`photo3.jpg`，继续往后排
3. 打开 `script.js`
4. 找到 `PHOTOS` 数组
5. 按下面格式继续增加：

```js
const PHOTOS = [
  { src: "./assets/photo1.jpg", caption: "第一次聊天时，我还不知道会这么喜欢你。" },
  { src: "./assets/photo2.jpg", caption: "和你在一起以后，日子有了很具体的期待。" },
  { src: "./assets/photo3.jpg", caption: "这一天也很想你。" }
];
```

如果你有很多张照片，也只需要继续加数组项：

```js
{ src: "./assets/photo20.jpg", caption: "这里写这一张照片的小文案。" },
```

建议照片先压缩一下，每张控制在 `200KB-800KB` 左右，手机打开会更快。格式推荐 `jpg` 或 `webp`。

## 替换音乐

1. 把音乐文件放进 `assets`
2. 命名为 `music.mp3`
3. 页面右上角按钮会播放或暂停音乐

## 修改纪念日

打开 `script.js`，修改：

```js
const LOVE_START_DATE = "2024-07-20";
```

把它换成你们正式在一起的日期。

## 修改文字

主要文字都在 `index.html` 里。搜索你想改的句子，直接替换即可。
