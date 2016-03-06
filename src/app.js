import React from 'react';
import {render} from 'react-dom';
import  'antd/lib/index.css';
import {Router,Route,IndexRoute,Link,IndexLink,browserHistory} from 'react-router';
import {Grid,Row,Col} from 'react-bootstrap';
import {TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord,NavMenu} from './components/navItem';
import {Header} from './components/headerItem';
import {OperationItem} from './components/operationItem';
import {Content} from './components/contentItem';
import {navArray} from "./data/navigation";
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
           pageShow:pageShow
        })
    },
    render(){
        let {content} = this.props;
        return(
            <div className="global-layout">
                <Grid fluid ={true}>
                    <Row className="show-grid">
                        <Col xs={1} md={1} lg={1} className="left-layout">
                            <div>
                                <NavMenu navArray={ navArray } pageShow={this.state.pageShow}
                                         callbackParent={this.handleChildChange}
                                    />
                                {this.props.children}
                            </div>
                         </Col>
                        <Col xs={11} md={11} lg={11} className="right-layout">
                            <div className = "header-fixed">
                                <Header pageShow={this.state.pageShow}
                                        callbackParent={this.handleChildChange}
                                    />
                                <OperationItem className = "operationItem"
                                    pageShow={this.state.pageShow}
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
            <Route path="/taskManage" components={App}/>
            <Route path="/staffInfo" components={{content:StaffInfo}}/>
            <Route path="/vehicleRecord" components={{content:VehicleRecord}}/>
            <Route path="/maintenance" components={{content:Maintenance}}/>
            <Route path="/leaveRecord" components={{content:LeaveRecord}}/>
        </Route>
    </Router>
), document.getElementById('page-content'));