/**
 * 内容组件
 */
import React from 'react';
import {render} from 'react-dom';
import {Button,ButtonToolbar,Glyphicon} from 'react-bootstrap';
import BackboneReactMixin from 'backbone-react-component';
import {columns,data} from '../data/listData';
import {TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord,NavMenu} from './navItem';
import {Button as AntButton,Icon,Row,Col,Modal,Checkbox,Popover} from 'antd';
import {EditDialog,SendMessageDialog,LookDialog,popoverCheckMenu} from './toolComponents/dialogConponents';
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
               <EditDialog isEdit={this.state.isEdit} cardInfo={this.props.cardInfo} pageShow={this.props.pageShow} callbackParent = {this.onChildChangeEdit} model={this.getModel()} />
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
           var findShowItem = function(){
                var showItem = [];
                for(let attributeName in this.getModel().attributes){
                   if(this.getModel().get(attributeName).isShowInCard=='1'){
                       showItem.push(this.getModel().get(attributeName))
                   }
                }
               return showItem
           }.bind(this);
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
                    onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                   <ul className = "list-inline">
                       {this.handleToggleBatch()}
                       <li className = "header-img">
                           <img src = {item.HeadImg.value}/>
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
   getInitialState(){
        return{
            selectedRowKeys: [],
            loading: false,
            allChecked:false,
            allCheckClassName:"is-display",
            oneChecked:false,
            dataValue:0
        };
   },
   start(){
     this.setState({
         loading: true
     });
    //模拟ajax请求，完成以后清空
     setTimeout(() =>{
         this.setState({
            selectedRowKeys:[],
             loading:false
         });
     },1000)
   },
   onSelectChange(selectedRowKeys){
     //console.log('selectedRowKeys changed: ', selectedRowKeys);
     this.setState({
       selectedRowKeys
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
   handleDoubleClick(){
   },
    handleSelectAll(){
      this.state.allChecked?this.setState({allChecked:false,allCheckClassName:'is-display'}):this.setState({allChecked:true,allCheckClassName:''})
    },
    handelCheckboxChange(e) {
        e.preventDefault();
      this.state.oneChecked?this.setState({oneChecked:false,allCheckClassName:'is-display'}):this.setState({oneChecked:true,allCheckClassName:''})
    },
   render(){
       const {loading,selectedRowKeys} = this.state;
       const rowSelection ={
           selectedRowKeys,
           onChange: this.onSelectChange
       };
       const hasSelected = selectedRowKeys.length > 0;

       const TextCell = ({rowIndex,data,col,...props})=>(
           <Cell className = "table-cell text-name" {...props}>
               {data[rowIndex][col]}
           </Cell>
       );
       return(
           <div className = 'content-table' style={{textAlign:'center'}}>
               <Table
                   rowHeight={50}
                   rowsCount={data.length}
                   width={1024}
                   height={500}
                   headerHeight={50}
                   onRowClick={this.handleRowClick}
                   onRowDoubleClick={this.handleDoubleClick}
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
                       cell={<Cell className ='table-cell'><div className ={this.state.allCheckClassName} data-value={this.state.dataValue} onClick={this.handelCheckboxChange}><Icon type="check" /></div></Cell>}
                       width={50}

                       />
                   <Column
                       header={<Cell className = "table-header">编码</Cell>}
                       cell={<TextCell data={data} col="key" />}
                       flexGrow={2}
                       width={100}
                       className = ''
                       />
                   <Column
                       header={<Cell className = "header-name table-header">姓名</Cell>}
                       cell={<TextCell data={data} col="name" />}
                       flexGrow={2}
                       width={100}
                       />
               </Table>
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
          availableHeight:$(window).height()
          //staffInfo:[]
      }
    },
    componentWillMount(){
    },
    componentDidMount(){
        this.pubsub_token = PubSub.subscribe('showWay',function(topic,showWay){
            this.setState({
                showWay:showWay
            })
        }.bind(this));
    },
    componentWillUnmount(){
        PubSub.unsubscribe(this.pubsub_token);
    },
    handleGoTop(){
        $('.content-relative').animate({scrollTop:0},1000);
    },
    render(){
        //var cardInfo= this.props.cardInfo;
        var cardInfo =this.state.collection;
        var typeText = this.props.typeTextInfo;
        var pageShow = this.props.pageShow;
        //console.log('content pageShow：'+pageShow);
        var handleShowWay=function(){
                var self = this;
                if(this.state.showWay=='card'){
                    return(
                        <ul className = "list-inline card-container">
                            {
                                cardInfo.map(function(item){
                                    return(
                                        <li key={item.id} className = "card-container-space">
                                            <Card item={item} typeTextInfo={typeText} pageShow = {pageShow} model={self.getCollection().get(item.id)}/>
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
                        <ListShow />
                    )
                }
            }.bind(this);
        return (
            <div id="content" className="content">
                {handleShowWay()}
            </div>
        )
    }
});
export{Content}