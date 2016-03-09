//
import $ from 'jquery'
import React from 'react';
import {render} from 'react-dom';
import {Row,Col} from 'antd';

const driverData =[
    {
        key:1,
        itemName:'name',
        aliasName:'姓名'
    },
    {
        key:2,
        itemName:'status'
    },
];

const Setting = React.createClass({
   render(){

       return(
           <div className = 'setting-content'>
                <div className = 'setting-item'>
                    <Row>
                        <Col span='12'>
                            <Row>
                                <Col span='12'>
                                    <p className = "">不可选择项</p>
                                </Col>
                                <Col span='12'>

                                </Col>
                            </Row>
                            <Row>
                                <Col span='12'>
                                    <p className = "">可选择项（最多五项）</p>
                                </Col>
                                <Col span='12'>

                                </Col>
                            </Row>
                        </Col>
                        <Col span='12' ></Col>
                    </Row>
                </div>
                {this.props.children}
           </div>

       )
   }
});
const StaffSetting = React.createClass({
   render(){
       return(
           <div>职员信息设置
               {this.props.children}
           </div>
       )
   }
});
const VehicleSetting = React.createClass({
   render(){
       alert('test');
       return(
           <div>车辆信息设置
               {this.props.children}
           </div>
       )
   }
});
export{Setting,StaffSetting,VehicleSetting}