const CUiControler = (() => {
  return class CUiControler {
    constructor() {
      this.addMeal = document.querySelector("#btn-add");
      this.listItem = document.querySelector("#list-item");
      this.btnClear = document.querySelector("#btn-clear");
      this.total = document.querySelector("#total-cal");
      this.btnGroup = document.querySelector("#btn-group");
      this.myId = CItemControler.buildId();
      this.items = this.listItem.getElementsByClassName("collection-item");
      this.btnUpdate = document.querySelector("#btn-update");
      this.btnRemove = document.querySelector("#btn-delete");
      this.btnBack = document.querySelector("#btn-back");
      this.inputMeal = document.querySelector("#input-meal");
      this.inputCalories = document.querySelector("#input-calories");
    }

    updateBuild(ESum = 1){
      CItemControler.setNumber();
      this.myId = CItemControler.buildId(ESum);
    }

    addItem(meal, calorie) {
      const numberNext = this.myId.next().value;
      this.listItem.innerHTML += `
                <li class="collection-item" id="item-${numberNext}">
                    <strong id="strong-${numberNext}">${meal}</strong>
                    <span class="new badge ${
                      Number(calorie) > 900 ? "red" : "green"
                    }" id="badge-${numberNext}">${calorie} calories</span>
                    <a href="#">
                        <i class="fas fa-pencil-alt pencil-alt right green-text" id="pen-${numberNext}"></i>
                    </a>
                </li>
            `;
    }

    clearInput(){
      this.inputMeal.value = "";
      this.inputCalories.value = "";
    }

    toggleBtns(bool) {
      if (bool) {
        this.btnGroup.style.display = "block";
        this.addMeal.style.display = "none";
      } else {
        this.btnGroup.style.display = "none";
        this.addMeal.style.display = "block";
      }
    }

    clearItems(){
      while (this.listItem.firstChild) {
        this.listItem.firstChild.remove();
      }
    }

    // interface
    IaddItem(EAlert){
      return new Promise((resolve) => {
        if(this.inputMeal.value !== "" && this.inputCalories.value !== ""){
          resolve();
        }else{
          alert(EAlert);
        }
      });
    }

    IaddItemLoadPage(){
      return new Promise((resolve) => {
        if(localStorage.getItem("information")){
          resolve();
        }
      });
    }

    dataTotal (){
      const data = Array.from(this.listItem.children);
      this.total.textContent = 0;
      data.forEach(element => {
        this.total.textContent = parseInt(this.total.textContent) + parseInt(String(element.children[1].textContent).split(" ")[0])
      })
    }

    numberId (){
      const data = Array.from(this.listItem.children);
      data.forEach(element => {
        element.id = `item-${parseInt(String(element.id).split("-")[1]) - 1}`;
        element.children[0].id = `strong${parseInt(String(element.id).split("-")[1]) - 1}`;
        element.children[1].id = `badge${parseInt(String(element.id).split("-")[1]) - 1}`;
        element.children[2][0].id = `pen${parseInt(String(element.id).split("-")[1]) - 1}`;
      });
    }
  };
})();