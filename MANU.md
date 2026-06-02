# Void Heart 部落格操作手冊

## 1. 文件目的

本文件說明 Void Heart 個人部落格在完成開發後的日常使用方式，包含本機預覽、新增文章、管理草稿、調整標籤、部署到 GitHub Pages，以及日後維護自訂網域。實際指令會以第一版預計使用的 Astro 專案為基準。

## 2. 基本資訊

- 部落格名稱：Void Heart。
- 作者名稱：sihle。
- 主要語言：繁體中文。
- 部署平台：GitHub Pages。
- 部署方式：GitHub Actions。
- 網址型態：目前使用 GitHub Pages 專案頁，自訂網域留待之後再處理。
- 文章格式：Markdown / MDX。
- 佈景：支援淺色模式與深色模式切換。

## 3. 常用指令

以下指令需在專案根目錄執行。

```bash
npm install
```

安裝專案依賴。通常只需要在第一次取得專案，或 `package.json` 有變更時執行。

```bash
npm run dev
```

啟動本機開發伺服器，用於撰寫文章與預覽網站。

```bash
npm run build
```

建立正式版靜態網站，部署前建議先執行確認是否能成功建置。

```bash
npm run preview
```

預覽正式 build 後的結果，較接近 GitHub Pages 上的實際呈現。

## 4. 新增文章

文章預計存放於：

```text
src/content/blog/
```

新增文章時，建立一個新的 `.md` 或 `.mdx` 檔案。建議檔名使用英文小寫與連字號，例如：

```text
src/content/blog/my-first-post.md
```

文章開頭需包含 frontmatter：

```yaml
---
title: "文章標題"
description: "文章摘要，用於文章列表與 SEO"
pubDate: "2026-05-15"
updatedDate: "2026-05-15"
tags:
  - notes
  - web
draft: false
---
```

frontmatter 欄位用途：

- `title`：文章標題。
- `description`：文章摘要，會出現在文章列表與 SEO metadata。
- `pubDate`：發布日期。
- `updatedDate`：更新日期，可在文章修改後調整。
- `tags`：文章標籤。
- `draft`：是否為草稿。`true` 不會出現在正式網站，`false` 才會發布。

## 5. 撰寫草稿

撰寫尚未完成的文章時，將 `draft` 設為 `true`：

```yaml
draft: true
```

草稿可在本機開發時檢查內容，但正式 build 時不應出現在文章列表、標籤頁、RSS 或 sitemap。

準備發布時，改為：

```yaml
draft: false
```

## 6. 管理標籤

每篇文章可設定一個或多個標籤：

```yaml
tags:
  - astro
  - github-pages
  - notes
```

建議標籤命名規則：

- 使用簡短、穩定的詞。
- 同一概念避免混用不同寫法。
- 英文技術名詞可保留英文，例如 `astro`、`typescript`。
- 中文主題可使用繁體中文，例如 `閱讀筆記`、`生活紀錄`。

## 7. 本機預覽流程

日常寫作建議流程：

1. 新增或修改文章。
2. 執行 `npm run dev`。
3. 在瀏覽器檢查首頁、文章列表、文章頁與標籤頁。
4. 確認淺色與深色模式切換正常。
5. 若想在推送前先檢查正式輸出，可執行 `npm run build`。
6. 確認內容後提交並推送到 GitHub。

## 8. 發布流程

正式發布預計透過 GitHub Actions 自動完成。

快速發布流程：

1. 確認文章 `draft: false`。
2. 將變更提交到 Git。
3. 推送到 GitHub。
4. GitHub Actions 自動執行 `npm run build`，並部署到 GitHub Pages。
5. 部署完成後，到 GitHub Pages 專案頁網址確認網站內容。

發布前若想先在本機抓錯，可額外執行：

```bash
npm run build
```

這不是部署必要步驟，而是用來提前確認 Astro check、頁面產生、RSS 與 sitemap 是否正常。

## 9. 淺色與深色模式

Void Heart 第一版需支援淺色與深色模式。

預期行為：

- 第一次造訪時跟隨使用者系統偏好。
- 使用者手動切換後，瀏覽器會記住選擇。
- 切換按鈕應出現在全站導覽或頁首。
- 文章頁、程式碼區塊、標籤、連結與表單元素都需在兩種模式下保持可讀。

日常檢查時，新增文章後應同時檢查淺色與深色模式。

## 10. 圖片使用

文章圖片建議放在：

```text
src/assets/
```

或依 Astro 最終實作規劃放在 `public/`。

圖片使用原則：

- 每張圖片都應提供有意義的替代文字。
- 檔案名稱使用英文小寫與連字號。
- 避免上傳過大的原始圖片。
- 截圖應裁切到與文章內容相關的範圍。

Markdown 圖片範例：

```md
![圖片說明](../../assets/example-image.png)
```

## 11. 自訂網域維護

目前部署先使用 GitHub Pages 專案頁，自訂網域留待之後再處理。

若日後改用自訂網域，部署前需確認：

- GitHub Pages 已設定 custom domain。
- DNS 設定已指向 GitHub Pages。
- 若使用 apex domain，需依 GitHub Pages 文件設定 A / AAAA records。
- 若使用 subdomain，需設定 CNAME record。
- 專案中需保留 GitHub Pages 所需的 `CNAME` 設定，實際位置依最終實作而定。

若日後更換網域，需同步更新：

- GitHub repository 的 Pages 設定。
- DNS record。
- Astro `site` 設定。
- SEO metadata 中的 canonical URL。

## 12. 發布前檢查清單

每次發布前建議確認：

- `npm run build` 成功。
- 首頁內容正確。
- 新文章出現在文章列表。
- 文章日期與標籤正確。
- 草稿文章沒有出現在正式頁面。
- 淺色與深色模式都可讀。
- 手機版沒有橫向捲動。
- 文章內圖片可正常顯示。
- 外部連結可正常開啟。
- RSS 與 sitemap 可產生。

## 13. 常見問題

### 13.1 文章沒有出現在列表

檢查：

- `draft` 是否仍為 `true`。
- frontmatter 日期格式是否正確。
- 檔案是否放在 `src/content/blog/`。
- build 是否成功。

### 13.2 GitHub Pages 沒有更新

檢查：

- GitHub Actions 是否執行成功。
- 是否推送到正確分支。
- GitHub Pages 是否設定為由 GitHub Actions 部署。
- 瀏覽器是否快取舊頁面。

### 13.3 自訂網域無法開啟

檢查：

- DNS record 是否正確。
- GitHub Pages custom domain 是否已設定。
- HTTPS 憑證是否仍在產生中。
- Astro `site` 設定是否與網域一致。

## 14. 後續可擴充功能

第一版完成後，可視需求加入：

- Giscus 留言。
- Pagefind 站內搜尋。
- 文章系列分類。
- Open Graph 圖片自動產生。
- 內容歸檔頁。
- 雙語內容。
- 簡易文章模板產生指令。
