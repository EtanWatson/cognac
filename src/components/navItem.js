/**
 * 导航区组件
 */
import React from 'react';
import {render} from 'react-dom';
import {Router,Route,IndexRoute,Link,IndexLink,browserHistory} from 'react-router';
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
const NavMenu = React.createClass({
    render(){
        return(
            <div className="nav-item-layout">
                <div className="logo">
                    <img src="/img/icon/icon_logo.png" />
                </div>
                <div>
                    <div className="title">车队管理系统</div>
                    <div className="link-box">
                        <IndexLink to="/" className="">
                            <div className="link-icon">
                                <div className="staff-icon icon"></div>
                                <div className="text">职员信息</div>
                            </div>
                        </IndexLink>
                    </div>
                    <div className="link-box">
                        <Link to="/vehicleRecord" className="link-style">
                            <div className="link-icon">
                                <div className="vechicle-icon icon"></div>
                                <div className="text">车辆档案</div>
                            </div>
                        </Link>
                    </div>
                    <div className="link-box">
                        <Link to="/taskManage" className="link-style">
                            <div className="link-icon">
                                <div className="task-icon icon"></div>
                                <div className="text">任务管理</div>
                            </div>
                        </Link>
                    </div>
                    <div className="link-box">
                        <Link to="/maintenance" className="link-style">
                            <div className="link-icon">
                                <div className="maintenance-icon icon"></div>
                                <div className="text">维修保养</div>
                            </div>
                        </Link>
                    </div>
                    <div className="link-box">
                        <Link to="/leaveRecord" className="link-style">
                           <div className="link-icon">
                            <div className="leave-record-icon icon"></div>
                            <div className="text">事假记录</div>
                           </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
});
//render((
//    <Router history={browserHistory}>
//        <Route path="/taskManage" component={TaskManage}/>
//        <Route path="/vehicleRecord" component={VehicleRecord}/>
//        <Route path="/maintenance" component={Maintenance}/>
//        <Route path="/leaveRecord" component={LeaveRecord}/>
//    </Router>
//), document.getElementById('content'));
export{TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord,NavMenu}
