function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0'); //２けたになるように０埋めする
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');

  // スペースで秒を区切る
  const formattedTimehhmm = `${h}:${m}`;
  const formattedTimess = ` ${s}`;
  document.getElementById("clock_hhmm").firstChild.textContent = formattedTimehhmm;
  document.getElementById("clock_ss").textContent = formattedTimess;

}
setInterval(updateClock, 1000);
updateClock();

function workingStart(){
  const placeVal = document.getElementById("place").value;
  if(placeVal !== ""){
    document.getElementById("working_status").textContent = "ただいま勤務中...";
    document.getElementById("btnStart").disabled = true;
    document.getElementById("btnEnd").disabled = false;
    addHistory("出勤",placeVal);
  }else{
     openModal();
  }
}

function workingEnd(){
   
  const placeVal = document.getElementById("place").value;
  if(placeVal !== ""){
    document.getElementById("working_status").textContent = "勤怠管理システム";
    document.getElementById("btnStart").disabled = false;
    document.getElementById("btnEnd").disabled = true;
    addHistory("退勤",placeVal);
  }
}

function addHistory(type, placeVal) {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const timestamp = `${h}:${m}:${s}`;

  let displayPlace;
  console.log(placeVal);
  switch(placeVal){
    case "home":
        displayPlace = "在宅勤務";
        break;
    case "office":
        displayPlace = "オフィス";
        break;
    default:
        displayPlace = "";
  }
  
  const li = document.createElement("li");
  li.textContent = `${displayPlace}_${type}打刻：${timestamp}`;

  const historyList = document.getElementById("history");

  // 最初の「読み込み中...」は消すよー
  if (historyList.children[0] && historyList.children[0].textContent === "読み込み中...") {
    historyList.innerHTML = "";
  }

  historyList.appendChild(li);
}

function closeModal(){
   const modal = document.getElementById("modal");
    modal.classList.add('hidden');
}

function openModal(){
   const modal = document.getElementById("modal");
   modal.classList.remove('hidden');
}