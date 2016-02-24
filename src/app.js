import React from 'react';
import {render} from 'react-dom';
import {Router,Route,IndexRoute,Link,IndexLink,browserHistory} from 'react-router';
import {Grid,Row,Col} from 'react-bootstrap';
//import './img/icon/'
import  './css/common';
import './css/header';
import {TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord} from './components/navItem';
import {Header} from './components/headerItem'
import {OperationItem} from './components/operationItem'
import {Content} from './components/contentItem'
const App = React.createClass({
    render(){
        return(
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={4} md={4} lg={4}>
                            <div>
                                <NavMenu />
                                {this.props.children}
                            </div>
                         </Col>
                        <Col xs={8} md={8} lg={8}>
                            <div>
                                <Header />
                            </div>
                            <div>
                                <OperationItem />
                            </div>
                            <div>
                                <Content />
                            </div>
                        </Col>
                     </Row>
                 </Grid>

            </div>
        )
    }
});

const NavMenu = React.createClass({
    render(){
        return(
            <div>
                <div>
                    <img src="" />
                </div>
                <div>
                   <div>车队管理系统</div>
                   <div><IndexLink to="/">职员信息</IndexLink></div>
                   <div><Link to="/vehicleRecord">车辆档案</Link></div>
                   <div><Link to="/taskManage">任务管理</Link></div>
                   <div><Link to="/maintenance">维修保养</Link></div>
                   <div><Link to="/leaveRecord">事假记录</Link></div>
                </div>
            </div>
        )
    }
});
render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={StaffInfo}/>
            <Route path="/taskManage" component={TaskManage}/>
            <Route path="/vehicleRecord" component={VehicleRecord}/>
            <Route path="/maintenance" component={Maintenance}/>
            <Route path="/leaveRecord" component={LeaveRecord}/>
        </Route>
    </Router>
), document.getElementById('content'));