/**
 * 内容组件
 */
import React from 'react';
import {render} from 'react-dom';
import {Button} from 'react-bootstrap';
import BackboneReactMixin from 'backbone-react-component';
import {TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord,NavMenu} from './navItem';

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
const Content = React.createClass({
    render(){
        return (
            <div id="content" className="content">
                <ul className = "list-inline">
                    <li>
                        <Card />
                    </li>
                    <li>
                        <Card />
                    </li>
                </ul>
            </div>
        )
    }
});

export{Content}