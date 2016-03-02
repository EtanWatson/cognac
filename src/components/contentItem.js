/**
 * 内容组件
 */
import React from 'react';
import {render} from 'react-dom';
import {Button,ButtonToolbar,Glyphicon} from 'react-bootstrap';
import BackboneReactMixin from 'backbone-react-component';
import {columns,data} from '../data/listData'
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
           isHover:" "
       }
   } ,
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
   render(){
       return(
           <div className ={"card-style "+this.state.isHover} onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
               <ul className = "list-inline">
                   <img className = "card-select-img" src = "/img/icon/card_icon_selected.png"  />
                    <li className = "header-img">
                        <img src = "/img/icon/icon_user_head_50_50_have_1.png" />
                    </li>
                   <li className = "header-left">
                        <h3 className = "name">赵日天</h3>
                        <ul className = "list-inline">
                            <li className = "circle"></li>
                            <li className = "status"><h5>出车</h5></li>
                        </ul>
                    </li>
               </ul>
               <ul className = "list-inline">
                   <li><h5>部门:</h5></li>
                   <li><h5>车队一</h5></li>
               </ul>
               <ul className = "list-inline">
                   <li><h5>手机:</h5></li>
                   <li><h5>13234342323</h5></li>
               </ul>
               <ul className = "list-inline">
                    <li><h5>准驾车型</h5></li>
                    <li><h5>A1</h5></li>
               </ul>
               <ul className = "list-inline">
                   <li><h5>驾驶证号</h5></li>
                   <li><h5>23433443434</h5></li>
               </ul>
               <ul className = "list-inline">
                    <li><h5>备注:</h5></li>
                   <li><h5>-</h5></li>
               </ul>
               <div className = "footer-img">
                   <img src = "/img/icon/card_title_driver.png" />
                   <div className = "type-icon">
                       <img src="/img/icon/icon_driver.png" />
                   </div>
               </div>

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
          showWay:'card'
      }
    },
    componentDidMount(){
        this.pubsub_token = PubSub.subscribe('showWay',function(topic,showWay){
            console.log(Object);
            this.setState({
                showWay:showWay
            })
        }.bind(this));
    },
    componentWillUnMount(){
        PubSub.unsubscribe(this.pubsub_token);
    },
    render(){
        var handleShowWay=function(){
                if(this.state.showWay=='card'){
                    return(
                        <ul className = "list-inline">
                            <li>
                                <Card />
                            </li>
                            <li>
                                <Card />
                            </li>
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