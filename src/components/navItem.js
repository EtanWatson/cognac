/**
 * 导航区组件
 */
import React from 'react';
import {render} from 'react-dom';
import BackboneReactMixin from 'backbone-react-component';
//任务管理
const TaskManage = React.createClass({
    render(){
        return <div>TaskManage</div>
    }
});
//职员信息
const StaffInfo = React.createClass({
    render(){
        console.log("StaffInfo is called");
        return <div>StaffInfo</div>
    }
});
//车辆档案
const VehicleRecord = React.createClass({
    render(){
        console.log("VehicleRecord is called");
        return <div>VehicleRecord</div>
    }
});
//维修保养
const Maintenance = React.createClass({
    render(){
        console.log("Maintenance is called");
        return <div>VehicleRecord</div>
    }
});
//病事假记录
const LeaveRecord = React.createClass({
    render(){
        return <div>VehicleRecord</div>
    }
});
export{TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord}
