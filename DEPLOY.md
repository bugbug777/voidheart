# Void Heart 部署手冊

## 1. 部署方式

Void Heart 是 Astro 靜態網站，正式網站透過 GitHub Actions 部署到 GitHub Pages。

部署相關檔案：

- GitHub Actions workflow：`.github/workflows/deploy.yml`
- Astro 設定：`astro.config.mjs`
- 靜態輸出目錄：`dist/`
- 建置指令：`npm run build`

目前部署基本資訊：

- 部署平台：GitHub Pages。
- 部署方式：GitHub Actions。
- 網址型態：GitHub Pages 專案頁。
- 預設網址格式：`https://<github-owner>.github.io/<repository-name>/`。
- 目前暫不使用自訂網域，自訂網域設定留待之後處理。
- 正式發布內容：`draft: false` 的 Markdown / MDX 文章。

目前 workflow 會在以下情況部署：

- 推送到 `main` 分支。
- 在 GitHub Actions 頁面手動執行 `Deploy to GitHub Pages`。

## 2. 初次設定 GitHub Pages

在 GitHub repository 完成以下設定：

1. 進入 `Settings`。
2. 進入 `Pages`。
3. 將 `Build and deployment` 的 `Source` 設為 `GitHub Actions`。
4. 儲存設定。

此專案不需要將 `dist/` 提交到 repository。GitHub Actions 會在雲端建置並上傳 `dist/` 作為 Pages artifact。

## 3. 設定網站網址與專案路徑

`astro.config.mjs` 會讀取 `SITE_URL` 與 `BASE_PATH`：

```js
const site = process.env.SITE_URL ?? "https://bugbug777.github.io";
const base = process.env.BASE_PATH ?? "/voidheart";
```

在 GitHub Pages 專案頁模式中：

- `SITE_URL` 應是 GitHub Pages owner 網址，例如 `https://<github-owner>.github.io`。
- `BASE_PATH` 應是 repository 名稱前面加 `/`，例如 `/<repository-name>`。

GitHub Actions build 時會使用 repository variables。若沒有設定，workflow 會退回：

```text
SITE_URL=https://<github-owner>.github.io
BASE_PATH=/<repository-name>
```

也可以在 GitHub repository 明確設定：

1. 進入 `Settings`。
2. 進入 `Secrets and variables`。
3. 進入 `Actions`。
4. 切到 `Variables`。
5. 新增或確認 repository variables：
   - Name：`SITE_URL`
   - Value：`https://<github-owner>.github.io`
   - Name：`BASE_PATH`
   - Value：`/<repository-name>`

依目前 GitHub repository 名稱，預設 `BASE_PATH` 是 `/voidheart`。

## 4. 本機部署前檢查

每次發布前，先在專案根目錄執行：

```bash
npm ci
npm run build
```

`npm run build` 會執行：

1. `astro check`
2. `astro build`

建置成功後可用以下指令預覽正式輸出：

```bash
npm run preview
```

發布前建議檢查：

- 首頁可正常開啟。
- 文章列表、文章頁、標籤頁、關於頁可正常瀏覽。
- 新文章出現在文章列表。
- 文章日期與標籤正確。
- `draft: true` 的文章沒有出現在正式輸出。
- 深色與淺色模式都可讀。
- 手機版沒有橫向捲動。
- 文章內圖片可正常顯示。
- 外部連結可正常開啟。
- RSS 與 sitemap 可產生。

## 5. 正式部署流程

快速發布流程：

```bash
git add .
git commit -m "Update site content"
git push origin main
```

推送到 `main` 後，GitHub Actions 會在雲端自動執行 `npm ci`、`npm run build`，並部署到 GitHub Pages。

若想在推送前先確認正式輸出，可在本機額外執行：

```bash
npm ci
npm run build
```

本機 build 不是部署必要步驟，而是發布前預檢；它可以提前抓出 Astro check、frontmatter、路徑、RSS 或 sitemap 產生問題。

推送完成後：

1. 到 GitHub repository 的 `Actions` 頁面。
2. 開啟 `Deploy to GitHub Pages` workflow。
3. 確認最新一次 workflow 成功。
4. 到 GitHub repository 的 `Settings > Pages` 查看部署網址。
5. 開啟正式網站確認內容。
6. 確認網址格式為 `https://<github-owner>.github.io/<repository-name>/`。

## 6. 手動重新部署

若程式碼沒有變更，但需要重新部署：

1. 到 GitHub repository 的 `Actions` 頁面。
2. 選擇 `Deploy to GitHub Pages`。
3. 點選 `Run workflow`。
4. 分支選擇 `main`。
5. 執行後等待 workflow 完成。

## 7. 自訂網域設定

目前暫不使用自訂網域。本節留作日後切換自訂網域時使用。

若日後要使用自訂網域，需同步設定 GitHub Pages、DNS、`SITE_URL` 與 `BASE_PATH`。

GitHub Pages：

1. 進入 `Settings > Pages`。
2. 在 `Custom domain` 填入網域。
3. 儲存後等待 DNS check。
4. DNS 生效後啟用 `Enforce HTTPS`。

DNS：

- 使用 apex domain，例如 `example.com`：依 GitHub Pages 文件設定 A / AAAA records。
- 使用 subdomain，例如 `www.example.com`：設定 CNAME record 指向 GitHub Pages 網址。

專案設定：

- 將 repository variable `SITE_URL` 設為自訂網域，例如 `https://example.com`。
- 將 repository variable `BASE_PATH` 設為 `/`，讓 Astro `base` 回到網站根目錄。
- 若專案需要保留 `CNAME`，建議放在 `public/CNAME`，內容只填網域本身，例如 `example.com`。

若日後更換網域，需同步更新：

- GitHub repository 的 Pages custom domain。
- DNS record。
- repository variable `SITE_URL`。
- repository variable `BASE_PATH`。
- Astro `site` 設定實際收到的正式網址。
- SEO metadata 中的 canonical URL。

## 8. 常見問題

### 8.1 文章沒有出現在列表

檢查：

- `draft` 是否仍為 `true`。
- frontmatter 日期格式是否正確。
- 檔案是否放在 `src/content/blog/`。
- `npm run build` 是否成功。

### 8.2 GitHub Actions build 失敗

檢查：

- `npm run build` 是否能在本機成功。
- `package-lock.json` 是否與 `package.json` 同步。
- frontmatter 欄位格式是否符合 `src/content/config.ts`。
- Node.js 版本差異是否造成問題。workflow 目前使用 Node.js 22。

### 8.3 GitHub Pages 沒有更新

檢查：

- 是否推送到 `main` 分支。
- `Deploy to GitHub Pages` workflow 是否成功。
- GitHub Pages source 是否設為 `GitHub Actions`。
- 瀏覽器是否快取舊頁面。
- GitHub Pages 是否仍在處理最新部署。

### 8.4 GitHub Actions 在 Setup Pages 失敗

若 `actions/configure-pages` 出現以下錯誤：

```text
HttpError: Not Found
Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions.
```

通常代表 GitHub repository 還沒有啟用 Pages，或 Pages source 尚未設定為 GitHub Actions。

處理方式：

1. 到 GitHub repository 頁面。
2. 進入 `Settings > Pages`。
3. 在 `Build and deployment` 區塊中，將 `Source` 設為 `GitHub Actions`。
4. 儲存設定。
5. 回到 `Actions`，重新執行 `Deploy to GitHub Pages` workflow，或重新推送一次 commit。

### 8.5 網址、RSS 或 sitemap 不正確

檢查：

- repository variable `SITE_URL` 是否設定為 `https://<github-owner>.github.io`。
- repository variable `BASE_PATH` 是否設定為 `/<repository-name>`。
- GitHub Pages 部署網址是否為 `https://<github-owner>.github.io/<repository-name>/`。
- 若日後改用自訂網域，自訂網域是否包含 `https://`。
- 若日後改用自訂網域，GitHub Pages 的 custom domain 是否與 `SITE_URL` 一致。

### 8.6 自訂網域無法開啟

檢查：

- DNS record 是否正確。
- GitHub Pages custom domain 是否已設定。
- HTTPS 憑證是否仍在產生中。
- `SITE_URL` 是否與正式網域一致。
- Astro `site` 設定收到的網址是否與網域一致。

### 8.7 草稿文章出現在正式網站

檢查文章 frontmatter：

```yaml
draft: true
```

正式發布前，只有要公開的文章應設為：

```yaml
draft: false
```

## 9. 回復上一版

若新版本部署後發現問題，建議流程：

1. 在 GitHub 找到上一個正常版本的 commit。
2. 建立一個修正 commit，還原有問題的內容。
3. 推送到 `main`。
4. 等待 GitHub Actions 重新部署。

避免直接修改 GitHub Pages 產物，因為正式網站應由 repository 原始碼與 workflow 產生。
