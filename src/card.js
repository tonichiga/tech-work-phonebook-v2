// На данный момент функция добавление кастомного поля закомментирована в связи с наличием багов,
// так как LocalStorage  не совсем База Данных и не особо подходит для этих целей.
// Можно сделать добавление полей и удаление,
// но это будет работать только на стороне клиента и при обновлении страницы - исчезнет.

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
  clearAll: document.querySelector(".create-btn-clear"),
  statementBtnYesClear: document.querySelector(".statement__btn-yes-clear"),
  statementBtnNoClear: document.querySelector(".statement__btn-no-clear"),
  statementClear: document.querySelector(".statement-backdrop-clear"),
  statementTitleClear: document.querySelector(".statement__title.clear"),
  submitBtnField: document.querySelector(".create-field-save-btn"),
  submitBtnClose: document.querySelector(".create-field-close-btn"),
  submitFieldName: document.querySelector(".create-field-name"),
  submitFieldInfo: document.querySelector(".create-field-info"),
  getFieldWrapper: document.querySelector(".contact__wrapper-create"),
};
// Глобальные переменные
let array = [];
let dataID = 0;
let fieldInfo = "";
let fieldName = "";
let idBtn = 0;
// Создание первичного объекта
// Знаю, что Math.random() не подходит для генерации ID, так как есть вероятность совпавшего ID.
// Как тестовый вариант должно сработать. Позже можно доработать.
let idField = "";
let obj = {
  name: "",
  lastname: "",
  number: "",
  email: "",
  id: "",
  //
};
const templateFieldName = (name) => `
<p class="contact__element-name__title">${name}</p>
`;
const templateFieldSecondName = (info) => `
<p class="contact__element-second-name__title">${info}</p>
`;
// Забирает данный с LocalStorage
function getDataFromLS() {
  const parseElement = [];
  array = [];
  for (let i = 0; i < 300; i += 1) {
    // Цикл забора объектов из LS
    parseElement.push(localStorage.getItem(`${[i]}`));
  }
  // Цикл парсинга
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
  // Очистка контейнера перед добавлением (обновление контента)
  refs.contactWrapper.innerHTML = "";
  refs.contactWrapper.insertAdjacentHTML("beforeend", markup);
  const contactElementName = document.querySelector(".contact__element-name");
  const contactElementSecondName = document.querySelector(
    ".contact__element-second-name"
  );

  for (let keys in arr) {
    const obj = Object.values(arr[keys]);
    if (typeof obj === "object") {
      obj.forEach(({ value, info }) => {
        if (value !== undefined) {
          contactElementName.insertAdjacentHTML(
            "beforeend",
            templateFieldName(value)
          );
          contactElementSecondName.insertAdjacentHTML(
            "beforeend",
            templateFieldSecondName(info)
          );
        }
      });
    }
  }

  const addFieldBtn = document.querySelectorAll(".field-add-btn.open");

  addFieldBtn.forEach((btn) => {
    btn.addEventListener("click", handlerAddField);
  });
  function handlerAddField(e) {
    if (e.currentTarget.nodeName === "BUTTON") {
      refs.getFieldWrapper.classList.toggle("hidden");

      let id = e.currentTarget.dataset.id;
      const getSave = localStorage.getItem(`${id}`);
      const parse = JSON.parse(getSave);
      submitField(parse, id, arr);
    }
  }

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
}
// Вызов редактирования карточки
function handlerEdit(e) {
  if (e.currentTarget.nodeName === "BUTTON") {
    console.log("btn-edit");
  }
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
    // Генерация ID не самая удачная, можно поставить Date.now() или подключить плагин,
    // но из - за особенностей работы с LS,
    // для быстродействие выбран не большой диапазон рандомных чисел, чтобы бычтрее было
    // пербирать полученные данные с LS.
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
    obj.id = dataID;

    localStorage.setItem(`${dataID}`, JSON.stringify(obj));

    getDataFromLS();

    const markup = templateCard(array);
    refs.contactWrapper.innerHTML = "";
    refs.contactWrapper.insertAdjacentHTML("beforeend", markup);

    const contactSecondName = document.querySelectorAll(
      ".contact__element-second-name__title"
    );
    const contactName = document.querySelectorAll(
      ".contact__element-name__title"
    );
    contactSecondName.forEach((arr) => {
      if (arr.textContent === "") {
        let titleId = arr.dataset.tid;
        arr.remove();
        contactName.forEach((arr) => {
          if (arr.dataset.tid === titleId) {
            arr.remove();
          }
        });
      }
    });
    refs.backdrop.classList.remove("is-open");
    refs.backdrop.classList.add("is-hidden");
  }
  editBtnFn();
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
// Получение по ID - объекта с LS и его редактирование
function editItem(id) {
  const saveItemFromLS = localStorage.getItem(`${id}`);
  const parseItemFromLS = JSON.parse(saveItemFromLS);

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

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.currentTarget.nodeName === "BUTTON") {
        let removeId = e.currentTarget.dataset.id;
        refs.statementTitle.textContent = "Вы действительно хотите удалить?";
        refs.statement.classList.remove("hidden-statement");
        refs.statementBtnYes.addEventListener("click", (e) => {
          if (e.currentTarget.nodeName === "BUTTON") {
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
// Очистка LS
function clearLS() {
  refs.clearAll.addEventListener("click", (e) => {
    if (e.currentTarget.nodeName === "BUTTON") {
      console.log("yes");
      refs.statementTitleClear.textContent =
        "Вы действительно хотите ОЧИСТИТЬ ВСЁ?";
      refs.statementClear.classList.remove("hidden-statement");
      // refs.statementBtnYes.classList.add("hidden")

      refs.statementBtnYesClear.addEventListener("click", (e) => {
        console.log("Это Clear в подтверждении");
        if (e.currentTarget.nodeName === "BUTTON") {
          console.dir(e);
          refs.backdropCreate.classList.remove("is-open");
          refs.backdropCreate.classList.add("is-hidden");
          refs.statementClear.classList.add("hidden-statement");
          refs.contactWrapper.innerHTML = "";

          localStorage.clear();
          // refs.statementBtnYes.classList.remove("hidden");
        }
      });
      refs.statementBtnNoClear.addEventListener("click", (e) => {
        if (e.currentTarget.nodeName === "BUTTON") {
          refs.statementClear.classList.add("hidden-statement");
        }
      });
    }
  });
}

// Добавление катомных полей
function submitField(parse, id, arr) {
  refs.submitBtnField.addEventListener("click", handlerBtnField);
  function handlerBtnField(e) {
    if (e.currentTarget.nodeName === "BUTTON") {
      let idField = Math.floor(Math.random() * 300);
      let idFieldSec = Math.floor(Math.random() * 300);
      let name = "";
      let info = "";

      name = refs.submitFieldName.value;
      info = refs.submitFieldInfo.value;
      idField = {
        [idFieldSec]: {
          value: "",
          info: "",
        },
      };
      const object = { ...parse, ...idField };

      object[idFieldSec].value = name;
      object[idFieldSec].info = info;
      const getJson = JSON.stringify(object);
      console.log(object);
      localStorage.setItem(id, getJson);

      getDataFromLS();
      return;
    }
  }
}

clearLS();
// Для приятного визуала
setTimeout(() => {
  refs.backdrop.classList.remove("hidden");
  refs.backdropCreate.classList.remove("hidden");
  refs.statement.classList.remove("hidden");
  refs.statementClear.classList.remove("hidden");
}, 250);
