import templateCard from "./template/card.hbs";

const refs = {
  container: document.querySelector(".container"),
  edit: document.querySelector(".contact__btn-edit"),
  openModalBtn: document.querySelector("[data-modal-open]"),
  closeModalBtn: document.querySelector("[data-modal-close]"),
  modal: document.querySelector("[data-modal]"),
  backdrop: document.querySelector(".backdrop"),
  inputName: document.querySelector(".modal-form-input.name"),
  inputLastname: document.querySelector(".modal-form-input.lastname"),
  inputNumber: document.querySelector(".modal-form-input.number"),
  inputEmail: document.querySelector(".modal-form-input.email"),
  submitBtn: document.querySelector(".modal-btn-submit"),
};

const array = [];
let dataID = 0;

const obj = {
  name: "",
  lastname: "",
  number: "",
  email: "",
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

  editBtnFn(arr);
}

//После рендеринга слушаем кнопу Edit
export function editBtnFn() {
  const editBtn = document.querySelectorAll(".contact__btn-edit");
  const contact = document.querySelectorAll(".contact");
  editBtn.forEach((btn) => {
    btn.addEventListener("click", handlerEdit, true);
  });

  function handlerEdit(e) {
    const closeBtn = document.querySelector(".close-btn");

    // Работа с модальным окном для редактирования
    closeBtn.addEventListener("click", handlerCloseModal);
    document.addEventListener("keydown", handlerClickCloseModal);
    refs.backdrop.classList.remove("is-hidden");
    refs.backdrop.classList.add("is-open");
    submitBtn();

    //   Получение ID карточки кликая по кнопке
    if (e.currentTarget.nodeName === "BUTTON") {
      dataID = e.currentTarget.dataset.id;
      editItem(dataID);
    }
  }
}

function submitBtn() {
  obj.name = refs.inputName.value;
  obj.name = refs.inputLastname.value;
  obj.name = refs.inputNumber.value;
  obj.name = refs.inputEmail.value;
  localStorage.setItem(`${dataID}`, JSON.stringify(obj));
}
// Закрытие модального окна
function handlerCloseModal() {
  refs.backdrop.classList.remove("is-open");
  refs.backdrop.classList.add("is-hidden");
}
function handlerClickCloseModal(e) {
  if (e.code === "Escape") {
    refs.backdrop.classList.remove("is-open");
    refs.backdrop.classList.add("is-hidden");
  }
}
// Получение по ID объекта с LS и его редактирование
function editItem(id) {
  const saveItemFromLS = localStorage.getItem(`${id}`);
  const parseItemFromLS = JSON.parse(saveItemFromLS);
  refs.inputName.value = parseItemFromLS.name;
  refs.inputLastname.value = parseItemFromLS.lastName;
  refs.inputNumber.value = parseItemFromLS.number;
  refs.inputEmail.value = parseItemFromLS.email;

  console.log(parseItemFromLS);
}

// Вызов первого запроса данный с LS
getDataFromLS();

// Для приятного визуала
setTimeout(() => {
  refs.backdrop.classList.remove("hidden");
}, 250);
