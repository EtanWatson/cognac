/**
 * 导航区组件
 */
import React from 'react';
import {render} from 'react-dom';
import BackboneReactMixin from 'backbone-react-component';
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
        console.log("StaffInfo is called");
        return (
            <div>
                <div>StaffInfo</div>
                {this.props.children}
            </div>
        )
    }
});
//车辆档案
const VehicleRecord = React.createClass({
    render(){
        console.log("VehicleRecord is called");
        return (
            <div>
                <div>VehicleRecord</div>
                {this.props.children}
            </div>
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
export{TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord}
