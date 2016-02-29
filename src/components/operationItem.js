/**
 * 操作区组件
 */
import $ from 'jquery'
import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import {Button,Tooltip,Overlay,Input,Collapse,Well} from 'react-bootstrap';
import BackboneReactMixin from 'backbone-react-component';
import {ModalDialog} from './toolComponents/ModelConponents';
import {Checkbox,Radio} from 'react-icheck';
//添加
const AddItem = React.createClass({
    getInitialState(){
      return {
          lgShow:false
      };
    },
    handleMouseEnter:function(event){
        $('.add-item-icon').removeClass('add-item-icon').addClass('add-item-icon-hover');
    },
    handleMouseLeave:function(){
        $('.add-item-icon-hover').removeClass('add-item-icon-hover').addClass('add-item-icon');
    },
    render(){
        let lgClose = () => this.setState({lgShow:false});
        return(
            <li>
                <Button bsStyle="link" onClick={()=>this.setState({lgShow:true})}>
                   <ul className = 'list-inline' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        <li className = "add-item-icon operation-item-icon">
                        </li>
                        <li>
                            <h5>添加</h5>
                        </li>
                   </ul>
                </Button>
                <ModalDialog show={this.state.lgShow} onHide={lgClose}/>
            </li>
        )
    }
});
//列表
const ListItem =React.createClass({
    handleMouseEnter:function(event){
        $('.list-item-icon').removeClass('list-item-icon').addClass('list-item-icon-hover');
    },
    handleMouseLeave:function(){
        $('.list-item-icon-hover').removeClass('list-item-icon-hover').addClass('list-item-icon');
    },
    render(){
        return(
            <li>
                <Button bsStyle="link">
                    <ul className = "list-inline" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        <li className = "list-item-icon operation-item-icon"></li>
                        <li><h5>列表展示</h5></li>
                     </ul>
                </Button>
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
    handleMouseEnter:function(event){
        $('.batch-item-icon').removeClass('batch-item-icon').addClass('batch-item-icon-hover');
    },
    handleMouseLeave:function(){
        $('.batch-item-icon-hover').removeClass('batch-item-icon-hover').addClass('batch-item-icon');
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
                <Button bsStyle="link" ref="target" onClick={this.toggle}>
                    <ul className = "list-inline" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        <li className = "batch-item-icon operation-item-icon"></li>
                        <li>
                            <h5>批量操作</h5>
                        </li>
                    </ul>
                </Button>
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
                <ul className="list-inline">
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
            <li>
                <Button bsStyle="link">
                    <ul className="list-inline">
                        <li className = "type-color driver"></li>
                        <li className = "type-text"><h5>司机</h5></li>
                     </ul>
                </Button>
            </li>
        )
    }
});
//管理
const Manager = React.createClass({
    render(){
        return(
            <li>
                <Button bsStyle="link">
                    <ul className = "list-inline">
                        <li className ="type-color manager"></li>
                        <li className ="type-text"><h5>管理</h5></li>
                    </ul>
                </Button>
            </li>
        )
    }
});
//其他
const Other = React.createClass({
   render(){
       return(
           <li>
               <Button bsStyle="link">
                   <ul className="list-inline">
                       <li className = "type-color other"></li>
                       <li className = "type-text"><h5>其他</h5></li>
                   </ul>
                </Button>
           </li>
       )
   }
});
//搜索
const innerSearchIcon = <div className="innerSearchIcon"></div>;
const Search = React.createClass({
    render(){
        return(
            <li className = "search-item">
                <Input type = "text"  bsSize="small" addonBefore={innerSearchIcon}></Input>
            </li>

        )
    }
});
//高级搜索
const AdvancedSearchIcon = React.createClass({
    getInitialState(){
        return {open:false}
    },
    render(){
        return(
            <li className = "advanced-search-item">
                    <Button  bsStyle="link" onClick={ ()=> this.setState({ open: !this.state.open })}>
                        <h5>高级搜索</h5>
                    </Button>
                {/*<Collapse in={this.state.open}>
                    <div>
                        <Well>
                            Hello
                        </Well>
                    </div>
                </Collapse>
                */}
            </li>
        )
    }
});
//停用记录
const OutageRecord = React.createClass({
    render(){
        return(
            <li>
                <Checkbox
                    checkboxClass="icheckbox_minimal-green"
                    increaseArea="20%"
                    label="<span class='outage-record-text'>显示停用记录</span>"
                    />
            </li>
        )
    }
});
//导航栏组件
const OperationItem= React.createClass({
    render(){
        return(
            <ul className="list-inline operation">
                <li className = "left-item">
                    <ul className = "list-inline">
                        <AddItem />
                        <ListItem />
                        <BatchOperation />
                    </ul>
                </li>
                <li className = "right-item">
                    <ul className = "list-inline">
                        <CarType />
                        <Search />
                        <AdvancedSearchIcon />
                        <OutageRecord />
                    </ul>
                </li>

            </ul>
        )
    }
});

export{OperationItem}
