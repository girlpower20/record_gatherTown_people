# record_gatherTown_people
因為疫情影響，計畫將成果展改為線上舉行，使用 gather town 展示&紀錄成果，團隊成員提出無法記錄成果展的效果是否如預期，又剛好看到漢偉學長製作"NCNU BBB NoneStop chrome extension"，於是想到監聽網頁紀錄目前線上的人數。
## 使用方法
1. 開一個 google sheet
2. 擴充功能 > app script > 貼上以下程式碼
```javascript=
var SpreadSheet = SpreadsheetApp.openById("輸入您的 google sheet id");
var workSheet = SpreadSheet.getSheets()[0];
// 採用 GET 的方式傳送資料
// 在 app script 中如果傳送方式為 GET，一定要使用 doGet 的 function 名稱，POST 則是 doPost
function doGet(e) {
  var params = e.parameter;
  var time = params.time;
  var number = params.number;

  // 插入新資料
  workSheet.appendRow([time, number]);
  return ContentService.createTextOutput("success");
}
```
3. 更改程式碼中的 google sheet id，id 為試算表網址中 "/d" 和 "/edit" 之間
![image](https://user-images.githubusercontent.com/82037691/153189661-502d90df-b02a-4d75-b3b2-a42f67b7b42e.png)
4. 將程式碼部署爲網路應用程式，右上角部屬 > 新增部屬作業 > 存取為所有人(如下圖)<>
![image](https://user-images.githubusercontent.com/82037691/153187043-a2fb5d83-47ad-4f2d-965e-fafd40906a7f.png)
![image](https://user-images.githubusercontent.com/82037691/153187288-ebbdb6e0-0a2c-49d1-921b-16a423323511.png)
5. 複製 網頁應用程式 網址
![image](https://user-images.githubusercontent.com/82037691/153190157-1b8ace55-f60c-4e9f-8213-dc57f3adf776.png)
6. 身分驗證
(step3、4 可參考 https://www.marketersgo.com/marketing-tools/202005/google-sheets-script/ (放在參考資料中))
7. 請參考 NCNU_BBB_NonStop 使用教學 :point_right: https://hackmd.io/Ne1T645hTGCn6LmIfW0i9w

## 參考資料
- [NCNU_BBB_NonStop](https://github.com/UncleHanWei/NCNU_BBB_NonStop)
- [資料匯入至 google sheet](https://medium.com/unalai/%E5%AF%AB%E7%B5%A6%E7%B4%94%E5%89%8D%E7%AB%AF-%E8%AE%93-google-sheets-%E7%95%B6%E4%BD%A0%E7%9A%84%E5%BE%8C%E7%AB%AF%E5%AE%8C%E6%88%90%E5%AF%AB%E5%85%A5%E5%8A%9F%E8%83%BD-715799e5e013)
- [部屬&驗證步驟](https://www.marketersgo.com/marketing-tools/202005/google-sheets-script/)
- [app script request parameters](https://developers.google.com/apps-script/guides/web#url_parameters)
## 感謝名單
技術指導: 偉哉漢偉 <br/>
漢偉學長 github :point_right: https://github.com/UncleHanWei
