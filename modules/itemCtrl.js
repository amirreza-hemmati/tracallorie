const CItemControler = (() => {
  const _total = {
    information: [],
    id: null,
    number: null
  };
  return class CItemControler {
    constructor() {}

    static *buildId(EBool = 1) {
      _total.number = EBool;
      let oneId = _total.number;
      while (true) {
        yield oneId;
        oneId++; 
      }
    }

    static setArray(){
      const data = JSON.parse(localStorage.getItem("information"));
      _total.information = data;
    }

    static getItem(){
      return _total.information;
    }

    static clearItems(){
      if(localStorage.getItem("information")){
        _total.information = [];
        localStorage.removeItem("information");
      }
    }

    static pushItem(EValue) {
      _total.information.push(EValue);
      localStorage.setItem("information", JSON.stringify(_total.information));
    }

    static removeItem(EValue){
      _total.information.splice(-EValue,1);
      localStorage.setItem("information", JSON.stringify(_total.information));
    }

    static updateItem(EValue,mmeal,mcalorie){
      _total.information[EValue].meal = mmeal;
      _total.information[EValue].calories = mcalorie;
      localStorage.setItem("information", JSON.stringify(_total.information));
    }

    static setId (EId){
      _total.id = EId;
    }

    static getId(){
      return _total.id;
    }

    static setNumber(){
      _total.number = 1;
    }
  };
})();
