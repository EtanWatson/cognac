/**
 * 导航区组件
 */
import React from 'react';
import {render} from 'react-dom';
import 'pubsub-js';
import {Router,Route,IndexRoute,Link,IndexLink,browserHistory} from 'react-router';
import BackboneReactMixin from 'backbone-react-component';
import {Content} from './contentItem'
import {staffInfo} from '../data/cardData';
import {vehicleInfo} from '../data/vehicleInfo';
//任务管理
const TaskManage = React.createClass({
    render(){
        return (
            <div>
                <div>TaskManage</div>
                {this.props.children}
            </div>
        )
    }
});

//职员信息
const StaffInfo = React.createClass({
    render(){
        return (
            <Content staffInfo = {staffInfo}/>
        )
    }

});
//车辆档案
const VehicleRecord = React.createClass({
    render(){
        return (
           <Content vehicleInfo ={vehicleInfo}/>
        )
    }
});
//维修保养
const Maintenance = React.createClass({
    render(){
        console.log("Maintenance is called");
        return (
            <div>
                <div>Maintenance</div>
                {this.props.children}
            </div>
        )
    }
});
//病事假记录
const LeaveRecord = React.createClass({
    render(){
        return (
            <div>
                <div>LeaveRecord</div>
                {this.props.children}
            </div>
        )
    }
});

const NavMenu = React.createClass({
    render(){
        var navArrayValue = this.props.navArray;
        var items = navArrayValue.map(function(item){
            return(
                <div className="link-box" key={item.key}>
                    <Link to={"/"+item.name} className="link-style">
                        <div className = "link-icon">
                            <div className ={item.icon+" icon"}></div>
                            <div className = "text">{item.aliasName}</div>
                        </div>
                    </Link>
                </div>

            )
        });
        return(
            <div className="nav-item-layout" >
                <div className="logo">
                    <img src="/img/icon/icon_logo.png" />
                </div>
                <div>
                    <div className="title">车队管理系统</div>
                    {items}
                </div>
             </div>
        )
    }
});
export{TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord,NavMenu}
