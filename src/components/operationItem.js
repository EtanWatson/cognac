/**
 * 操作区组件
 */
import React from 'react';
import {render} from 'react-dom';
import BackboneReactMixin from 'backbone-react-component';
//添加
const AddItem = React.createClass({
    render(){
        return(
            <div>
                add Item
            </div>
        )
    }
});
//列表
const ListItem =React.createClass({
    render(){
        return(
            <div>
                list Item
            </div>
        )
    }
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
    render(){
        return(
            <div>
                SelectAll Item
            </div>
        )
    }
});
//删除
const DeleteItem = React.createClass({
    render(){
        return(
            <div>
                delete item
            </div>
        )
    }
});
//打印
const PrintItem = React.createClass({
    render(){
        return(
            <div>
                print item
            </div>
        )
    }
});
//车型信息
const CarType = React.createClass({
    render(){
        return(
            <div>
                car type
            </div>
        )
    }
});
//搜索
const Search = React.createClass({
    render(){
        return(
            <div>
                search Item
            </div>
        )
    }
});
//停用记录
const OutageRecord = React.createClass({
    render(){
        return(
            <div>
                outage Item
            </div>
        )
    }
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
