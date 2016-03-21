//
import $ from 'jquery'
import React from 'react';
import {render} from 'react-dom';
import {browserHistory,Link} from 'react-router'
import  backboneReact  from 'backbone-react-component';
import {Checkbox,Button,Collapse,Row,Col,Icon} from 'antd';
import {cardList,cardsDriver,cardsStaff,cardVehicle} from '../models/cardKey';
const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;
const Setting = React.createClass({
    handleDefaultChecked(index){
        let selectArray =this.state.selectArrayIndex;
        for(let i = 0 ; i < selectArray.length;i++){
            if(index ==  this.state.selectArrayIndex[i]){
                return true;
            }
        }
    },
    handelAtOfIndex(array){
        let arrayTemp = [];
        for(let i = 0; i < array.length ; i++){
            arrayTemp.push(this.state.cardKey[array[i]])
        }
        return arrayTemp;
    },
    handleCheck(e){
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
        let selectArray =this.state.selectArrayIndex;
        if(selectArray.length < 5){
            if(e.target.checked){
                selectArray.push(e.target.value);
                var selectedArrayTemp = this.handelAtOfIndex(selectArray);
                this.setState({
                    selectArrayIndex:selectArray,
                    selectedArray:selectedArrayTemp
                })
            }else{
                selectArray.remove(e.target.value);
                var selectedArrayTemp =this.handelAtOfIndex(selectArray);
                this.setState({
                    selectArrayIndex:selectArray,
                    selectedArray:selectedArrayTemp
                })
            }
        }else{
            if(e.target.checked){
                this.setState({
                    selectArrayIndex:selectArray
                })
            }else{
                selectArray.remove(e.target.value);
                var selectedArrayTemp = this.handelAtOfIndex(selectArray);
                this.setState({
                    selectArrayIndex:selectArray,
                    selectedArray:selectedArrayTemp
                })
            }
        }
    },
   render(){
       //let{settingContent} = this.props.settingContent;
       return(
           <div className = 'setting-content'>
                   {this.props.children}
           </div>
       )
   }
});
const SettingCard = React.createClass({
   getInitialState(){
       return{
           selectedArray:this.props.selectedArray
       }
   },
   componentWillReceiveProps(nexProps){
       this.setState({
               selectedArray: nexProps.selectedArray
           }
       )
   },
   render(){
       let selectedArray = this.state.selectedArray;
       var staffType = function(){
           var type = this.props.type;
           if(type==="0"){
               return(
                   <div className = "footer-img">
                       <img src = "/img/card_title_driver.png" />
                       <div className = "type-text">司机</div>
                       <div className = "type-icon">
                           <img src="/img/icon_driver.png" />
                       </div>
                   </div>
               )
           }else if(type==="1"){
               return(
                   <div className = "footer-img">
                       <img src = "/img/card_title_manage.png" />
                       <div className = "type-text">管理员</div>
                       <div className = "type-icon">
                           <img src="/img/icon_driver.png" />
                       </div>
                   </div>
               )
           }else{
               return(
                   <div className = "footer-img">
                       <img src = "/img/card_title_others.png" />
                       <div className = "type-text">其他</div>
                       <div className = "type-icon">
                           <img src="/img/icon_driver.png" />
                       </div>
                   </div>
               )
           }
       }.bind(this);
       var cardContent = selectedArray.map((attribute,index)=>{
           return(
                   <ul className = "list-inline"  key={index}>
                       <li><h5>{attribute.value+'：'}</h5></li>
                       <li><h5>-</h5></li>
                   </ul>
           )
       });
       return(
           <div>
               <div style={{height:'210px'}}>
                   <ul className = "list-inline">
                       <li className = "header-img">
                           <img src = "/img/icon_user_head_50_50_have_5.png"/>
                       </li>
                       <li className = "header-left">
                           <h3 className = "name">预览名字</h3>
                           <ul className = "list-inline">
                               <li className = "circle circle-g">
                                   <img src="/img/icon_trip_normal.png" />
                               </li>
                               <li className = "circle-r is-display">
                                   <img src="/img/icon_trip_leave.png" />
                               </li>
                               <li className = "status"><h5>空闲</h5></li>
                           </ul>
                       </li>
                   </ul>
               {cardContent}
               </div>
              {staffType()}
           </div>
       )
   }
});
//司机卡片显示设置
const DriverSetting = React.createClass({
    getInitialState(){
        return{
            selectArrayIndex:[1,4,7,8,11],
            selectedArray:[
                {
                    name:'Code',
                    value:'编码'
                },
                {
                    name:'phoneNumber',
                    value:'手机'
                },
                {
                    name:'remark',
                    value:'备注'
                },
                {
                    name:'driverLicense',
                    value:'驾驶证号'
                },
                {
                    name:'licenseType',
                    value:'准驾车型'
                }
            ]
        }
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentWillMount(){
        backboneReact.on(this,{
            collections:{
                cardKey:new cardList(cardsDriver)
            }
        });
    } ,
    componentWillUnmount(){
        backboneReact.off(this);
    },
    handleDefaultChecked(index){
        let selectArray =this.state.selectArrayIndex;
        for(let i = 0 ; i < selectArray.length;i++){
            if(index ==  this.state.selectArrayIndex[i]){
                return true;
            }
        }
    },
    handelAtOfIndex(array){
        let arrayTemp = [];
        for(let i = 0; i < array.length ; i++){
            arrayTemp.push(this.state.cardKey[array[i]])
        }
        return arrayTemp;
    },
    handleCheck(e){
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
        let selectArray =this.state.selectArrayIndex;
        if(selectArray.length < 5){
            if(e.target.checked){
                selectArray.push(e.target.value);
                var selectedArrayTemp = this.handelAtOfIndex(selectArray);
                this.setState({
                    selectArrayIndex:selectArray,
                    selectedArray:selectedArrayTemp
                })
            }else{
                selectArray.remove(e.target.value);
                var selectedArrayTemp =this.handelAtOfIndex(selectArray);
                this.setState({
                    selectArrayIndex:selectArray,
                    selectedArray:selectedArrayTemp
                })
            }
        }else{
            if(e.target.checked){
                this.setState({
                    selectArrayIndex:selectArray
                })
            }else{
                selectArray.remove(e.target.value);
                var selectedArrayTemp = this.handelAtOfIndex(selectArray);
                this.setState({
                    selectArrayIndex:selectArray,
                    selectedArray:selectedArrayTemp
                })
            }
        }
    },
    render(){
        let generateSelectList= function(){
            let cardSelectItem = this.state.cardKey.map((item,index)=>{
                return(
                    <div className = "item-space" key={index}>
                        <lebal >
                            <Checkbox value={index} checked={this.handleDefaultChecked(index)} onChange={this.handleCheck}/>
                            {item.value}
                        </lebal>
                    </div>
                )
            });
            return cardSelectItem;
        }.bind(this);


        return(
            <div className = "setting-layout">
                <Row type="flex" className = 'setting-container' justify="end">
                    <Col span = '14' className='inner-container'>
                        <Col span = '8' className = "left-select">
                            <p>不可选择项：</p>
                            <p className = "item-space">可选择项（最多五项）:</p>
                        </Col>
                        <Col span = '16'>
                            <ul className = "list-inline">
                                <li>姓名</li>
                                <li>状态</li>
                                <li>职务</li>
                            </ul>
                            {generateSelectList()}
                        </Col>
                    </Col>
                    <Col span = '10' className = "inner-container">
                        <p>效果预览：</p>
                        <div className = "right-view">
                            <SettingCard selectedArray = {this.state.selectedArray} type={"0"}/>
                        </div>
                    </Col>
                </Row>
                <Row type = 'flex' justify = "center" className = "setting-footer">
                    <Col span = "12" className = 'btn-left'>
                        <Button type="primary" size="large">保存</Button>
                    </Col>
                    <Col span = "12" className = 'btn-right'>
                        <Link to="/">
                            <Button type="primary" size="large" >返回</Button>
                        </Link>
                    </Col>
                </Row>
            </div>
        )
    }
});
//职员卡片显示设置
const StaffSetting = React.createClass({
    getInitialState(){
       return{
           selectArrayIndex:[1,4,7],
           selectedArray:[
               {
                   name:'Code',
                   value:'编码'
               },
               {
                   name:'phoneNumber',
                   value:'手机'
               },
               {
                   name:'remark',
                   value:'备注'
               }
           ]
       }
    },
    componentWillMount(){
        backboneReact.on(this,{
            collections:{
                cardKey:new cardList(cardsStaff)
            }
        });
    } ,
    componentWillUnmount(){
        backboneReact.off(this);
    },
    handleDefaultChecked(index){
        let selectArray =this.state.selectArrayIndex;
        for(let i = 0 ; i < selectArray.length;i++){
            if(index ==  this.state.selectArrayIndex[i]){
                return true;
            }
        }
    },
    handelAtOfIndex(array){
        let arrayTemp = [];
        for(let i = 0; i < array.length ; i++){
            arrayTemp.push(this.state.cardKey[array[i]])
        }
        return arrayTemp;
    },
    handleCheck(e){
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
        let selectArray =this.state.selectArrayIndex;
        if(selectArray.length < 5){
            if(e.target.checked){
                selectArray.push(e.target.value);
                var selectedArrayTemp = this.handelAtOfIndex(selectArray);
                this.setState({
                    selectArrayIndex:selectArray,
                    selectedArray:selectedArrayTemp
                })
            }else{
                selectArray.remove(e.target.value);
                var selectedArrayTemp =this.handelAtOfIndex(selectArray);
                this.setState({
                    selectArrayIndex:selectArray,
                    selectedArray:selectedArrayTemp
                })
            }
        }else{
            if(e.target.checked){
                this.setState({
                    selectArrayIndex:selectArray
                })
            }else{
                selectArray.remove(e.target.value);
                var selectedArrayTemp = this.handelAtOfIndex(selectArray);
                this.setState({
                    selectArrayIndex:selectArray,
                    selectedArray:selectedArrayTemp
                })
            }
        }
    },
    render(){
        let generateSelectList= function(){
            let cardSelectItem = this.state.cardKey.map((item,index)=>{
                return(
                    <div className = "item-space" key={index}>
                        <lebal >
                            <Checkbox value={index} checked={this.handleDefaultChecked(index)} onChange={this.handleCheck}/>
                            {item.value}
                        </lebal>
                    </div>
                )
            });
            return cardSelectItem;
        }.bind(this);
        return(
            <div className = "setting-layout">
                <Row type="flex" className = 'setting-container' justify="end">
                    <Col span = '14' className='inner-container'>
                        <Col span = '8' className = "left-select">
                            <p>不可选择项：</p>
                            <p className = "item-space">可选择项（最多五项）:</p>
                        </Col>
                        <Col span = '16'>
                            <ul className = "list-inline">
                                <li>姓名</li>
                                <li>状态</li>
                                <li>职务</li>
                            </ul>
                            {generateSelectList()}
                        </Col>
                    </Col>
                    <Col span = '10' className = "inner-container">
                        <p>效果预览：</p>
                        <div className = "right-view">
                            <SettingCard selectedArray = {this.state.selectedArray} type={"1"}/>
                        </div>
                    </Col>
                </Row>
                <Row type = 'flex' justify = "center" className = "setting-footer">
                        <Col span = "12" className = 'btn-left'>
                            <Button type="primary" size="large">保存</Button>
                        </Col>
                        <Col span = "12" className = 'btn-right'>
                                <Button type="primary" size="large"  onClick={() => browserHistory.replace('/')}>返回</Button>
                        </Col>
                </Row>
            </div>
        )
    }
});
//车辆卡片显示设置
const VehicleSetting = React.createClass({
    getInitialState(){
        return{
            selectArrayIndex:[0,1,4,7,9],
            selectedArray:[
                {
                    name:'vehicleCode',
                    value:'车辆编码'
                },
                {
                    name:'vehicleNumber',
                    value:'车牌号'
                },
                {
                    name:'vehicleType',
                    value:'车辆类型'
                },
                {
                    name:'vehicleLoad',
                    value:'载重（吨）'
                },
                {
                    name:'seatNumber',
                    value:'座位数'
                }
            ]
        }
    },
    componentWillMount(){
        backboneReact.on(this,{
            collections:{
                cardKey:new cardList(cardVehicle)
            }
        });
    } ,
    componentWillUnmount(){
        backboneReact.off(this);
    },
    handleDefaultChecked(index){
        let selectArray =this.state.selectArrayIndex;
        for(let i = 0 ; i < selectArray.length;i++){
            if(index ==  this.state.selectArrayIndex[i]){
                return true;
            }
        }
    },
    handelAtOfIndex(array){
        let arrayTemp = [];
        for(let i = 0; i < array.length ; i++){
            arrayTemp.push(this.state.cardKey[array[i]])
        }
        return arrayTemp;
    },
    handleCheck(e){
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
        let selectArray =this.state.selectArrayIndex;
        if(selectArray.length < 5){
            if(e.target.checked){
                selectArray.push(e.target.value);
                var selectedArrayTemp = this.handelAtOfIndex(selectArray);
                this.setState({
                    selectArrayIndex:selectArray,
                    selectedArray:selectedArrayTemp
                })
            }else{
                selectArray.remove(e.target.value);
                var selectedArrayTemp =this.handelAtOfIndex(selectArray);
                this.setState({
                    selectArrayIndex:selectArray,
                    selectedArray:selectedArrayTemp
                })
            }
        }else{
            if(e.target.checked){
                this.setState({
                    selectArrayIndex:selectArray
                })
            }else{
                selectArray.remove(e.target.value);
                var selectedArrayTemp = this.handelAtOfIndex(selectArray);
                this.setState({
                    selectArrayIndex:selectArray,
                    selectedArray:selectedArrayTemp
                })
            }
        }
    },
    render(){
        let leftItem = '';
        let rightItem = '';
        let cardSelectItemRight = this.state.cardKey.map((item,index)=>{
            if(index < 14){
                return(
                    <div className =" item-space"  key={index}>
                        <lebal>
                            <Checkbox value={index} checked={this.handleDefaultChecked(index)} onChange={this.handleCheck}/>
                            {item.value}
                        </lebal>
                    </div>
                );
            }
        });
        let cardSelectItemLeft = this.state.cardKey.map((item,index)=>{
            if(index >= 14){
                return(
                    <div className =" item-space"  key={index}>
                        <lebal>
                            <Checkbox value={index} checked={this.handleDefaultChecked(index)} onChange={this.handleCheck}/>
                            {item.value}
                        </lebal>
                    </div>
                );
            }
        });
        return(
            <div className = "setting-layout">
                <Row type="flex" className = 'setting-container' justify="center">
                    <Col span = '14' className='inner-container'>
                        <Col span = '8' className = "left-select">
                            <p>不可选择项：</p>
                            <p className = "item-space">可选择项（最多五项）:</p>
                        </Col>
                        <Col span = '16'>
                            <ul className = "list-inline">
                                <li>姓名</li>
                                <li>状态</li>
                                <li>职务</li>
                            </ul>
                            <Row>
                                <Col span= '12' className = "right-item">
                                    {cardSelectItemRight}
                                </Col>
                                <Col span='12' className = "left-item">
                                    {cardSelectItemLeft}
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                    <Col span = '10' className = "inner-container">
                        <p>效果预览：</p>
                        <div className = "right-view">
                            <SettingCard selectedArray = {this.state.selectedArray} type={"0"}/>
                        </div>
                    </Col>
                </Row>
                <Row type = 'flex' justify = "center" className = "setting-footer">
                    <Col span = "12" className = 'btn-left'>
                        <Button type="primary" size="large">保存</Button>
                    </Col>
                    <Col span = "12" className = 'btn-right'>
                        <Button type="primary" size="large"  onClick={() => browserHistory.replace('/')}>返回</Button>
                    </Col>
                </Row>
            </div>
        )
    }
});
//任务管理卡片显示设置
const TaskSetting = React.createClass({
    getInitialState(){
        return{
            singleCarCheckList:[],
            multiCarCheckList:[],
            distributingList:[]
        }
    },
    taskCard(type){
        let headerData = [];
        let notChooseOption = [];
      // 正在进行 已安排
      if(type == 0){
          headerData = [
              [{aliasName:'车辆总数',value:'3'},{aliasName:'已回车',value:'1'},{aliasName:"出车时间",value:'2015-12-12'}],
              [{aliasName:'车辆总数',value:'3'},{aliasName:'已回车',value:'1'},{aliasName:"出车时间",value:'2015-12-12'}]
          ];
          notChooseOption =['不可选择项：','出车时间：','司机：','车牌号：','编码：']
      }else if(type == 1){
          headerData = [
              [{aliasName:'车辆总数',value:'3'},{aliasName:'已回车',value:'1'},{aliasName:"出车时间",value:'2015-12-12'}],
              [{aliasName:'车辆总数',value:'3'},{aliasName:'已回车',value:'1'},{aliasName:"出车时间",value:'2015-12-12'}]
          ];
          notChooseOption =['不可选择项：','出车时间：','司机：','车牌号：','编码：']
      }else{
          headerData = [
              [{aliasName:'车辆总数',value:'3'},{aliasName:'已回车',value:'1'},{aliasName:"出车时间",value:'2015-12-12'}],
              [{aliasName:'车辆总数',value:'3'},{aliasName:'已回车',value:'1'},{aliasName:"出车时间",value:'2015-12-12'}]
          ];
          notChooseOption =['不可选择项：','出车时间：','司机：','车牌号：','编码：']
      }
       let header =headerData.map(function(itemArray,index){
            return(
                <Row key = {index}>
                    {itemArray.map(function(item,index){
                        return(
                            <Col span = '8' key={index}>
                                <lebal>{item.aliasName}</lebal><span>{item.value}</span>
                            </Col>
                        )
                    })}
                </Row>
            )
        });
        let notChooseElement = notChooseOption.map(function(item,index){
            return(
                <li key={index}>{item}</li>
            )
        })
        return(
            <div>
                <ul className = "list-inline">
                    {notChooseElement}
                </ul>
                <div className = "setting-task-card">
                    <div>
                        <span>编码：1</span>
                        <img src = "/img/edit_task.png" />
                    </div>
                    <Collapse >
                        <Panel header={header}>
                            <p>hello</p>
                            <Icon type="caret-left" />
                        </Panel>
                    </Collapse>
                </div>
            </div>
        )
    },
    render(){
        return(
            <div className = 'setting-layout task-setting'>
                <Row className = "task-setting-content">
                    <Col span='6'>
                        niha
                    </Col>
                    <Col span="18">
                        {this.taskCard(0)}
                        {this.taskCard(1)}
                        {this.taskCard(2)}
                    </Col>
                </Row>
            </div>
        )
    }
});
export{Setting,StaffSetting,VehicleSetting,DriverSetting,TaskSetting};