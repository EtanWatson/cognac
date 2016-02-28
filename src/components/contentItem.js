/**
 * 内容组件
 */
import React from 'react';
import {render} from 'react-dom';
import BackboneReactMixin from 'backbone-react-component';
import {TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord,NavMenu} from './navItem';

const HoverItem = React.createClass({
   render(){
       return(
           <div>

           </div>
       )
   }
});

const Card = React.createClass({
   render(){
       return(
           <div className = "card-style">
               <ul className = "list-inline">
                    <li className = "header-img">
                        <img src = "/img/icon/icon_user_head_50*50_have_12.png" />
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
               <div>
                   <img src = "" />
                   <div className = "">
                       <img src="" />
                   </div>
               </div>
               <div className = "">

               </div>
           </div>
       )
   }
});
const Content = React.createClass({
    render(){
        return (
            <div id="content" className="content">
                <Card />
            </div>
        )
    }
});

export{Content}