const btnAddEl = document.querySelector("#liveToastBtn");
const listItemEl = document.querySelector("#list");
const bodyEl = document.querySelector("body");
const taskEl = document.querySelector("#task");
const liEl = document.getElementsByTagName("li");
const btnCloseEl = document.getElementsByClassName("close");

function removeElement() {
  this.parentElement.remove();
}

function addChecked() {
  this.classList.toggle("checked");
}

function setLocalStorage(task) {
  const data = getLocalStorage();
  if (!data) {
    localStorage.setItem("task", JSON.stringify([]));
  } else {
    data.push(task);
    localStorage.setItem("task", JSON.stringify(data));
  }
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("task"));
}

const init = function () {
  for (let i = 0; i < liEl.length; i++) {
    if (!liEl.item(i).childElementCount) {
      let span = document.createElement("span");
      let text = document.createTextNode("\u00D7");
      span.className = "close";
      span.onclick = removeElement;
      span.appendChild(text);
      liEl[i].appendChild(span);

      setLocalStorage(liEl[i].textContent.slice(0, -1));
    }
  }
};
init();

// Add element to list
const addToDo = function () {
  const toDoTextEl = taskEl.value;
  if (toDoTextEl.trim().length > 0) {
    const markUp = `<li>${toDoTextEl}</li>`;
    listItemEl.insertAdjacentHTML("afterbegin", markUp);
    $(".success").toast("show");

    init();
  } else {
    $(".error").toast("show");
  }
};

btnAddEl.addEventListener("click", addToDo);

// Remove element to list
console.log(btnCloseEl);

for (let i = 0; i < liEl.length; i++) {
  liEl[i].addEventListener("click", addChecked);
}
