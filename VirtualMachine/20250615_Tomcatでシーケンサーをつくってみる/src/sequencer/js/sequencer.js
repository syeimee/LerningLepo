function createSequencerUI(parts, steps) {
  const container = document.getElementById("sequencerGrid");
  container.innerHTML = "";
  for(let p=0; p<parts; p++) {
    const row = document.createElement("div");
    row.style.marginBottom = "10px";
    for(let s=0; s<steps; s++) {
      const btn = document.createElement("button");
      btn.textContent = "◯";
      btn.dataset.part = p;
      btn.dataset.step = s;
      btn.onclick = () => {
        btn.classList.toggle("active");
      };
      row.appendChild(btn);
    }
    container.appendChild(row);
  }
}

function getSequenceData() {
  // 4パート×16ステップのボタンのON/OFF情報をJSON化
  const buttons = document.querySelectorAll("#sequencerGrid button");
  const data = {};
  buttons.forEach(btn => {
    const p = btn.dataset.part;
    const s = btn.dataset.step;
    if(!data[p]) data[p] = [];
    data[p][s] = btn.classList.contains("active");
  });
  return data;
}

function setSequenceData(data) {
  const buttons = document.querySelectorAll("#sequencerGrid button");
  buttons.forEach(btn => {
    const p = btn.dataset.part;
    const s = btn.dataset.step;
    if(data[p] && data[p][s]) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

async function saveSequence() {
  const data = getSequenceData();
  const res = await fetch("sequencer", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
  if(res.ok) alert("保存しました");
  else alert("保存に失敗しました");
}

async function loadSequence() {
  const res = await fetch("sequencer");
  if(res.ok) {
    const data = await res.json();
    setSequenceData(data);
  } else {
    alert("読み込みに失敗しました");
  }
}

function logout() {
  location.href = "logout";
}
