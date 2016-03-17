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
import {staffModel} from '../models/staffData'
import FixedDataTable from 'fixed-data-table';
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
               self.props.callbackParent('noDelete');
           }
       })
   },
   handleSendMessage(){
        this.setState({
            isSendMessage:true
        })
   },
   onChildChangeEdit(isEdit){
       //console.log('关闭编辑回调:'+isEdit);
        this.setState({
            isEdit:false
        });
       this.props.callbackParent(isEdit);
   },
   onChildChangeSendMessage(isSendMessage){
       this.setState({
           isSendMessage:isSendMessage
       })
   },
   render(){
       //console.log('鼠标滑入卡片时的cardInfo:'+this.props.cardInfo);
       return(
           <ul className = "list-inline operation-in-card">
                <li>
                    <Button  bsStyle="link" onClick={this.handleEditClick}><img src="/img/icon_edit.png" /></Button>
                </li>
                <li>
                    <Button  bsStyle="link" onClick={this.handleSendMessage}><img src="/img/icon_send.png" /></Button>
                </li>
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
   mixins:[BackboneReactMixin],
    getInitialState(){
       return {
           isOpen:"item-close",
           isHover:" ",
           toggleBatch:false,
           selectIcon:'/img/card_icon_defailt.png',
           isSelect:false,
           isSelectAll:false,

           isDelete:false,
           isLook:false,
           passLookEdit:false
       }
   } ,
    componentDidMount(){
        this.pubsub_tokenBatch = PubSub.subscribe('batchOperation',function(topic,isToggle){
            if(this.isMounted()){
                this.setState({
                    toggleBatch:isToggle
                })
            }
        }.bind(this));
        this.pubsub_tokenAll = PubSub.subscribe('selectAll',function(topic,isSelectAll){
            if(this.isMounted){
                if(!isSelectAll){
                    this.setState({
                        selectIcon:'/img/card_icon_defailt.png',
                        isSelect:true
                    })
                }else{
                    this.setState({
                        selectIcon:'/img/card_icon_pressed.png',
                        isSelect:true
                    })
                }
            }
        }.bind(this));
    },
    componentWillMount(){
    },
    componentWillUnmount(){
        PubSub.unsubscribe(this.pubsub_tokenBatch);
        PubSub.unsubscribe(this.pubsub_tokenAll);
    },
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
                selectIcon:'/img/card_icon_defailt.png'
            })
        }
    },
    handleClickIcon(){
        if(this.state.isSelect){
            this.setState({
                selectIcon:'/img/card_icon_defailt.png',
                isSelect:!this.state.isSelect
            })
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
            case 'delete':
                this.setState({
                   isDelete:true
                });
                break;
            case 'no-delete':
                this.setState({
                    isDelete:false
                });
                break;
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
        //console.log('contentComPassLookEdit:'+isChange);
        if(isChange=='isEdit'){
            //console.log('用户点击了编辑');

            this.setState({
                passLookEdit:true
            })
        }
    },
    handleToggleBatch(){
        if(this.state.toggleBatch){
            return(
                <img  className = "card-select-img" src={this.state.selectIcon}
                      onMouseEnter={this.handleMouseEnterIcon}
                      onMouseLeave={this.handleMouseLeaveIcon}
                      onClick={this.handleClickIcon}/>
            )
        }else{
            return(
                <img className = "card-select-img is-display" src="/img/card_icon_defailt.png" />
            )
        }
    },
   render(){
       let item = this.state.model;
       var staffType = function(){
         var type =item.Type;
         var typeText = this.props.typeTextInfo;
         if(type==="0"){
             return(
                 <div className = "footer-img">
                     <img src = "/img/card_title_driver.png" />
                     <div className = "type-text">{typeText[type]}</div>
                     <div className = "type-icon">
                         <img src="/img/icon_driver.png" />
                     </div>
                 </div>
             )
         }else if(type==="1"){
             return(
                 <div className = "footer-img">
                     <img src = "/img/card_title_manage.png" />
                     <div className = "type-text">{typeText[type]}</div>
                     <div className = "type-icon">
                         <img src="/img/icon_driver.png" />
                     </div>
                 </div>
             )
         }else{
             return(
                 <div className = "footer-img">
                     <img src = "/img/card_title_others.png" />
                     <div className = "type-text">{typeText[type]}</div>
                     <div className = "type-icon">
                         <img src="/img/icon_driver.png" />
                     </div>
                 </div>
             )
         }
       }.bind(this);
       //遍历卡片展示条目
       var findShowItem = function(){
           var showItem = [];
           for(let attributeName in this.getModel().attributes){
               if(this.getModel().get(attributeName).isShowInCard=='1'){
                   showItem.push(this.getModel().get(attributeName))
               }
           }
           return showItem
       }.bind(this);
       //卡片展示条目
       var showItem = findShowItem().map(function(attrItem,index){
           return(
               <ul className = "list-inline" key={index}>
                   <li><h5>{attrItem.aliasName}</h5></li>
                   <li><h5>{attrItem.value}</h5></li>
               </ul>
           )
       });
       return(
           <div className ={"card-style "+this.state.isHover}
                onDoubleClick={this.handleDoubleClick}
                onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}
                data-id={item.id}
               >
               <div style={{height:'210px'}}>
                   <ul className = "list-inline">
                       {this.handleToggleBatch()}
                       <li className = "header-img">
                           <img src = {item.HeadImg}/>
                       </li>
                       <li className = "header-left">
                           <h3 className = "name">{item.Name.value}</h3>
                           <ul className = "list-inline">
                               <li className = "circle circle-g">
                                   <img src="/img/icon_trip_normal.png" />
                               </li>
                               <li className = "circle-r is-display">
                                   <img src="/img/icon_trip_leave.png" />
                               </li>
                               <li className = "status"><h5>{item.Status}</h5></li>
                           </ul>
                       </li>
                   </ul>
                   {showItem}
               </div>
               {staffType()}
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
            staffInfo:'',
            listModel:staffModel,
            listHeader:[],
            listHeaderCopy:[]
        };
   },
   componentWillMount(){
       var height = $(window).height();
       var width = $(window).width();
       let listHeadTemp = [];
       let model = this.state.listModel;
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
              console.log(this.state.listHeader);
              PubSub.publish('print-show',{printData:printData,listHeader:this.state.listHeader});
          }else{
          }
      }.bind(this));
      //订阅删除事件(批量操作)
       this.deleteItemToken = PubSub.subscribe('delete-item',function(topic,data){
           this.removeCheckItems();
       }.bind(this))
    },
    componentWillUnmount(){
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
                oneChecked:'selected'
            })
        }
        this.setState({
            selectedRowKeys:selectedTemp
        });
    },
   handleRowClick(e){
       let tableCell = $('.content-table').find('.table-cell');
       $(tableCell).removeClass('item-click');
       $(tableCell).find('.icon').addClass('is-display');
       let thisTableCell = $(e.target).parents('.fixedDataTableCellGroupLayout_cellGroup').find('.table-cell');
       $(thisTableCell).addClass('item-click');
       $(thisTableCell).find('.icon').removeClass('is-display');
   },
   handleDoubleClick(e){
       var staffId = $(e.target).parents('.public_fixedDataTableCell_main').find('.table-cell').attr('data-id');
       var staffInfo = this.getCollection().get(staffId);
       this.setState({
           staffInfo:staffInfo
       },function(){
            this.setState({
                isLook:true
            })
       });
   },
    onChildChangeLook(){
        this.setState({
            isLook:false
        })
    },
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
               <EditDialog isEdit={this.state.isEdit}  pageShow={this.props.pageShow} callbackParent = {this.onChildChangeEdit} model={this.getModel()} />
               <LookDialog isLook={this.state.isLook} callbackParent = {this.onChildChangeLook} model={this.state.staffInfo} pageShow = {this.props.pageShow} />
           </div>
       )
   }
});
//內容主容器
const Content = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
      return{
          showWay:'card',
          availableHeight:$(window).height(),
          loading:false,
          selectId:[],
          isBatchDelete:false,
          listHeader:[],
          listHeaderCopy:[],
          listModel:staffModel
      }
    },
    componentWillMount(){
        let listHeadTemp = [];
        let model = this.state.listModel;
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
        //批量删除
        this.deleteItem_token = PubSub.subscribe('delete-item',function(topic,isDelete){
            for(let i = 0 ;i < this.state.selectId.length ; i++){
                this.getCollection().remove(this.getCollection().get(this.state.selectId[i]))
            }
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
        PubSub.unsubscribe(this.deleteItem_token);
        PubSub.unsubscribe(this.printData_token);
    },
    handleGoTop(){
        $('.content-relative').animate({scrollTop:0},1000);
    },
    //回调函数，记录卡片被选中的card的ID
    cardSelectItem(id){
       if(_.contains(this.state.selectId,id)){
           this.setState({selectId: _.without(this.state.selectId,id)})
       }else{
           this.state.selectId.push(id)
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
                                                  model={self.getCollection().get(item.id)}/>
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
                        <ListShow collection={this.getCollection()} pageShow = {pageShow}/>
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
export{Content}