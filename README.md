# Mahoraga Summon Bot

Discord.js v14で作成した、魔虚羅モチーフのネタBOTです。

## 機能

- `布瑠部由良由良` で召喚します。
- 召喚時は `summon.png` を送信し、5秒後に `mahoraga.png` を送信します。
- 召喚中だけ指定キーワードを検知します。
- キーワード検知時は `adapt.png` を送信し、`🛞 ガコンッ` だけ返信します。
- `開` で `dismiss.png` を送信して送還します。
- 起動状態はサーバーごとに保持します。
- 同じチャンネルでの検知反応には5秒クールダウンがあります。

## 必要環境

- Node.js 20以上
- Discord Bot Token
- Discord Developer Portalで `MESSAGE CONTENT INTENT` を有効化してください。

## セットアップ

```bash
npm install
```

`.env.example` をコピーして `.env` を作成し、BOTトークンを設定します。

```env
DISCORD_TOKEN=YOUR_BOT_TOKEN_HERE
```

画像を以下のファイル名で配置、または差し替えてください。

```text
src/assets/summon.png
src/assets/mahoraga.png
src/assets/adapt.png
src/assets/dismiss.png
```

## 起動

```bash
npm start
```

開発中は以下も使えます。

```bash
npm run dev
```

## Railwayにデプロイする場合

1. GitHubにこのリポジトリをpushします。
2. RailwayでGitHubリポジトリを選択してデプロイします。
3. Variablesに `DISCORD_TOKEN` を設定します。
4. Start Commandは `railway.json` の `npm start` が使われます。

## Discord側の権限

BOT招待時は以下の権限を付与してください。

- View Channels
- Send Messages
- Attach Files
- Read Message History

## 構成

```text
src/
├── index.js
├── config.js
├── events/
│   └── messageCreate.js
├── state/
│   └── guildState.js
├── utils/
│   └── keywordDetector.js
└── assets/
    ├── summon.png
    ├── mahoraga.png
    ├── adapt.png
    └── dismiss.png
```

## 拡張について

- スラッシュコマンドを追加する場合は `src/commands` を追加し、`src/index.js` で登録処理を読み込む形にすると拡張しやすいです。
- 検知ワードを外部ファイル化する場合は `src/utils/keywordDetector.js` の `keywords` をJSON読み込みに置き換えるだけで対応できます。
- 現在の起動状態はメモリ上に保持しています。BOT再起動後も状態を維持したい場合は、JSONファイルやDBへ保存する実装を追加してください。
