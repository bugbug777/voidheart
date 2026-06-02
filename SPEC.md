# Void Heart 個人部落格 SPEC

## 1. 專案目標

建立一個名為 Void Heart、可透過 GitHub Actions 部署到 GitHub Pages 的個人部落格，用於長期發表繁體中文文章、整理專案紀錄、展示個人介紹與提供聯絡入口。第一階段先完成穩定、易維護、可持續寫作的靜態網站，不導入需要後端伺服器或資料庫的功能。

## 1.1 已確認決策

- 部落格名稱：Void Heart。
- 作者顯示名稱：sihle。
- 主要語言：繁體中文。
- 部署形式：GitHub Pages。
- 部署流程：GitHub Actions。
- 網址型態：自訂網域，但第一版開發階段先跳過實際網域設定，網站完成後再處理。
- 視覺色彩：黑色、白色為主。
- Logo：第一版不使用 Logo。
- 佈景需求：第一版需支援淺色模式、深色模式，並提供使用者切換功能。

## 2. 核心原則

- 內容優先：文章閱讀體驗、分類、搜尋與導覽要比華麗動畫更重要。
- 靜態部署：網站需可被 GitHub Pages 穩定託管。
- Markdown 寫作：文章應以 Markdown 撰寫，方便版本控制與日後搬遷。
- 低維護成本：技術選型避免過度複雜，讓日常新增文章簡單明確。
- 可擴充：未來可逐步加入 RSS、標籤頁、搜尋、留言與分析。

## 3. 建議技術選型

### 3.1 推薦方案：Astro

建議使用 Astro 作為靜態網站產生器。

理由：

- 適合內容型網站與個人部落格。
- 原生支援 Markdown / MDX 內容管理。
- 預設輸出靜態檔案，適合 GitHub Pages。
- 可在需要時加入 React / Vue / Svelte 元件，但不強迫整站變成 SPA。
- 相比純手寫 HTML，版型、文章列表、分類與 SEO 較容易維護。

### 3.2 替代方案

- Jekyll：GitHub Pages 原生支援，部署簡單，但 Ruby 生態與現代前端元件整合較不直覺。
- Eleventy：簡潔穩定，適合靜態內容網站，但互動元件與 TypeScript 生態不如 Astro 直覺。
- Vite + React：適合互動式作品集或工具型網站，但純部落格需要自行補較多內容管理功能。

### 3.3 部署策略

使用 GitHub Actions 建置並部署到 GitHub Pages。

原因：

- Astro 需要 build step。
- GitHub 官方文件建議自訂建置流程或非 Jekyll 靜態產生器使用 GitHub Actions 發佈。
- 可在 CI 中加入型別檢查、建置檢查與連結檢查。

參考資料：

- GitHub Pages custom workflows: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- GitHub Pages publishing source: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub Pages and Jekyll: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll

## 4. 目標使用者

- 主要使用者：部落格作者本人。
- 主要讀者：朋友、同事、招募者、技術社群讀者、對作者文章主題感興趣的人。
- 使用情境：閱讀文章、查看作者背景、瀏覽專案與作品、透過社群連結聯絡作者。

## 5. 第一版範圍

### 5.1 必備頁面

- 首頁 `/`
  - 顯示作者簡介。
  - 顯示最新文章。
  - 顯示精選文章或代表性專案。

- 文章列表 `/blog/`
  - 依發布時間倒序排列文章。
  - 顯示標題、摘要、日期、標籤。

- 文章頁 `/blog/[slug]/`
  - 顯示文章標題、日期、更新日期、標籤、閱讀時間。
  - 支援 Markdown 內容。
  - 支援程式碼區塊樣式。

- 關於頁 `/about/`
  - 作者介紹。
  - 技能、興趣或目前關注領域。
  - 社群或聯絡連結。

- 標籤頁 `/tags/`
  - 顯示所有標籤。
  - 點擊標籤後可查看該標籤文章列表。

### 5.2 第一版不做

- 後台 CMS。
- 使用者登入。
- 會員系統。
- 伺服器端搜尋。
- 需要後端的留言系統。
- 複雜動畫或過度客製化視覺效果。

## 6. 資訊架構

```text
/
/blog/
/blog/[slug]/
/tags/
/tags/[tag]/
/about/
/rss.xml
/sitemap-index.xml
```

## 7. 內容模型

文章使用 Markdown 或 MDX，建議放在：

```text
src/content/blog/
```

每篇文章需包含 frontmatter：

```yaml
---
title: "文章標題"
description: "文章摘要，用於列表與 SEO"
pubDate: "2026-05-15"
updatedDate: "2026-05-15"
tags:
  - web
  - notes
draft: false
---
```

欄位說明：

- `title`：文章標題，必填。
- `description`：文章摘要，必填。
- `pubDate`：發布日期，必填。
- `updatedDate`：更新日期，選填。
- `tags`：文章標籤，建議至少 1 個。
- `draft`：草稿狀態，`true` 時不在正式網站顯示。

## 8. 視覺與體驗方向

整體風格建議為乾淨、可讀、偏 editorial 的個人網站，而不是行銷型 landing page。

### 8.1 版面

- 最大內容寬度約 `720px` 至 `860px`，保持文章好讀。
- 首頁可使用較寬版面，但文章頁應聚焦閱讀。
- 桌面版使用清楚導覽列。
- 手機版導覽需簡潔，避免過多層級。

### 8.2 色彩

- 第一版需支援淺色模式與深色模式。
- 預設模式可跟隨系統偏好，並提供手動切換。
- 使用者手動選擇的模式需保存在瀏覽器端，例如 `localStorage`。
- 主要色彩以黑色與白色為核心，透過灰階層次、邊線、陰影與排版建立視覺節奏。
- 文字對比需符合可讀性需求。

### 8.3 字體

- 介面與內文優先使用系統字體。
- 程式碼使用 monospace 字體。
- 中文排版需注意行高，文章內文建議 `line-height: 1.8` 左右。

## 9. 功能需求

### 9.1 文章

- 文章依日期排序。
- 草稿文章不出現在正式 build。
- 支援標籤。
- 支援摘要。
- 支援程式碼高亮。
- 支援內文圖片。

### 9.2 SEO

- 每頁需有獨立 `<title>`。
- 每頁需有 meta description。
- 文章頁需輸出 Open Graph metadata。
- 產生 sitemap。
- 產生 RSS feed。

### 9.3 導覽

- 全站導覽包含：首頁、文章、關於。
- 文章頁可回到文章列表。
- 標籤可連到標籤文章列表。

### 9.4 響應式

- 支援手機、平板、桌面。
- 手機版文章閱讀不應橫向捲動。
- 程式碼區塊可水平捲動。

### 9.5 可及性

- 所有圖片需支援 `alt`。
- 導覽與互動元素需可鍵盤操作。
- 標題層級需語意正確。
- 顏色不可作為唯一資訊提示。

### 9.6 佈景切換

- 提供淺色 / 深色切換控制。
- 初次造訪時跟隨系統 `prefers-color-scheme`。
- 使用者手動切換後，之後造訪需保留選擇。
- 切換控制需可鍵盤操作，並有清楚的可及性標籤。
- 切換時避免明顯閃爍，尤其是文章頁載入時。

## 10. 非功能需求

- 首頁與文章頁應快速載入。
- 第一版不依賴第三方前端框架 runtime，除非有明確需要。
- 建置結果需可部署在 GitHub Pages 的靜態環境。
- 網站路徑需正確支援自訂網域部署，預設根路徑為 `/`。

## 11. GitHub Pages 部署規劃

### 11.1 Repository Pages

若部署為專案頁，網址通常是：

```text
https://<github-username>.github.io/<repository-name>/
```

此時需在 Astro 設定：

```js
site: "https://<github-username>.github.io",
base: "/<repository-name>"
```

### 11.2 User Pages 或自訂網域

本專案目標使用自訂網域，但實際網域設定先延後到網站完成後處理。若部署為個人主站：

```text
https://<github-username>.github.io/
```

或：

```text
https://example.com/
```

此時 `base` 應為 `/`。

自訂網域確定後，Astro 設定應採用：

```js
site: "https://<custom-domain>",
base: "/"
```

### 11.3 GitHub Actions

第一版預計建立：

```text
.github/workflows/deploy.yml
```

流程：

1. Checkout repository。
2. 安裝 Node.js。
3. 安裝 dependencies。
4. 執行 build。
5. 上傳靜態產物。
6. 部署到 GitHub Pages。

## 12. 建議專案結構

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   │   └── blog/
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── blog/
│   │   └── tags/
│   └── styles/
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── SPEC.md
```

## 13. 開發階段規劃

### Phase 0：確認 SPEC

- 確認技術選型。
- 確認自訂網域實際名稱。
- 確認個人介紹內容。
- 確認第一版黑白視覺方向的細節。

### Phase 1：專案初始化

- 建立 Astro 專案。
- 設定 TypeScript。
- 設定基本樣式。
- 建立主要 layout。

### Phase 2：內容系統

- 建立 blog content collection。
- 建立文章列表頁。
- 建立文章詳細頁。
- 加入草稿過濾。
- 加入標籤頁。

### Phase 3：基礎網站頁面

- 建立首頁。
- 建立關於頁。
- 建立導覽列與頁尾。
- 加入響應式樣式。

### Phase 4：SEO 與發佈

- 加入 metadata。
- 加入 RSS。
- 加入 sitemap。
- 建立 GitHub Actions workflow。
- 驗證 GitHub Pages build。

### Phase 5：打磨

- 視覺細節調整。
- Lighthouse 或基礎效能檢查。
- 行動版檢查。
- 補上 README 使用說明。

## 14. 待確認問題

開發前建議先確認：

1. 個人介紹內容要放哪些資訊？
2. 是否有個人頭像？若沒有，第一版可使用文字識別，不放 Logo。
3. 網站完成後，自訂網域實際名稱是什麼？
4. 是否需要留言功能？若需要，建議第二版評估 Giscus。
5. 是否需要站內搜尋？若需要，建議第二版評估 Pagefind。

## 15. 驗收標準

第一版完成時需符合：

- 可在本機啟動開發伺服器。
- 可成功 build 靜態網站。
- 可部署到 GitHub Pages。
- 首頁、文章列表、文章頁、關於頁、標籤頁可正常瀏覽。
- Markdown 文章可被正確渲染。
- 草稿文章不會出現在正式網站。
- 手機與桌面版排版正常。
- 基礎 SEO metadata 正確輸出。
- RSS 與 sitemap 可正常產生。

## 16. 決策摘要

目前建議採用：

- 部落格名稱：Void Heart。
- 作者顯示名稱：sihle。
- 主要語言：繁體中文。
- 網址型態：自訂網域。
- 視覺色彩：黑色、白色為主。
- Logo：第一版不使用 Logo。
- 靜態網站產生器：Astro。
- 文章格式：Markdown / MDX。
- 部署方式：GitHub Actions -> GitHub Pages。
- 第一版重點：可讀性、內容管理、SEO、穩定部署、淺深色切換。
- 暫緩功能：留言、站內搜尋、CMS、複雜互動。
