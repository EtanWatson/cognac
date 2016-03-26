import $ from 'jquery'
import React from 'react';
import {render} from 'react-dom';
import {browserHistory,Link} from 'react-router'
import  BackboneReactMixin  from 'backbone-react-component';
import _ from 'underscore'
import {Checkbox,Button,Collapse,Row,Col,Icon} from 'antd';
import {cardList,cardsDriver,cardsStaff,cardVehicle} from '../models/cardKey';
import {taskSettingModel,taskSetting} from '../models/taskSetting';
import {taskModelTest,task} from '../models/taskDataTest';
import {settingCheckMinx} from './mixin/settingCheck'
const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;
const Setting = React.createClass({
    componentDidMount(){
      PubSub.publish('settingMount','')
    },
   render(){
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
    mixins:[settingCheckMinx],
    getInitialState(){
        return{
            selectItemKeys:['code','phoneNumber','remark','driverLicense','licenseType'],
            selectedArray:[]
        }
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentDidMount(){
        console.log('driverSettingMount');
        PubSub.publish('driverSettingMount','');
        let selectArray = this.handelAtOfName(this.state.selectItemKeys);
        this.setState({
            selectedArray:selectArray
        })
    },
    componentWillMount(){
        BackboneReactMixin.on(this,{
            collections:{
                cardKey:new cardList(cardsDriver)
            }
        });
    } ,
    componentWillUnmount(){
        BackboneReactMixin.off(this);
    },
    render(){
        let generateSelectList= function(){
            let cardSelectItem = this.state.cardKey.map((item,index)=>{
                return(
                    <div className = "item-space" key={index}>
                        <lebal >
                            <Checkbox value={item.name} checked={this.handleDefaultChecked(item.name)} onChange={this.handleCheck}/>
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
                            <ul className = "list-inline not-choose-item">
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
    mixins:[settingCheckMinx],
    getInitialState(){
       return{
           selectItemKeys:['code','phoneNumber','remark'],
           selectedArray:[]
       }
    },
    componentDidMount(){
        PubSub.publish('staffSettingMount','')
        let selectArray = this.handelAtOfName(this.state.selectItemKeys);
        this.setState({
            selectedArray:selectArray
        })
    },
    componentWillMount(){
        BackboneReactMixin.on(this,{
            collections:{
                cardKey:new cardList(cardsStaff)
            }
        });
    } ,
    componentWillUnmount(){
        BackboneReactMixin.off(this);
    },
    render(){
        let generateSelectList= function(){
            let cardSelectItem = this.state.cardKey.map((item,index)=>{
                return(
                    <div className = "item-space" key={index}>
                        <lebal >
                            <Checkbox value={item.name} checked={this.handleDefaultChecked(item.name)} onChange={this.handleCheck}/>
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
                            <ul className = "list-inline not-choose-item">
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
    mixins:[settingCheckMinx],
    getInitialState(){
        return{
            selectItemKeys:['vehicleCode','vehicleNumber','vehicleType','vehicleLoad','seatNumber'],
            selectedArray:[]
        }
    },
    componentDidMount(){
        PubSub.publish('vehicleSettingMount','');
        let selectArray = this.handelAtOfName(this.state.selectItemKeys);
        this.setState({
            selectedArray:selectArray
        })
    },
    componentWillMount(){
        BackboneReactMixin.on(this,{
            collections:{
                cardKey:new cardList(cardVehicle)
            }
        });
    } ,
    componentWillUnmount(){
        BackboneReactMixin.off(this);
    },
    render(){
        let leftItem = '';
        let rightItem = '';
        let cardSelectItemRight = this.state.cardKey.map((item,index)=>{
            if(index < 14){
                return(
                    <div className =" item-space"  key={index}>
                        <lebal>
                            <Checkbox value={item.name} checked={this.handleDefaultChecked(item.name)} onChange={this.handleCheck}/>
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
                            <Checkbox value={item.name} checked={this.handleDefaultChecked(item.name)} onChange={this.handleCheck}/>
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
                            <ul className = "list-inline not-choose-item">
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
    mixins:[settingCheckMinx],
    getInitialState(){
        return{
            headerColor:'yellow',
            selectItemKeys:[{single:['vehicleCount','hasReturn','drawOutTime','outCarRemark','carUser','destination','selectedArray']},
                {multi:['vehicleCount','hasReturn','drawOutTime','outCarRemark','carUser','destination']},
                {distributing:['drawOutTime','outCarRemark','carUser','destination','aboutTime','useCase']}
            ],
            selectedArray:[]
        }
    },
    componentWillMount(){
        BackboneReactMixin.on(this,{
            models:{
                taskModel:taskModelTest,
                taskSetting:taskSettingModel
            }
        });
        //初始值

    },
    componentWillUnmount () {
        BackboneReactMixin.off(this);
    },
    componentDidMount(){
        PubSub.publish('taskSettingMount','');
        var documentHeight = $(document).height()+20;
        $('.setting-content').css('height',documentHeight);
    },
    //找出所有卡片显示条目
    findHeaderKey(type){
        let  taskType  = this.state.taskSetting[type];
        let taskData = this.state.taskModel;
        let headerData = [[],[]];
        let keysArray =  _.keys(taskType);
        keysArray.map(function(item,index){
            if(taskType[item]){
                if(headerData[0].length < 3){
                    headerData[0].push({
                        aliasName:taskData[item].aliasName
                    })
                }else{
                    headerData[1].push({
                        aliasName:taskData[item].aliasName
                    })
                }
            }
        });
        return headerData
    },
    handleOnChange(e){
        let type = $(e.target).attr('data-type');
        let key = $(e.target).attr('data-key');
        let checked =e.target.checked;
        let taskSettingTemp = this.state.taskSetting;
        let taskSettingTempArray = _.compact(_.toArray(taskSettingTemp[type]));
        //if(taskSettingTempArray.length < 5){
            taskSettingTemp =taskSettingTemp[type][key] =checked;
            this.setState({
                //taskSetting:taskSettingTemp
            });
        //}
    },
    //处理多选框列表
    handleCheckboxList(type,notChooseOptionKeys){
        let  taskType  = this.state.taskSetting[type];
        let taskData = this.state.taskModel;
        let checkboxListArray = _.omit(taskType,notChooseOptionKeys);
        let checkboxListKeys  =  _.keys(checkboxListArray);
        let checkboxListKeysHeight = Array();
        //构建二维数组
        let k = 0;
        for(let i = 0 ; i < (checkboxListKeys.length/5 + 1) ; i++){
            checkboxListKeysHeight[i] = checkboxListKeysHeight[i] || [];
            for(let j = 0 ; j < 5 ; j ++){
                if(checkboxListKeys[k]){
                    checkboxListKeysHeight[i][j] = checkboxListKeys[k];
                }else{
                    break
                }
                k++
            }
        }
        let checkboxList = checkboxListKeysHeight.map(function(item,index){
            if(item.length > 0){
                let self =this;
                return(
                    <div key = {index}>
                        {item.map(function(item,index){
                            return(
                                <div style={{width:'20%',display:'inline-block'}} key={index}>
                                   <label>
                                        <Checkbox onChange = {self.handleOnChange} data-key ={item} data-type={type} checked = {taskType[item]}/>
                                        {taskData[item].aliasName}
                                   </label>
                                </div>
                            )
                        })}
                    </div>
                )
            }

        }.bind(this));
        return checkboxList
    },
    taskCard(type){
        let headerData = [];  //卡片显示数据
        let notChooseOption = [];//不可选择项
        let notChooseOptionKeys = []; //不可选择项keys
        let cardHeader = '';      //卡片头
        let checkboxList = '';   //多选框列表
      if(type == 0){
          notChooseOption =['不可选择项：','出车时间','司机','车牌号','编码'];
          notChooseOptionKeys = ['drawOutTime','hasReturn','vehicleCount'];
          headerData =this.findHeaderKey('single');
          checkboxList = this.handleCheckboxList('single',notChooseOptionKeys);
          cardHeader= <div  className = "setting-task-code yellow">
                            <span className = 'code'>编码：1</span>
                            <div className = "setting-task-icon yellow-icon">
                                <img src = "/img/edit_task.png" />
                            </div>
                      </div>
      }else if(type == 1){
          notChooseOptionKeys = ['drawOutTime','hasReturn','vehicleCount'];
          notChooseOption =['不可选择项：','车辆总数','已回车','出车时间','编码'];
          headerData =this.findHeaderKey('multi');
          checkboxList = this.handleCheckboxList('multi',notChooseOptionKeys);
          cardHeader=<div  className = "setting-task-code yellow">
                          <span className = 'code'>编码：1</span>
                          <div className = "setting-task-icon yellow-icon">
                              <img src = "/img/edit_task.png" />
                          </div>
                     </div>
      }else{
          notChooseOption =['不可选择项：','出车时间','司机','车牌号','编码'];
          notChooseOptionKeys = ['drawOutTime','hasReturn','vehicleCount','useCase','collectionPosition','drawInTime'];
          headerData =this.findHeaderKey('distributing');
          checkboxList = this.handleCheckboxList('distributing',notChooseOptionKeys);
          cardHeader=<div  className = "setting-task-code red">
                          <span className = 'code'>编码：2</span>
                          <div className = "setting-task-icon red-icon">
                              <img src = "/img/edit_task.png" />
                          </div>
                     </div>
      }
       let header =headerData.map(function(itemArray,index){
            return(
                <Row key = {index} className = "content-row">
                    {itemArray.map(function(item,index){
                        return(
                            <Col span = '8' key={index}>
                                <label>{item.aliasName +"："}</label><span className="label-space">-</span>
                            </Col>
                        )
                    })}
                </Row>
            )
        });
        let notChooseElement = notChooseOption.map(function(item,index){
            if(index == 0){
                return(
                    <label key={index}>{item}</label>
                )
            }else{
                return(
                    <li key={index}>{item}</li>
                )
            }
        });
        return(
            <div>
                <ul className = "list-inline not-choose-item">
                    {notChooseElement}
                </ul>
                <div className = "setting-task-card">
                    {cardHeader}
                    <div className = "setting-task-body">
                        {header}
                    </div>
                    <div className = "task-setting-checkboxs">
                        {checkboxList}
                    </div>
                </div>
            </div>
        )
    },
    render(){
        return(
            <div className = 'setting-layout task-setting'>
                <Row className = "task-setting-content">
                    <Col span='6' className = "task-setting-tip">
                        <label className = "preview">预览效果：</label>
                        <div className = "detail">
                            <label>正在进行\已安排</label>
                            <label>任务展示设置（单人单车）</label>
                        </div>
                    </Col>
                    <Col span="18">
                        {this.taskCard(0)}
                    </Col>
                </Row>
                <Row className = "task-setting-content">
                    <Col span='6' className = "task-setting-tip">
                        <label className = "preview">预览效果：</label>
                        <div className = "detail">
                            <label>正在进行\已安排</label>
                            <label>任务展示设置（多人多车）</label>
                        </div>
                    </Col>
                    <Col span="18">
                        {this.taskCard(1)}
                    </Col>
                </Row>
                <Row className = "task-setting-content">
                    <Col span='6' className = 'task-setting-tip'>
                        <label className = "preview">预览效果：</label>
                        <div className = "detail">
                            <label>待派发</label>
                            <label>任务展示设置</label>
                        </div>
                    </Col>
                    <Col span="18">
                        {this.taskCard(2)}
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
export{Setting,StaffSetting,VehicleSetting,DriverSetting,TaskSetting};