# react-minesweeper

React + TypeScript で作成したマインスイーパーアプリです。  
基本的なマインスイーパーのルールを実装しつつ、  
ロジックと UI を分離した構成や、状態管理の整理を意識して開発しました。

学習目的の個人開発として作成したプロジェクトです。

---

## 🎮 アプリ概要

- アプリ名：**マインスイーパー**
- ジャンル：パズルゲーム
- 開発目的：React / TypeScript の学習、設計練習

🔗 **デモ（GitHub Pages）**  
https://yuzuasan.github.io/react-minesweeper/

---

## ✨ 主な機能

- マインスイーパー基本ルール
- 難易度選択
  - Easy / Normal / Hard
  - Custom（地雷数・盤面サイズ指定）
- セルのオープン / フラグ設置
- 残り地雷数カウンタ
- プレイ時間タイマー
- ゲームクリア / ゲームオーバー表示
- ハイスコア保存（LocalStorage）
- ハイスコア表示ダイアログ

---

## 🛠 使用技術

- React
- TypeScript
- Vite
- CSS Modules
- LocalStorage

---

## 📁 ディレクトリ構成

```

src/
├─ App.tsx
├─ components/
│  ├─ DifficultySelector/
│  ├─ GameBoard/
│  │  ├─ Cell.tsx
│  │  └─ GameBoard.tsx
│  ├─ GameResultOverlay/
│  ├─ Header/
│  │  ├─ MineCounter.tsx
│  │  ├─ RestartButton.tsx
│  │  └─ Timer.tsx
│  └─ HighScoreDialog/
├─ logic/
│  ├─ gameInitializer.ts
│  ├─ gameJudge.ts
│  ├─ openCell.ts
│  ├─ flagHandler.ts
│  └─ mineGenerator.ts
├─ constants/
│  ├─ difficulties.ts
│  └─ debug.ts
├─ types/
│  ├─ game.ts
│  └─ score.ts
└─ utils/
　  └─ storage.ts

```

---

## 🧠 設計・実装のポイント

- **ゲームロジックと UI の分離**
  - `logic` フォルダに純粋関数としてゲーム処理を集約
- **状態遷移を明確化**
  - `ready / playing / clear / gameover` を明示的に管理
- **難易度設定の一元管理**
  - 定数定義から盤面生成まで一貫した設計
- **副作用を抑えたハイスコア管理**
  - LocalStorage 操作は `utils/storage.ts` に集約
- **CSS Modules によるスタイル分離**
  - コンポーネント単位でスタイルを管理

---

## 🚀 起動方法（ローカル）

```bash
npm install
npm run dev
```

ブラウザで以下にアクセスします。

```
http://localhost:5173
```

---

## 📄 ライセンス

This project is for learning purposes.
（ライセンス未設定）
