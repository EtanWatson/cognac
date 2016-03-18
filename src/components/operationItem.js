/**
 * 操作区组件
 */
import $ from 'jquery'
import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import {Button as AntButton,Modal,Row, Col,Input as AntInput,Icon,Checkbox,Collapse} from 'antd';
import BackBone from 'backbone';
import {Button,Tooltip,Overlay} from 'react-bootstrap';
import BackboneReactMixin from 'backbone-react-component';
import {SearchInput} from './toolComponents/selectAutoCompletion';
import {SendMessageDialog} from './toolComponents/dialogConponents'
import {AddDialog} from './toolComponents/dialogConponents';
import {staffs} from '../models/staffInfo'
import {staffData} from '../models/staffData'
const Panel = Collapse.Panel;
//添加
const AddItem = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
      return {
          lgShow:false
      };
    },
    createEntry:function(entry){
           return <span key ={entry.id}>{entry.Code}</span>
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
    testChangeModel(){

    },
    render(){
        //console.log(this.state.collection);
        return(
            <li>
                <Button bsStyle="link" onClick={()=>this.setState({lgShow:true})}>
                   <ul className = 'list-inline' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        <li className = "add-item-icon operation-item-icon">
                        </li>
                        <li>
                            <h5 onClick={this.testChangeModel}>添加</h5>
                        </li>
                   </ul>
                </Button>
                <AddDialog isAdd={this.state.lgShow} callbackParentOfAdd = {this.onChildChangeAdd} pageShow={this.props.pageShow} collection={staffs}/>
            </li>
        )
    }
});

//历史任务
const TaskHistory = React.createClass({
    render(){
    return (
        <li>
        <Button bsStyle="link">
        <ul>
        <li></li>
        <li><h5>任务历史</h5></li>
    </ul>
    </Button>
    </li>
)
}
});
//任务类型
const TaskType = React.createClass({
    render(){
    return(
        <li>
        <ul className="list-inline">
        <Arranged />
        <OnGoing />
        <ToBeDistributed />
        </ul>
        </li>
)
}
});
//已安排
const Arranged = React.createClass({
    render(){
    return(
        <li>
        <Button bsStyle="link">
        <ul className="list-inline">
        <li className = "task-color arranged">1</li>
        <li className = "type-text"><h5>已安排</h5></li>
    </ul>
    </Button>
    </li>
)
}
});
//进行中
const OnGoing = React.createClass({
    render(){
    return(
        <li>
        <Button bsStyle="link">
        <ul className = "list-inline">
        <li className ="task-color onGoing">1</li>
        <li className ="type-text"><h5>进行中</h5></li>
    </ul>
    </Button>
    </li>
)
}
});
//待派发
const ToBeDistributed = React.createClass({
    render(){
    return(
        <li>
        <Button bsStyle="link">
        <ul className="list-inline">
        <li className = "task-color tobeDistributed">2</li>
        <li className = "type-text"><h5>待派发</h5></li>
    </ul>
    </Button>
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
            this.props.callbackParent('list')
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
    mixins:[BackboneReactMixin],
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
                        <SendMessage collection={this.getCollection()}/>
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
            isAllSelect:false
        }
    },
    handleClick(){
      this.setState({
         isAllSelect:!this.state.isAllSelect
      },function(){
          PubSub.publish('selectAll',this.state.isAllSelect)
      });
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
    mixins:[BackboneReactMixin],
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
                   collection = {this.getCollection()}
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
        console.log('delete-item');
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
                  <Button  bsStyle="link" className="" onClick={this.handleClick}>
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
                  <Button  bsStyle="link" className="delete-item-btn batch-btn" onClick={this.handleClick}></Button>
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
        PubSub.publish('print-data','');
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
    mixins:[BackboneReactMixin],
    render(){
        return(
            <li>
                <ul className="list-inline">
                    <Driver  collection={this.getCollection()}/>
                    <Manager collection={this.getCollection()}/>
                    <Other  collection={this.getCollection()}/>
                </ul>
            </li>
        )
    }
});
const Driver = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            driverCollection:'',
            isDriver:false
        }

    },
    handleClick(){
       var driverCollection = this.getCollection().where({
            Type:'0'
        },false);
       if(!this.state.isDriver){
           this.setState({
               driverCollection:driverCollection
           },function(){
               //发布全局事件，更新content中的内容
               PubSub.publish('typeCollection',this.state.driverCollection);
               this.setState({
                   isDriver:true
               })
           });
       } else{
           this.setState({
               driverCollection:this.state.collection
           },function(){
               //发布全局事件，更新content中的内容
               PubSub.publish('typeCollection',this.state.driverCollection);
               this.setState({
                   isDriver:false
               })
           });
       }

    },
    render(){
        return(
            <li>
                <Button bsStyle="link" onClick={this.handleClick}>
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
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            managerCollection:'',
            isManager:false
        }
    },
    handleClick(){
        var managerCollection = this.getCollection().where({
            Type:'1'
        },false);
        if(!this.state.isManager){
            this.setState({
                managerCollection:managerCollection
            },function(){
                //发布全局事件，更新content中的内容
                PubSub.publish('typeCollection',this.state.managerCollection);
                this.setState({
                    isManager:true
                })
            });
        } else{
            this.setState({
                managerCollection:this.state.collection
            },function(){
                //发布全局事件，更新content中的内容
                PubSub.publish('typeCollection',this.state.managerCollection);
                this.setState({
                    isManager:false
                })
            });
        }

    },
    render(){
        return(
            <li>
                <Button bsStyle="link" onClick={this.handleClick}>
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
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            otherCollection:'',
            isOther:false
        }
    },
    handleClick(){
        var otherCollection = this.getCollection().where({
            Type:'2'
        },false);
        if(!this.state.isOther){
            this.setState({
                otherCollection:otherCollection
            },function(){
                //发布全局事件，更新content中的内容
                PubSub.publish('typeCollection',this.state.otherCollection);
                this.setState({
                    isOther:true
                })
            });
        } else{
            this.setState({
                otherCollection:this.state.collection
            },function(){
                //发布全局事件，更新content中的内容
                PubSub.publish('typeCollection',this.state.otherCollection);
                this.setState({
                    isOther:false
                })
            });
        }
    },
   render(){
       return(
           <li>
               <Button bsStyle="link" onClick={this.handleClick}>
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
    handleSelectChoose(value){

    },
    render(){
        return(
            <li className = "search-item">
                <SearchInput callbackParent = {this.handleSelectChoose} />
            </li>
        )
    }
});
//高级搜索
const AdvancedSearchIcon = React.createClass({

    render(){
        return(
            <li className = "advanced-search-item">
                <Button  bsStyle="link" >
                    <h5>高级搜索</h5>
                </Button>
            </li>
        )
    }
});
//停用记录
const OutageRecord = React.createClass({
    mixins:[BackboneReactMixin],
    gitInitialState(){
        return{
            isOutAgeCollection:''
        }
    },
    componentDidMount(){
        var isOutAgeCollection = this.getCollection().filter(function(item) {
            return item.get("OutAge").value === "1";
        });
      this.setState({
          isOutAgeCollection:isOutAgeCollection
      })
    },
    handleChange(event){

        if(event.target.checked){
            PubSub.publish('typeCollection',this.state.isOutAgeCollection);
        }else{
            PubSub.publish('typeCollection',this.state.collection);
        }
    },
    render(){
        return(
            <li>
                <label>
                    <Checkbox onChange={this.handleChange}/>
                   <span className = 'operation-color' style={{color:'#22384D'}}>显示停用记录</span>
                 </label>
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
                      <BatchOperation pageShow = {pageShow} collection={staffs}/>
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
                    return(
                        <ul className="list-inline operation">
                            <li className = "left-item">
                                <ul className = "list-inline">
                                    <AddItem pageShow={this.props.pageShow} collection={staffs}/>
                                    <ListItem callbackParent={this.childListChange}/>
                                    {isCardShowContent()}
                                </ul>
                            </li>
                            <li className = "right-item">
                                <ul className = "list-inline">
                                    <CarType collection={staffData}/>
                                    <Search />
                                    <AdvancedSearchIcon />
                                    <OutageRecord collection = {staffData}/>
                                </ul>
                            </li>
                        </ul>
                    );
                    break;
                case 'vehicle':
                    return(
                        <ul className="list-inline operation">
                            <li className = "left-item">
                                <ul className = "list-inline">
                                    <AddItem pageShow={this.props.pageShow} collection={staffs}/>
                                    <ListItem callbackParent={this.childListChange}/>
                                    {isCardShowContent()}
                                </ul>
                            </li>
                            <li className = "right-item">
                                <ul className = "list-inline">
                                    <CarType collection={staffData}/>
                                    <Search />
                                    <AdvancedSearchIcon />
                                    <OutageRecord collection = {staffData}/>
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
                case 'task':
                    return(
                        <ul className="list-inline operation">
                            <li className = "left-item">
                                <ul className = "list-inline">
                                    <AddItem pageShow={this.props.pageShow} collection={staffs}/>
                                    <TaskHistory />
                                    <TaskType />
                                </ul>
                            </li>
                            <li className = "task-right-item">
                                <ul className = "list-inline">
                                    <Search />
                                    <AdvancedSearchIcon />
                                </ul>
                            </li>
                        </ul>
                );
                    break;
            }
        }.bind(this);
        return(
            <div className = 'operation-content'>
                {operaShowWay()}
            </div>
        )
    }
});
export{OperationItem}
