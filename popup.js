// Initialize button with user's preferred color
const FilterStoreKey = "filterRule";
let changeColor = document.getElementById("changeColor");
console.log("sdasdsa");
let filterUrls = {
  url: [
    { hostSuffix: "link.juejin.cn" },
    { hostSuffix: "link.csdn.net" },
    { hostSuffix: "link.zhihu.com" },
  ],
};

let FilterUrlsData=[];

function onRemoved() {
  // console.log("Removed",this.value)
  FilterUrlsData.splice(this.id,1);
  chrome.storage.local.set({ [FilterStoreKey]: FilterUrlsData }, () => {
    console.log(`${FilterStoreKey} is set to ${FilterUrlsData}`);
    window.location.reload();
  });
    
  
}


 chrome.storage.local.get([FilterStoreKey], function (result) {
   console.log("Value currently is " , result);
   let dataList=result[FilterStoreKey];
  FilterUrlsData = dataList;
   let dataListDiv = document.getElementById("dataList");
   if (dataList && dataListDiv) {
     //  FilterUrlsData = result.key;
     for (let key in dataList) {
       let it = document.createElement("p");
       it.innerHTML = dataList[key].hostSuffix;
       let removeBtn=document.createElement("button");
       removeBtn.innerHTML="remove";
       removeBtn.id=key;
       removeBtn.value=dataList[key].hostSuffix;
       removeBtn.addEventListener("click",onRemoved);
       it.appendChild(removeBtn);
       dataListDiv.appendChild(it);
     }
   }
 });
// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });
changeColor.addEventListener("click", async () => {
  let input_data=document.getElementById("input_data").value;
  console.log("changeColor", input_data);
  FilterUrlsData.push({hostSuffix:input_data});
  chrome.storage.local.set({ [FilterStoreKey]: FilterUrlsData },() => {
    console.log(`${FilterStoreKey} is set to ${FilterUrlsData}`);
    window.location.reload();
  });
  
});
