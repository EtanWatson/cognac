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
import {columns,data} from '../data/taskDetailsInfo';
const Task = React.createClass({
    mixins: [BackboneReactMixin],
    getInitialState(){
        return {
            isEdit: false
        }
    },
    componentDidMount(){

    },
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
            isEdit: !this.state.isEdit
        })
    },
    render(){
        let taskInfo = this.state.model;
        var type = taskInfo.Type;
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
        let isEdit = function () {
            if (this.state.isEdit) {
                $(".click-down").hide();
                return (
                    <EditDistribution />
                )
            } else {
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
                                {itemShow(7, 11)}
                            </Row>
                            <Row type="flex" className="task-data">
                                {itemShow(11, 15)}
                            </Row>
                            <Row type="flex" className="task-data">
                                {itemShow(15, 16)}
                            </Row>
                            <Row type="flex" className="task-data">
                                {itemShow(16, 17)}
                            </Row>
                        </div>
                    </div>
                )
            }
        }.bind(this);
        var taskType = function(){
            //console.log(type);
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
                                <span>回车登记</span>
                            </li>
                            <li>
                                <span className="edit-inner-icon"></span>
                                <span onClick={this.handleEditClick}>编辑派发</span>
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
                    <Col span="12" className="completed-task-list-col"  key={index}>
                        <span className="icon-out icon"></span>
                        <span>:</span>
                        <span className="task-data1">{item.value}</span>
                    </Col>
                )
            });
            return  CompletedItemShow
        };
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
    handleClick(event){

    },
    render(){
        //console.log(this.props.item);
        return(
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
                <a href="###" onClick={this.handleClick}>删除</a>
            </li>
        )
    }
});
//详细列表展示组件
const ShowTaskDetails=React.createClass({
    handleClick(event){
        $(".addtask-modal").hide();
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
                    <TaskDetailsListShow />
                </div>
                <div className="task-details-list-f">
                    <button className="btn ok-btn">确认添加</button>
                    <button className="btn cancel-btn" onClick={this.handleClick}>取消</button>
                </div>
            </div>
        )

    }
});
//任务详细信息的列表显示组件
const TaskDetailsListShow = React.createClass({
    getInitialState() {
        return {
            selectedRowKeys: [],  // 这里配置默认勾选列
            loading: false,
        };
    },
    start() {
        this.setState({ loading: true });
        // 模拟 ajax 请求，完成后清空
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    },
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    },
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <Table rowSelection={rowSelection}
                       columns={columns}
                       dataSource={data}
                       pagination={false}
                       useFixedHeader
                       bordered/>
            </div>
        );
    }
});
//编辑派发组件
let EditDistribution = React.createClass({
    //mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            carInfoList:[]
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
    handleUpload(){

    },
    handleClick(event){
        $(".addtask-modal").show();
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
    render(){
        const { getFieldProps } = this.props.form;
        let  carInfoItems = this.state.carInfoList.map(function(item,index){
            return( <Addtaskdetails item = {item}  key = {index} />)
        });
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
                                             <span className="plus-icon" onClick={this.handleClick}></span>
                                         </div>
                                     </Col>
                                     <Col span="8" className="adjustment">
                                         <label>司机：</label>
                                         <div className="div-inline">
                                             <input className="" type="text" id = "driver"/>
                                             <span className="plus-icon"></span>
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
                                         <li>
                                             <label htmlFor="">起始日期：</label>
                                             <DatePicker  placeholder="" {...getFieldProps('JoinData')} />
                                             <label className="endDate" htmlFor="">结束日期(选填)：</label>
                                             <DatePicker  placeholder="" {...getFieldProps('JoinData')} />
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
                                 <li className="btn">
                                     <button className="save-send-btn">保存并继续派发</button>
                                     <button className="save-btn">保存</button>
                                     <button className="close-btn">关闭</button>
                                 </li>
                             </ul>
                             <div className="addtask-modal">
                                 <ShowTaskDetails />
                             </div>
                         </Form>

        )
    }
});
EditDistribution = Form.create()(EditDistribution);
export{TaskArrangement,CompletedArrangement}
