import React from 'react';
import {render} from 'react-dom';
import {Router,Route,IndexRoute,Link,IndexLink,browserHistory} from 'react-router';
//import {TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord} from './components/navItem';
const App = React.createClass({
    render(){
        return(
            <div>
                <NavMenu  />
            </div>
        )
    }
});

const NavMenu = React.createClass({
    render(){
        return(
            <div>
                <ul>
                   <li><IndexLink to="/">职员信息</IndexLink></li>
                   <li><Link to="/vehicleRecord">车辆档案</Link></li>
                   <li><Link to="/taskManage">任务管理</Link></li>
                   <li><Link to="/maintenance">维修保养</Link></li>
                   <li><Link to="/leaveRecord">事假记录</Link></li>
                </ul>
            </div>
        )
    }
});
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
render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={StaffInfo}/>
            <Route path="taskManage" component={TaskManage}/>
            <Route path="vehicleRecord" component={VehicleRecord}/>
            <Route path="maintenance" component={Maintenance}/>
            <Route path="leaveRecord" component={LeaveRecord}/>
        </Route>
    </Router>
), document.getElementById('content'));