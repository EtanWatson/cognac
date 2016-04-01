/**
 * 导航区组件
 */
import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import 'pubsub-js';
import {Router,Route,IndexRoute,Link,IndexLink,browserHistory} from 'react-router';
import BackboneReactMixin from 'backbone-react-component';
import {Content} from './contentItem'
import {staffInfo,staffTypeText} from '../data/cardData';
import {vehicleInfo,vehicleTypeText} from '../data/vehicleInfo';
import {navArray,settingNavArray} from '../data/navigation';
//import {staffData,staffCollection,staffModel} from '../models/staffData';
import {staffData,staffCollection,staffModel} from '../models/staff';
import {vehicleModel,vehicleData,vehicleCollection} from '../models/vehicle';
//import {vehicleModel,vehicleData,vehicleCollection} from '../models/vehicleData'
//import {taskModel,taskList} from '../models/taskData'
import {completedtaskModel,completedtaskList} from '../models/CompletedTaskData'
import {TaskArrangement,CompletedArrangement} from './taskArrangement'
import {TaskContent} from './taskArrangement'
import { Row, Col ,Collapse,Icon} from 'antd';
import {cardsDriver,cardsStaff,cardVehicle,cardTask} from '../models/cardKey'
import {taskData,taskCollection,taskModel} from '../models/task';

//任务管理
const TaskManage = React.createClass({
    componentDidMount(){
        console.log('TaskMount');
        PubSub.publish('taskMount','')
    },
    render(){
        return (
            <TaskContent model = {taskModel} collection={taskData} cardTask={cardTask}/>
        )
    }
});
//职员信息
const StaffInfo = React.createClass({
    getInitialState(){
        return{
            typeCollection:staffData
        }
    },
    //注册全局事件,更新content显示内容
    componentDidMount(){
        this.typeCollectio_token = PubSub.subscribe('typeCollection',function(topic,typeCollection){
            let typeList = new staffCollection(typeCollection);
            this.setState({
                typeCollection:typeList
            })
        }.bind(this));
        PubSub.publish('staffInfoMount','');
    },
    componentWillUnmount(){
        PubSub.unsubscribe(this.typeCollectio_token)
    },
    render(){
        return (
            <Content cardInfo = {staffInfo} typeTextInfo={staffTypeText} pageShow={'staff'}
                     collection={this.state.typeCollection} model={staffModel}
                     cardMap = {cardsDriver}
                     cardStaff = {cardsStaff}
                />
        )
    }
});
//车辆档案
const VehicleRecord = React.createClass({
    //在render之前，发布事件
    componentDidMount(){
        PubSub.publish('vehicleMount','');
    },
    render(){
        return (
           <Content cardInfo={vehicleInfo} typeTextInfo={vehicleTypeText} pageShow={'vehicle'}
                    collection = {vehicleData} model = {vehicleModel}
                    cardMap = {cardVehicle}
               />
        )
    }
});
//维修保养
const Maintenance = React.createClass({
    componentDidMount(){
        PubSub.publish('maintenance','');
    },
    render(){
        console.log("Maintenance is called");
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
});
//病事假记录
const LeaveRecord = React.createClass({
    componentDidMount(){
        PubSub.publish('leaveRecord','');
    },
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
            pageShow:'',
            normal : true,
            isSetting : false,
            navData : navArray,
            baseUrl : '',
            linkIcon:'link-icon'
      }
    },
    navBtnStatus(selector){
        //let element = $(ReactDOM.findDOMNode(this.refs[selector]));
        let element = $('.'+selector);
        element.addClass('click');
        element.find('.default').addClass('is-display');
        element.find('.press').removeClass('is-display');
    },
    componentDidMount(){
        //主页面
        PubSub.subscribe('taskMount',function(topic,data){
            this.navBtnStatus('taskManage');
            this.setState({
                navData : navArray,
                baseUrl : '',
                linkIcon:'link-icon'
            });
        }.bind(this));
        PubSub.subscribe('staffInfoMount',function(topic,data){
            this.setState({
                navData : navArray,
                baseUrl : '',
                linkIcon:'link-icon'
            });
            this.navBtnStatus('staffInfo');
        }.bind(this));
        PubSub.subscribe('vehicleMount',function(topic,data){
            this.setState({
                navData : navArray,
                baseUrl : '',
                linkIcon:'link-icon'
            });
            this.navBtnStatus('vehicleRecord');
        }.bind(this));
        PubSub.subscribe('maintenance',function(topic,data){
            this.setState({
                navData : navArray,
                baseUrl : '',
                linkIcon:'link-icon'
            });
            this.navBtnStatus('maintenance');
        }.bind(this));
        PubSub.subscribe('leaveRecord',function(topic,data){
            this.setState({
                navData : navArray,
                baseUrl : '',
                linkIcon:'link-icon'
            });
            this.navBtnStatus('leaveRecord');
        }.bind(this));
        //系统设置页面
        PubSub.subscribe('driverSettingMount',function(topic,data){
            this.setState({
                navData : settingNavArray,
                baseUrl : '/setting',
                linkIcon:'link-icon-setting'
            });
            this.navBtnStatus('driverSetting');
        }.bind(this));
        PubSub.subscribe('staffSettingMount',function(topic,data){
            this.setState({
                navData : settingNavArray,
                baseUrl : '/setting',
                linkIcon:'link-icon-setting'
            });
            this.navBtnStatus('staffSetting');
        }.bind(this));
        PubSub.subscribe('vehicleSettingMount',function(topic,data){
            this.setState({
                navData : settingNavArray,
                baseUrl : '/setting',
                linkIcon:'link-icon-setting'
            });
            this.navBtnStatus('vehicleSetting');
        }.bind(this));
        PubSub.subscribe('taskSettingMount',function(topic,data){
            console.log('test task mount');
            this.setState({
                navData : settingNavArray,
                baseUrl : '/setting',
                linkIcon:'link-icon-setting'
            });
            this.navBtnStatus('taskSetting');
        }.bind(this));
    },
    componentWillReceiveProps(nextProps){
        switch (nextProps.pageShow){
            case 'setting':
                this.setState({
                   navData : settingNavArray,
                   baseUrl : '/setting',
                   linkIcon:'link-icon-setting'
                });
                break;
            case 'task':
                this.setState({
                    navData : navArray,
                    baseUrl : ''
                });
                break;
            case 'staff':
                this.setState({
                    navData : navArray,
                    baseUrl : '',
                    linkIcon:'link-icon'
                });
                break;
            case 'vehicle':
                this.setState({
                    navData : navArray,
                    baseUrl : '',
                    linkIcon:'link-icon'
                });
                break;
            case 'maintenance':
                this.setState({
                    navData : navArray,
                    baseUrl : '',
                    linkIcon:'link-icon'
                });
                break;
            case 'leaveRecord':
                this.setState({
                    navData : navArray,
                    baseUrl : '',
                    linkIcon:'link-icon'
                });
                break;
        }
    },
    handleClick(e){
        let linkBox = $('.link-box');
        let aDefault =  $(linkBox).find('.link-style');
        $(aDefault).removeClass('click');
        let press = $(linkBox).find('.press');
        let defaultStatus = $(linkBox ).find('.default');
        $(press).addClass('is-display');
        $(defaultStatus).removeClass('is-display');
        let thisPress = $(e.target).parents('.link-box').find('.press');
        let thisDefault= $(e.target).parents('.link-box').find('.default');
        let aClick= $(e.target).parents('.link-box').find('.link-style').addClass('click');
        $(thisDefault).addClass('is-display');
        $(thisPress).removeClass('is-display')
    },
    render(){
        var navArrayValue = this.state.navData;
        //var showPage = this.props.pageShow;
        var items = navArrayValue.map(function(item,index){
            if(item.key=='1'){
                return(
                    <div className="link-box" key={item.key} >
                        <IndexLink to={this.state.baseUrl+"/"} ref={item.name} className={"link-style "+item.name} onClick={this.handleClick}>
                            <div className ={this.state.linkIcon} >
                                <div className ={item.icon+" icon default"}></div>
                                <div className ={item.icon+"-press icon press is-display"}></div>
                                <div className = "text">{item.aliasName}</div>
                                <div>{item.helpInfo}</div>
                            </div>
                        </IndexLink>
                    </div>
                )
            }else{
                return(
                    <div className="link-box" key={item.key} >
                        <Link to={this.state.baseUrl+"/"+item.name} ref={item.name} className={"link-style "+item.name} onClick={this.handleClick}>
                            <div className = {this.state.linkIcon}>
                                <div className ={item.icon+" icon default"}></div>
                                <div className ={item.icon+"-press icon press is-display"}></div>
                                <div className = "text">{item.aliasName}</div>
                                <div>{item.helpInfo}</div>
                            </div>
                        </Link>
                    </div>
                )
            }
        }.bind(this));
        return(
            <div className="nav-item-layout" >
                <div className="logo">
                    <img src="/img/icon_logo.png" />
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
