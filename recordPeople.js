// 目前上線的玩家
let clientList = [];
// google sheet 網頁應用程式網址
var url = "填入 App Script 網頁應用程式網址";

// 目前上線人數
var onlineNumber;
// 紀錄上線人清單
function recordTime_and_countPeople() {
    let headings = document.evaluate("//*[@id='root']/div/div/div[1]/div[2]/div[2]/div[3]", document, null, XPathResult.ANY_TYPE, null);
    let thisHeading = headings.iterateNext();
    while (thisHeading) {
        // console.log("thisHeading :  "+thisHeading.innerText);
        clientList = thisHeading.innerText.split('\n');
        thisHeading = headings.iterateNext();
    }
    console.log(clientList);
    onlineNumber = clientList.length;
    // console.log("目前人數");
    // console.log(clientList.length);
    // 觸發寫入 google sheet
    let link = document.createElement("a");
    document.body.appendChild(link);
    link.addEventListener("click", send);
    link.click();
}


let sleep = (ms) => {
    return new Promise(rs => {
        setTimeout(() => {
            rs();
        }, ms);
    })
};

// 建立監聽
async function listenClientList() {
    // create an observer instance
    let observer = new MutationObserver(function (mutations) {
        console.log(mutations); // 所有改變
        mutations.forEach(function (mutation) {
            console.log("recordTime_and_countPeople");
            recordTime_and_countPeople();
            // 如果 target 的 childList 改變(新增或減少)，且 target 的 
            if (mutation.type == 'childList') {
                if (mutation.addedNodes[0]) {
                    console.log("人數增加，計算人數");
                    var headcount = clientList.length;
                    console.log(headcount);
                    // send(headcount);

                }
                if (mutation.removedNodes[0]) {
                    console.log("人數減少，計算人數");
                    var headcount = clientList.length;
                    console.log(headcount);
                    // send(headcount);
                }
            }

        });
    });

    // 確定能抓到 使用者清單
    let target = document.evaluate('/html/body/div/div/div[1]/div[1]/div[2]/div[2]/div[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    while (target == null) {
        console.log("target == null");
        await sleep(1000);
        target = document.evaluate('/html/body/div/div/div[1]/div[1]/div[2]/div[2]/div[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    console.log("抓到 target");
    console.log('==========================================');
    console.log(target);
    console.log('==========================================');
    // 新增或減少人數就記錄到 google sheet
    recordTime_and_countPeople();

    // configuration of the observer:
    // 觀察 target 的 attributes, childList, characterData 是否有更改
    let config = { attributes: true, childList: true, characterData: true };
    // pass in the target node, as well as the observer options
    observer.observe(target, config);
}


function checkIfIntoTown() {
    let target = document.querySelector('#root');
    // create an observer instance
    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes[0] != undefined) {
                // 確定真的載入到 town 裡面了
                if (mutation.addedNodes[0].className == "PrivateRoom-game-container") {
                    console.log(mutation.addedNodes[0]);
                    // 開始監聽列表
                    // 變更 target 成列表的元素
                    listenClientList();
                }
            }
        });
    });

    // configuration of the observer:
    let config = { attributes: true, childList: true, characterData: true };
    // pass in the target node, as well as the observer options
    observer.observe(target, config);
}

function send() {
    console.log("insert data into the google sheet");
    let nowTime = new Date();
    parms  = "?";
    parms += `time=${nowTime}&number=${onlineNumber}`;
    url = url.split("?")[0]+parms
    console.log(url); // DEBUG 
    //no-cors:告訴瀏覽器，我本來就知道 server 對於這個 request 是沒有設定可以存取 CORS 的，我本來就拿不到 response，我設定mode: 'no-cors，是為了，就算無法存取，也不要跑到 .catch() 那邊，讓它出現 Error。
    fetch(url,{mode:"no-cors"})
        .then(function (resp) {
            return resp.text();
        })
        .then(
            function (json) {
                if (json == "success") {
                    console.log("成功 json :  " + json);
                    alert("成功");
                }
                else {
                    console.log("失敗 json :  " + json);
                }
            });
};

checkIfIntoTown();