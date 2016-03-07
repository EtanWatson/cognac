/**
 * 内容组件
 */
import React from 'react';
import {render} from 'react-dom';
import {Button,ButtonToolbar,Glyphicon} from 'react-bootstrap';
import BackboneReactMixin from 'backbone-react-component';
import {columns,data} from '../data/listData';
import {TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord,NavMenu} from './navItem';
import {Button as AntButton,Table,Icon,Row,Col,Modal} from 'antd';
import {EditDialog,SendMessageDialog,LookDialog} from './toolComponents/dialogConponents';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
const confirm = Modal.confirm;
const HoverItem = React.createClass({
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
               self.props.callbackParent('delete');
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
       console.log('关闭编辑回调:'+isEdit);
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
       console.log('鼠标滑入卡片时的cardInfo:'+this.props.cardInfo);
       return(
           <ul className = "list-inline operation-in-card">
                <li>
                    <Button  bsStyle="link" onClick={this.handleEditClick}><img src="/img/icon/icon_edit.png" /></Button>
                </li>
                <li>
                    <Button  bsStyle="link" onClick={this.handleSendMessage}><img src="/img/icon/icon_send.png" /></Button>
                </li>
                <li>
                    <Button  bsStyle="link" onClick={this.handleDeleteClick}><img src="/img/icon/icon_delete.png" /></Button>
                </li>
               <EditDialog isEdit={this.state.isEdit} cardInfo={this.props.cardInfo} callbackParent = {this.onChildChangeEdit}/>
               <SendMessageDialog isSendMessage={this.state.isSendMessage} callbackParent={this.onChildChangeSendMessage} />
           </ul>
       )
   }
});

const Card = React.createClass({
   getInitialState(){
       return {
           isOpen:"item-close",
           isHover:" ",
           toggleBatch:false,
           selectIcon:'/img/icon/card_icon_defailt.png',
           isSelect:false,
           isSelectAll:false,

           isDelete:false,
           isLook:false,
           passLookEdit:false
       }
   } ,
    componentDidMount(){
        this.pubsub_tokenBatchVehicle = PubSub.subscribe('batchOperationVehicle',function(topic,isToggle){
            console.log('test');
            this.setState({
                toggleBatch:isToggle
            })
        }.bind(this));
        this.pubsub_tokenBatchStaff= PubSub.subscribe('batchOperationStaff',function(topic,isToggle){
            console.log('test');
            this.setState({
                toggleBatch:isToggle
            })
        }.bind(this));
        this.pubsub_tokenAll = PubSub.subscribe('selectAll',function(topic,isSelectAll){
            if(!isSelectAll){
                this.setState({
                    selectIcon:'/img/icon/card_icon_defailt.png',
                    isSelect:true
                })
            }else{
                this.setState({
                    selectIcon:'/img/icon/card_icon_pressed.png',
                    isSelect:true
                })
            }
        }.bind(this));
    },
    componentWillUnMount(){
        alert('willMount');
        PubSub.unsubscribe(this.pubsub_tokenBatchVehicle);
        PubSub.unsubscribe(this.pubsub_tokenBatchStaff);
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
                selectIcon:'/img/icon/card_icon_selected.png'
            })
        }
    },
    handleMouseLeaveIcon(){
        if(!this.state.isSelect){
            this.setState({
                selectIcon:'/img/icon/card_icon_defailt.png'
            })
        }
    },
    handleClickIcon(){
        if(this.state.isSelect){
            this.setState({
                selectIcon:'/img/icon/card_icon_defailt.png',
                isSelect:!this.state.isSelect
            })
        }else{
            this.setState({
                selectIcon:'/img/icon/card_icon_pressed.png',
                isSelect:!this.state.isSelect
            })
        }

    },
    onChildChange(isChange){
        console.log('卡片事件回调:isChange：'+isChange);
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
        console.log('contentComPassLookEdit:'+isChange);
        if(isChange=='isEdit'){
            console.log('用户点击了编辑');
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
                <img className = "card-select-img is-display" src="/img/icon/card_icon_defailt.png" />
            )
        }
    },
   render(){
       var staffType = function(){
         var type = this.props.item.type;
         var typeText = this.props.typeTextInfo;
         if(type==="0"){
             return(
                 <div className = "footer-img">
                     <img src = "/img/icon/card_title_driver.png" />
                     <div className = "type-text">{typeText[type]}</div>
                     <div className = "type-icon">
                         <img src="/img/icon/icon_driver.png" />
                     </div>
                 </div>
             )
         }else if(type==="1"){
             return(
                 <div className = "footer-img">
                     <img src = "/img/icon/card_title_manage.png" />
                     <div className = "type-text">{typeText[type]}</div>
                     <div className = "type-icon">
                         <img src="/img/icon/icon_driver.png" />
                     </div>
                 </div>
             )
         }else{
             return(
                 <div className = "footer-img">
                     <img src = "/img/icon/card_title_others.png" />
                     <div className = "type-text">{typeText[type]}</div>
                     <div className = "type-icon">
                         <img src="/img/icon/icon_driver.png" />
                     </div>
                 </div>
             )
         }
       }.bind(this);
       let item = this.props.item;
       //是否删除
       if(this.state.isDelete){
           return(
               <span></span>
           )
       }else{
           return(
               <div className ={"card-style "+this.state.isHover}
                    onDoubleClick={this.handleDoubleClick}
                    onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                   <ul className = "list-inline">
                       {this.handleToggleBatch()}
                       <li className = "header-img">
                           <img src = {item.headerImage}/>
                       </li>
                       <li className = "header-left">
                           <h3 className = "name">{item.name}</h3>
                           <ul className = "list-inline">
                               <li className = "circle circle-g">
                                    <img src="/img/icon/icon_trip_normal.png" />
                               </li>
                               <li className = "circle-r is-display">
                                   <img src="/img/icon/icon_trip_leave.png" />
                               </li>
                               <li className = "status"><h5>{item.status}</h5></li>
                           </ul>
                       </li>
                   </ul>
                   <ul className = "list-inline">
                       <li><h5>{item.info_one.name}</h5></li>
                       <li><h5>{item.info_one.value}</h5></li>
                   </ul>
                   <ul className = "list-inline">
                       <li><h5>{item.info_two.name}</h5></li>
                       <li><h5>{item.info_two.value}</h5></li>
                   </ul>
                   <ul className = "list-inline">
                       <li><h5>{item.info_three.name}</h5></li>
                       <li><h5>{item.info_three.value}</h5></li>
                   </ul>
                   <ul className = "list-inline">
                       <li><h5>{item.info_four.name}</h5></li>
                       <li><h5>{item.info_four.value}</h5></li>
                   </ul>
                   <ul className = "list-inline">
                       <li><h5>{item.info_five.name}</h5></li>
                       <li><h5>{item.info_five.value}</h5></li>
                   </ul>
                   {staffType()}
                   <div  className ={"default-style "+this.state.isOpen}>
                       <HoverItem cardInfo={item} callbackParent={this.onChildChange} passLookEdit={this.state.passLookEdit}/>
                   </div>
                   <LookDialog isLook={this.state.isLook} callbackParent = {this.onChildChangeLook} cardInfo={item}/>
               </div>
           )
       }

   }
});
const ListShow = React.createClass({
   getInitialState(){
        return{
            selectedRowKeys: [],
            loading: false
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
     console.log('selectedRowKeys changed: ', selectedRowKeys);
     this.setState({
       selectedRowKeys
     });
   },
   handleRowClick(){

   },
   render(){
       const {loading,selectedRowKeys} = this.state;
       const rowSelection ={
           selectedRowKeys,
           onChange: this.onSelectChange
       };
       const hasSelected = selectedRowKeys.length > 0;
       function format(cell, row){
           return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
       }
       //Row select setting
       var selectRowProp = {
           mode: "checkbox",  //checkbox for multi select, radio for single select.
           clickToSelect: true,   //click row will trigger a selection on that row.
           bgColor: "rgb(238, 193, 213)"   //selected row background color
       };
       var products = [{
           id: 1,
           name: "Item name 1",
           price: 100
       },{
           id: 2,
           name: "Item name 2",
           price: 100
       },];
       return(
           //<div className = "table-box">
           //    <Row>
           //         <Col span = "24">
           //             <Table rowSelection={rowSelection} columns={columns} dataSource={data}
           //                    pagination={false} onRowClick={this.handleRowClick} bordered useFixedHeader={true}
           //                 />
           //         </Col>
           //    </Row>
           //</div>
           <div>
               <BootstrapTable
                   data={productLong}
                   striped={true}
                   hover={true}
                   condensed={true}
                   pagination={true}
                   selectRow={selectRowProp}
                   insertRow={true}
                   deleteRow={true}
                   columnFilter={true}
                   search={true}>
                   <TableHeaderColumn dataField="id" isKey={true} dataAlign="right" dataSort={true}>Product ID</TableHeaderColumn>
                   <TableHeaderColumn dataField="name" dataSort={true}>Product Name</TableHeaderColumn>
                   <TableHeaderColumn dataField="price" dataAlign="center" dataFormat={format}>Product Price</TableHeaderColumn>
               </BootstrapTable>
           </div>
       )
   }
});
const Content = React.createClass({
    getInitialState(){
      return{
          showWay:'card',
          availableHeight:$(window).height()
          //staffInfo:[]
      }
    },
    componentDidMount(){
        this.pubsub_token = PubSub.subscribe('showWay',function(topic,showWay){
            this.setState({
                showWay:showWay
            })
        }.bind(this));
    },
    componentWillUnMount(){
        PubSub.unsubscribe(this.pubsub_token);
    },
    handleGoTop(){
        $('.content-relative').animate({scrollTop:0},1000);
    },
    render(){
        var cardInfo= this.props.cardInfo;
        var typeText = this.props.typeTextInfo;
        var handleShowWay=function(){
                if(this.state.showWay=='card'){
                    return(
                        <ul className = "list-inline card-container">
                            {
                                cardInfo.map(function(item){
                                    return(
                                        <li key={item.key} className = "card-container-space">
                                            <Card item={item} typeTextInfo={typeText}/>
                                        </li>
                                    )
                                })
                            }
                            <div className = 'go-top' onClick={this.handleGoTop}>
                                <img src='/img/icon/icon_top.png' />
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