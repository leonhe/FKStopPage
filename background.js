const FilterStoreKey = "filterRule";

let filterUrls = {
  url: [
    { hostSuffix: "link.juejin.cn"},
    { hostSuffix: "link.csdn.net" },
    { hostSuffix: "link.zhihu.com" },
  ],
};

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