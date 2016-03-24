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
import {navArray,settingNavArray} from '../data/navigation';
import {staffData,staffCollection,staffModel} from '../models/staffData';
import {vehicleModel,vehicleData,vehicleCollection} from '../models/vehicleData'
import {taskModel,taskList} from '../models/taskData'
import {completedtaskModel,completedtaskList} from '../models/CompletedTaskData'
import {TaskArrangement,CompletedArrangement} from './taskArrangement'
import {TaskContent} from './taskArrangement'
import { Row, Col ,Collapse,Icon} from 'antd';

//任务管理
const TaskManage = React.createClass({
    render(){
        return (
            <TaskContent />
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
    },
    componentWillUnmount(){
        PubSub.unsubscribe(this.typeCollectio_token)
    },
    render(){
        return (
            <Content cardInfo = {staffInfo} typeTextInfo={staffTypeText} pageShow={'staff'} collection={this.state.typeCollection} model={staffModel}/>
        )
    }

});
//车辆档案
const VehicleRecord = React.createClass({
    //在render之前，发布事件
    componentDidMount(){
    },
    render(){
        return (
           <Content cardInfo={vehicleInfo} typeTextInfo={vehicleTypeText} pageShow={'vehicle'} collection = {vehicleData} model = {vehicleModel}/>
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
            pageShow:'',
            normal : true,
            isSetting : false,
            navData : navArray,
            baseUrl : '',
            linkIcon:'link-icon'
      }
    },
    componentDidMount(){
       console.log(this.props.pageShow);
       var navBtnStatus = function(selector){
           $('.'+selector).addClass('click');
           $('.'+selector+' .default').addClass('is-display');
           $('.'+selector+' .press').removeClass('is-display');
       };
      //直接在local中输入 /setting时候调用
      // 刷新页面保持nav的按钮状态
      switch (this.props.pageShow){
          case 'setting':
              navBtnStatus('setting');
              this.setState({
                  navData : settingNavArray,
                  baseUrl : '/setting',
                  linkIcon:'link-icon-setting'
              });
              break;
          case 'task':
              navBtnStatus('taskManage');
              this.setState({
                  navData : navArray,
                  baseUrl : ''
              });
              break;
          case 'staff':
              navBtnStatus('staffInfo');
              this.setState({
                  navData : navArray,
                  baseUrl : '',
                  linkIcon:'link-icon'
              });
              break;
          case 'vehicle':
              navBtnStatus('vehicleRecord');
              this.setState({
                  navData : navArray,
                  baseUrl : '',
                  linkIcon:'link-icon'
              });
              break;
          case 'maintenance':
              navBtnStatus('maintenance');
              this.setState({
                  navData : navArray,
                  baseUrl : '',
                  linkIcon:'link-icon'
              });
              break;
          case 'leaveRecord':
              navBtnStatus('leaveRecord');
              this.setState({
                  navData : navArray,
                  baseUrl : '',
                  linkIcon:'link-icon'
              });
              break;

        }
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
            default:
                this.setState({
                    navData : navArray,
                    baseUrl : '',
                    linkIcon:'link-icon'
                });
                break;
        }
    },
    handleClick(e){
        //e.preventDefault();
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
                        <IndexLink to={this.state.baseUrl+"/"} className={"link-style "+item.name} onClick={this.handleClick}>
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
                        <Link to={this.state.baseUrl+"/"+item.name} className={"link-style "+item.name} onClick={this.handleClick}>
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
