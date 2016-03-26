const settingCheckMinx ={
    handleDefaultChecked(name){
        let selectItemKeys =this.state.selectItemKeys;
        for(let i = 0 ; i < selectItemKeys.length;i++){
            if(name ==  this.state.selectItemKeys[i]){
                return true;
            }
        }
    },
    handelAtOfName(array){
        let arrayTemp = [];
        let cardKey = this.state.cardKey;
        for(let i = 0; i < array.length ; i++){
            for(let j = 0 ; j < cardKey.length ; j ++){
                if(array[i] == cardKey [j].name){
                    arrayTemp.push(cardKey[j])
                }
            }
        }
        return arrayTemp;
    },
    handleCheck(e){
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
        let selectItemKeys =this.state.selectItemKeys;
        if(selectItemKeys.length < 5){
            if(e.target.checked){
                selectItemKeys.push(e.target.value);
                var selectedArrayTemp = this.handelAtOfName(selectItemKeys);
                this.setState({
                    selectItemKeys:selectItemKeys,
                    selectedArray:selectedArrayTemp
                })
            }else{
                selectItemKeys.remove(e.target.value);
                var selectedArrayTemp =this.handelAtOfName(selectItemKeys);
                this.setState({
                    selectItemKeys:selectItemKeys,
                    selectedArray:selectedArrayTemp
                })
            }
        }else{
            if(e.target.checked){
                this.setState({
                    selectItemKeys:selectItemKeys
                })
            }else{
                selectItemKeys.remove(e.target.value);
                var selectedArrayTemp = this.handelAtOfName(selectItemKeys);
                this.setState({
                    selectItemKeys:selectItemKeys,
                    selectedArray:selectedArrayTemp
                })
            }
        }
    }
};
export{settingCheckMinx}
