import React from 'react';
import {render} from 'react-dom';
import {Router,Route,IndexRoute,Link,IndexLink,browserHistory} from 'react-router';
import {Grid,Row,Col} from 'react-bootstrap';
import {TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord,NavMenu} from './components/navItem';
import {Header} from './components/headerItem';
import {OperationItem} from './components/operationItem';
import {Content} from './components/contentItem';
import {navArray} from "./data/navigation";
const App = React.createClass({
    render(){
        return(
            <div className="global-layout">
                <Grid fluid = "true">
                    <Row className="show-grid">
                        <Col xs={1} md={1} lg={1} className="left-layout">
                            <div>
                                <NavMenu navArray={ navArray } />
                                {this.props.children}
                            </div>
                         </Col>
                        <Col xs={11} md={11} lg={11} className="right-layout">
                            <div className = "header-fixed">
                                <Header />
                                <OperationItem className = "operationItem"/>
                            </div>
                            <div className = "content-relative">
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