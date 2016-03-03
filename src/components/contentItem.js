/**
 * 内容组件
 */
import React from 'react';
import {render} from 'react-dom';
import {Button,ButtonToolbar,Glyphicon} from 'react-bootstrap';
import BackboneReactMixin from 'backbone-react-component';
import {columns,data} from '../data/listData';
import {TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord,NavMenu} from './navItem';
import {Button as AntButton,Table,Icon,Row,Col} from 'antd';
const HoverItem = React.createClass({
   render(){
       return(
           <ul className = "list-inline operation-in-card">
                <li>
                    <Button  bsStyle="link"><img src="/img/icon/icon_edit.png" /></Button>
                </li>
                <li>
                    <Button  bsStyle="link"><img src="/img/icon/icon_send.png" /></Button>
                </li>
                <li>
                    <Button  bsStyle="link"><img src="/img/icon/icon_delete.png" /></Button>
                </li>
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
           isSelectAll:false
       }
   } ,
    componentDidMount(){
        this.pubsub_token = PubSub.subscribe('batchOperation',function(topic,isToggle){
            this.setState({
                toggleBatch:isToggle
            })
        }.bind(this));
        this.pubsub_token = PubSub.subscribe('selectAll',function(topic,isSelectAll){
            console.log(isSelectAll);
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
       } ,
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
   render(){
       var handleToggleBatch = function(){
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
       }.bind(this);
       var staffType = function(){
          var type = this.props.item.type;
         if(type==="0"){
             return(
                 <div className = "footer-img">
                     <img src = "/img/icon/card_title_driver.png" />
                     <div className = "type-text">司机</div>
                     <div className = "type-icon">
                         <img src="/img/icon/icon_driver.png" />
                     </div>
                 </div>
             )
         }else if(type==="1"){
             return(
                 <div className = "footer-img">
                     <img src = "/img/icon/card_title_manage.png" />
                     <div className = "type-text">司机</div>
                     <div className = "type-icon">
                         <img src="/img/icon/icon_driver.png" />
                     </div>
                 </div>
             )
         }else{
             return(
                 <div className = "footer-img">
                     <img src = "/img/icon/card_title_others.png" />
                     <div className = "type-text">司机</div>
                     <div className = "type-icon">
                         <img src="/img/icon/icon_driver.png" />
                     </div>
                 </div>
             )
         }
       }.bind(this);
       let item = this.props.item;
       return(
           <div className ={"card-style "+this.state.isHover} onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
               <ul className = "list-inline">
                   {handleToggleBatch()}
                    <li className = "header-img">
                        <img src = {item.headerImage}/>
                    </li>
                   <li className = "header-left">
                        <h3 className = "name">{item.name}</h3>
                        <ul className = "list-inline">
                            <li className = "circle"></li>
                            <li className = "status"><h5>{item.status}</h5></li>
                        </ul>
                    </li>
               </ul>
               <ul className = "list-inline">
                   <li><h5>{item.section.name}</h5></li>
                   <li><h5>{item.section.value}</h5></li>
               </ul>
               <ul className = "list-inline">
                   <li><h5>{item.phone.name}</h5></li>
                   <li><h5>{item.phone.value}</h5></li>
               </ul>
               <ul className = "list-inline">
                    <li><h5>{item.driverCar.name}</h5></li>
                    <li><h5>{item.driverCar.value}</h5></li>
               </ul>
               <ul className = "list-inline">
                   <li><h5>{item.driverCode.name}</h5></li>
                   <li><h5>{item.driverCode.value}</h5></li>
               </ul>
               <ul className = "list-inline">
                    <li><h5>{item.more.name}</h5></li>
                   <li><h5>{item.more.value}</h5></li>
               </ul>
               {staffType()}
               <div  className ={"default-style "+this.state.isOpen}>
                   <HoverItem />
               </div>
           </div>
       )
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
   render(){
       const {loading,selectedRowKeys} = this.state;
       const rowSelection ={
           selectedRowKeys,
           onChange: this.onSelectChange
       };
       const hasSelected = selectedRowKeys.length > 0;
       return(
           <div className = "table-box">
               <Row>
                    <Col span = "24">
                        <Table rowSelection={rowSelection} columns={columns} dataSource={data}
                            />
                    </Col>
               </Row>
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
            console.log(Object);
            this.setState({
                showWay:showWay
            })
        }.bind(this));
        var documentHeight = $(document).height();
        var windowHeight = $(window).height();
        console.log(documentHeight);
        console.log(windowHeight);
        if(documentHeight <= windowHeight){

            $('.content-relative').css({
                height:'100%'
            })
        }else{
            $('.content-relative').css({
                height:''
            })
        }
    },
    componentWillUnMount(){
        PubSub.unsubscribe(this.pubsub_token);
    },
    render(){
        let{vehicleInfo,staffInfo} = this.props;
        let info =vehicleInfo?vehicleInfo:staffInfo
        var handleShowWay=function(){
                if(this.state.showWay=='card'){
                    return(
                        <ul className = "list-inline card-container">
                            {
                                info.map(function(item){
                                    return(
                                        <li key={item.key}>
                                            <Card item={item} />
                                        </li>
                                    )
                                })
                            }
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