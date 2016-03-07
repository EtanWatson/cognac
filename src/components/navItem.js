/**
 * 导航区组件
 */
import React from 'react';
import {render} from 'react-dom';
import 'pubsub-js';
import {Router,Route,IndexRoute,Link,IndexLink,browserHistory} from 'react-router';
import BackboneReactMixin from 'backbone-react-component';
import {Content} from './contentItem'
import {staffInfo,staffTypeText} from '../data/cardData';
import {vehicleInfo,vehicleTypeText} from '../data/vehicleInfo';
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
    //在render之前，发布事件
    componentDidMount(){
        PubSub.publish('content-show','staff');
    },
    render(){
        return (
            <Content cardInfo = {staffInfo} typeTextInfo={staffTypeText}/>
        )
    }

});
//车辆档案
const VehicleRecord = React.createClass({
    //在render之前，发布事件
    componentDidMount(){
      PubSub.publish('content-show','vehicle')
    },
    render(){
        return (
           <Content cardInfo={vehicleInfo} typeTextInfo={vehicleTypeText}/>
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
    getInitialState(){
      return{
            pageShow:''
      }
    },
    componentWillReceiveProps(nextProps){
        console.log((nextProps.pageShow));
    },
    handleClick(){

    },
    render(){
        var navArrayValue = this.props.navArray;
        var showPage = this.props.pageShow;
        var items = navArrayValue.map(function(item){
            return(
                <div className="link-box" key={item.key}>
                    <Link to={"/"+item.name} className="link-style" onClick={this.handleClick}>
                        <div className = "link-icon" >
                            <div className ={item.icon+" icon default"}></div>
                            <div className ={item.icon+"-press press is-display"}></div>
                            <div className = "text">{item.aliasName}</div>
                        </div>
                    </Link>
                </div>

            )
        }.bind(this));
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
