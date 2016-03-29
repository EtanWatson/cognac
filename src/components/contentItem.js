/**
 * 内容组件
 */
import React from 'react';
import {render} from 'react-dom';
import {Button,ButtonToolbar,Glyphicon} from 'react-bootstrap';
import BackboneReactMixin from 'backbone-react-component';
import {columns,data} from '../data/listData';
import _ from 'underscore'
import {TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord,NavMenu} from './navItem';
import {Button as AntButton,Icon,Row,Col,Modal,Checkbox,Popover,Spin} from 'antd';
import {EditDialog,SendMessageDialog,LookDialog} from './toolComponents/dialogConponents';
import {staffModel} from '../models/staffData';
import {vehicleModel} from '../models/vehicleData'
import FixedDataTable from 'fixed-data-table';
import {cardSelectMinx} from './mixin/cardSelect';
import {cardTypeMinx} from './mixin/cardType'
const {Table, Column, Cell} = FixedDataTable;
const confirm = Modal.confirm;
//card hover状态
const HoverItem = React.createClass({
    mixins:[BackboneReactMixin],
   getInitialState(){
        return{
            isEdit:false,
            isDelete:false,
            isSendMessage:false
        };
   },
    componentWillReceiveProps(nextProps){
      if(nextProps.passLookEdit){
          this.handleEditClick()
      }
    },
   handleEditClick(){
        this.setState({
            isEdit:true
        })
   },
   handleDeleteClick(){
       //确认删除提示框
       var self = this;
       confirm({
           title:'您是否确认删除这项内容',
           content:'',
           onOk(){
               self.setState({
                   isDelete:true
               });
               self.getCollection().remove(self.getModel());
           },
           onCancel(){
               //self.props.callbackParent('noDelete');
           }
       })
   },
   handleSendMessage(){
        this.setState({
            isSendMessage:true
        })
   },
   onChildChangeEdit(isEdit){
        this.setState({
            isEdit:false
        });
       this.props.callbackParent(isEdit);
   },
   onChildChangeSendMessage(isSendMessage){
       this.setState({
           isSendMessage:isSendMessage
       });
   },
   render(){
       //根据pageShow显示不同的鼠标滑过按钮
       let messageMaintenance = '';
       switch (this.props.pageShow){
           case 'staff':
               messageMaintenance =  <li>
                                         <Button  bsStyle="link" onClick={this.handleSendMessage}><img src="/img/icon_send.png" /></Button>
                                     </li>;
               break;
           case 'vehicle':
               messageMaintenance =  <li>
                                        <Button  bsStyle="link" ><img src="/img/maintenance.png" /></Button>
                                    </li>;
               break;
       }
       return(
           <ul className = "list-inline operation-in-card">
                <li>
                    <Button  bsStyle="link" onClick={this.handleEditClick}><img src="/img/icon_edit.png" /></Button>
                </li>
                {messageMaintenance}
                <li>
                    <Button  bsStyle="link" onClick={this.handleDeleteClick}><img src="/img/icon_delete.png" /></Button>
                </li>
               <EditDialog isEdit={this.state.isEdit}  pageShow={this.props.pageShow} callbackParent = {this.onChildChangeEdit} model={this.getModel()} />
               <SendMessageDialog isSendMessage={this.state.isSendMessage} callbackParent={this.onChildChangeSendMessage} model={this.getModel()} />
           </ul>

       )
   }
});
//card显示组件
const Card = React.createClass({
   mixins:[BackboneReactMixin,cardTypeMinx],
    getInitialState(){
       return {
           isOpen:"item-close",
           isHover:" ",
           toggleBatch:false,
           selectIcon:'/img/card_icon_default.png',
           isSelect:false,
           isSelectAll:false,
           isDelete:false,
           isLook:false,
           passLookEdit:false
       }
   } ,
    componentWillReceiveProps(nextProps){
        if(nextProps.toggleBatch){
            $('.card-select-img').removeClass('is-display');
            if(!this.state.toggleBatch){
                this.setState({
                    toggleBatch:true
                })
            }
            if(nextProps.isSelectAll){
                this.setState({
                    isSelect:true,
                    selectIcon:'/img/card_icon_pressed.png',
                    isSelectAll:true
                })
            }else{
                this.setState({
                    isSelect:false,
                    selectIcon:'/img/card_icon_default.png',
                    isSelectAll:false
                })
            }
        }else{
            this.setState({
                toggleBatch:false,
                isSelect:false
            });
            $('.card-select-img').addClass('is-display')
        }
    },
    //componentWillUnmount(){
    //    PubSub.unsubscribe(this.pubsub_tokenAll);
    //},
    handleMouseOver(){
        this.setState({
            isOpen:"item-open",
            isHover:"isHover"
        })
    },
    handleMouseLeave(){
        this.setState({
            isOpen:"item-close",
            isHover:" "
        })
    },
    handleMouseEnterIcon(){
        if(!this.state.isSelect){
            this.setState({
                selectIcon:'/img/card_icon_selected.png'
            })
        }
    },
    handleMouseLeaveIcon(){
        if(!this.state.isSelect){
            this.setState({
                selectIcon:'/img/card_icon_default.png'
            })
        }
    },
    handleClickIcon(){
        if(this.state.isSelect){
            this.setState({
                selectIcon:'/img/card_icon_default.png',
                isSelect:!this.state.isSelect
            });
        }else{
            this.setState({
                selectIcon:'/img/card_icon_pressed.png',
                isSelect:!this.state.isSelect
            })
        }
        this.props.parentCallback(this.state.model.id);
    },
    onChildChange(isChange){
        //console.log('卡片事件回调:isChange：'+isChange);
        switch (isChange){
            case 'edit':
                this.setState({
                    passLookEdit:false
                });
                break;
            case 'noEdit':{
                this.setState({
                    passLookEdit:false
                })
            }

        }
    },
    handleDoubleClick(){
        this.setState({
            isLook:true
        })
    },
    onChildChangeLook(isChange){
        this.setState({
            isLook:false
        });
        if(isChange=='isEdit'){
            this.setState({
                passLookEdit:true
            })
        }
    },
    handleToggleBatch(){

    },
   render(){
       let item = this.state.model;
       var cardType = this.cardType(item);
       //遍历卡片展示条目
       var findShowItem = function(){
           var showItem = [];
           for(let attributeName in this.getModel().attributes){
               if(this.getModel().get(attributeName).isShowInCard){
                   showItem.push(this.getModel().get(attributeName))
               }
           }
           return showItem
       }.bind(this);
       //卡片展示条目
       var showItem = findShowItem().map(function(attrItem,index){
           return(
               <ul className = "list-inline" key={index}>
                   <li className ='item-space'><h5>{attrItem.aliasName}</h5></li>
                   <span>：</span>
                   <li><h5>{attrItem.value}</h5></li>
               </ul>
           )
       }.bind(this));
       return(
           <div className ={"card-style "+this.state.isHover}
                onDoubleClick={this.handleDoubleClick}
                onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}
                data-id={item.id}
               >
               <div style={{height:'210px'}}>
                   <ul className = "list-inline">
                       <img  className = "card-select-img is-display" src={this.state.selectIcon}
                             onMouseEnter={this.handleMouseEnterIcon}
                             onMouseLeave={this.handleMouseLeaveIcon}
                             onClick={this.handleClickIcon}/>
                       <li className = "header-img">
                           <img src = {item.headImg}/>
                       </li>
                       <li className = "header-left">
                           <h3 className = "name">{item.name?item.name.value:item.vehicleCode.value}</h3>
                           <ul className = "list-inline">
                               <li className = "circle circle-g">
                                   <img src="/img/icon_trip_normal.png" />
                               </li>
                               <li className = "circle-r is-display">
                                   <img src="/img/icon_trip_leave.png" />
                               </li>
                               <li className = "status"><h5>{item.status}</h5></li>
                           </ul>
                       </li>
                   </ul>
                   {showItem}
               </div>
               {cardType}
               <div  className ={"default-style "+this.state.isOpen}>
                   <HoverItem cardInfo={item} callbackParent={this.onChildChange} passLookEdit={this.state.passLookEdit} pageShow = {this.props.pageShow} model={this.getModel()}/>
               </div>
               <LookDialog isLook={this.state.isLook} callbackParent = {this.onChildChangeLook} cardInfo={item} pageShow = {this.props.pageShow} />
           </div>
       )
       }
});
//列表显示组件
const ListShow = React.createClass({
   mixins:[BackboneReactMixin],
   getInitialState(){
        return{
            selectedRowKeys: [],
            loading: false,
            allChecked:false,
            checkClassName:"is-display",
            selected:false,
            oneChecked:'',
            //dataValue:0,
            tableWidth:1024,
            tableHeight:500,
            isLook:false,
            showInfo:'',
            //listModel:staffModel,
            listHeader:[],
            listHeaderCopy:[]
        };
   },
    componentWillMount(){
        let model = this.getModel();
        var height = $(window).height();
        var width = $(window).width();
        let listHeadTemp = [];
        let listHeadKeys = model.keys();
        model.values().map(function(list,index){
            if(list.aliasName){
                listHeadTemp.push({
                    aliasName:list.aliasName,
                    key:listHeadKeys[index]
                })
            }
        });
        this.setState({
            listHeader:listHeadTemp,
            listHeaderCopy:listHeadTemp,
            tableWidth:width*0.80,
            tableHeight:height*0.80
        })
   },
    //
    componentDidMount(){
      //订阅打印事件(批量操作)
      this.printShowToken = PubSub.subscribe('print-data',function(topic,print){
          let printDataId = this.state.selectedRowKeys;
          let printData =[];
          if(printDataId.length > 0){
               for(let i = 0; i < printDataId.length; i++){
                   this.state.collection.map(function(item,index){
                       if(item.id==printDataId[i]){
                           printData.push(item)
                       }
                   })
               }
              PubSub.publish('print-show',{printData:printData,listHeader:this.state.listHeader});
          }else{
          }
      }.bind(this));
      //订阅删除事件(批量操作)
       this.deleteItemToken = PubSub.subscribe('delete-item',function(topic,data){
           this.removeCheckItems();
       }.bind(this));
        //todo 性能需要优化处
        $(window).resize(function(){
            this.setState({
                tableHeight:$(window).height()*0.8,
                tableWidth: $(window).width()*0.8
            })
        }.bind(this));
    },
    componentWillUnmount(){
        $(window).unbind('resize');
        PubSub.unsubscribe(this.printShowToken);
        PubSub.unsubscribe(this.deleteItemToken);
    },
    //删除选中的条目
    removeCheckItems(){
        let selectItemId = this.state.selectedRowKeys;
        if(selectItemId.length > 0){
            $('.table-select .selectedIcon').addClass('is-display');
            $('.table-select').removeClass('selected');
            let selectItems = [];
            for(let i = 0 ; i < selectItemId.length ; i++){
                this.getCollection().remove(this.getCollection().get(selectItemId[i]));
            }
        }else{

        }
    },
   onSelectChange(e){
       e.preventDefault();
       var tableSelect = $(e.target).parents('.table-select');
       let modelId = $(e.target).parents('.fixedDataTableCellGroupLayout_cellGroup').children().last().find('.table-cell').attr('data-id');
       let selectedRowKeysTemp = this.state.selectedRowKeys;
       if(!$(tableSelect).hasClass('selected')){
           selectedRowKeysTemp.push(modelId);
           selectedRowKeysTemp = _.uniq(selectedRowKeysTemp);
           $(tableSelect).find('.selectedIcon').removeClass('is-display');
           this.setState({
               oneChecked:'selected'
           })
       }else{
           $(tableSelect).find('.selectedIcon').addClass('is-display');
           selectedRowKeysTemp = _.filter(selectedRowKeysTemp,function(key){return key != modelId});
           this.setState({
               oneChecked:'',
               allChecked:false
           })
       }
       this.setState({
        selectedRowKeys:selectedRowKeysTemp
     });
   },
    //全选
    handleSelectAll(){
        var selectedTemp=[];
        if(this.state.allChecked){
            this.setState({allChecked:false,checkClassName:'is-display',selectedRowKeys:selectedTemp,oneChecked:''})
        }else{
            this.state.collection.map(function(item,index){
                selectedTemp.push(item.id+'')
            });
            $('.selectedIcon').removeClass('is-display');
            this.setState({
                allChecked:true,
                checkClassName:'',
                oneChecked:'selected',
                selectedRowKeys:selectedTemp
            })
        }
    },
   //行单击事件
   handleRowClick(e){
       let tableCell = $('.content-table').find('.table-cell');
       $(tableCell).removeClass('item-click');
       $(tableCell).find('.icon').addClass('is-display');
       let thisTableCell = $(e.target).parents('.fixedDataTableCellGroupLayout_cellGroup').find('.table-cell');
       $(thisTableCell).addClass('item-click');
       $(thisTableCell).find('.icon').removeClass('is-display');
   },
   //行双击事件
   handleDoubleClick(e){
       var staffId = $(e.target).parents('.public_fixedDataTableCell_main').find('.table-cell').attr('data-id');
       var showInfo = this.getCollection().get(staffId);
       this.setState({
           showInfo:showInfo
       },function(){
            this.setState({
                isLook:true
            })
       });
       this.setState({
           isLook:true
       })
   },
    onChildChangeLook(isEdit){
        console.log('isEdit:'+isEdit);
        if(isEdit == 'isEdit'){

        }
        this.setState({
            isLook:false,
            isEdit:true
        })
    },
    //动态添加与删除表头
    listProverCheck(e){
        let dataKey = e.target.data_key;
        let dataName = e.target.data_name;
        let dataIndex = e.target.data_index;
        if(e.target.checked){
            let listHeadTemp = this.state.listHeader;
            listHeadTemp.splice(dataIndex,0,{
                aliasName:dataName,
                key:dataKey
            });
            this.setState({
                listHeader:listHeadTemp
            })
        }else{
            let listHeadTemp = this.state.listHeader;
             listHeadTemp = _.filter(listHeadTemp , function(item){ return  item.key !==dataKey; });
            this.setState({
                listHeader:listHeadTemp
            })
        }
    },
    onChildChangeEdit(){
        this.setState({
            isEdit:false
        })
    },
   render(){
       let listHeader = this.state.listHeader;
       let listHeaderCopy = this.state.listHeaderCopy;
       let popoverCheckContent =listHeaderCopy.map(function(list,index){
               return(
                   <label key={index} className = "list-popover-check">
                       <Checkbox defaultChecked={true} onChange={this.listProverCheck}  data_key={list.key} data_name={list.aliasName} data_index={index}/>
                       {list.aliasName}
                   </label>
               )
       }.bind(this));
       //checkbox下拉框(列表)
       let popoverCheckMenu = (
           <div className = 'popover-check-menu'>
               {popoverCheckContent}
           </div>
       );
       const TextCell = ({rowIndex,data,col,...props})=>(
           <Cell data-id ={data[rowIndex].id} className = "table-cell text-name"   onClick={this.handleRowClick} onDoubleClick={this.handleDoubleClick}  {...props}>
               {data[rowIndex][col].value}
           </Cell>
       );
       let listTable = listHeader.map(function(list,index){
           if(list.aliasName){
               return(
                   <Column key={index}
                           header={<Cell className = "table-header">{list.aliasName}</Cell>}
                           cell={<TextCell data={this.state.collection} col={list.key} />}
                           isResizable={true}
                           flexGrow={1}
                           width={100}
                           className = ''
                           columnKey={index}
                       />
               )
           }
       }.bind(this));
       listTable = _.filter(listTable, function(item){ return typeof item !=='undefined'; });
       return(
           <div className = 'content-table' style={{textAlign:'center'}}>
               <Table
                   rowHeight={40}
                   rowsCount={this.state.collection.length}
                   width={this.state.tableWidth}
                   height={this.state.tableHeight}
                   headerHeight={50}
                   onColumnResizeEndCallback={this.onColumnResizeEndCallback}
                   >
                   <Column
                       header={<Cell className='table-header select-dialog-cell'>
                                    <Popover prefixCls="table-popover" placement="bottomLeft" overlay={popoverCheckMenu} trigger='click'>
                                          <Icon type="menu-fold" className='select-dialog'/>
                                    </Popover >
                                </Cell>}
                       cell={<Cell className ='table-cell'><Icon type="caret-right"  className ='icon is-display'/></Cell>}
                       width={50}
                       className = ''
                       />
                   <Column
                       header={<Cell className = 'all-select table-header' onClick={this.handleSelectAll}>全选</Cell>}
                       cell={<Cell className ={'table-cell table-select '+this.state.oneChecked} onClick={this.onSelectChange} ><Icon type="check" className ={this.state.checkClassName+' selectedIcon'} /></Cell>}
                       width={50}

                       />
                   {listTable}
               </Table>
               <EditDialog isEdit={this.state.isEdit}  pageShow={this.props.pageShow} callbackParent={this.onChildChangeEdit} model={this.state.showInfo} />
               <LookDialog isLook={this.state.isLook} callbackParent = {this.onChildChangeLook} model={this.state.showInfo} pageShow = {this.props.pageShow} />
           </div>
       )
   }
});
//內容主容器
const Content = React.createClass({
    mixins:[BackboneReactMixin,cardSelectMinx],
    getInitialState(){
      return{
          showWay:'card',
          availableHeight:$(window).height(),
          loading:false,
          selectId:[],
          isBatchDelete:false,
          listHeader:[],
          listHeaderCopy:[],
          //listModel:staffModel,
          toggleBatch:false,
          isSelectAll:false
    }
    },
    componentWillMount(){
        let listHeadTemp = [];
        let model = this.getModel();
        let listHeadKeys = model.keys();
        model.values().map(function(list,index){
            if(list.aliasName){
                listHeadTemp.push({
                    aliasName:list.aliasName,
                    key:listHeadKeys[index]
                })
            }
        });
        this.setState({
            listHeader:listHeadTemp,
            listHeaderCopy:listHeadTemp
        })
    },
    componentDidMount(){
        this.showWay_token = PubSub.subscribe('showWay',function(topic,showWay){
            this.setState({
                showWay:showWay
            })
        }.bind(this));
        //显示卡片批量操作
        this.pubsub_tokenBatch = PubSub.subscribe('batchOperation',function(topic,isToggle){
            this.setState({
                toggleBatch:isToggle,
                selectId:[],
                isSelectAll:false
            })
        }.bind(this));
        //全选
        this.pubsub_tokenAll = PubSub.subscribe('select-all',function(topic,data){
            if(this.isMounted()){
                this.selectAble()
            }
        }.bind(this));
        //发送消息
        this.sendMessage_token = PubSub.subscribe('send-message',function(){
            let sendMessageDataId = this.state.selectId;
            let sendMessageData =[];
            if(sendMessageDataId.length > 0){
                for(let i = 0; i < sendMessageDataId.length; i++){
                    this.state.collection.map(function(item,index){
                        if(item.id==sendMessageDataId[i]){
                            sendMessageData.push(item)
                        }
                    })
                }
                PubSub.publish('back-send-message',sendMessageData);
            }
        }.bind(this));
        //批量删除
        this.deleteItem_token = PubSub.subscribe('delete-item',function(topic,isDelete){
            for(let i = 0 ;i < this.state.selectId.length ; i++){
                this.getCollection().remove(this.getCollection().get(this.state.selectId[i]))
            }
            this.setState({
                isSelectAll:false,
                selectId:[]
            });
            PubSub.publish('select-all-back',false);
        }.bind(this));
        //打印
        this.printData_token =  PubSub.subscribe('print-data',function(topic,data){
                let printDataId = this.state.selectId;
                let printData =[];
                if(printDataId.length > 0){
                    for(let i = 0; i < printDataId.length; i++){
                        this.state.collection.map(function(item,index){
                            if(item.id==printDataId[i]){
                                printData.push(item)
                            }
                        })
                    }
                    PubSub.publish('print-show',{printData:printData,listHeader:this.state.listHeader});
                }
        }.bind(this));
    },
    componentWillUnmount(){
        PubSub.unsubscribe(this.showWay_token);
        PubSub.unsubscribe(this.sendMessage_token);
        PubSub.unsubscribe(this.pubsub_tokenBatch);
        PubSub.unsubscribe(this.deleteItem_token);
        PubSub.unsubscribe(this.printData_token);
        PubSub.unsubscribe(this.pubsub_tokenAll);
    },
    handleGoTop(){
        $('#content').animate({scrollTop:0},1000);
    },
    //回调函数，记录卡片被选中的card的ID
    cardSelectItem(id){
       // todo 为了减少卡顿，这里的state采用直接赋值不刷新页面的方式（官方不推荐使用这种方式）
       if(_.contains(this.state.selectId,id)){
           this.state.selectId=_.without(this.state.selectId,id);
           PubSub.publish('select-all-back',false);
       }else{
           this.state.selectId.push(id);
           if(this.state.selectId.length == this.state.collection.length){
               PubSub.publish('select-all-back',true);
           }
       }
    },
    render(){
        var cardInfo =this.state.collection;
        var typeText = this.props.typeTextInfo;
        var pageShow = this.props.pageShow;
        var handleShowWay=function(){
                var self = this;
                if(this.state.showWay=='card'){
                    return(
                        <ul className = "list-inline card-container">
                            {
                                cardInfo.map(function(item){
                                    return(
                                        <li key={item.id} className = "card-container-space">
                                            <Card item={item} typeTextInfo={typeText} pageShow = {pageShow}
                                                  parentCallback = {self.cardSelectItem}
                                                  model={self.getCollection().get(item.id)}
                                                  toggleBatch = {self.state.toggleBatch}
                                                  isSelectAll = {self.state.isSelectAll}
                                                />
                                        </li>
                                    )
                                })
                            }
                            <div className = 'go-top' onClick={this.handleGoTop}>
                                <img src='/img/icon_top.png' />
                            </div>
                        </ul>
                    )
                }else{
                    return(
                        <ListShow collection={this.getCollection()} pageShow = {pageShow}  model={this.getModel()} />
                    )
                }
            }.bind(this);
        return (
            <div id="content" className="content">
                {handleShowWay()}
                <Spin spining={this.state.loading} size="large" className='spin-status'/>
            </div>
        )
    }
});
export{Content,ListShow}
