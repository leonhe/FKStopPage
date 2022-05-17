const FilterStoreKey = "filterRule";

//setting filter rule
function setStore(key, value) {
  chrome.storage.local.set({ [key]: value },() => {
    console.log(`${key} is set to ${value}`);
  });
}

let filterUrls = {
  url: [
    { hostSuffix: "link.juejin.cn"},
    { hostSuffix: "link.csdn.net" },
    { hostSuffix: "link.zhihu.com" },
  ],
};

// chrome.action.onClicked.addListener((tab) => {
//     console.log(tab);
//     chrome.storage.local.get([FilterStoreKey], function (result) {
//       console.log("Value currently is " + result.key);
//     });
// });

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
chrome.webNavigation.onBeforeNavigate.addListener(async (data) => {
    console.log(data);
  let matchURLs=data.url.match(/target=(.*)+/);
  let targetURL = decodeURIComponent(matchURLs[1]);
  if (targetURL) {
    let tabID = await getCurrentTab();
    // tabID.pendingUrl=targetURL;
   await chrome.tabs.update(tabID.id, {
      url: targetURL,
    });
    console.log("onBeforeNavigate", targetURL);
  }
}, filterUrls);