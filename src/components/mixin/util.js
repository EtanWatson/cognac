
const utilMixin = {
  //将原对象中的value值赋值给新的对象
  addValueOfItem(objective,origin){
      for(let i = 0 ; i < objective.length ; i++){
          objective[i].value =origin[objective[i].name]
      }
  }
};
export{utilMixin}
