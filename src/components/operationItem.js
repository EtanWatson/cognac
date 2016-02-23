/**
 * 操作区组件
 */
import React from 'react';
import {render} from 'react-dom';
import BackboneReactMixin from 'backbone-react-component';
//添加
const AddItem = React.createClass({

});
//列表
const ListItem =React.createClass({

});
//批量操作
const BatchOperation = React.createClass({
    render(){
        return(
            <div>
                <SelectAll />
                <DeleteItem />
                <PrintItem />
            </div>
        )
    }
});
//批量删除子组件
//全选
const SelectAll = React.createClass({

});
//删除
const DeleteItem = React.createClass({

});
//打印
const PrintItem = React.createClass({

});
//车型信息
const CarType = React.createClass({

});
//搜索
const Search = React.createClass({

});
//停用记录
const OutageRecord = React.createClass({

});
//导航栏组件
const OperationItem= React.createClass({
    render(){
        return(
            <div>
                <AddItem />
                <ListItem />
                <BatchOperation />
                <CarType />
                <Search />
                <OutageRecord />
            </div>
        )
    }
});

export{OperationItem}
