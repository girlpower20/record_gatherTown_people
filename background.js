var e_enable = true;

// chrome 是一個物件
// 其下有一個 tabs
// 再之下有一個屬性 tabStatus
// 表示目前分頁的狀態
// "unloaded", "loading", "complete"
// 監聽狀態改變
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // 如果分頁載入完成
  if (changeInfo.status == "complete") {
    // 且擴充功能為開啟狀態
    if (e_enable) {
      // 執行以下程式
      chrome.tabs.executeScript(null, { file: "./recordPeople.js" }, () => chrome.runtime.lastError);
    }
  }
});
