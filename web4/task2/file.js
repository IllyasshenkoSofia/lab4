window.addEventListener('load', function () {
  let i;

  const colors = [
   "indigo",
   "plum",
	"maroon",
	"dodgerblue",
	"yellow",
	"lime",
    "green",
    "brown",
    "black",
    "grey"
  ];
  class ListItem {
    constructor(key, value) {
      this.key = key;
      this.value = value;
    }
  }
  const taskList = document.querySelector(".list");
  const addBtn = document.querySelector(".btn-add");
  const chart = document.querySelector(".diagram-container");
  let valueList = [];

  loadEventListeners();

  function loadEventListeners() {
    addBtn.addEventListener("click", addTask);
    taskList.addEventListener("click", removeTask);
    taskList.addEventListener("input", editTask);
  
  }
  function addTask(e) {
    const value = prompt("Назва підприємства");
    if (value === "") {
      alert("Будь-ласка введіть назву підприємства");
    }
    const val = prompt("Вартість послуг");
    if (val === "") {
      alert("Будь-ласка введіть вартість послуг");
    }
    const li = document.createElement("li");
    li.className = "list-item";
    const link = document.createElement("a");
    link.textContent = "Видалити";
    link.className = "delete-item";
    li.appendChild(link);
    const span1 = document.createElement("span");
    span1.className = "span-key span";
    span1.setAttribute("contenteditable", "true");
    span1.innerText = value;
    const span2 = document.createElement("span");
    span2.setAttribute("contenteditable", "true");
    span2.innerText = val;
    span2.className = "span-value span";
    li.appendChild(span1);
    li.appendChild(span2);

    taskList.appendChild(li);
    valueList.push(new ListItem(value, val));
    createChart(valueList);

  }
  function removeTask(e) {
    if (e.target.classList.contains("delete-item")) {
      if (confirm("Ви впевнені?")) {
        const elemList = Array.from(document.querySelectorAll(".list-item"));
        let a = elemList.indexOf(e.target.parentElement);
        if (a >= 0) {
          valueList.splice(a, 1);
        }
        e.target.parentElement.remove();
        createChart(valueList);
      }
    }
  }
  function editTask(e) {
    if (e.target.classList.contains("span")) {
      const elemList = Array.from(document.querySelectorAll(".list-item"));
      let a = elemList.indexOf(e.srcElement.parentNode);
      if (a >= 0) {
        if (e.srcElement.classList.contains("span-key"))
          valueList[a].key = e.srcElement.innerText;
        else {
          valueList[a].value = e.srcElement.innerText;
        }
        createChart(valueList);
      }
    }
  }
  function createChart(arr) {
    i = 0;
    while (chart.firstChild) {
      chart.removeChild(chart.firstChild);
    }
    let max = Number.parseFloat(arr[0].value);
    arr.forEach(element => {
      if (max < Number.parseFloat(element.value))
        max = Number.parseFloat(element.value);
    });

    arr.forEach(element => {
      createDiv(element.key, Number.parseFloat(element.value) / max, element.value);
      i++;
    });
  }
  function createDiv(key, percentage, value) {
    const group = document.createElement("div");
    group.className = "column-group";
    const label = document.createElement("p");
    label.className = "column-label";
    label.innerText = key;
    const maxHeight = 250;
    const column = document.createElement("div");
    column.className = "column";
    column.style.height = `${maxHeight * percentage}px`;
    column.style.marginTop = `${maxHeight - maxHeight * percentage}px`;
    column.style.backgroundColor = getColor();
    const columnValue = document.createElement("div");
    columnValue.innerText = value;
    columnValue.className = "column-value";
    column.addEventListener("mouseover", onHoverIn);
    column.addEventListener("mouseout", onHoverOut);
    column.appendChild(columnValue);
    group.appendChild(column);
    group.appendChild(label);
    chart.appendChild(group);
  }
  function onHoverIn(e){
    e.target.firstChild.style.opacity = 1;
  }
  function onHoverOut(e){
    e.target.firstChild.style.opacity = 0;
  }
  function getColor() {
    if (i > 10) {
      i -= 10;
      return getColor();
    } else return colors[i];
  }
})