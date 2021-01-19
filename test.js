const editBtnField = document.querySelectorAll(".btn-edit-name");
editBtnField.forEach((btn) => {
  btn.addEventListener("click", handlerEdit);
  function handlerEdit(e) {
    console.log(e);
    if (e.currentTarget.nodeName === "BUTTON") {
      console.log("click");
      const targetId = e.currentTarget.dataset.id;
      const save = localStorage.getItem(targetId);
      const parse = JSON.parse(save);

      if (e.currentTarget.classList.contains("field1")) {
        refs.getFieldWrapperEdit.classList.remove("is-hidden");
        refs.submitFieldNameEdit.value = parse.field1.value;
        refs.submitFieldInfoEdit.value = parse.field1.info;
        refs.submitBtnFieldEdit.addEventListener("click", saveEditField);
        function saveEditField() {
          parse.field1.value = refs.submitFieldNameEdit.value;
          parse.field1.info = refs.submitFieldInfoEdit.value;
          const str = JSON.stringify(parse);
          localStorage.setItem(targetId, str);
          refs.getFieldWrapperEdit.classList.add("is-hidden");
          refs.submitFieldNameEdit.value = "";
          refs.submitFieldInfoEdit.value = "";
          getDataFromLS(targetId);
        }
      }
      if (e.currentTarget.classList.contains("field2")) {
        refs.getFieldWrapperEdit.classList.remove("is-hidden");
        refs.submitFieldNameEdit.value = parse.field2.value;
        refs.submitFieldInfoEdit.value = parse.field2.info;
        refs.submitBtnFieldEdit.addEventListener("click", saveEditField);
        function saveEditField() {
          parse.field2.value = refs.submitFieldNameEdit.value;
          parse.field2.info = refs.submitFieldInfoEdit.value;
          const str = JSON.stringify(parse);
          localStorage.setItem(targetId, str);
          refs.getFieldWrapperEdit.classList.add("is-hidden");
          refs.submitFieldNameEdit.value = "";
          refs.submitFieldInfoEdit.value = "";
          getDataFromLS(targetId);
        }
      }
      if (e.currentTarget.classList.contains("field3")) {
        refs.getFieldWrapperEdit.classList.remove("is-hidden");
        refs.submitFieldNameEdit.value = parse.field3.value;
        refs.submitFieldInfoEdit.value = parse.field3.info;
        refs.submitBtnFieldEdit.addEventListener("click", saveEditField);
        function saveEditField() {
          parse.field3.value = refs.submitFieldNameEdit.value;
          parse.field3.info = refs.submitFieldInfoEdit.value;
          const str = JSON.stringify(parse);
          localStorage.setItem(targetId, str);
          refs.getFieldWrapperEdit.classList.add("is-hidden");
          refs.submitFieldNameEdit.value = "";
          refs.submitFieldInfoEdit.value = "";
          getDataFromLS(targetId);
        }
      }
      if (e.currentTarget.classList.contains("field4")) {
        refs.getFieldWrapperEdit.classList.remove("is-hidden");
        refs.submitFieldNameEdit.value = parse.field4.value;
        refs.submitFieldInfoEdit.value = parse.field4.info;
        refs.submitBtnFieldEdit.addEventListener("click", saveEditField);
        function saveEditField() {
          parse.field4.value = refs.submitFieldNameEdit.value;
          parse.field4.info = refs.submitFieldInfoEdit.value;
          const str = JSON.stringify(parse);
          localStorage.setItem(targetId, str);
          refs.getFieldWrapperEdit.classList.add("is-hidden");
          refs.submitFieldNameEdit.value = "";
          refs.submitFieldInfoEdit.value = "";
          getDataFromLS(targetId);
        }
      }
      if (e.currentTarget.classList.contains("field5")) {
        refs.getFieldWrapperEdit.classList.remove("is-hidden");
        refs.submitFieldNameEdit.value = parse.field5.value;
        refs.submitFieldInfoEdit.value = parse.field5.info;
        refs.submitBtnFieldEdit.addEventListener("click", saveEditField);
        function saveEditField() {
          parse.field5.value = refs.submitFieldNameEdit.value;
          parse.field5.info = refs.submitFieldInfoEdit.value;
          const str = JSON.stringify(parse);
          localStorage.setItem(targetId, str);
          refs.getFieldWrapperEdit.classList.add("is-hidden");
          refs.submitFieldNameEdit.value = "";
          refs.submitFieldInfoEdit.value = "";
          getDataFromLS();
        }
      }
    }
  }
});

// Закрывает окно создания кастомного поля
function closeFieldEdit() {
  refs.submitBtnCloseEdit.addEventListener("click", handlerClose);
  function handlerClose(e) {
    if (e.currentTarget.nodeName === "BUTTON") {
      refs.getFieldWrapperEdit.classList.add("is-hidden");
    }
  }
}
closeFieldEdit();
function closeField() {
  refs.submitBtnClose.addEventListener("click", handlerClose);
  function handlerClose(e) {
    if (e.currentTarget.nodeName === "BUTTON") {
      refs.getFieldWrapper.classList.add("is-hidden");
    }
  }
}
closeField();
