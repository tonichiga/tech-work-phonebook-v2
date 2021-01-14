import templateCard from "./template/card.hbs";

const refs = {
  container: document.querySelector(".container"),
  edit: document.querySelector(".contact__btn-edit"),
};

const array = [];

const obj = {
  name: "Иван",
  lastname: "Василье",
  number: "0951128766",
  email: "ivan@gmail.com",
};

// Забирает данный с LocalStorage
function getDataFromLS() {
  const parseElement = [];

  for (let i = 0; i < 100; i += 1) {
    parseElement.push(localStorage.getItem(`${[i]}`));
  }
  parseElement.forEach((item) => {
    if (item !== null) {
      array.push(JSON.parse(item));
    }
  });
  render(array);
  return array;
}

// Первичный рендеринг
function render(arr) {
  const markup = templateCard(arr);
  // refs.container.innerHTML = "";
  refs.container.insertAdjacentHTML("beforeend", markup);
  editBtnFn();
}
//После рендеринга слушаем кнопу Edit
function editBtnFn() {
  const editBtn = document.querySelector("contact__btn-edit");
  editBtn.addEventListener("click", (e) => {
    if (e.target.value === "BUTTON") {
    }
  });
}

// Вызов первого запроса данный с LS
getDataFromLS();
