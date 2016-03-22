/**
 * Created by zhaiyujia on 2016/3/17.
 */
import $ from 'jquery'
import React from 'react';
import {render} from 'react-dom';
import _ from 'underscore';
import BackboneReactMixin from 'backbone-react-component';
import { Row, Col,DatePicker,Checkbox,Form,Modal} from 'antd';

const Task = React.createClass({
    getInitialState(){
        return{
            isEdit:false
        }
    },
    mixins:[BackboneReactMixin],
    handleMouseEnter(event){
        $(event.target).parents('.task-card').find(".task-hover").show();
        //$(".task-hover").show();
    },
    handleMouseLeave(event){
        $(event.target).parents('.task-card').find(".task-hover").hide();
        //$(".task-hover").hide();
    },
    handleClick(event){
        let taskCard = $(event.target).parents('.task-card');
        $(taskCard).find(".click-down").hide();
        $(taskCard).find(".hide-data").show();
        //$(".click-down").hide();
        //$(".hide-data").show();
    },
    handleEditClick(event){
        this.setState({
            isEdit:!this.state.isEdit
        })
    },
    render(){
        let taskInfo = this.state.model;
        taskInfo= _.toArray(taskInfo);
        let getItemArray= function(starNum,endNum){
            return taskInfo.slice(starNum,endNum);
        };
        let itemShow = function (starNum,endNum){
            let ItemShow;
            let itemArray = getItemArray(starNum,endNum);
            ItemShow =itemArray.map(function(item,index){
                return(
                    <Col span="8" order="4" key={index}>
                        <label>{item.aliasName}：</label>
                        <span>{item.value}</span>
                    </Col>
                )
            });
            return ItemShow
        };
        let isEdit = function(){
            if(this.state.isEdit){
                $(event.target).parents('.task-card').find(".click-down").hide();
                return(
                    <EditDistribution />
                )
            }else{
                return(
                    <div>
                        <Row type="flex" className="task-data">
                            {itemShow(1,4)}
                        </Row>
                        <Row type="flex" className="task-data">
                            {itemShow(4,7)}
                        </Row>
                        <div className="hide-data">
                            <Row type="flex" className="task-data">
                                {itemShow(7,11)}
                            </Row>
                            <Row type="flex" className="task-data">
                                {itemShow(11,15)}
                            </Row>
                            <Row type="flex" className="task-data">
                                {itemShow(15,16)}
                            </Row>
                            <Row type="flex" className="task-data">
                                {itemShow(16,17)}
                            </Row>
                        </div>
                    </div>
                )
            }
        }.bind(this);
        return(
                <div className="task-card">
                    <div className="task-number">
                        <label>编号：</label>
                        <span>1</span>
                            <span className="edit-icon">
                                <span className="edit-inner-icon" onMouseEnter={this.handleMouseEnter}></span>
                            </span>
                    </div>
                    {isEdit()}
                    <ul className="task-hover" onMouseLeave={this.handleMouseLeave}>
                        <li className="task-hover-li">
                            <span className="edit-inner-icon"></span>
                            <span onClick={this.handleEditClick}>编辑派发</span>
                        </li>
                        <li>
                            <span className="edit-inner-icon"></span>
                            <span>取消任务</span>
                        </li>
                    </ul>
                    <span className="click-down" onClick={this.handleClick}></span>
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
                    <Col span="12" className="completed-task-list-col"  key={index}>
                        <span className="icon-out icon"></span>
                        <span>:</span>
                        <span className="task-data1">{item.value}</span>
                    </Col>
                )
            });
            return  CompletedItemShow
        };
        return(
            <div className="completed-task-list" onMouseEnter={this.handleMouseEnter}>
                <div className="task-types">
                    <span>单</span>
                </div>
                <span className="task-data1 task-number">11112234343</span>
                <Row className="completed-task-list-row list-row">
                    {completeditemShow(2,4)}
                </Row>
                <Row className="completed-task-list-row list-row">
                    <Col span="12" className="completed-task-list-col">
                        <span className="icon-card icon"></span>
                        <span>:</span>
                        <span className="task-data1">京A2345</span>
                    </Col>
                    <Col span="12" className="completed-task-list-col">
                        <span className="icon-car icon"></span>
                        <span>:</span>
                        <span className="task-data1">張三丰</span>
                    </Col>
                </Row>
                <div className="triangle-up hide-triangle" onClick={this.handleClick}></div>
                <div className="task-details">
                    <Row className="completed-task-list-row">
                        <Col span="8" className="completed-task-list-col">
                            <span className="icon-out icon"></span>
                            <span>:</span>
                            <span className="task-data1">02-18 08:30</span>
                        </Col>
                        <Col span="8" className="completed-task-list-col">
                            <span className="icon-back icon"></span>
                            <span>:</span>
                            <span className="task-data1">02-18 08:30</span>
                        </Col>
                        <Col span="8" className="completed-task-list-col">
                            <span className="icon-back icon"></span>
                            <span>:</span>
                            <span className="task-data1">02-18 08:30</span>
                        </Col>
                    </Row>
                    <Row className="completed-task-list-row">
                        <Col span="8" className="completed-task-list-col">
                            <span className="icon-out icon"></span>
                            <span>:</span>
                            <span className="task-data1">02-18 08:30</span>
                        </Col>
                        <Col span="8" className="completed-task-list-col">
                            <span className="icon-back icon"></span>
                            <span>:</span>
                            <span className="task-data1">02-18 08:30</span>
                        </Col>
                        <Col span="8" className="completed-task-list-col">
                            <span className="icon-back icon"></span>
                            <span>:</span>
                            <span className="task-data1">02-18 08:30</span>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
});
const ShowTaskDetails=React.createClass({
    render(){
        return(
            <div>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
            </div>

        )
    }
});
//编辑派发组件
let EditDistribution = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return {
            isCarNumClick:false,
            isAddDriverClick:false,
            visible : false,
        }
    } ,
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        let formValue = this.props.form.getFieldsValue().id='12233';
        this.getCollection().push(this.props.form.getFieldsValue());
        //console.log('保存表单值'+this.state.collection);
        this.props.callbackParentOfAdd(true);
    },
    handleCancel(){
        this.props.callbackParentOfAdd(false);
    },
    handleUpload(){

    },
    createEntry: function (entry) {
    },
    handleClickCarNum(event){
        if(!this.state.isCarNumClick){
            this.setState({
                isCarNumClick:true
            });
        }
    },
    handleClickAddDriver(event){

    },
    showModal(){
        this.setState({
            visible:true
        });
    },
    render(){
        const { getFieldProps } = this.props.form;
        let isAddTaskDetails = function(){
            if(this.state.isCarNumClick)
            {
                return(
                    <Modal  visible={this.state.visible} className = "">
                        <ShowTaskDetails />
                    </Modal >
                )
            }
        }.bind(this);
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
                                 <Row className="">
                                     <Col span="8" className="">
                                         <label>车牌号：</label>
                                         <div className="div-inline">
                                             <input className="" type="text"/>
                                             <span className="plus-icon" onClick={this.handleClickCarNum}></span>
                                         </div>

                                     </Col>
                                     <Col span="8" className="adjustment">
                                         <label>司机：</label>
                                         <div className="div-inline">
                                             <input className="" type="text"/>
                                             <span className="plus-icon" onClick={this.handleClickAddDriver}></span>
                                         </div>
                                     </Col>
                                     <Col span="8" className="adjustment">
                                         <label>取车位置：</label>
                                         <input className="" type="text"/>
                                     </Col>
                                     <button>添加</button>
                                 </Row>
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
                                         <li>
                                             <label for="">起始日期：</label>
                                             <DatePicker  placeholder="" {...getFieldProps('JoinData')} />
                                             <label className="endDate" for="">结束日期(选填)：</label>
                                             <DatePicker  placeholder="" {...getFieldProps('JoinData')} />
                                         </li>
                                         <li>
                                             <label for="">起始日期：</label>
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
                                 <li className="btn">
                                     <button className="save-send-btn">保存并继续派发</button>
                                     <button className="save-btn">保存</button>
                                     <button className="close-btn">关闭</button>
                                 </li>
                             </ul>
                         </Form>
        )
    }
});
EditDistribution = Form.create()(EditDistribution);
export{TaskArrangement,CompletedArrangement}
