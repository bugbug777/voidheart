---
title: GitHub Pages 發布工作流
description: 記錄 Void Heart 第一版採用的靜態網站部署方式。
pubDate: 2026-05-15
tags:
  - github-pages
  - astro
draft: true
---

Void Heart 第一版採用 Astro 建置靜態網站，並透過 GitHub Actions 部署到 GitHub Pages。

這樣的好處是網站不需要後端伺服器，也不需要手動上傳檔案。內容更新後，只要推送到 GitHub，工作流程就會自動完成建置與部署。

## 基本流程

1. 在本機撰寫文章。
2. 執行建置檢查。
3. 將變更推送到 GitHub。
4. GitHub Actions 建置網站。
5. GitHub Pages 發布靜態產物。

自訂網域會等網站完成後再處理，因此目前設定保留彈性，不把正式網域寫死在程式碼中。
