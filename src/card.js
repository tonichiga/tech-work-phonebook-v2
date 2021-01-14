import templateCard from "./template/card.hbs";

const refs = {
  container: document.querySelector(".container"),
  edit: document.querySelector(".contact__btn-edit"),
  openModalBtn: document.querySelector("[data-modal-open]"),
  closeModalBtn: document.querySelector("[data-modal-close]"),
  modal: document.querySelector("[data-modal]"),
  backdrop: document.querySelector(".backdrop"),
  backdropCreate: document.querySelector(".backdrop.create"),
  inputName: document.querySelector(".modal-form-input.name"),
  inputLastname: document.querySelector(".modal-form-input.lastname"),
  inputNumber: document.querySelector(".modal-form-input.number"),
  inputEmail: document.querySelector(".modal-form-input.email"),
  submitBtn: document.querySelector(".modal-btn-submit"),
  createBtn: document.querySelector(".create-btn"),
  createName: document.querySelector(".modal-form-input.name.create"),
  createLastname: document.querySelector(".modal-form-input.lastname.create"),
  createNumber: document.querySelector(".modal-form-input.number.create"),
  createEmail: document.querySelector(".modal-form-input.email.create"),
  createBtnSave: document.querySelector(".modal-btn-submit.create"),
  closeBtn: document.querySelector(".close-btn"),
  closeBtnCreate: document.querySelector(".close-btn.create"),
};

const array = [];
let dataID = 0;

const obj = {
  name: "",
  lastname: "",
  number: "",
  email: "",
  id: `${dataID}`,
};
console.log(refs.backdropCreate);
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
function createContact() {
  refs.createBtn.addEventListener("click", handlerCreate);
}
//После рендеринга слушаем кнопу Edit
function editBtnFn() {
  const editBtn = document.querySelectorAll(".contact__btn-edit");
  const contact = document.querySelectorAll(".contact");
  editBtn.forEach((btn) => {
    btn.addEventListener("click", handlerEdit, true);
  });
}

function submitBtn() {
  refs.submitBtn.addEventListener("click", handlerSubmit);
  console.log(array);
  console.log(dataID);
}
function handlerEdit(e) {
  // Работа с модальным окном для редактирования
  refs.closeBtn.addEventListener("click", handlerCloseModal);
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

function handlerCreate(e) {
  if (e.currentTarget.nodeName === "BUTTON") {
    refs.backdropCreate.classList.remove("is-hidden");
    refs.backdropCreate.classList.add("is-open");

    refs.createBtnSave.addEventListener("click", handlerCreateSave);
    closeCreateModalBtn();
  }
}
function handlerCreateSave(e) {
  if (e.currentTarget.nodeName === "BUTTON") {
    dataID = localStorage.length + 1;
    obj.name = refs.createName.value;
    obj.lastname = refs.createLastname.value;
    obj.number = refs.createNumber.value;
    obj.email = refs.createEmail.value;
    localStorage.setItem(`${dataID}`, JSON.stringify(obj));
    closeCreateModal();
  }
}
function closeCreateModal() {
  refs.backdropCreate.classList.remove("is-open");
  refs.backdropCreate.classList.add("is-hidden");
}
function closeCreateModalBtn() {
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      console.log("yes");
      refs.backdropCreate.classList.remove("is-open");
      refs.backdropCreate.classList.add("is-hidden");
    }
  });
  refs.closeBtnCreate.addEventListener("click", (e) => {
    if (e.currentTarget.nodeName === "BUTTON") {
      refs.backdropCreate.classList.remove("is-open");
      refs.backdropCreate.classList.add("is-hidden");
    }
  });
}

function handlerSubmit(e) {
  if (e.currentTarget.nodeName === "BUTTON") {
    obj.name = refs.inputName.value;
    obj.lastname = refs.inputLastname.value;
    obj.number = refs.inputNumber.value;
    obj.email = refs.inputEmail.value;
    localStorage.setItem(`${dataID}`, JSON.stringify(obj));
    handlerCloseModal();
  }
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
  console.log(parseItemFromLS);
  if (parseItemFromLS.name === null) {
    refs.inputName.value = "";
  } else if (parseItemFromLS.lastname === null) {
    refs.inputLastname.value = "";
  } else if (parseItemFromLS.number === null) {
    refs.inputNumber.value = "";
  } else if (parseItemFromLS.email === null) {
    refs.inputEmail.value = "";
  }

  refs.inputName.value = parseItemFromLS.name;
  refs.inputLastname.value = parseItemFromLS.lastname;
  refs.inputNumber.value = parseItemFromLS.number;
  refs.inputEmail.value = parseItemFromLS.email;

  console.log(parseItemFromLS);
}

// Вызов первого запроса данных с LS
getDataFromLS();

// Вызов создания контакта
createContact();

// Для приятного визуала
setTimeout(() => {
  refs.backdrop.classList.remove("hidden");
}, 250);
setTimeout(() => {
  refs.backdropCreate.classList.remove("hidden");
}, 250);
