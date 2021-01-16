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
let obj = {
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
  // Удаление незанятых элементов из DOM
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
          console.log("yes");
          arr.remove();
        }
      });
    }
  });

  // РЕНДЕРИНГ ДОБАВЛЯЕМОГО ПОЛЯ

  // renderAddField(fieldInfo, fieldName);

  editBtnFn(arr);
  deleteContact();
  addField();
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
// Получение по ID объекта с LS и его редактирование
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
// Реализация добавления кастомного поля
function addField() {
  const addFieldInput = document.querySelectorAll(".field-add-btn");

  const contactCard = document.querySelectorAll(".contact");
  const contactElement = document.querySelectorAll(".contact__element");
  let id = 0;

  // Получения ID карточки
  addFieldInput.forEach((field) => {
    field.addEventListener("click", (e) => {
      if (e.currentTarget.nodeName === "BUTTON") {
        idBtn = field.dataset.id;
        field.disabled = true;
        id = e.currentTarget.dataset.id;

        field.classList.toggle("open");

        contactCard.forEach((contact) => {
          const contactId = contact.dataset.id;

          if (Number(contactId) === Number(id)) {
            contactElement.forEach((element) => {
              const elementId = element.dataset.id;
              if (elementId !== undefined) {
                if (contactId === elementId) {
                  element.insertAdjacentHTML(
                    "beforeend",
                    templateCreateField()
                  );
                  saveAddDataFromField(id);
                }
              }
            });
          }
        });
      }
    });
  });
}
function templateCreateField() {
  let templateField = "";
  templateField = `<div class="create-field-wrapper ">
      <select class="create-field-name">
        <option class="create-field-item">Выберите нужный вариант</option>
        <option class="create-field-item" value="Должность">Должность</option>
        <option class="create-field-item" value="Организация">Организация</option>
        <option class="create-field-item" value="Заметка" >Заметка</option>
      </select>
      <input type="text" placeholder="Информация" class="create-field-info">
      <button type="button" class="create-field-save-btn">Сохранить</button>
      <button type="button" class="create-field-close-btn">Закрыть</button>
    </div>

    `;
  return templateField;
}
function saveAddDataFromField(id) {
  const createFieldSaveBtn = document.querySelector(".create-field-save-btn");
  const closeFieldInput = document.querySelectorAll(".create-field-close-btn");
  const createFieldName = document.querySelector(".create-field-name");
  const createFieldInfo = document.querySelector(".create-field-info");
  const createWrapper = document.querySelector(".create-field-wrapper");
  const addFieldInput = document.querySelectorAll(".field-add-btn");

  const contactName = document.querySelectorAll(
    ".contact__element-second-name__title"
  );
  const createField = document.querySelectorAll(".create-field-item");
  console.dir(createField);
  contactName.forEach((arr) => {
    createField.forEach((field) => {
      if (arr.dataset.tid === "1") {
        if (field.value === "Работа") {
          field.disabled = true;
        }
      }
      if (arr.dataset.tid === "3") {
        if (field.value === "Организация") {
          field.disabled = true;
        }
      }
      if (arr.dataset.tid === "4") {
        if (field.value === "Заметка") {
          field.disabled = true;
        }
      }
    });
  });
  // Добавление информации о новом объекте в поле.
  createFieldSaveBtn.addEventListener("click", (e) => {
    if (e.currentTarget.nodeName === "BUTTON") {
      fieldName = createFieldName.value;

      fieldInfo = createFieldInfo.value;
      const saveData = localStorage.getItem(`${id}`);
      const saveParse = JSON.parse(saveData);
      obj = saveParse;
      obj[fieldName] = fieldInfo;
      console.log(idBtn);
      localStorage.setItem(`${idBtn}`, JSON.stringify(obj));

      renderAddField(fieldInfo, fieldName);
      // render(array);
    }
  });
  closeFieldInput.forEach((close) => {
    close.addEventListener("click", (e) => {
      if (e.currentTarget.nodeName === "BUTTON") {
        createWrapper.remove();
        addFieldInput.forEach((add) => {
          console.log(add);
          add.disabled = false;
        });
      }
    });
  });
}
// Рендеринг изменений
function renderAddField(fieldInfo, fieldName) {
  const contactElementName = document.querySelector(".contact__element-name");
  const contactElement = document.querySelectorAll(".contact");
  const contactElementSecondName = document.querySelector(
    ".contact__element-second-name"
  );
  contactElement.forEach((contact) => {
    if (idBtn === contact.dataset.id) {
      contactElementName.insertAdjacentHTML(
        "beforeend",
        templateAddFieldName(fieldName)
      );
      contactElementSecondName.insertAdjacentHTML(
        "beforeend",
        templateAddFieldSecondName(fieldInfo)
      );
    }
  });
}
function templateAddFieldName(fieldName) {
  const tempAddFieldName = `<p class="contact__element-name__title">${fieldName}</p>`;
  return tempAddFieldName;
}
function templateAddFieldSecondName(fieldInfo) {
  const tempAddFieldSecondName = `<p class="contact__element-second-name__title">${fieldInfo}</p>`;
  return tempAddFieldSecondName;
}
// Вызов первого запроса данных с LS
getDataFromLS();
// Вызов создания контакта
createContact();
// Очистка LS
function clearLS() {
  refs.clearAll.addEventListener("click", (e) => {
    if (e.currentTarget.nodeName === "BUTTON") {
      refs.statementTitle.textContent = "Вы действительно хотите ОЧИСТИТЬ ВСЁ?";
      refs.statement.classList.remove("hidden-statement");

      refs.statementBtnYes.addEventListener("click", (e) => {
        if (e.currentTarget.nodeName === "BUTTON") {
          refs.backdropCreate.classList.remove("is-open");
          refs.backdropCreate.classList.add("is-hidden");
          refs.statement.classList.add("hidden-statement");
          refs.contactWrapper.innerHTML = "";

          localStorage.clear();
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
clearLS();
// Для приятного визуала
setTimeout(() => {
  refs.backdrop.classList.remove("hidden");
  refs.backdropCreate.classList.remove("hidden");
  refs.statement.classList.remove("hidden");
}, 250);
