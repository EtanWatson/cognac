import React from 'react';
import {render} from 'react-dom';
import {Router,Route,IndexRoute,Link,IndexLink,browserHistory} from 'react-router';
import {Grid,Row,Col} from 'react-bootstrap';
//import './img/icon/'
//import  './css/common';
//import './css/header';
import {TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord,NavMenu} from './components/navItem';
import {Header} from './components/headerItem'
import {OperationItem} from './components/operationItem'
import {Content} from './components/contentItem'
const App = React.createClass({
    render(){
        return(
            <div className="global-layout">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={1} md={1} lg={1} className="left-layout">
                            <div>
                                <NavMenu />
                                {this.props.children}
                            </div>
                         </Col>
                        <Col xs={11} md={11} lg={11} className="right-layout">
                            <div>
                                <Header />
                            </div>
                            <div className = "operationItem">
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
render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/taskManage" component={TaskManage}/>
            <Route path="/vehicleRecord" component={VehicleRecord}/>
            <Route path="/maintenance" component={Maintenance}/>
            <Route path="/leaveRecord" component={LeaveRecord}/>
        </Route>
    </Router>
), document.getElementById('page-content'));
