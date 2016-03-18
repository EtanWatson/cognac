/**
 * Created by zhaiyujia on 2016/3/17.
 */
import $ from 'jquery'
import React from 'react';
import {render} from 'react-dom';
import _ from 'underscore';
import BackboneReactMixin from 'backbone-react-component';
import { Row, Col ,Collapse,Icon} from 'antd';
import {taskInfo} from '../data/taskData'
const Panel = Collapse.Panel;

const Task = React.createClass({
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
        return(
            //<div className="main-task-content">
                <div className="task-card">
                    <div className="task-number">
                        <label>编号：</label>
                        <span>1</span>
                            <span className="edit-icon">
                                <span className="edit-inner-icon" onMouseEnter={this.handleMouseEnter}></span>
                            </span>
                    </div>
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
                    <ul className="task-hover" onMouseLeave={this.handleMouseLeave}>
                        <li className="task-hover-li">
                            <span className="edit-inner-icon"></span>
                            <span>编辑派发</span>
                        </li>
                        <li>
                            <span className="edit-inner-icon"></span>
                            <span>取消任务</span>
                        </li>
                    </ul>
                    <span className="click-down" onClick={this.handleClick}></span>
                </div>

            //</div>
        )
    }
});

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
const CompletedArrangement = React.createClass({
    render(){
        return(
            <div className="completed-task-content">
                <div className="completed-task-header title-grey">最近已完成任务</div>
                <CompletedList />
                <div className="completed-task-footer title-grey">
                    <span>最近24小时内完成的任务数量：</span>
                    <span>99999999条</span>
                </div>
            </div>
        )
    }
});
const CompletedList = React.createClass({
    render(){
        return(
            <div className="completed-task-list">
                <div className="task-types">
                    <span>单</span>
                </div>
                <span className="task-data1 task-number">11112234343</span>
                <Row className="completed-task-list-row">
                    <Col span="12" className="completed-task-list-col">
                        <span className="icon-out icon"></span>
                        <span>:</span>
                        <span className="task-data1">02-18 08:30</span>
                    </Col>
                    <Col span="12" className="completed-task-list-col">
                        <span className="icon-back icon"></span>
                        <span>:</span>
                        <span className="task-data1">02-18 08:30</span>
                    </Col>
                </Row>
                <Row className="completed-task-list-row">
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
                <div className="triangle-up hide-triangle"></div>
            </div>
        )
    }
});
export{TaskArrangement,CompletedArrangement}
