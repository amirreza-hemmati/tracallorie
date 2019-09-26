const CAppControler = (() => {
  return class CAppControler {
    constructor() {
      this.uiCtrls = new CUiControler();
      this.loadEvent();
    }

    loadEvent() {
      this.uiCtrls.addMeal.addEventListener("click", event => {
        event.preventDefault();
        this.uiCtrls
          .IaddItem("please enter your input Meal and Calories")
          .then(() => {
            const data = {
              meal: this.uiCtrls.inputMeal.value,
              calories: this.uiCtrls.inputCalories.value,
            };
            this.uiCtrls.addItem(
              this.uiCtrls.inputMeal.value,
              this.uiCtrls.inputCalories.value
              );
              this.uiCtrls.clearInput();
              CItemControler.pushItem(data);
              this.uiCtrls.dataTotal();
          });
      });

      window.addEventListener("load", () => {
        this.uiCtrls.IaddItemLoadPage().then(() => {
          CItemControler.setArray();
          const data = CItemControler.getItem();
          data.forEach(element => {
            this.uiCtrls.addItem(element.meal, element.calories);
          });
          this.uiCtrls.dataTotal();
        });
      });

      this.uiCtrls.btnClear.addEventListener("click", event => {
        event.preventDefault();
        if (confirm("are you clear all items")) {
          CItemControler.clearItems();
          this.uiCtrls.clearItems();
          this.uiCtrls.clearInput();
          this.uiCtrls.toggleBtns(false);
          this.uiCtrls.dataTotal();
          this.uiCtrls.updateBuild();
        }
      });

      this.uiCtrls.listItem.addEventListener("click", event => {
        if (event.target.classList.contains("fa-pencil-alt")) {
          event.preventDefault();
          CItemControler.setId(String(event.target.id).split("-")[1]);
          this.uiCtrls.inputMeal.value =
            event.target.parentElement.parentElement.children[0].innerText;
          this.uiCtrls.inputCalories.value = String(
            event.target.parentElement.parentElement.children[1].innerText
          ).split(" ")[0];
          this.uiCtrls.inputCalories.focus();
          this.uiCtrls.inputMeal.focus();
          this.uiCtrls.toggleBtns(true);
        }
      });

      this.uiCtrls.btnBack.addEventListener("click", event => {
        event.preventDefault();
        this.uiCtrls.clearInput();
        this.uiCtrls.toggleBtns(false);
      });

      this.uiCtrls.btnRemove.addEventListener("click", event => {
        event.preventDefault();
        if (confirm("are you remove itme???")) {
          const items = Array.from(this.uiCtrls.listItem.children);
          items.forEach(element => {
            if (String(element.id).split("-")[1] == CItemControler.getId()) {
              element.remove();
              CItemControler.removeItem(CItemControler.getId() - 1);
            }else if(String(element.id).split("-")[1] > CItemControler.getId()){
              element.id = `item-${String(element.id).split("-")[1] - 1}`
              element.children[0].id = `item-${String(element.id).split("-")[1] - 1}`
              element.children[1].id = `badge-${String(element.id).split("-")[1] - 1}`
              element.children[2].children[0].id = `pen-${String(element.id).split("-")[1] - 1}`
            }
          });
          this.uiCtrls.updateBuild(this.uiCtrls.listItem.children.length + 1);
          this.uiCtrls.toggleBtns();
          this.uiCtrls.clearInput();
          this.uiCtrls.dataTotal();
        }
      });

      this.uiCtrls.btnUpdate.addEventListener("click", event => {
        event.preventDefault();
        this.uiCtrls.IaddItem("are you updated item").then(() => {
          if (confirm("are you remove itme???")) {
            const items = Array.from(this.uiCtrls.listItem.children);
            items.forEach(element => {
              if (String(element.id).split("-")[1] == CItemControler.getId()) {
                element.children[0].innerText = this.uiCtrls.inputMeal.value;
                element.children[1].innerText = `${this.uiCtrls.inputCalories.value} calories`;
                if(this.uiCtrls.inputCalories.value > 900){
                  element.children[1].classList.add("red");
                  element.children[1].classList.remove("green");
                }else{
                  element.children[1].classList.add("green");
                  element.children[1].classList.remove("red");
                }
                CItemControler.updateItem(CItemControler.getId() - 1 , this.uiCtrls.inputMeal.value , this.uiCtrls.inputCalories.value);
              }
            });
            // this.uiCtrls.dataTotal();
            this.uiCtrls.dataTotal();
            this.uiCtrls.toggleBtns();
            this.uiCtrls.clearInput();
          }
          this.uiCtrls.toggleBtns(false);
          this.uiCtrls.clearInput();
        });
      });
    }
  };
})();
