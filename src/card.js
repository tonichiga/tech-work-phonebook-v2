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
  submitBtnSaveEdit: document.querySelector(".create-field-save-btn-edit"),
  contactList: document.querySelector(".contact__list"),
  submitBtnFieldEdit: document.querySelector(".create-field-save-btn-edit"),
  submitBtnCloseEdit: document.querySelector(".create-field-close-btn-edit"),
  submitFieldNameEdit: document.querySelector(".create-field-name-edit"),
  submitFieldInfoEdit: document.querySelector(".create-field-info-edit"),
  getFieldWrapperEdit: document.querySelector(".contact__wrapper-create-edit"),
};
// Глобальные переменные
let newId;
let array = [];
let dataID = 0;
let fieldInfo = "";
let fieldName = "";
let idBtn = 0;
let deleteId = 0;
let btnName = "";
// let targetId = 0;
// Создание первичного объекта
// Знаю, что Math.random() не подходит для генерации ID, так как есть вероятность совпавшего ID.
// Как тестовый вариант должно сработать. Позже можно доработать.
let idField = "";
let obj = {
  field1: {
    value: "",
    info: "",
  },
  field2: {
    value: "",
    info: "",
  },
  field3: {
    value: "",
    info: "",
  },
  field4: {
    value: "",
    info: "",
  },
  field5: {
    value: "",
    info: "",
  },
  name: "",
  lastname: "",
  number: "",
  email: "",
  id: "",
  //
};

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
}
// Первичный рендеринг
function render(arr) {
  const markup = templateCard(arr);
  // Очистка контейнера перед добавлением (обновление контента)
  refs.contactWrapper.innerHTML = "";
  refs.contactWrapper.insertAdjacentHTML("beforeend", markup);

  const contactElementName = document.querySelectorAll(
    ".contact__element-name__title"
  );
  const contactFieldWrapperTitle = document.querySelectorAll(
    "div.contact__field-wrapper > .contact__element-second-name__title"
  );
  const contactFieldWrapper = document.querySelectorAll(
    ".contact__field-wrapper"
  );
  // Отбор вложенного объекта
  for (let keys in arr) {
    const obj = Object.values(arr[keys]);
    if (typeof obj === "object") {
    }
  }
  // Очистка DOM от пустых элементов добавленных шаблоном
  contactElementName.forEach((el) => {
    if (el.textContent === "") {
      el.remove();
    }
  });
  // Очистка DOM от пустых элементов добавленных шаблоном
  contactFieldWrapper.forEach((element) => {
    element.children.forEach((el) => {
      if (el.nodeName === "P") {
        if (el.textContent === "") {
          element.remove();
        }
      }
    });
  });
  // Добавляет Event для кнопки добавления новых полей
  const addFieldBtn = document.querySelectorAll(".field-add-btn.open");
  addFieldBtn.forEach((btn) => {
    btn.addEventListener("click", handlerAddField);
  });
  function handlerAddField(e) {
    if (e.currentTarget.nodeName === "BUTTON") {
      refs.getFieldWrapper.classList.remove("is-hidden");
      // Присвоение ID
      newId = e.currentTarget.dataset.id;
      refs.submitFieldName.value = "";
      refs.submitFieldInfo.value = "";
    }
  }

  editBtnFn(arr);
  deleteContact();
  submitEdit();
  deleteField1();
  deleteField2();
  deleteField3();
  deleteField4();
  deleteField5();
}
// Открытие модального окна для создания контакта
function createContact() {
  refs.createBtn.addEventListener("click", handlerCreate);
}
// После рендеринга слушаем кнопу Edit
function editBtnFn() {
  const editBtn = document.querySelectorAll(".contact__btn-edit");
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
    // для быстродействие выбран не большой диапазон рандомных чисел, чтобы быстрее было
    // пербирать полученные данные с LS.
    obj.id = Math.floor(Math.random() * 300);
    refs.createBtnSave.addEventListener("click", handlerCreateSave);
    closeCreateModalBtn();
  }
}
// Логика создания карточки
function handlerCreateSave(e) {
  if (e.currentTarget.nodeName === "BUTTON") {
    // Запись новых значений в объект
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
    // При открытии окна редактирование, отображались редактируемые значения
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
  // Окно подтверждения
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
  // Событие при отмене подтверждения
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
        // Чистка инпутов
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
      refs.statementTitleClear.textContent =
        "Вы действительно хотите ОЧИСТИТЬ ВСЁ?";
      refs.statementClear.classList.remove("hidden-statement");
      // refs.statementBtnYes.classList.add("hidden")

      refs.statementBtnYesClear.addEventListener("click", (e) => {
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
function submitField() {
  refs.submitBtnField.addEventListener("click", handlerBtnField);

  function handlerBtnField(e) {
    if (e.currentTarget.nodeName === "BUTTON") {
      let name = "";
      let info = "";
      const getSave = localStorage.getItem(`${newId}`);
      // Парсинг и добавление кастомных полей
      const parse = JSON.parse(getSave);
      name = refs.submitFieldName.value;
      info = refs.submitFieldInfo.value;

      const object = { ...parse };
      // Логика перебора полей - если занят, то запиши в следующий.
      if (parse.field1.value === "") {
        object.field1.value = name;
      } else if (parse.field2.value === "") {
        object.field2.value = name;
      } else if (parse.field3.value === "") {
        object.field3.value = name;
      } else if (parse.field4.value === "") {
        object.field4.value = name;
      } else if (parse.field5.value === "") {
        object.field5.value = name;
      } else {
        console.log("Ошибка, слишком много полей");
      }
      if (parse.field1.info === "") {
        object.field1.info = info;
      } else if (parse.field2.info === "") {
        object.field2.info = info;
      } else if (parse.field3.info === "") {
        object.field3.info = info;
      } else if (parse.field4.info === "") {
        object.field4.info = info;
      } else if (parse.field5.info === "") {
        object.field5.info = info;
      } else {
        console.log("Ошибка, слишком много полей");
      }
      // Проверка на пустые инпуты
      if (
        refs.submitFieldName.value === "" ||
        refs.submitFieldInfo.value === ""
      ) {
        refs.submitFieldName.style.border = "solid 2px";
        refs.submitFieldName.style.borderColor = "rgb(255, 0, 0)";
        refs.submitFieldInfo.style.border = "solid 2px";
        refs.submitFieldInfo.style.borderColor = "rgb(255, 0, 0)";
      } else {
        const getJson = JSON.stringify(object);
        localStorage.setItem(newId, getJson);
        refs.getFieldWrapper.classList.add("is-hidden");

        getDataFromLS();
      }
    }
  }
}
submitField();
// Редактирует кастомные поля
function submitEdit() {
  refs.contactWrapper.addEventListener("click", handlerFoundEditBtn, true);
  function handlerFoundEditBtn(e) {
    if (e.target.parentNode.nodeName === "BUTTON") {
      if (e.target.parentNode.classList.contains("btn-edit-name")) {
        const targetId = e.target.parentNode.dataset.id;
        const save = localStorage.getItem(targetId);
        const parse = JSON.parse(save);

        if (e.target.parentNode.classList.contains("field1")) {
          refs.getFieldWrapperEdit.classList.remove("is-hidden");
          refs.submitFieldNameEdit.value = parse.field1.value;
          refs.submitFieldInfoEdit.value = parse.field1.info;
          saveEditField1(parse, targetId);
        }
        if (e.target.parentNode.classList.contains("field2")) {
          refs.getFieldWrapperEdit.classList.remove("is-hidden");
          refs.submitFieldNameEdit.value = parse.field2.value;
          refs.submitFieldInfoEdit.value = parse.field2.info;
          saveEditField2(parse, targetId);
        }
        if (e.target.parentNode.classList.contains("field3")) {
          refs.getFieldWrapperEdit.classList.remove("is-hidden");
          refs.submitFieldNameEdit.value = parse.field3.value;
          refs.submitFieldInfoEdit.value = parse.field3.info;
          saveEditField3(parse, targetId);
        }
        if (e.target.parentNode.classList.contains("field4")) {
          refs.getFieldWrapperEdit.classList.remove("is-hidden");
          refs.submitFieldNameEdit.value = parse.field4.value;
          refs.submitFieldInfoEdit.value = parse.field4.info;
          saveEditField4(parse, targetId);
        }
        if (e.target.parentNode.classList.contains("field5")) {
          refs.getFieldWrapperEdit.classList.remove("is-hidden");
          refs.submitFieldNameEdit.value = parse.field5.value;
          refs.submitFieldInfoEdit.value = parse.field5.info;
          saveEditField5(parse, targetId);
        }
      }
    }
  }
}

// Сохраняет изменение поля 1
function saveEditField1(parse, targetId) {
  refs.submitBtnSaveEdit.addEventListener("click", saveEditField);
  function saveEditField(e) {
    if (e.currentTarget.nodeName === "BUTTON") {
      parse.field1.value = refs.submitFieldNameEdit.value;
      parse.field1.info = refs.submitFieldInfoEdit.value;
      if (
        refs.submitFieldNameEdit.value === "" ||
        refs.submitFieldInfoEdit.value === ""
      ) {
        refs.submitFieldNameEdit.style.border = "solid 2px";
        refs.submitFieldNameEdit.style.borderColor = "rgb(255, 0, 0)";
        refs.submitFieldInfoEdit.style.border = "solid 2px";
        refs.submitFieldInfoEdit.style.borderColor = "rgb(255, 0, 0)";
      } else {
        const str = JSON.stringify(parse);
        localStorage.setItem(targetId, str);
        console.log(parse.field1.value);
        console.log(str);
        refs.getFieldWrapperEdit.classList.add("is-hidden");
        location.reload();
      }
    }
  }
  return;
}
// Сохраняет изменение поля 2
function saveEditField2(parse, targetId) {
  refs.submitBtnSaveEdit.addEventListener("click", saveEditField);
  function saveEditField(e) {
    if (e.currentTarget.nodeName === "BUTTON") {
      parse.field2.value = refs.submitFieldNameEdit.value;
      parse.field2.info = refs.submitFieldInfoEdit.value;
      if (
        refs.submitFieldNameEdit.value === "" ||
        refs.submitFieldInfoEdit.value === ""
      ) {
        refs.submitFieldNameEdit.style.border = "solid 2px";
        refs.submitFieldNameEdit.style.borderColor = "rgb(255, 0, 0)";
        refs.submitFieldInfoEdit.style.border = "solid 2px";
        refs.submitFieldInfoEdit.style.borderColor = "rgb(255, 0, 0)";
      } else {
        const str = JSON.stringify(parse);
        localStorage.setItem(targetId, str);
        console.log(parse.field2.value);
        console.log(str);
        refs.getFieldWrapperEdit.classList.add("is-hidden");
        location.reload();
      }
    }
  }
  return;
}
// Сохраняет изменение поля 3
function saveEditField3(parse, targetId) {
  refs.submitBtnSaveEdit.addEventListener("click", saveEditField);
  function saveEditField(e) {
    if (e.currentTarget.nodeName === "BUTTON") {
      parse.field3.value = refs.submitFieldNameEdit.value;
      parse.field3.info = refs.submitFieldInfoEdit.value;
      if (
        refs.submitFieldNameEdit.value === "" ||
        refs.submitFieldInfoEdit.value === ""
      ) {
        refs.submitFieldNameEdit.style.border = "solid 2px";
        refs.submitFieldNameEdit.style.borderColor = "rgb(255, 0, 0)";
        refs.submitFieldInfoEdit.style.border = "solid 2px";
        refs.submitFieldInfoEdit.style.borderColor = "rgb(255, 0, 0)";
      } else {
        const str = JSON.stringify(parse);
        localStorage.setItem(targetId, str);
        console.log(parse.field3.value);
        console.log(str);
        refs.getFieldWrapperEdit.classList.add("is-hidden");
        location.reload();
      }
    }
  }
  return;
}
// Сохраняет изменение поля 4
function saveEditField4(parse, targetId) {
  refs.submitBtnSaveEdit.addEventListener("click", saveEditField);
  function saveEditField(e) {
    if (e.currentTarget.nodeName === "BUTTON") {
      parse.field4.value = refs.submitFieldNameEdit.value;
      parse.field4.info = refs.submitFieldInfoEdit.value;
      if (
        refs.submitFieldNameEdit.value === "" ||
        refs.submitFieldInfoEdit.value === ""
      ) {
        refs.submitFieldNameEdit.style.border = "solid 2px";
        refs.submitFieldNameEdit.style.borderColor = "rgb(255, 0, 0)";
        refs.submitFieldInfoEdit.style.border = "solid 2px";
        refs.submitFieldInfoEdit.style.borderColor = "rgb(255, 0, 0)";
      } else {
        const str = JSON.stringify(parse);
        localStorage.setItem(targetId, str);
        console.log(parse.field4.value);
        console.log(str);
        refs.getFieldWrapperEdit.classList.add("is-hidden");
        location.reload();
      }
    }
  }
  return;
}
// Сохраняет изменение поля 5
function saveEditField5(parse, targetId) {
  refs.submitBtnSaveEdit.addEventListener("click", saveEditField);
  function saveEditField(e) {
    if (e.currentTarget.nodeName === "BUTTON") {
      parse.field5.value = refs.submitFieldNameEdit.value;
      parse.field5.info = refs.submitFieldInfoEdit.value;
      if (
        refs.submitFieldNameEdit.value === "" ||
        refs.submitFieldInfoEdit.value === ""
      ) {
        refs.submitFieldNameEdit.style.border = "solid 2px";
        refs.submitFieldNameEdit.style.borderColor = "rgb(255, 0, 0)";
        refs.submitFieldInfoEdit.style.border = "solid 2px";
        refs.submitFieldInfoEdit.style.borderColor = "rgb(255, 0, 0)";
      } else {
        const str = JSON.stringify(parse);
        localStorage.setItem(targetId, str);
        console.log(parse.field5.value);
        console.log(str);
        refs.getFieldWrapperEdit.classList.add("is-hidden");
        location.reload();
      }
    }
  }
  return;
}
// Удаляет выбранное кастомное поле 1
function deleteField1() {
  refs.contactWrapper.addEventListener("click", handlerDeleteField, true);
  function handlerDeleteField(e) {
    if (e.target.parentNode.nodeName === "BUTTON") {
      if (e.target.parentNode.classList.contains("btn-delete-name")) {
        deleteId = e.target.parentNode.dataset.id;
        const arr = e.target.parentNode.classList;
        if (arr.contains("field1")) {
          refs.statementTitle.textContent = "Вы действительно хотите удалить?";
          refs.statement.classList.remove("hidden-statement");

          refs.statementBtnYes.addEventListener("click", (e) => {
            if (e.currentTarget.nodeName === "BUTTON") {
              refs.backdropCreate.classList.remove("is-open");
              refs.backdropCreate.classList.add("is-hidden");
              refs.statement.classList.add("hidden-statement");

              const toSave = localStorage.getItem(deleteId);
              const toParse = JSON.parse(toSave);
              toParse.field1.value = "";
              toParse.field1.info = "";
              const toStr = JSON.stringify(toParse);
              localStorage.setItem(deleteId, toStr);
              location.reload();
            }
          });
        }
      }
      refs.statementBtnNo.addEventListener("click", (e) => {
        if (e.currentTarget.nodeName === "BUTTON") {
          refs.statement.classList.add("hidden-statement");
        }
      });
    }
  }
}
// Удаляет выбранное кастомное поле 2
function deleteField2() {
  refs.contactWrapper.addEventListener("click", handlerDeleteField, true);
  function handlerDeleteField(e) {
    if (e.target.parentNode.nodeName === "BUTTON") {
      if (e.target.parentNode.classList.contains("btn-delete-name")) {
        deleteId = e.target.parentNode.dataset.id;
        const arr = e.target.parentNode.classList;
        if (arr.contains("field2")) {
          refs.statementTitle.textContent = "Вы действительно хотите удалить?";
          refs.statement.classList.remove("hidden-statement");

          refs.statementBtnYes.addEventListener("click", (e) => {
            if (e.currentTarget.nodeName === "BUTTON") {
              refs.backdropCreate.classList.remove("is-open");
              refs.backdropCreate.classList.add("is-hidden");
              refs.statement.classList.add("hidden-statement");

              const toSave = localStorage.getItem(deleteId);
              const toParse = JSON.parse(toSave);
              toParse.field2.value = "";
              toParse.field2.info = "";
              const toStr = JSON.stringify(toParse);
              localStorage.setItem(deleteId, toStr);
              location.reload();
            }
          });
        }
      }
      refs.statementBtnNo.addEventListener("click", (e) => {
        if (e.currentTarget.nodeName === "BUTTON") {
          refs.statement.classList.add("hidden-statement");
        }
      });
    }
  }
}
// Удаляет выбранное кастомное поле 3
function deleteField3() {
  refs.contactWrapper.addEventListener("click", handlerDeleteField, true);
  function handlerDeleteField(e) {
    if (e.target.parentNode.nodeName === "BUTTON") {
      if (e.target.parentNode.classList.contains("btn-delete-name")) {
        deleteId = e.target.parentNode.dataset.id;
        const arr = e.target.parentNode.classList;
        if (arr.contains("field3")) {
          refs.statementTitle.textContent = "Вы действительно хотите удалить?";
          refs.statement.classList.remove("hidden-statement");

          refs.statementBtnYes.addEventListener("click", (e) => {
            if (e.currentTarget.nodeName === "BUTTON") {
              refs.backdropCreate.classList.remove("is-open");
              refs.backdropCreate.classList.add("is-hidden");
              refs.statement.classList.add("hidden-statement");

              const toSave = localStorage.getItem(deleteId);
              const toParse = JSON.parse(toSave);
              toParse.field3.value = "";
              toParse.field3.info = "";
              const toStr = JSON.stringify(toParse);
              localStorage.setItem(deleteId, toStr);
              location.reload();
            }
          });
        }
      }
      refs.statementBtnNo.addEventListener("click", (e) => {
        if (e.currentTarget.nodeName === "BUTTON") {
          refs.statement.classList.add("hidden-statement");
        }
      });
    }
  }
}
// Удаляет выбранное кастомное поле 4
function deleteField4() {
  refs.contactWrapper.addEventListener("click", handlerDeleteField, true);
  function handlerDeleteField(e) {
    if (e.target.parentNode.nodeName === "BUTTON") {
      if (e.target.parentNode.classList.contains("btn-delete-name")) {
        deleteId = e.target.parentNode.dataset.id;
        const arr = e.target.parentNode.classList;
        if (arr.contains("field4")) {
          refs.statementTitle.textContent = "Вы действительно хотите удалить?";
          refs.statement.classList.remove("hidden-statement");

          refs.statementBtnYes.addEventListener("click", (e) => {
            if (e.currentTarget.nodeName === "BUTTON") {
              refs.backdropCreate.classList.remove("is-open");
              refs.backdropCreate.classList.add("is-hidden");
              refs.statement.classList.add("hidden-statement");

              const toSave = localStorage.getItem(deleteId);
              const toParse = JSON.parse(toSave);
              toParse.field4.value = "";
              toParse.field4.info = "";
              const toStr = JSON.stringify(toParse);
              localStorage.setItem(deleteId, toStr);
              location.reload();
            }
          });
        }
      }
      refs.statementBtnNo.addEventListener("click", (e) => {
        if (e.currentTarget.nodeName === "BUTTON") {
          refs.statement.classList.add("hidden-statement");
        }
      });
    }
  }
}
// Удаляет выбранное кастомное поле 5
function deleteField5() {
  refs.contactWrapper.addEventListener("click", handlerDeleteField, true);
  function handlerDeleteField(e) {
    if (e.target.parentNode.nodeName === "BUTTON") {
      if (e.target.parentNode.classList.contains("btn-delete-name")) {
        const arr = e.target.parentNode.classList;
        deleteId = e.target.parentNode.dataset.id;
        if (arr.contains("field5")) {
          refs.statementTitle.textContent = "Вы действительно хотите удалить?";
          refs.statement.classList.remove("hidden-statement");

          refs.statementBtnYes.addEventListener("click", (e) => {
            if (e.currentTarget.nodeName === "BUTTON") {
              refs.backdropCreate.classList.remove("is-open");
              refs.backdropCreate.classList.add("is-hidden");
              refs.statement.classList.add("hidden-statement");

              const toSave = localStorage.getItem(deleteId);
              const toParse = JSON.parse(toSave);
              toParse.field5.value = "";
              toParse.field5.info = "";
              const toStr = JSON.stringify(toParse);
              localStorage.setItem(deleteId, toStr);
              location.reload();
            }
          });
        }
      }
      refs.statementBtnNo.addEventListener("click", (e) => {
        if (e.currentTarget.nodeName === "BUTTON") {
          refs.statement.classList.add("hidden-statement");
        }
      });
    }
  }
}

// Закрывает окно создания кастомного поля
function closeFieldBtn() {
  refs.submitBtnClose.addEventListener("click", handlerClose);
  function handlerClose(e) {
    if (e.currentTarget.nodeName === "BUTTON") {
      refs.getFieldWrapper.classList.add("is-hidden");
    }
  }
}
closeFieldBtn();
// Закрывает окно редактирования пкастомного поля
function closeFieldEdit() {
  refs.submitBtnCloseEdit.addEventListener("click", handlerClose);
  function handlerClose(e) {
    if (e.currentTarget.nodeName === "BUTTON") {
      refs.getFieldWrapperEdit.classList.add("is-hidden");
    }
  }
}
closeFieldEdit();
// Подтверждение удаления
function confirmDeleteEsc() {
  if (e.code === "Escape") {
    refs.statementTitle.textContent = "Вы действительно хотите выйти?";
    refs.statement.classList.remove("hidden-statement");
  }
  refs.statementBtnYes.addEventListener("click", (e) => {
    if (e.currentTarget.nodeName === "BUTTON") {
      refs.backdropCreate.classList.remove("is-open");
      refs.backdropCreate.classList.add("is-hidden");
      refs.statement.classList.add("hidden-statement");
    }
  });
  refs.statementBtnNo.addEventListener("click", (e) => {
    if (e.currentTarget.nodeName === "BUTTON") {
      refs.statement.classList.add("hidden-statement");
    }
  });
}

clearLS();
// Для приятного визуала
setTimeout(() => {
  refs.backdrop.classList.remove("hidden");
  refs.backdropCreate.classList.remove("hidden");
  refs.statement.classList.remove("hidden");
  refs.statementClear.classList.remove("hidden");
  refs.getFieldWrapper.classList.remove("hidden");
  refs.getFieldWrapperEdit.classList.remove("hidden");
}, 250);
