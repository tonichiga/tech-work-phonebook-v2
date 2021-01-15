// Импорт шаблона
import templateCard from "./template/card.hbs";
// Ссылки на необходимые элементы
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
  statement: document.querySelector(".statement-backdrop"),
  statementBtnYes: document.querySelector(".statement__btn-yes"),
  statementBtnNo: document.querySelector(".statement__btn-no"),
  statementTitle: document.querySelector(".statement__title"),
  contactWrapper: document.querySelector(".contact__wrapper"),
};
// Глобальные переменные
let array = [];
let dataID = 0;
// Создание первичного объекта
// Знаю, что Math.random() не подходит для генерации ID, так как есть вероятность совпавшего ID.
// Как тестовый вариант должно сработать. Позже можно доработать.
const obj = {
  name: "",
  lastname: "",
  number: "",
  email: "",
  id: "",
};
// Забирает данный с LocalStorage
function getDataFromLS() {
  const parseElement = [];
  array = [];
  for (let i = 0; i < 300; i += 1) {
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
  refs.contactWrapper.innerHTML = "";
  refs.contactWrapper.insertAdjacentHTML("beforeend", markup);

  editBtnFn(arr);
  deleteContact();
}
// Открытие модального окна для создания контакта
function createContact() {
  refs.createBtn.addEventListener("click", handlerCreate);
}
// После рендеринга слушаем кнопу Edit
function editBtnFn() {
  const editBtn = document.querySelectorAll(".contact__btn-edit");
  const contact = document.querySelectorAll(".contact");
  editBtn.forEach((btn) => {
    btn.addEventListener("click", handlerEdit, true);
  });
}
// Сохранение созданной карточки
function submitBtn() {
  refs.submitBtn.addEventListener("click", handlerSubmit);
  console.log(array);
  console.log(dataID);
}
// Вызов редактирования карточки
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
// Открытие окна для создания карточки
function handlerCreate(e) {
  if (e.currentTarget.nodeName === "BUTTON") {
    refs.backdropCreate.classList.remove("is-hidden");
    refs.backdropCreate.classList.add("is-open");
    obj.id = Math.floor(Math.random() * 300);
    refs.createBtnSave.addEventListener("click", handlerCreateSave);
    closeCreateModalBtn();
  }
}
// Логика создания карточки
function handlerCreateSave(e) {
  if (e.currentTarget.nodeName === "BUTTON") {
    dataID = obj.id;
    obj.name = refs.createName.value;
    obj.lastname = refs.createLastname.value;
    obj.number = refs.createNumber.value;
    obj.email = refs.createEmail.value;

    localStorage.setItem(`${dataID}`, JSON.stringify(obj));

    closeCreateModal();
    getDataFromLS();
  }
}
// Логика редактирования карточки
function handlerSubmit(e) {
  if (e.currentTarget.nodeName === "BUTTON") {
    obj.name = refs.inputName.value;
    obj.lastname = refs.inputLastname.value;
    obj.number = refs.inputNumber.value;
    obj.email = refs.inputEmail.value;
    localStorage.setItem(`${dataID}`, JSON.stringify(obj));
    refs.backdrop.classList.remove("is-open");
    refs.backdrop.classList.add("is-hidden");
  }
}
// Закрытие модального окна
function handlerCloseModal() {
  refs.statementTitle.textContent = "Вы действительно хотите выйти?";
  refs.statement.classList.remove("hidden-statement");
  refs.statementBtnYes.addEventListener("click", (e) => {
    if (e.currentTarget.nodeName === "BUTTON") {
      refs.backdrop.classList.remove("is-open");
      refs.backdrop.classList.add("is-hidden");
      refs.statement.classList.add("hidden-statement");
      refs.inputName.value = "";
      refs.inputLastname.value = "";
      refs.inputNumber.value = "";
      refs.inputEmail.value = "";
    }
  });
  refs.statementBtnNo.addEventListener("click", (e) => {
    if (e.currentTarget.nodeName === "BUTTON") {
      refs.statement.classList.add("hidden-statement");
    }
  });
}
// Реализация закрытия модального окна по кнопке ESC
function handlerClickCloseModal(e) {
  if (e.code === "Escape") {
    refs.statementTitle.textContent = "Вы действительно хотите выйти?";
    refs.statement.classList.remove("hidden-statement");
    refs.statementBtnYes.addEventListener("click", (e) => {
      if (e.currentTarget.nodeName === "BUTTON") {
        refs.backdrop.classList.remove("is-open");
        refs.backdrop.classList.add("is-hidden");
        refs.statement.classList.add("hidden-statement");
        refs.inputName.value = "";
        refs.inputLastname.value = "";
        refs.inputNumber.value = "";
        refs.inputEmail.value = "";
      }
    });
    refs.statementBtnNo.addEventListener("click", (e) => {
      if (e.currentTarget.nodeName === "BUTTON") {
        refs.statement.classList.add("hidden-statement");
      }
    });
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
// Закрывает окно при нажатии на кнопку Сохранить
function closeCreateModal() {
  refs.backdropCreate.classList.remove("is-open");
  refs.backdropCreate.classList.add("is-hidden");
  refs.createName.value = "";
  refs.createLastname.value = "";
  refs.createNumber.value = "";
  refs.createEmail.value = "";
}
// Реализация закрытия модального окна по кнопке ESC
function closeCreateModalBtn() {
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      refs.statementTitle.textContent = "Вы действительно хотите выйти?";
      refs.statement.classList.remove("hidden-statement");
      refs.statementBtnYes.addEventListener("click", (e) => {
        if (e.currentTarget.nodeName === "BUTTON") {
          refs.backdropCreate.classList.remove("is-open");
          refs.backdropCreate.classList.add("is-hidden");
          refs.statement.classList.add("hidden-statement");
          refs.createName.value = "";
          refs.createLastname.value = "";
          refs.createNumber.value = "";
          refs.createEmail.value = "";
        }
      });
      refs.statementBtnNo.addEventListener("click", (e) => {
        if (e.currentTarget.nodeName === "BUTTON") {
          refs.statement.classList.add("hidden-statement");
        }
      });
    }
  });
  refs.closeBtnCreate.addEventListener("click", (e) => {
    if (e.currentTarget.nodeName === "BUTTON") {
      refs.statementTitle.textContent = "Вы действительно хотите выйти?";
      refs.statement.classList.remove("hidden-statement");

      refs.statementBtnYes.addEventListener("click", (e) => {
        if (e.currentTarget.nodeName === "BUTTON") {
          refs.backdropCreate.classList.remove("is-open");
          refs.backdropCreate.classList.add("is-hidden");
          refs.statement.classList.add("hidden-statement");
          refs.createName.value = "";
          refs.createLastname.value = "";
          refs.createNumber.value = "";
          refs.createEmail.value = "";
        }
      });
      refs.statementBtnNo.addEventListener("click", (e) => {
        if (e.currentTarget.nodeName === "BUTTON") {
          refs.statement.classList.add("hidden-statement");
        }
      });
    }
  });
}
// Логика удаления карточки
function deleteContact() {
  const deleteBtn = document.querySelectorAll(".contact__btn-delete");
  console.log(deleteBtn);
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.currentTarget.nodeName === "BUTTON") {
        let removeId = e.currentTarget.dataset.id;
        refs.statementTitle.textContent = "Вы действительно хотите удалить?";
        refs.statement.classList.remove("hidden-statement");
        refs.statementBtnYes.addEventListener("click", (e) => {
          if (e.currentTarget.nodeName === "BUTTON") {
            console.log("remove");
            refs.statement.classList.add("hidden-statement");
            localStorage.removeItem(removeId);
            getDataFromLS();
          }
        });
        refs.statementBtnNo.addEventListener("click", (e) => {
          if (e.currentTarget.nodeName === "BUTTON") {
            refs.statement.classList.add("hidden-statement");
          }
        });
      }
    });
  });
}

// Вызов первого запроса данных с LS
getDataFromLS();
// Вызов создания контакта
createContact();
// Для приятного визуала
setTimeout(() => {
  refs.backdrop.classList.remove("hidden");
  refs.backdropCreate.classList.remove("hidden");
  refs.statement.classList.remove("hidden");
}, 250);
