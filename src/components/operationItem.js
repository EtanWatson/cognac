/**
 * 操作区组件
 */
import $ from 'jquery'
import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import {Button as AntButton,Modal,Row, Col,Input as AntInput,Icon} from 'antd';
import {Button,Tooltip,Overlay,Input,Collapse,Well} from 'react-bootstrap';
import BackboneReactMixin from 'backbone-react-component';
import {ModalDialog} from './toolComponents/ModelConponents';
import {Checkbox,Radio} from 'react-icheck';
import {SearchInput} from './toolComponents/selectAutoCompletion';
import {SendMessageDialog} from './toolComponents/dialogConponents'
import {AddDialog} from './toolComponents/dialogConponents';
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
    onChildChangeAdd(isSubmit){
        this.setState({
            lgShow:false
        })
    },
    render(){
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
                <AddDialog isAdd={this.state.lgShow} callbackParentOfAdd = {this.onChildChangeAdd} pageShow={this.props.pageShow}/>
            </li>
        )
    }
});
//列表
const ListItem =React.createClass({
    getInitialState(){
        return{
            showWay:false
        }
    },
    handleMouseEnter:function(event){
        $('.list-item-icon').removeClass('list-item-icon').addClass('list-item-icon-hover');
    },
    handleMouseLeave:function(){
        $('.list-item-icon-hover').removeClass('list-item-icon-hover').addClass('list-item-icon');
    },
    handleClick(){
        this.state.showWay? this.setState({showWay:false}):this.setState({showWay:true});
        if(this.state.showWay){
            $('.card-show').removeClass('is-display');
            $('.list-show').addClass('is-display');
            PubSub.publish('showWay','card');
            this.props.callbackParent('card')
        }else{
            $('.list-show').removeClass('is-display');
            $('.card-show').addClass('is-display');
            PubSub.publish('showWay','list');
            this.props.callbackParent('list');
        }
    },
    render(){
        return(
            <li>
                <Button bsStyle="link" onClick = {this.handleClick}>
                    <ul className = "list-inline" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        <li className = "list-item-icon operation-item-icon"></li>
                        <li className = 'list-show is-display'><h5>切换展示</h5></li>
                        <li className = "card-show"><h5>切换展示</h5></li>
                     </ul>

                </Button>
            </li>
        )
    }
});
//批量操作
const BatchOperation = React.createClass({
    getInitialState(){
      return {
          show:false,
          pageShow:'staff'
      }
    },
    componentWillMount(){
        this.setState({
          pageShow: this.props.pageShow
        });
    },
    toggle(){
      this.setState({
          show: !this.state.show
      });
      PubSub.publish('batchOperation',!this.state.show);
    },
    handleMouseEnter:function(event){
        $('.batch-item-icon').removeClass('batch-item-icon').addClass('batch-item-icon-hover');
    },
    handleMouseLeave:function(){
        $('.batch-item-icon-hover').removeClass('batch-item-icon-hover').addClass('batch-item-icon');
    },
    render(){
        let tooltip ='';
        if(this.props.pageShow==='staff'){
            tooltip =
                <Tooltip id="deleteBatch">
                    <ul className="list-inline">
                        <SelectAll />
                        <SendMessage />
                        <DeleteItem />
                        <PrintItem />
                    </ul>
                </Tooltip>;
        }else{
             tooltip =
                 <Tooltip id="deleteBatch">
                 <ul className="list-inline">
                     <SelectAll />
                     <DeleteItem />
                     <PrintItem />
                 </ul>
             </Tooltip>;
        }
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
    getInitialState(){
        return{
            //设置为false与预期结果相反
            isAllSelect:true
        }
    },
    handleClick(){
      this.setState({
         isAllSelect:!this.state.isAllSelect
      });
      PubSub.publish('selectAll',this.state.isAllSelect)
    },
    render(){
        return(
            <li>
                <Button bsStyle="link" className="select-all-btn batch-btn" onClick={this.handleClick}></Button>
            </li>
        )
    }
});
//发送信息
const SendMessage = React.createClass({
   getInitialState(){
    return{
        isSenMessage:false
    }
   },
    handleSendMessage(){
        this.setState({
            isSendMessage:true
        })
    },
    handleChildChange(){

    },
   render(){
       return(
           <div className = "send-message">
               <Button bsStyle="link" className="send-message-btn batch-btn" onClick={this.handleSendMessage}></Button>
               <SendMessageDialog isSendMessage={this.state.isSendMessage}
                   callbackParent={this.handleChildChange}
                   />
           </div>
       )
   }
});
//删除
const DeleteItem = React.createClass({
    getInitialState(){
        return{
            isListShow:false
        }
    },
    //点击删除以后，将选中的item删除
    handleClick(){
        PubSub.publish('delete-item','');
    },
    componentDidMount(){
        if(this.props.showList){
            this.setState({
                isListShow:true
            })
        }else{
            this.setState({
                isListShow:false
            })
        }
    },
    render(){
        var isListShow = function(){
          if(this.state.isListShow){
              return(
                  <Button  bsStyle="link" className="">
                      <ul className = "list-inline">
                          <li className = "delete-item-icon operation-item-icon"></li>
                          <li>
                              <h5>刪除</h5>
                          </li>
                      </ul>
                  </Button>
              )
          }else{
              return(
                  <Button  bsStyle="link" className="delete-item-btn batch-btn"></Button>
              )
          }
        }.bind(this);
        return(
            <li>
                {isListShow()}
            </li>
        )
    }
});
//打印
const PrintItem = React.createClass({
    getInitialState(){
        return{
            isListShow:false
        }
    },
    //点击打印以后，隐藏app主页，显示打印页面,发布全局事件
    handleClick(){
        PubSub.publish('print-show','');
    },
    componentDidMount(){
        if(this.props.showList){
            this.setState({
                isListShow:true
            })
        }else{
            this.setState({
                isListShow:false
            })
        }
    },
    render(){
        var isListShow = function(){
            if(this.state.isListShow){
                return(
                    <Button  bsStyle="link" className=""  onClick={this.handleClick}>
                        <ul className = "list-inline">
                            <li className = "print-item-icon operation-item-icon"></li>
                            <li>
                                <h5>打印</h5>
                            </li>
                        </ul>
                    </Button>
                )
            }else{
                return(
                    <Button  bsStyle="link" className="print-item-btn batch-btn" onClick={this.handleClick}></Button>
                )
            }
        }.bind(this);
        return(
            <li>
                {isListShow()}
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
const Driver = React.createClass({
    render(){
        return(
            <li>
                <Button bsStyle="link">
                    <ul className="list-inline">
                        <li className = "type-color driver">223</li>
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
                        <li className ="type-color manager">223</li>
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
                       <li className = "type-color other">223</li>
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
    getInitialState(){
      return{
          cardShow:true
      }
    },
    childListChange(showWay){
        if(showWay=='card'){
         this.setState({
             cardShow : true
         })
        }else{
            this.setState({
                cardShow : false
            })
        }
    },
    render(){
        let pageShow = this.props.pageShow;
        var isCardShowContent = function(){
          if(this.state.cardShow){
              return(
                      <BatchOperation pageShow = {pageShow}/>
              )
          }else{
              return(
                  <ul className = 'list-inline' style={{display:'inline-block'}}>
                      <DeleteItem showList={true}/>
                      <PrintItem showList={true}/>
                  </ul>
              )
          }
        }.bind(this);
        //console.log('operation pageShow:'+this.props.pageShow);
        var operaShowWay = function(){
            switch(pageShow){
                case 'staff':
                case 'vehicle':
                    return(
                        <ul className="list-inline operation">
                            <li className = "left-item">
                                <ul className = "list-inline">
                                    <AddItem pageShow={this.props.pageShow}/>
                                    <ListItem callbackParent={this.childListChange}/>
                                    {isCardShowContent()}
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
                    );
                    break;
                case 'setting':
                    return(
                        <span></span>
                    );
                    break;
            }
        }.bind(this);
        return(
            <div>
                {operaShowWay()}
            </div>
        )
    }
});

export{OperationItem}
