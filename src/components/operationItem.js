/**
 * 操作区组件
 */
import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import {Button,Tooltip,Overlay} from 'react-bootstrap';
import BackboneReactMixin from 'backbone-react-component';
import {ModalDialog} from './toolComponents/ModelConponents'
//添加
const AddItem = React.createClass({
    getInitialState(){
      return {lgShow:false};
    },
    render(){
        let lgClose = () => this.setState({lgShow:false});
        return(
            <li>
                <Button bsStyle="link" onClick={()=>this.setState({lgShow:true})}><h5>添加</h5></Button>
                <ModalDialog show={this.state.lgShow} onHide={lgClose}/>
            </li>
        )
    }
});
//列表
const ListItem =React.createClass({
    render(){
        return(
            <li>
                <Button bsStyle="link"><h5>列表展示</h5></Button>
            </li>
        )
    }
});
//批量操作
const BatchOperation = React.createClass({
    getInitialState(){
      return {show:false}
    },
    toggle(){
      this.setState({
          show: !this.state.show
      })
    },
    render(){
        const tooltip =
            <Tooltip id="deleteBatch">
                <ul className="list-inline">
                    <SelectAll />
                    <SendMessage />
                    <DeleteItem />
                    <PrintItem />
                </ul>
            </Tooltip>;
        const sharedProps = {
            show: this.state.show,
            container: this,
            target: () => ReactDOM.findDOMNode(this.refs.target)
        };
        return(
            <li style={{position: 'relative' }}>
                <Button bsStyle="link" ref="target" onClick={this.toggle}><h5>批量删除</h5></Button>
                <Overlay {...sharedProps} placement="bottom">
                    {tooltip}
                </Overlay>
            </li>
        )
    }
});
//批量删除子组件
//全选
const SelectAll = React.createClass({
    render(){
        return(
            <li>
                <Button bsStyle="link" className="select-all-btn batch-btn"></Button>
            </li>
        )
    }
});
//发送信息
const SendMessage = React.createClass({
   render(){
       return(
           <Button bsStyle="link" className="send-message-btn batch-btn"></Button>
       )
   }
});
//删除
const DeleteItem = React.createClass({
    render(){
        return(
            <li>
                <Button  bsStyle="link" className="delete-item-btn batch-btn"></Button>
            </li>
        )
    }
});
//打印
const PrintItem = React.createClass({
    render(){
        return(
            <li>
                <Button  bsStyle="link" className="print-item-btn batch-btn"></Button>
            </li>
        )
    }
});
//人员信息
const CarType = React.createClass({
    render(){
        return(
            <li>
                <ul list-inline>
                    <Driver />
                    <Manager />
                    <Other />
                </ul>
            </li>
        )
    }
});
//司机
const Driver = React.createClass({
    render(){
        return(
            <li></li>
        )
    }
});
//管理
const Manager = React.createClass({
    render(){
        return(
            <li></li>
        )
    }
});
//其他
const Other = React.createClass({
   render(){
       return(
           <li></li>
       )
   }
});
//搜索
const Search = React.createClass({
    render(){
        return(
            <li>
                <h5>搜索</h5>
            </li>
        )
    }
});
//停用记录
const OutageRecord = React.createClass({
    render(){
        return(
            <li>
                <h5>显示停用记录</h5>
            </li>
        )
    }
});
//导航栏组件
const OperationItem= React.createClass({
    render(){
        return(
            <ul className="list-inline operation">
                <AddItem />
                <ListItem />
                <BatchOperation />
                <CarType />
                <Search />
                <OutageRecord />
            </ul>
        )
    }
});

export{OperationItem}
