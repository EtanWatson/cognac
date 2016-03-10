import React from 'react';
import {render} from 'react-dom';
import  'antd/lib/index.css';
import {Router,Route,IndexRoute,Link,IndexLink,browserHistory} from 'react-router';
import {Grid,Row,Col} from 'react-bootstrap';
import {TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord,NavMenu} from './components/navItem';
import {Header} from './components/headerItem';
import {OperationItem} from './components/operationItem';
import {Content} from './components/contentItem';
import {Setting,StaffSetting,VehicleSetting,DriverSetting} from './components/setting';
const App = React.createClass({
    getInitialState(){
        return{
            pageShow:'staff'
        }
    },
    componentDidMount(){
      PubSub.subscribe('print-show',function(topic,printData){
          $('#page-content').addClass('is-display');
      }.bind(this));
      PubSub.subscribe('print-hide',function(topic){
          $('#page-content').removeClass('is-display');
      })
    },
    handleChildChange(pageShow){
        this.setState({

        })
    },
    render(){
        let {content,page} = this.props;
        return(
            <div className="global-layout">
                <Grid fluid ={true}>
                    <Row className="show-grid">
                        <Col xs={1} md={1} lg={1} className="left-layout">
                            <div>
                                <NavMenu  pageShow={page?page.type:'task'}
                                         callbackParent={this.handleChildChange}
                                    />
                                {this.props.children}
                            </div>
                         </Col>
                        <Col xs={11} md={11} lg={11} className="right-layout">
                            <div className = "header-fixed">
                                <Header pageShow={page?page.type:'task'}
                                        callbackParent={this.handleChildChange}
                                    />
                                <OperationItem className = "operationItem"
                                    pageShow={page?page.type:'task'}
                                    />
                            </div>
                            <div className = "content-relative">
                                {content || <TaskManage />}
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
            <IndexRoute  component={App}/>
            <Route path="staffInfo" components={{content:StaffInfo,page:'staff'}}/>
            <Route path="vehicleRecord" components={{content:VehicleRecord,page:'vehicle'}}/>
            <Route path="maintenance" components={{content:Maintenance,page:'maintenance'}}/>
            <Route path="leaveRecord" components={{content:LeaveRecord,page:'leaveRecord'}}/>
            <Route path="setting" components={{content:Setting,page:'setting'}}>
                <IndexRoute  component ={DriverSetting}/>
                <Route path = 'staffSetting' component = {StaffSetting}/>
                <Route path = 'vehicleSetting' component ={VehicleSetting}/>
            </Route>
        </Route>
    </Router>
), document.getElementById('page-content'));