/**
 * Created by zhaiyujia on 2016/3/17.
 */
import $ from 'jquery'
import React from 'react';
import {render,ReactDOM} from 'react-dom';
import _ from 'underscore';
import BackboneReactMixin from 'backbone-react-component';
import { Row, Col,DatePicker,Checkbox,Form,Modal,Button,Table} from 'antd';
import {Search} from './operationItem';
import {columns} from '../data/taskDetailsInfo';
import {taskModel,taskList} from '../models/taskData'
import {withDrawModel,withDrawList} from '../models/withDrawData'
import {completedtaskModel,completedtaskList} from '../models/CompletedTaskData'
import {ListShow} from './contentItem'
import {carInfoList,carInfoModel} from '../models/plateInfo'
import {driverColumns} from '../data/driverDetailsInfo'
//回车登记的表单组件
const WithDrawForm =React.createClass({
    render(){
        return(
            <Form onSubmit={this.handleSubmit} className = ''>
                <ul>
                    <li className="withdraw-form">
                        <Row type="flex" className="">
                            <Col span="12">
                                <span className="withdraw-label">回车时间</span>
                                <span>：</span>
                                <DatePicker className="" />
                            </Col>
                            <Col span="12">
                                <span className="withdraw-label">本次任务行程</span>
                                <span>：</span>
                                <input type="text"/>
                            </Col>
                        </Row>
                        <Row type="flex" className="">
                            <Col span="12">
                                <span className="withdraw-label">停车费</span>
                                <span>：</span>
                                <input type="text"/>
                            </Col>
                            <Col span="12">
                                <span className="withdraw-label">过路费</span>
                                <span>：</span>
                                <input type="text"/>
                            </Col>
                        </Row>
                        <Row type="flex" className="">
                            <Col span="12">
                                <span className="withdraw-label">回车停放位置</span>
                                <span>：</span>
                                <input type="text"/>
                            </Col>
                            <Col span="12">
                                <span className="withdraw-label">回车备注</span>
                                <span>：</span>
                                <input type="text"/>
                            </Col>
                        </Row>
                    </li>
                </ul>
            </Form>
        )
    }
});
const Task = React.createClass({
    mixins: [BackboneReactMixin],
    getInitialState(){
        return {
            isEdit: false,
            isCanWithdraw:false,
            isWithdrawShow:false,
        }
    },
    handleMouseEnter(event){
        $(event.target).parents('.task-card').find(".task-hover").show();
    },
    handleMouseLeave(event){
        $(event.target).parents('.task-card').find(".task-hover").hide();
    },
    handleClick(event){
        let taskCard = $(event.target).parents('.task-card');
        $(taskCard).find(".click-down").hide();
        $(taskCard).find(".hide-data").show();
    },
    handleEditClick(event){
        this.setState({
            isEdit: true
        })
    },
    handleRegisterClick(event){
        this.setState({
            isCanWithdraw: true
        })
        $(".withdraw-hide").show();
    },
    handleClose(event){
        $(".withdraw-hide").hide();
    },
    handleSubmit(){
        PubSub.publish('isSaveWithdraw',false);
        $(".hide-btn2").hide();
    },
    handleCloseReturn(e){
        e.preventDefault();
        PubSub.publish('isWithdrawShow',false);
        $(".hide-btn2").hide();
    },
    render(){
        let taskInfo = this.state.model;
        var type = taskInfo.Type;
        var carType = taskInfo.carType;
        taskInfo = _.toArray(taskInfo);
        let getItemArray = function (starNum, endNum) {
            return taskInfo.slice(starNum, endNum);
        };
        let itemShow = function (starNum, endNum) {
            let ItemShow;
            let itemArray = getItemArray(starNum, endNum);
            ItemShow = itemArray.map(function (item, index) {
                //console.log(item);
                return (
                    <Col span="8" order="4" key={index}>
                        <label>{item.aliasName}：</label>
                        <span>{item.value}</span>
                    </Col>
                )
            });
            return ItemShow
        };
        let CanWithdraw = function(){
            if(this.state.isCanWithdraw==true)
            {
                return(
                    <div className="withdraw-hide">
                        <WithDrawForm />
                        <ul className = "">
                            <li className = "withdraw-checkbox">
                                <label className = "">
                                    <Checkbox/>
                                    这是被临时取消的任务
                                </label>
                            </li>
                            <li className = "withdraw-btn">
                                <button className = "save-btn">保存</button>
                                <button className = "close-btn" onClick={this.handleClose}>关闭</button>
                            </li>
                        </ul>
                    </div>
                )
            }
        }.bind(this);
        let enterRegistration = function(){
            if(carType=="0"){
                return(
                    <div className="inline-block">
                        <span onClick={this.handleRegisterClick}>回车登记</span>
                    </div>
                )
            }
            else{
                return(
                    <div className="inline-block">
                        <span onClick={this.handleClick}>回车登记</span>
                    </div>
                )
            }
        }.bind(this);
        let isShowTypeBtn = function(){
            if(type=="2"){
                return(
                    <ul className = "hide-btn2">
                        <li className = "withdraw-checkbox">
                            <label className = "">
                                <Checkbox/>
                                这是被临时取消的任务
                            </label>
                        </li>
                        <li className = "withdraw-btn">
                            <button className = "save-btn" onClick={this.handleSubmit}>保存</button>
                            <button className = "close-btn" onClick={this.handleCloseReturn}>关闭</button>
                        </li>
                    </ul>
                )
            }
        }.bind(this);
        let carTypeTask = function () {
            if (carType == "0") {
                return (
                    <div>
                        <Row type="flex" className="task-data">
                            {itemShow(1, 4)}
                        </Row>
                        <Row type="flex" className="task-data">
                            {itemShow(4, 7)}
                        </Row>

                        <div className="hide-data">
                            <Row type="flex" className="task-data">
                                {itemShow(7, 10)}
                            </Row>
                            <Row type="flex" className="task-data">
                                {itemShow(10, 13)}
                            </Row>
                            <Row type="flex" className="task-data">
                                {itemShow(13, 15)}
                            </Row>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <Row type="flex" className="task-data">
                            {itemShow(1, 4)}
                        </Row>
                        <Row type="flex" className="task-data">
                            {itemShow(4, 7)}
                        </Row>

                        <div className="hide-data">
                            <Row type="flex" className="task-data">
                                {itemShow(7, 10)}
                            </Row>
                            <Row type="flex" className="task-data">
                                {itemShow(10, 13)}
                            </Row>
                            <Row type="flex" className="task-data">
                                {itemShow(13, 15)}
                            </Row>
                            <ul className="arranged-task">
                                <ShowTaskDetailsListMap model = {withDrawModel} collection={withDrawList} text={type}/>
                            </ul>
                            {isShowTypeBtn()}
                        </div>
                    </div>
                )
            }
        }.bind(this);
            let isEdit = function () {
                if (this.state.isEdit) {
                    return (
                        <EditDistribution model={this.getModel()} />
                    )
                } else if(this.state.isCanWithdraw){
                    return(
                        <div>
                            {carTypeTask()}
                            {CanWithdraw()}
                        </div>
                    )
                }else {
                    if (type == "0") {
                        return (
                            <div>
                                <Row type="flex" className="task-data">
                                    {itemShow(1, 4)}
                                </Row>
                                <Row type="flex" className="task-data">
                                    {itemShow(4, 7)}
                                </Row>

                                <div className="hide-data">
                                    <Row type="flex" className="task-data">
                                        {itemShow(7, 10)}
                                    </Row>
                                </div>
                            </div>
                        )
                    }
                    else if (type == "1") {
                        return(
                            <div>
                                {carTypeTask()}
                            </div>
                        )
                    }
                    else {
                        return(
                            <div>
                                {carTypeTask()}
                            </div>
                        )
                    }
                }
            }.bind(this);
            var taskType = function () {
                if (type === "0") {
                    return (
                        <div>
                            <div className="task-number_card red">
                                <label>编号：</label>
                                <span>1</span>
                            <span className="edit-icon icon-red">
                                <span className="edit-inner-icon" onMouseEnter={this.handleMouseEnter}></span>
                            </span>
                            </div>
                            {isEdit()}
                            <ul className="task-hover icon-red" onMouseLeave={this.handleMouseLeave}>
                                <li className="task-hover-li-red">
                                    <span className="edit-inner-icon"></span>
                                    <span onClick={this.handleEditClick}>编辑派发</span>
                                </li>
                                <li>
                                    <span className="edit-inner-icon"></span>
                                    <span>取消任务</span>
                                </li>
                            </ul>
                        </div>
                    )
                } else if (type === "1") {
                    return (
                        <div>
                            <div className="task-number_card blue">
                                <label>编号：</label>
                                <span>1</span>
                            <span className="edit-icon icon-blue">
                                <span className="edit-inner-icon" onMouseEnter={this.handleMouseEnter}></span>
                            </span>
                            </div>
                            {isEdit()}
                            <ul className="task-hover icon-orange" onMouseLeave={this.handleMouseLeave}>
                                <li className="task-hover-li-blue">
                                    <span className="edit-inner-icon"></span>
                                    <span onClick={this.handleEditClick}>编辑派发</span>
                                </li>
                                <li>
                                    <span className="edit-inner-icon"></span>
                                    <span>取消任务</span>
                                </li>
                            </ul>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <div className="task-number_card orange">
                                <label>编号：</label>
                                <span>1</span>
                            <span className="edit-icon icon-orange">
                                <span className="edit-inner-icon" onMouseEnter={this.handleMouseEnter}></span>
                            </span>
                            </div>
                            {isEdit()}
                            <ul className="task-hover icon-blue" onMouseLeave={this.handleMouseLeave}>
                                <li className="task-hover-li-orange">
                                    <span className="edit-inner-icon"></span>
                                    {enterRegistration()}
                                </li>
                            </ul>
                        </div>
                    )
                }
            }.bind(this);
            return (
                <div className="task-card">
                    {taskType()}
                    <span className="click-down" onClick={this.handleClick}></span>
                </div>
            )
        }
    });
//显示多人多车任务的车牌号与司机对应组件
const ShowTaskDetailsList = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return {
            isEdit: false,
            isOther:true,
            returnDetail:'',
            returnDetailBtn:''
        }
    },
    componentWillUnMount(){
        PubSub.unsubscribe(this.saveWith_token);
    },
    handleClick(event){
        event.preventDefault();
        this.setState({
            isEdit:true
        });
        this.props.parentCallback(this.state.model.id);
        $(".hide-btn2").show();

        PubSub.subscribe('isWithdrawShow',function(topic,isWithdrawShow){
            this.setState({
                isEdit:isWithdrawShow
            });
            this.props.parentCallback('');
            $(".return-detail-btn").text('编辑回车');
        }.bind(this));
        this.saveWith_token =PubSub.subscribe('isSaveWithdraw',function(topic,isSaveWithdraw){
            if(this.state.isEdit){
                this.setState({
                    isEdit:isSaveWithdraw,
                    returnDetail:'return-detail',
                    returnDetailBtn:'return-detail-btn',
                })
                this.props.parentCallback('');
                $(".return-detail-btn").text('编辑回车');
            }
        }.bind(this))
    },
    componentWillReceiveProps(nextProps){
      this.setState({
          isOther:nextProps.isOther
      })
    },
    render(){
        let isCanClickButton = function(){
            if(type=="1"){
                return(
                    <div>
                        <button className="withDraw">回车</button>
                    </div>
                )
            }
            else if(type=="2"){
                return(
                    <div>
                        <button className={this.state.returnDetailBtn+" withDraw withDraw-car"} onClick={this.handleClick}>回车</button>
                    </div>
                )
            }
        }.bind(this);
        var type=this.props.text;
        let withDrawInfo = this.state.model;
        withDrawInfo = _.toArray(withDrawInfo);
        let getwithDrawArray = function (starNum, endNum) {
            return withDrawInfo.slice(starNum, endNum);
        };
        let withDrawitemShow = function (starNum, endNum) {
            let ItemShow;
            let itemArray = getwithDrawArray(starNum, endNum);
            ItemShow = itemArray.map(function (item, index) {
                //console.log(item);
                return (
                    <div className="withdraw-adjustment" key={index}>
                        <label>{item.aliasName}：</label>
                        <span>{item.value}</span>
                    </div>
                )
            });
            return ItemShow
        };
        let clickReturn = '';
            if(this.state.isEdit){
                clickReturn =(
                        <WithDrawForm />
                )
            }else{
                clickReturn = (
                    <li className = {"dotted "+this.state.returnDetail}>
                        {withDrawitemShow(1,2)}
                        <Row type="flex" className="task-data task-adjustment1">
                            <Col span="8" order="4">
                                {withDrawitemShow(2,3)}
                            </Col>
                            <Col span="8" order="4">
                                {withDrawitemShow(3,4)}
                            </Col>
                        </Row>
                        <Row type="flex" className="task-data task-adjustment2">
                            <Col span="8" order="4">
                                {withDrawitemShow(4,5)}
                            </Col>
                            <Col span="8" order="4">
                                {withDrawitemShow(5,6)}
                            </Col>
                        </Row>
                        {isCanClickButton()}
                    </li>
                )
            }
        if(this.props.isOther || this.props.isMy){
            return (
                <div>{clickReturn}</div>
            )
        }else{
            return(
                <div>
                    <Row type="flex" className="task-data task-adjustment">
                        <Col span="6">
                            {withDrawitemShow(2,3)}
                        </Col>
                        <Col span="6">
                            {withDrawitemShow(3,4)}
                        </Col>
                        <Col span="6">
                            {withDrawitemShow(4,5)}
                        </Col>
                        <Col span="6">
                            {withDrawitemShow(5,6)}
                        </Col>
                    </Row>
                </div>
            )
        }
    }
});
//多人多车车与人对应组件显示
const ShowTaskDetailsListMap = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            clickId :'',
            isOther:true,
            isSaveId:''
        }
    },
    childrenClickReturn(id){
        if(id || id =="0"){
            this.setState({
                clickId:id,
                isOther:false
            });
        }else{
            this.setState({
                clickId:id,
                isOther:true
            });
        }
    },
    changeChildrenSave(id){
        //PubSub.subscribe('isSaveWithdraw',function(topic,isSaveWithdraw){
        //    this.setState({
        //        isSaveId:id
        //    })
        //}.bind(this))
        alert(id);
        this.setState({
            isSaveId:id
        })
    },
    render(){
        let taskList = this.state.collection;
        let taskShow = taskList.map(function(item,index){
            if(item.id === this.state.clickId){
                return (
                    <ShowTaskDetailsList key={index} model={this.getCollection().get(item.id)}
                                         parentCallback = {this.childrenClickReturn}
                                         parentCallbackSave={this.changeChildrenSave}
                                         className='return-details'
                                         text ={this.props.text} isMy = {true}/>
                )
            }else{
                return (
                    <ShowTaskDetailsList key={index} model={this.getCollection().get(item.id)}
                                         parentCallback = {this.childrenClickReturn}
                                         parentCallbackSave={this.changeChildrenSave}
                                         text ={this.props.text} isOther = {this.state.isOther}/>
                )
            }

        }.bind(this));
        return(
            <div>
                {taskShow}
            </div>
        )
    }
});
//任务管理列表
const TaskArrangement = React.createClass({
    mixins:[BackboneReactMixin],
   render(){
       let taskList = this.state.collection;
       let taskShow = taskList.map(function(item,index){
           return (
               <Task key={index} model={this.getCollection().get(item.id)}/>
           )
       }.bind(this));
       return(
           <div>
               {taskShow}
           </div>
       )
   }
});
//任务管理内容主容器
const TaskContent = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            showWay:'card',
        }
    },
    componentWillMount(){
        let listHeadTemp = [];
        let model = this.getModel();
        let listHeadKeys = model.keys();
        model.values().map(function(list,index){
            if(list.aliasName){
                listHeadTemp.push({
                    aliasName:list.aliasName,
                    key:listHeadKeys[index]
                })
            }
        });
        this.setState({
            listHeader:listHeadTemp,
            listHeaderCopy:listHeadTemp
        })
    },
    componentDidMount(){
        this.showHistory_token = PubSub.subscribe('show-history',function(topic,showWay){
            this.setState({
                showWay:showWay
            })
        }.bind(this));
    },
    componentWillUnmount(){
        PubSub.unsubscribe(this.showHistory_token);
    },
    render(){
        var pageShow = this.props.pageShow;
        var handleShowWay=function(){
            var self = this;
            if(this.state.showWay=='card'){
                return(
                    <div className="main-task">
                        <Row className="row">
                            <Col span="18">
                                <div className="main-task-content">
                                    <TaskArrangement collection={taskList} model={taskModel}/>
                                </div>
                            </Col>
                            <Col span="6" className="main-task-right">
                                <CompletedArrangement collection={completedtaskList} model={completedtaskModel}/>
                            </Col>
                        </Row>
                    </div>
                )
            }else{
                return(
                    <ListShow collection={this.getCollection()} pageShow = {pageShow} model = {this.getModel()}/>
                )
            }
        }.bind(this);
        return (
            <div id="content" className="content task-content">
                {handleShowWay()}
            </div>
        )
    }
});
//最近已完成任务列表
const CompletedArrangement = React.createClass({
    mixins:[BackboneReactMixin],
    render(){
        let completedtaskList = this.state.collection;
        let completedtaskShow = completedtaskList.map(function(item,index){
            return (
                <CompletedList key={index} model={this.getCollection().get(item.id)}/>
            )
        }.bind(this));
        return(
            <div className="completed-task-content">
                <div className="completed-task-header title-grey">最近已完成任务</div>
                {completedtaskShow}
                <div className="completed-task-footer title-grey">
                    <span>最近24小时内完成的任务数量：</span>
                    <span>99999999条</span>
                </div>
            </div>
        )
    }
});
//最近已完成任务列表多车任务迭代组件
const CompletedCarsTaskMap = React.createClass({
    mixins:[BackboneReactMixin],
    render(){
        let completedcarstaskList = this.state.collection;
        let completedcarstaskShow = completedcarstaskList.map(function(item,index){
            return (
                <CompletedCarsTask key={index} model={this.getCollection().get(item.id)}/>
            )
        }.bind(this));
        return(
            <div className="">
                {completedcarstaskShow}
            </div>
        )
    }
});
//最近已完成任务列表多车任务组件
const CompletedCarsTask = React.createClass({
    mixins:[BackboneReactMixin],
    render(){
        let completedcarstaskInfo = this.state.model;
        completedcarstaskInfo= _.toArray(completedcarstaskInfo);
        let getCompletedCarsItemArray= function(starNum,endNum){
            return completedcarstaskInfo.slice(starNum,endNum);
        };
        let completedcarsitemShow = function (starNum,endNum){
            let CompletedCarsItemShow;
            let completedcarsitemArray = getCompletedCarsItemArray(starNum,endNum);
            CompletedCarsItemShow =completedcarsitemArray.map(function(item,index){
                return(
                    <span className="task-data1"  key={index}>{item.value}</span>
                )
            });
            return  CompletedCarsItemShow
        };
        return(
            <div className="completed-cars-task">
                <Row className="completed-task-list-row">
                    <Col span="8" className="completed-task-list-col">
                        <span className="icon-list-default icon"></span>
                        <span>:</span>
                        {completedcarsitemShow(1,2)}
                    </Col>
                    <Col span="8" className="completed-task-list-col">
                        <span className="icon-card icon"></span>
                        <span>:</span>
                        {completedcarsitemShow(2,3)}
                    </Col>
                    <Col span="8" className="completed-task-list-col">
                        <span className="icon-driver icon"></span>
                        <span>:</span>
                        {completedcarsitemShow(3,4)}
                    </Col>
                </Row>
            </div>
        )
    }
});

const CompletedList = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return {
            isOpen:false
        }
    } ,
    handleMouseEnter(event){
        $(event.target).parents('.completed-task-list').find(".hide-triangle").show();
    },
    handleClick(event){
        if(this.state.isOpen==true)
        {
            this.setState(
                {
                    isOpen:false
                }
            );
            $(event.target).parents('.completed-task-list').find(".task-details").hide();
        }else{
            this.setState(
                {
                    isOpen:true
                }
            );
            $(event.target).parents('.completed-task-list').find(".task-details").show();
        }
    },
    render(){
        let type = this.state.model.Type;
        let completedtaskInfo = this.state.model;
        completedtaskInfo= _.toArray(completedtaskInfo);
        let getCompletedItemArray= function(starNum,endNum){
            return completedtaskInfo.slice(starNum,endNum);
        };
        let completeditemShow = function (starNum,endNum){
            let CompletedItemShow;
            let completeditemArray = getCompletedItemArray(starNum,endNum);
            CompletedItemShow =completeditemArray.map(function(item,index){
                return(
                    <span className="task-data1"  key={index}>{item.value}</span>
                )
            });
            return  CompletedItemShow
        };
        let completedCarsTaskType = function(){
            if(type==="1")
            {
                return(
                    <CompletedCarsTaskMap model = {withDrawModel} collection={withDrawList}/>
                )
            }
        }.bind(this);
        let completedTaskType = function(){
            //console.log(type);
            if(type==="0")
            {
                return(
                    <div className="task-types task-types-singal">
                        <span>单</span>
                    </div>
                )
            }
            else{
                return(
                    <div className="task-types">
                        <span>多</span>
                    </div>
                )
            }
        }.bind(this);
        return(
            <div className="completed-task-list" onMouseEnter={this.handleMouseEnter}>
                {completedTaskType()}
                <span className="task-data1 task-number">11112234343</span>
                <Row className="completed-task-list-row list-row">
                    <Col span="12" className="completed-task-list-col">
                        <span className="icon-out icon"></span>
                        <span>:</span>
                        {completeditemShow(2,3)}
                    </Col>
                    <Col span="12" className="completed-task-list-col">
                        <span className="icon-back icon"></span>
                        <span>:</span>
                        {completeditemShow(3,4)}
                    </Col>
                </Row>
                <Row className="completed-task-list-row list-row">
                    <Col span="12" className="completed-task-list-col">
                        <span className="icon-card icon"></span>
                        <span>:</span>
                        {completeditemShow(4,5)}
                    </Col>
                    <Col span="12" className="completed-task-list-col">
                        <span className="icon-car icon"></span>
                        <span>:</span>
                       {completeditemShow(5,6)}
                    </Col>
                </Row>
                <div className="triangle-up hide-triangle" onClick={this.handleClick}></div>
                <div className="task-details">
                    <Row className="completed-task-list-row list-row">
                        <Col span="12" className="completed-task-list-col">
                            <span className="icon-out icon"></span>
                            <span>:</span>
                            {completeditemShow(7,8)}
                        </Col>
                        <Col span="12" className="completed-task-list-col">
                            <span className="icon-driver icon"></span>
                            <span>:</span>
                            {completeditemShow(6,7)}
                        </Col>
                    </Row>
                    <Row className="completed-task-list-row list-row">
                        <Col span="24" className="completed-task-list-col">
                            <span className="icon-destination icon"></span>
                            <span>:</span>
                            {completeditemShow(8,9)}
                        </Col>
                    </Row>
                    {completedCarsTaskType()}
                </div>
            </div>
        )
    }
});
//空闲车辆组件
const Idle = React.createClass({
    render(){
        return(
            <ul className="list-inline">
                <li className = "task-color idle">5</li>
                <li className = "type-text"><h5>空闲</h5></li>
            </ul>
        )
    }
});
//出车组件
const Outing= React.createClass({
    render(){
        return(
            <ul className="list-inline">
                <li className = "task-color outing">3</li>
                <li className = "type-text"><h5>出车</h5></li>
            </ul>
        )
    }
});
//添加车牌号和司机的任务组件
const Addtaskdetails=React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
      return{
          isDelete:false
      }
    },
    handleClick(event){
        this.setState({
            isDelete:true
        })
    },
    render(){
        let addTaskItem ='';
        if(!this.state.isDelete){
                addTaskItem =(
                    <li className="add-task-d-li">
                        <Row className="add-task-row">
                            <Col span="8" className="">
                                <label>车牌号</label>
                                <span className="icon">:</span>
                                <span>{this.props.item.carNumber}</span>
                            </Col>
                            <Col span="8" className="adjustment">
                                <label>司机</label>
                                <span className="icon">:</span>
                                <span>{this.props.item.driver}</span>
                            </Col>
                            <Col span="8" className="">
                                <label>出车时间</label>
                                <span className="icon">:</span>
                                <span>{this.props.item.position}</span>
                            </Col>
                        </Row>
                        <span className="delete-btn" onClick={this.handleClick}>删除</span>
                    </li>
                )
        }else{
            <div></div>
        }
        return(
            <div>
                {addTaskItem}
            </div>
        )
    }
});
//详细列表展示组件
const ShowTaskDetails=React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState() {
        return {
            status:''
        };
    },
    handleClick(event){
        if(this.state.status=="1")
        {
            $("#car-number").val("");
        }else{
            $("#driver").val("");
        }
        $(".addtask-modal").hide();
    },
    handleOk(event){
        $(".addtask-modal").hide();
    },
    componentDidMount(){
        PubSub.subscribe('plus-icon',function(topic,data){
            if(data==1){
                this.setState({
                    status:"1"
                })
            }else {
                this.setState({
                    status:"2"
                })
            }
        }.bind(this))
    },
    render(){
        return(
            <div className="task-details-list">
                <div className="task-details-list-h">
                    <Idle />
                    <Outing />
                    <div className = "task-right-item">
                        <ul className = "list-inline">
                            <Search />
                            <span className = "search-text">搜索</span>
                        </ul>
                    </div>
                </div>
                <div className="task-details-list-c">
                    <TaskDetailsListShow model = {carInfoModel} collection={carInfoList}/>
                </div>
                <div className="task-details-list-f">
                    <button className="btn ok-btn" onClick={this.handleOk}>确认添加</button>
                    <button className="btn cancel-btn" onClick={this.handleClick}>取消</button>
                </div>
            </div>
        )
    }
});
//任务详细信息的列表显示组件
const TaskDetailsListShow = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState() {
        return {
            selectedRowKeys: [],  // 这里配置默认勾选列
            loading: false,
            plateData:[],
            status:''
        };
    },
    start() {
        this.setState({ loading: true });
        // 模拟 ajax 请求，完成后清空
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false
            });
        }, 1000);
    },
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
        //console.log('selectedRowKeys changed: ', selectedData);
    },
    handlePlateRowClick(record, index){
        PubSub.publish('add-details-plate',record);
        $(".ant-table-body").find("tr").removeClass("active");
        $(".ant-table-body").find("tr").eq(index).addClass("active");
        $(".triangle").remove();
        $(".ant-table-body").find("tr").eq(index).find("td").eq(0).html("<i class='triangle'></i>");
    },
    handleDriverRowClick(record, index){
        PubSub.publish('add-details-driver',record);
        $(".ant-table-body").find("tr").removeClass("active");
        $(".ant-table-body").find("tr").eq(index).addClass("active");
        $(".triangle").remove();
        $(".ant-table-body").find("tr").eq(index).find("td").eq(0).html("<i class='triangle'></i>");
    },
    handleCollectionForArray(collection){
        let dataArray = [];
        if(this.state.status==1){
            collection.map(function(item,index){
                let mydata = {
                    key:item.id,
                    id:item.id,
                    motorcade:item.motorcade.value,
                    carType:item.carType.value,
                    code:item.code.value,
                    numberPlate:item.numberPlate.value,
                    vehicleTonnage:item.vehicleTonnage.value,
                    rechargeMileage:item.rechargeMileage.value
                };
                dataArray.push(mydata);
            });
        }else {
            collection.map(function(item,index){
                let mydata = {
                    key:item.id,
                    id:item.id,
                    motorcade:item.motorcade.value,
                    name:item.name.value,
                    licenseType:item.licenseType.value,
                    personnelStatus:item.personnelStatus.value,
                    marker:item.marker.value,
                    address:item.address.value
                };
                dataArray.push(mydata);
            });
        }
        return dataArray;
    },
    componentDidMount(){
        PubSub.subscribe('plus-icon',function(topic,data){
            if(data==1){
                this.setState({
                    plateData:columns,
                    status:"1"
                })
            }else {
                this.setState({
                    plateData:driverColumns,
                    status:"2"
                })
            }
        }.bind(this))
    },
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        let collectionArray = this.handleCollectionForArray(this.state.collection);
        let column = this.state.plateData;
        let addTable = function(){
            let collectionArrayData = collectionArray;
            if(this.state.status=="1"){
                return(
                        <Table columns={column}
                               dataSource={collectionArrayData}
                               pagination={false}
                               useFixedHeader
                               onRowClick={this.handlePlateRowClick}
                               />
                    )
            }else{
                return(
                        <Table columns={column}
                               dataSource={collectionArrayData}
                               pagination={false}
                               useFixedHeader
                               onRowClick={this.handleDriverRowClick}
                              />
                    )
            }
        }.bind(this);
        return (
            <div>
                {addTable()}
            </div>
        );
    }
});
//编辑派发组件
let EditDistribution = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            carInfoList:[],
        }
    },
    handleSubmit(e) {
        e.preventDefault();
        //console.log('收到表单值：', this.props.form.getFieldsValue());
        //let formValue = this.props.form.getFieldsValue().id='12233';
        //this.getCollection().push(this.props.form.getFieldsValue());
        //console.log('保存表单值'+this.state.collection);
        //this.props.callbackParentOfAdd(true);
    },
    handleCancel(){
        //this.props.callbackParentOfAdd(false);
    },
    componentDidMount(){
    if(this.state.model.Type==1){
        let carInfo = [
            {
                carNumber:'dfdfd',
                driver:'dfd',
                position:'yuyu'
            }, {
                carNumber:'abc',
                driver:'def',
                position:'ghi'
            }
        ];
        let carInfoTemp = this.state.carInfoList;
        for(var i in carInfo)
        {
            carInfoTemp.push(carInfo[i]);
        }
        this.setState({
            carInfoList:carInfoTemp
        });
    }
      PubSub.subscribe('add-details-plate',function(topic,data){
          $('#car-number').val(data.numberPlate);
      }.bind(this))
        PubSub.subscribe('add-details-driver',function(topic,data){
            $('#driver').val(data.name);
        }.bind(this))
    },
    handlePlateClick(event){
        $(".addtask-modal").show();
        PubSub.publish('plus-icon',1);
    },
    handleDriverClick(event){
        $(".addtask-modal").show();
        PubSub.publish('plus-icon',2);
    },
    handleAddtaskDetails(event){
        let carInfoTemp = this.state.carInfoList;
        let carNumber = $('#car-number').val();
        let driver = $('#driver').val();
        let position = $("#position").val();
        let carInfo = {
            carNumber:carNumber,
            driver:driver,
            position:position
        };
        carInfoTemp.push(carInfo);
        this.setState({
            carInfoList:carInfoTemp
        });
    },
    handleCloseEditWindow(event){
        PubSub.publish('close-edit-window',true);
    },
    render(){
        const { getFieldProps } = this.props.form;
        let  carInfoItems = this.state.carInfoList.map(function(item,index){
            return( <Addtaskdetails item = {item}  key = {index} model ={this.getModel()} />)
        }.bind(this));
        return(
             <Form onSubmit={this.handleSubmit} className = ''>
                 <div className = 'task-edit-page'>
                     <Row className="task-edit-row">
                         <Col span="12" className="">
                             <label>用车人</label>
                             <span className="colon">:</span>
                             <input type="text"/>
                         </Col>
                         <Col span="12" className="task-edit-col">
                             <label>用车时间</label>
                             <span className="colon">:</span>
                             <DatePicker />
                         </Col>
                     </Row>
                     <Row className="task-edit-row">
                         <Col span="12" className="">
                             <label>估计用时</label>
                             <span className="colon">:</span>
                             <input type="text"/>
                         </Col>
                         <Col span="12" className="task-edit-col">
                             <label>出车原因</label>
                             <span className="colon">:</span>
                             <input type="text"/>
                         </Col>
                     </Row>
                     <Row className="task-edit-row">
                         <Col span="12" className="">
                             <label>申请车型</label>
                             <span className="colon">:</span>
                             <input type="text"/>
                         </Col>
                         <Col span="12" className="task-edit-col">
                             <label>目的地</label>
                             <span className="colon">:</span>
                             <input type="text"/>
                         </Col>
                     </Row>
                     <Row className="task-edit-row">
                         <Col span="12" className="">
                             <label>随车人数</label>
                             <span className="colon">:</span>
                             <input type="text"/>
                         </Col>
                         <Col span="12" className="task-edit-col">
                             <label className="back-time-label">预计回车时间</label>
                             <span className="colon">:</span>
                             <DatePicker />
                         </Col>
                     </Row>
                     <Row className="task-edit-row">
                         <Col span="24" className="">
                             <label>出车里程</label>
                             <span className="colon">:</span>
                             <input type="text"/>
                         </Col>
                     </Row>
                     <Row className="task-edit-row">
                         <Col span="24" className="">
                             <label>用车备注</label>
                             <span className="colon">:</span>
                             <input className="vehicles-marker" type="text"/>
                         </Col>
                     </Row>
                 </div>
                 <div className="edit-car-task">
                     <Row className="edit-car-task-input">
                         <Col span="8" className="">
                             <label>车牌号：</label>
                             <div className="div-inline">
                                 <input className="" type="text" id = "car-number"/>
                                 <span className="plus-icon" onClick={this.handlePlateClick}></span>
                             </div>
                         </Col>
                         <Col span="8" className="adjustment">
                             <label>司机：</label>
                             <div className="div-inline">
                                 <input className="" type="text" id = "driver"/>
                                 <span className="plus-icon" onClick={this.handleDriverClick}></span>
                             </div>
                         </Col>
                         <Col span="8" className="adjustment">
                             <label>取车位置：</label>
                             <input className="" type="text" id = "position"/>
                         </Col>
                     </Row>
                     <button onClick={this.handleAddtaskDetails}>添加</button>
                     <ul className="add-task-details">{carInfoItems}</ul>
                     <label className="only-current-task" >
                         <Checkbox defaultChecked={false}/>
                         仅限这次任务
                     </label>
                 </div>
                 <ul className="periodic-task">
                     <li className="periodic-task-btn">
                         <label className="Perio-task">
                             <Checkbox defaultChecked={false}/>
                             周期任务：
                         </label>
                         <button className="btn1">修改周期</button>
                         <button className="btn2">结束周期任务</button>
                     </li>
                     <li className="periodic-task-details">
                         <ul className="startDate">
                             <li className="startDate-endDate">
                                 <ul>
                                     <li className="startDate-endDate-left">
                                         <label htmlFor="">起始日期：</label>
                                         <DatePicker  placeholder="" {...getFieldProps('JoinData')} />
                                     </li>
                                     <li className="startDate-endDate-right">
                                         <label className="endDate" htmlFor="">结束日期(选填)：</label>
                                         <DatePicker  placeholder="" {...getFieldProps('JoinData')} />
                                     </li>
                                 </ul>
                             </li>
                             <li>
                                 <label htmlFor="">起始日期：</label>
                                 <label>
                                     <Checkbox defaultChecked={false}/>
                                     日
                                 </label>
                                 <label>
                                     <Checkbox defaultChecked={false}/>
                                     一
                                 </label>
                                 <label>
                                     <Checkbox defaultChecked={false}/>
                                     二
                                 </label>
                                 <label>
                                     <Checkbox defaultChecked={false}/>
                                     三
                                 </label>
                                 <label>
                                     <Checkbox defaultChecked={false}/>
                                     四
                                 </label>
                                 <label>
                                     <Checkbox defaultChecked={false}/>
                                     五
                                 </label>
                                 <label>
                                     <Checkbox defaultChecked={false}/>
                                     六
                                 </label>
                             </li>
                         </ul>
                     </li>
                     <li className="edit-btn">
                         <button className="save-send-btn">保存并继续派发</button>
                         <button className="save-btn">保存</button>
                         <button className="close-btn" onClick={this.handleCloseEditWindow}>关闭</button>
                     </li>
                 </ul>
                 <div className="addtask-modal">
                     <ShowTaskDetails model = {carInfoModel} collection={carInfoList}/>
                 </div>
             </Form>
        )
    }
});
EditDistribution = Form.create()(EditDistribution);
export{TaskContent}

