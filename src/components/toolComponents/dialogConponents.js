/**
 * dialog
 * use Ant Design UI
 */
import React from 'react';
import {render} from 'react-dom';
import _ from 'underscore'
import {Button as AntButton,Modal,Row, Col,Input as AntInput,Icon,Form, Select, Checkbox, Radio ,Tooltip,DatePicker,Collapse,Upload,Menu,Cascader,TimePicker} from 'antd';
import BackboneReactMixin from 'backbone-react-component';
import {SearchInput} from "./selectAutoCompletion"
import {staffs} from "../../models/staffInfo";
import {validateMixin} from './../mixin/validate';
import {typeStatusStaffMixin} from './../mixin/typeStatus'
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
//form的整体布局
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14}
};
let EditTable = React.createClass({
    mixins:[BackboneReactMixin,validateMixin,typeStatusStaffMixin],
    //
    componentDidMount(){
    },
    componentWillReceiveProps(){

    },
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        let modifyForm  = this.props.form.getFieldsValue();
        //for( var modifyItem in modifyForm){
        //    if(modifyForm[modifyItem]){
        //        if(typeof modifyForm[modifyItem]=='object'){
        //            modifyForm[modifyItem]=modifyForm[modifyItem].toString();
        //        }
        //        this.getModel().get(modifyItem).value=modifyForm[modifyItem]
        //    }
        //}
        this.props.callbackParentOfEdit('edit');
    },
    handleCancel(){
        this.props.callbackParentOfEdit('noEdit');
    },
    getValidateStatus(field) {
        const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

        if (isFieldValidating(field)) {
            return 'validating';
        } else if (!!getFieldError(field)) {
            return 'error';
        } else if (getFieldValue(field)) {
            return 'success';
        }
    },
    render() {
        const  validateForm = this.validateFormEdit(this.state.model,this.props.form.getFieldProps);
        const  getFieldProps = validateForm.getFieldProps;
        const  staffInfo = validateForm.staffInfo;
        let isDriver = this.typeStatusInfo(staffInfo,validateForm).isDriver;
        let typeStatus =this.typeStatusInfo(staffInfo,validateForm).typeStatus;
        return (
            <Form horizontal onSubmit={this.handleSubmit} className = 'edit-form'  form={this.props.form}>
               <div className = "up-info">
                   <Row type = 'flex' justify="center">
                        <Col span = "8">
                            <div className = "header-icon">
                                {/*<FormItem>
                                    <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}
                                        {...getFieldProps('upload', {
                                            valuePropName: 'fileList'
                                        })}
                                        >
                                        <img src="/img/icon_userpic.png" className = "add-img-front" />
                                    </Upload>
                                </FormItem>*/}
                                <img src= {staffInfo.headImg} className = "header-img" />
                            </div>
                        </Col>
                        <Col span = "16" className="header-right">
                            <h3>{staffInfo.name.value}</h3>
                            {typeStatus}
                        </Col>
                   </Row>
               </div>
               <div className = "middle-info">
                   <Row type = 'flex' justify="center">
                       <Col span = '12'>
                           <FormItem
                               {...formItemLayout}
                               hasFeedback={true}
                               label={staffInfo.code.aliasName+"："} labelCol={{span: 8}} required>
                               <AntInput type="text" {...validateForm.codeProps} placeholder="" />
                           </FormItem>
                       </Col>
                       <Col span = '12'></Col>
                   </Row>
                   <Row type = 'flex' justify="center">
                       <Col span = '12'>
                           <FormItem
                               {...formItemLayout}
                               label={staffInfo.section.aliasName+"："} labelCol={{span: 8}}>
                               <AntInput type="text" {...getFieldProps('section',{initialValue:staffInfo.section.value})} placeholder=""/>
                           </FormItem>
                       </Col>
                       <Col span = '12'>
                           <FormItem
                               {...formItemLayout}
                               label={staffInfo.gender.aliasName+"："} required>
                               <RadioGroup {...getFieldProps('gender', { initialValue: "0" })}>
                                   <Radio value="0">男</Radio>
                                   <Radio value="1">女</Radio>
                               </RadioGroup>
                           </FormItem>
                       </Col>
                   </Row>
                   <Row type = 'flex' justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               hasFeedback
                               label={staffInfo.idNumber.aliasName+"："} labelCol={{span: 8}} required>
                               <AntInput type="text" placeholder="" {...validateForm.idNumberProps} />
                           </FormItem>
                       </Col>
                       <Col span = "12"></Col>
                   </Row>
                   <Row type = 'flex' justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label={staffInfo.address.aliasName+"："} labelCol={{span: 8}}>
                               <AntInput type="text" placeholder="" {...getFieldProps('address',{initialValue:staffInfo.address.value})} />
                           </FormItem>
                       </Col>
                       <Col span = "12"></Col>
                   </Row>
                   <Row type = "flex" justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label={staffInfo.joinData.aliasName+"："} labelCol={{span: 8}} >
                               <DatePicker  {...getFieldProps('joinData',{initialValue:'2015-01-01'})}/>
                           </FormItem>
                       </Col>
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               hasFeedback
                               label={staffInfo.phoneNumber.aliasName+"："} required>
                               <AntInput type="text" placeholder="" {...validateForm.phoneNumberProps} />
                           </FormItem>
                       </Col>
                   </Row>
                   <Row type = "flex" justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label={staffInfo.remark.aliasName+"："} labelCol={{span: 8}} >
                               <AntInput type="text" placeholder="" {...getFieldProps('remark',{initialValue:staffInfo.remark.value})} />
                           </FormItem>
                       </Col>
                       <Col span = "12"></Col>
                   </Row>
                   <Row type = "flex" justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label={staffInfo.outAge.aliasName+":"} labelCol={{span: 8}}>
                               <label className = "isOutage">
                                   <Checkbox {...getFieldProps('outAge')} />
                               </label>
                           </FormItem>
                       </Col>
                       <Col span = "12"></Col>
                   </Row>
                   {isDriver}
               </div>
                <div className = "footer-info" style={{backgroundColor:'#E6E5ED'}}>
                    <Row>
                        <Col span = '12' style={{textAlign:'left'}}>
                            <AntButton type="primary" htmlType="submit" onClick={this.handleSubmit}>保存</AntButton>
                        </Col>
                        <Col span = '12' style = {{textAlign:'right'}}>
                            <AntButton type ="primary" onClick={this.handleCancel}>退出</AntButton>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
});
EditTable = Form.create()(EditTable);

let EditTableVehicle = React.createClass({
    mixins:[BackboneReactMixin],
    componentDidMount(){
    },
    handleSubmit(e) {
        e.preventDefault();
        //console.log('收到表单值：', this.props.form.getFieldsValue());
        this.props.callbackParentOfEdit('edit');
    },
    handleCancel(){
        this.props.callbackParentOfEdit('noEdit');
    },
    render() {
        const { getFieldProps } = this.props.form;
        let cardInfo =this.state.model;
        return (
            <Form horizontal onSubmit={this.handleSubmit} className = 'add-form'>
                <div className = "up-info">
                    <Row type = 'flex' justify="center">
                        <Col span = "8">
                            <div className = "header-icon">
                                <img src= {cardInfo.headImg} />
                            </div>
                        </Col>
                        <Col span = "16" className="header-right">
                            <h3>{cardInfo.vehicleCode.value}</h3>
                            <Row type = "flex">
                                <Col span = "4">
                                    <div className = "type-text right">{cardInfo.vehicleNumber.aliasName}</div>
                                </Col>
                                <Col span = "12">
                                    <div className = "status-text right">{cardInfo.vehicleNumber.value}</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className = "middle-info">
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆品牌：">
                                <AntInput type="text" {...getFieldProps('vehicleBrand')} placeholder="" />
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机：" >
                                <AntInput type="text" {...getFieldProps('driver')} placeholder=""  />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆型号：">
                                <AntInput type="text" {...getFieldProps('vehicleModel')} placeholder="" />
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机手机：">
                                <AntInput type="text" {...getFieldProps('driverPhone')} placeholder="" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆类型：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vehicleType')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：">
                                <AntInput type="text" placeholder="" {...getFieldProps('section')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="标签：">
                                <AntInput type="text" placeholder="" {...getFieldProps('tag')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车主：">
                                <AntInput type="text" placeholder="" {...getFieldProps('onwerPeople')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="颜色：">
                                <AntInput type="text" placeholder="" {...getFieldProps('color')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车主手机：" >
                                <AntInput type="text" placeholder="" {...getFieldProps('ownerPhone')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="载重（吨）：" >
                                <AntInput type="text" placeholder="" {...getFieldProps('vehicleLoad')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车队：">
                                <AntInput type="text" placeholder="" {...getFieldProps('ownerTeam')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="座位数：">
                                <AntInput type="text" placeholder="" {...getFieldProps('seatNumber')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="油卡编号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('oilCard')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12" className = "oil-input">
                            <FormItem
                                {...formItemLayout}
                                label="油耗：" >
                                <AntInput type="text" placeholder="" {...getFieldProps('fuelEfficient')} />
                                <span className = "unit">升/百公里</span>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="电卡编号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('electricCard')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12" className = "continue-input">
                            <FormItem
                                {...formItemLayout}
                                label="续航里程：">
                                <AntInput type="text" placeholder="" {...getFieldProps('continuation')} />
                                <span className = "unit">KM</span>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆状态：">
                                <Select defaultValue="0" {...getFieldProps('vehicleStatus')}>
                                    <Option value="0">可用</Option>
                                    <Option value="1">不可用</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="初始里程：">
                                <AntInput type="text" placeholder="" {...getFieldProps('initialMileage')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="是否停用：" >
                                <label className = "isOutage">
                                    <Checkbox {...getFieldProps('outAge')} />
                                </label>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="发动机号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('engineCode')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="车架号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('frameCode')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入单位：">
                                <AntInput type="text" placeholder="" {...getFieldProps('buyCompany')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入价格：" >
                                <AntInput type="text" placeholder="" {...getFieldProps('price')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入日期："  >
                                <DatePicker  {...getFieldProps('buyData')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                wrapperCol={{span:14,offset:8}}
                                label="备注：">
                                <AntInput  type="textarea"   {...getFieldProps('remark')} placeholder="请输入..." id="textarea-more" name="textarea" className = 'vehicle-more'/>
                            </FormItem>

                        </Col>
                    </Row>
                </div>
                <div className = "footer-info" style={{backgroundColor:'#E6E5ED'}}>
                    <Row>
                        <Col span = '12' style={{textAlign:'left'}}>
                            <AntButton type="primary" htmlType="submit" onClick={this.handleSubmit}>保存</AntButton>
                        </Col>
                        <Col span = '12' style = {{textAlign:'right'}}>
                            <AntButton type ="primary" onClick={this.handleCancel}>退出</AntButton>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
});
EditTableVehicle = Form.create()(EditTableVehicle);
const EditDialog = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
      return{
          visible : false
      }
    },
    componentDidMount(){
       this.pubsub_token=PubSub.subscribe('join-edit',function(topic,message){
            this.setState({
                visible: true
            })
        }.bind(this))
    },
    componentWillUnMount(){
        PubSub.unsubscribe(this.pubsub_token)
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            visible:nextProps.isEdit
        });
    },
    showModal(){
        this.setState({
            visible:true
        });
    },
    handleChildrenChange(isChange){
        this.setState({
           visible:false
        });
        this.props.callbackParent(isChange);
    },
    render(){
        let{pageShow,cardInfo} = this.props;
        var editTable = function(){
            switch (pageShow){
                case 'staff':
                    return(<EditTable model={this.getModel()}
                        visible={this.state.visible}
                        callbackParentOfEdit={this.handleChildrenChange}
                       />);
                    break;
                case 'vehicle':
                    return(<EditTableVehicle  model={this.getModel()}
                        visible={this.state.visible}
                        callbackParentOfEdit={this.handleChildrenChange}
                        cardInfo={cardInfo}
                        />);
                    break;
            }
        }.bind(this);
        return(
            <Modal  visible={this.state.visible}  footer="" closable={false} className = "edit-modal">
                {editTable()}
            </Modal>
        )
    }
});
//添加条目table(task)
let AddTask = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            visible : false,
            isCreateTask:false
        }
    },
    handleSubmit(e) {
        e.preventDefault();
        //console.log('收到表单值：', this.props.form.getFieldsValue());
        //let formValue = this.props.form.getFieldsValue().id='12233';
        //this.getCollection().push(this.props.form.getFieldsValue());
        //console.log('保存表单值'+this.state.collection);
        //this.props.callbackParentOfAdd(true);
    },
    handleCancel(){
        this.props.callbackParentOfAdd(false);
    },
    handleUpload(){

    },
    createEntry: function (entry) {
    },
    showModal() {
        this.setState({
            visible: true
        });
    },
    handleCreateTask(event){
            this.setState({
                isCreateTask:true
            });
    } ,
    render() {
        const { getFieldProps } = this.props.form;
        let addTaskShow = function (){
            if(this.state.isCreateTask)
            {
                //alert(1);
                return(
                    <div className="popup-windows">
                         <div className="popup-windows-show">
                            <ul>
                                <li className="popup-windows-show-icon">
                                    <span className="alert-icon"></span>
                                </li>
                                <li className="popup-windows-show-word">
                                    <ul>
                                        <li>
                                            <span>今天是</span>
                                            <span>xxxx-xx-xx</span>
                                            <span>(周x)</span>
                                        </li>
                                        <li>
                                            <span>周期任务</span>
                                            <span>x</span>
                                            <span>的首次用车时间是</span>
                                            <span>xxxx-xx-xx</span>
                                            <span>(周x)</span>
                                        </li>
                                        <li>
                                            <span>确认添加这个任务吗？</span>
                                        </li>
                                    </ul>
                                </li>
                                <li className="popup-windows-show-btn">
                                    <button className="okbtn">确认</button>
                                    <button className="canclebtn">取消</button>
                                </li>
                            </ul>
                         </div>
                    </div>
                )
            }
        }.bind(this);
        return (
            <Form onSubmit={this.handleSubmit} className = 'add-task'>
                <div className="title">添&nbsp;加&nbsp;任&nbsp;务</div>
                <div className="task-content">
                    <ul>
                        <li className="first-messsage">
                            <span className="span1">编</span><span className="span2">码：</span>
                            <span className="number">1</span>
                            <label htmlFor="" className="destination">&nbsp;目的地：</label>
                            <input className="inputBox" type="text"/>
                        </li>
                        <li>
                            <label className="people" htmlFor="">用车人：</label>
                            <input className="inputBox" type="text"/>
                            <label htmlFor="">用车时间：</label>
                            <DatePicker placeholder="" {...getFieldProps('JoinData')} />
                        </li>
                        <li>
                            <label htmlFor="">估计用时：</label>
                            <input className="inputBox" type="text"/>
                            <label htmlFor="">用车原因：</label>
                            <input className="inputBox" type="text"/>
                        </li>
                        <li>
                            <label htmlFor="">申请车型：</label>
                            <input className="inputBox" type="text"/>
                            <label htmlFor="">随车人数：</label>
                            <input className="inputBox" type="text"/>
                        </li>
                        <li>
                            <label htmlFor="">出车备注：</label>
                            <input className="inputBox-long" type="text"/>
                        </li>
                        <li>
                            <label className="Perio-task">
                                <Checkbox defaultChecked={false}/>
                                周期任务
                            </label>
                        </li>
                        <li>
                            <ul className="startDate">
                                <li>
                                    <label htmlFor="">起始日期：</label>
                                    <DatePicker  placeholder="" {...getFieldProps('JoinData')} />
                                    <label className="endDate" htmlFor="">结束日期(选填)：</label>
                                    <DatePicker  placeholder="" {...getFieldProps('JoinData')} />
                                </li>
                                <li>
                                    <label htmlFor="">起始日期：</label>
                                    <label>
                                        <Checkbox defaultChecked={false}/>
                                        日
                                    </label>
                                    <label>
                                        <Checkbox defaultChecked={false}/>
                                        一
                                    </label>
                                    <label>
                                        <Checkbox defaultChecked={false}/>
                                        二
                                    </label>
                                    <label>
                                        <Checkbox defaultChecked={false}/>
                                        三
                                    </label>
                                    <label>
                                        <Checkbox defaultChecked={false}/>
                                        四
                                    </label>
                                    <label>
                                        <Checkbox defaultChecked={false}/>
                                        五
                                    </label>
                                    <label>
                                        <Checkbox defaultChecked={false}/>
                                        六
                                    </label>
                                </li>
                            </ul>
                        </li>
                        <li className="creator">任务创建人：admin</li>
                        <li className="create-task-submit">
                            <button className="btn create-btn" onClick={this.handleCreateTask}>创建任务</button>
                            <button className="btn cancel-btn">取消</button>
                        </li>
                    </ul>
                </div>
                    {addTaskShow()}
            </Form>
        );
    }
});
//添加条目table(task)
AddTask = Form.create()(AddTask);
//添加条目table(staff)
let AddTable = React.createClass({
    mixins:[BackboneReactMixin,validateMixin],
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        let formValue = this.props.form.getFieldsValue().id='12233';
        this.getCollection().push(this.props.form.getFieldsValue());
        this.props.callbackParentOfAdd(true);
    },
    handleSaveAndSubmit(e){
        console.log('收到表单值：', this.props.form.getFieldsValue());
        this.props.form.resetFields();
    },
    handleCancel(){
        this.props.callbackParentOfAdd(false);
    },
    handleUpload(){

    },
    getValidateStatus(field) {
        const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

        if (isFieldValidating(field)) {
            return 'validating';
        } else if (!!getFieldError(field)) {
            return 'error';
        } else if (getFieldValue(field)) {
            return 'success';
        }
    },
    render() {
        const  validateForm = this.validateFormAdd(this.props.form.getFieldProps);
        const getFieldProps = validateForm.getFieldProps;
        return (
            <Form horizontal onSubmit={this.handleSubmit} className = 'add-form' form={this.props.form}>
                <div className = "up-info">
                    <Row type = 'flex' justify="center">
                        <Col span = '8' className = 'up-info-header-img'>
                            <FormItem>
                            <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}
                                {...getFieldProps('upload', {
                                    valuePropName: 'fileList'
                                })}
                                >
                                <img src="/img/icon_userpic.png" />
                            </Upload>
                            </FormItem>
                        </Col>
                        <Col span = '12' className = 'up-info-header-text'>
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="姓名："  required>
                                <AntInput type="text" {...validateForm.nameProps} id='name' placeholder=""  />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="职务："  required>
                                <AntInput type="text" {...validateForm.jobProps} id='job' placeholder=""  />
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className = "middle-info">
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="编码：" required>
                                <AntInput type="text" {...validateForm.codeProps} id='code' placeholder=""  />
                            </FormItem>
                        </Col>
                        <Col span = '12'></Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：">
                                <AntInput type="text" {...getFieldProps('section')} id = 'section'  placeholder="" />
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="性别：" required>
                                <RadioGroup {...getFieldProps('gender', { initialValue: 'male' })}>
                                    <Radio value="male">男的</Radio>
                                    <Radio value="female">女的</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="身份证号："  required>
                                <AntInput type="text" {...validateForm.idNumber} placeholder="" id = "idNumber" />
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="家庭住址：">
                                <AntInput type="text" placeholder="" {...getFieldProps('address')} id = "address" />
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="入职日期：" >
                                <DatePicker placeholder="" {...getFieldProps('joinData')} id = "joinData"/>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="手机：" required>
                                <AntInput type="text" placeholder="" {...validateForm.phoneNumber} id = 'phoneNumber' />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="备注：">
                                <AntInput type="text" placeholder="" {...getFieldProps('remark')} id = "remark" />
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="是否停用:">
                                <label className = "isOutage">
                                    <Checkbox {...getFieldProps('outAge')} defaultChecked ={false} />
                                </label>
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Collapse defaultActiveKey={['1']} className = "is-driver">
                        <Panel header={(
                       <div className ="" style={{width:'110%',position:'relative',right:'38px',borderBottom:'10px solid #E6E5ED'}}>
                           <span className = 'driver-text' style={{position:'relative',left:'185px'}}>司机</span>
                           <Icon type="circle-down" />
                       </div>
                       )}>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        hasFeedback
                                        label="驾驶证号：" required>
                                        <AntInput type="text" placeholder="" {...validateForm.drivingLicense}id = "drivingLicense" />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        hasFeedback
                                        label="有效期限：" required>
                                        <DatePicker id = "validDate" {...validateForm.validDate} />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        hasFeedback
                                        label="发证机关：" required>
                                        <AntInput type="text" placeholder="" id = "authorizedBy" {...validateForm.authorizedBy}/>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        hasFeedback
                                        label="年审到期：" required>
                                        <DatePicker  placeholder="" id = "annualExamination" {...validateForm.annualExamination} />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        hasFeedback
                                        label="领证日期："  required>
                                        <DatePicker id = "startLicenseData" {...validateForm.annualExamination} />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        hasFeedback
                                        label="准驾车型：" required>
                                        <DatePicker id = "licenseType" {...validateForm.licenseType} />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </div>
                <div className = "footer-info" style={{backgroundColor:'#E6E5ED'}}>
                    <Row type="flex" justify="space-around">
                        <Col span = '8'>
                            <AntButton type="primary"  onClick={this.handleSaveAndSubmit}>保存并添加</AntButton>
                        </Col>
                        <Col span = '8'>
                            <AntButton type="primary" htmlType="submit" onClick={this.handleSubmit}>保存</AntButton>
                        </Col>
                        <Col span = '8'>
                            <AntButton type ="primary" onClick={this.handleCancel}>退出</AntButton>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
});
//添加条目table(staff)
AddTable = Form.create()(AddTable);
//添加条目table(Vehicle)
let AddTableOfVehicle = React.createClass({
    handleSubmit(e) {
        e.preventDefault();
        //console.log('收到表单值：', this.props.form.getFieldsValue());
        this.props.callbackParentOfAdd(true);
    },
    handleCancel(){
        this.props.callbackParentOfAdd(false);
    },
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <Form horizontal onSubmit={this.handleSubmit} className = 'add-form'>
                <div className = "up-info">
                    <Row type = 'flex' justify="center">
                        <Col span = '8' className = 'up-info-header-img'>
                            <FormItem>
                                <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}
                                    {...getFieldProps('upload', {
                                        valuePropName: 'fileList',
                                        normalize: this.normFile
                                    })}
                                    >
                                    <img src="/img/icon_userpic.png" />
                                </Upload>
                            </FormItem>
                        </Col>
                        <Col span = '12' className = 'up-info-header-text'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆编码：" >
                                <AntInput type="text" {...getFieldProps('carCode')} placeholder="" value="" />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="车牌号：" >
                                <AntInput type="text" {...getFieldProps('carNum')} placeholder="" value="" />
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className = "middle-info">
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆品牌：">
                                <AntInput type="text" {...getFieldProps('code')} placeholder="" value="01" />
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机：" >
                                <AntInput type="text" {...getFieldProps('code')} placeholder="" value="01" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆型号：">
                                <AntInput type="text" {...getFieldProps('section')} placeholder="" />
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机手机：">
                                <AntInput type="text" {...getFieldProps('section')} placeholder="" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆类型：">
                                <AntInput type="text" placeholder="" {...getFieldProps('address')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：">
                                <AntInput type="text" placeholder="" {...getFieldProps('address')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="标签：">
                                <AntInput type="text" placeholder="" {...getFieldProps('address')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车主：">
                                <AntInput type="text" placeholder="" {...getFieldProps('address')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="颜色：">
                                <AntInput type="text" placeholder="" {...getFieldProps('phone')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车主手机：" >
                                <AntInput type="text" placeholder="" {...getFieldProps('phone')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="载重（吨）：" >
                                <AntInput type="text" placeholder="" {...getFieldProps('more')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车队：">
                                <AntInput type="text" placeholder="" {...getFieldProps('phone')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="座位数：">
                                <AntInput type="text" placeholder="" {...getFieldProps('phone')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="油卡编号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('phone')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="油耗：" >
                                <AntInput type="text" placeholder="" {...getFieldProps('phone')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="电卡编号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('phone')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={<div><p>续航里程：</p><p>（电车）</p></div>}>
                                <AntInput type="text" placeholder="" {...getFieldProps('phone')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆状态：">
                                <Select defaultValue="0">
                                    <Option value="0">可用</Option>
                                    <Option value="1">不可用</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="初始里程：">
                                <AntInput type="text" placeholder="" {...getFieldProps('phone')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="是否停用：" >
                                <label className = "isOutage">
                                    <Checkbox {...getFieldProps('outage')} />
                                </label>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="发动机号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('phone')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="车架号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('phone')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入单位：">
                                <AntInput type="text" placeholder="" {...getFieldProps('phone')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入价格：" >
                                <AntInput type="text" placeholder="" {...getFieldProps('phone')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入日期："  >
                                <DatePicker  />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                wrapperCol={{span:14,offset:8}}
                                label="备注：">
                                <AntInput  type="textarea" placeholder="请输入..." id="textarea-more" name="textarea" className = 'vehicle-more' />
                            </FormItem>

                        </Col>
                    </Row>
                </div>
                <div className = "footer-info" style={{backgroundColor:'#E6E5ED'}}>
                    <Row type="flex" justify="space-around">
                        <Col span = '8'>
                            <AntButton type="primary" htmlType="submit" onClick={this.handleSubmit}>保存并添加</AntButton>
                        </Col>
                        <Col span = '8'>
                            <AntButton type="primary" htmlType="submit" onClick={this.handleSubmit}>保存</AntButton>
                        </Col>
                        <Col span = '8'>
                            <AntButton type ="primary" onClick={this.handleCancel}>退出</AntButton>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
});
//添加条目table(Vehicle)
AddTableOfVehicle = Form.create()(AddTableOfVehicle);
//添加条目窗口
const AddDialog  = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            visible : false,
            collectionInfo:[]
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            visible:nextProps.isAdd
        });
    },
    showModal(){
        this.setState({
            visible:true
        });
    },
    handleChildrenChange(isSubmit){
        this.setState({
            visible:false
        });
        this.props.callbackParentOfAdd(false);
    },
    render(){
        let pageShow = this.props.pageShow;
        var addTable = function(){
            switch (pageShow){
                case 'staff':
                       return(
                           <Modal  visible={this.state.visible}  footer="" closable={false} className = "add-modal">
                               <AddTable
                                        visible={this.state.visible}
                                        callbackParentOfAdd={this.handleChildrenChange} collection={staffs}
                                     />
                           </Modal>
                       );
                        break;
                case 'vehicle':
                        return(
                            <Modal  visible={this.state.visible}  footer="" closable={false} className = "add-modal">
                                <AddTableOfVehicle
                                            visible={this.state.visible}
                                            callbackParentOfAdd={this.handleChildrenChange}
                                        />
                            </Modal>);
                        break;
                case 'task':
                    return(
                        <Modal  visible={this.state.visible}  footer="" closable={false} className = "add-task">
                           <AddTask  visible={this.state.visible}
                                     callbackParentOfAdd={this.handleChildrenChange}
                               />
                        </Modal>
                    );
                    break;
            }
        }.bind(this);
        return(
            <div>{addTable()}</div>

        )
    }

});
//发送消息窗口
const SendMessageDialog = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return {
            visible :false,
            selectVisible:false,
            inputValue :[],
            selectValue:'',
            selectValueArray:[],
            searchSelectHeight:'100px'
        };
    },
    componentDidMount(){

    },
    componentWillReceiveProps(nextProps){
        let inputValueTemp = this.state.inputValue;
        //卡片上点击发送
        //console.log(this.props.isSendMessage);
        if(this.props.isSendMessage){
            if(this.state.model){
                if(!_.contains(this.state.inputValue,this.state.model)){
                    inputValueTemp.push(this.state.model);
                }
                this.setState({
                    visible:nextProps.isSendMessage,
                    selectValueArray:inputValueTemp
                });
            }
            //发送批量操作
            //console.log(this.props.selectItem);
            if(this.props.selectItem){
                //console.log('test send-batch');
                this.setState({
                    visible:true,
                    selectValueArray:this.props.selectItem
                })
            }
        }else{
            this.setState({
                visible:false
            })
        }

    },
    showModal(){
        this.setState({
            visible:true
        });
    },
    handleOK(){
        this.setState({
            visible : false
        });
        this.props.callbackParent(false)
    },
    handleCancel(){
        this.setState({
            visible: false
        });
        this.props.callbackParent(false)
    },
    handleIconClick(){
        if(this.state.selectVisible){
            $('.search-select').addClass('is-display');
            this.setState({
                selectVisible:false
            })
        }else{
            $('.search-select').removeClass('is-display');
            this.setState({
                selectVisible:true
            })
        }
    },
    handleAddName(){
        let tempArray = this.state.selectValueArray;
        if(this.state.selectValue){
            tempArray.push(this.state.selectValue);
            this.setState({
                selectValueArray:tempArray
            })
        }
    },
    handleSelectChoose(value){
        this.setState({
            selectValue:value
        })
    },
    handleSelectFocus(event){
        $("input[name=cursor-field]").focus();
    },
    handlePressCancel(event){
        if(event.keyCode==8){
            if(this.state.selectValueArray.length > 0){
                let tempArray = this.state.selectValueArray;
                tempArray.pop();
                this.setState({
                    selectValueArray:tempArray
                })
            }
        }
    },
    handleClickCancel(event){
        let tempArray = this.state.selectValueArray;
        tempArray.splice($(event.target).attr('data-index'),1);
        this.setState({
            selectValueArray:tempArray
        })
    },
    render(){
        let selectItem = this.state.selectValueArray.map(function(item,index){
            //todo 暂时兼容非Model数据，与后台数据交换的时候要改
            if(typeof item === 'object'){
                return(
                    <li className = "select-item" key={index} data-id = {item.id}>
                        <span className = "item-content">{item.name?item.name.value:item.vehicleCode.value}</span>
                        <span className = "item-remove" data-index={index} onClick={this.handleClickCancel}></span>
                    </li>
                )
            }else{
                return(
                    <li className = "select-item" key={index}>
                        <span className = "item-content">{item}</span>
                        <span className = "item-remove" data-index={index} onClick={this.handleClickCancel}></span>
                    </li>
                )
            }

        }.bind(this));
        return(
            <div className = "send-message">
                <Modal  visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer="" closable={false} className="send-message-modal">
                    <Row>
                        <Col span = "4"><span>短信接收人员:</span></Col>
                        <Col span ="18" >
                            <span className = 'send-select-warp' onClick={this.handleSelectFocus}>
                                <span className = "send-select-span">
                                     <ul className='send-select-content'>
                                         {selectItem}
                                        <li className="cursor-warp">
                                            <span className = "cursor-field-warp">
                                                <input className="cursor-field" value="" name='cursor-field' onKeyDown={this.handlePressCancel}></input>
                                            </span>
                                        </li>
                                     </ul>
                                </span>
                            </span>
                        </Col>
                        <Col span ="2" className = "plus-icon-box">
                            <Icon type="plus-circle-o" className="plus-icon" onClick={this.handleIconClick} />
                            <div className="search-select is-display" >
                                <div className = "search-select-title">添加新的联系人</div>
                                <SearchInput placeholder="搜索关键字" callbackParent = {this.handleSelectChoose} />
                                <AntButton type="primary" size="large" className = "confirmation-btn" style={{position:'absolute',bottom:'10px',left:'30px'}} onClick={this.handleAddName}>确认添加</AntButton>
                            </div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="start">
                        <Col span ="18" offset="4" className = "input-tip"><span className = "">使用"@姓名"可以快速添加短信内容</span></Col>
                    </Row>
                    <Row className ="send-content">
                        <Col span = "4"><span>消息内容:</span></Col>
                        <Col span ="18" className = "input-textarea" ><AntInput type="textarea" placeholder="" /></Col>
                    </Row>
                    <Row className = "send-message-er-box">
                        <Col span = "4" offset ="17"><span>消息创建人:</span></Col>
                        <Col span ="3" ><div className = "send-message-er">张三</div></Col>
                    </Row>

                    <Row className = "send-btn">
                        <Col span = "6"><AntButton type="primary" onClick = {this.handleOK}>发送</AntButton></Col>
                        <Col span = "6" offset="12"><AntButton type="primary" onClick ={this.handleCancel}>退出</AntButton></Col>
                    </Row>
                </Modal>
            </div>
        )
    }
});
//查看信息table（staff）
let LookTable = React.createClass({
    mixins:[BackboneReactMixin],
    handleEdit(e) {
        e.preventDefault();
        this.props.callbackParentOfLook('isEdit');
    },
    handleCancel(){
        this.props.callbackParentOfLook(false);
    },
    render() {
        const { getFieldProps } = this.props.form;
        let staffInfo = this.state.model;
        return (
            <Form horizontal onSubmit={this.handleSubmit} className = 'look-form'>
                <div className = "up-info">
                    <Row type = 'flex' justify="center">
                        <Col span = "8">
                            <div className = "header-icon">
                                <img src= "/img/icon_user_head_50_50_have_9.png" />
                            </div>
                        </Col>
                        <Col span = "16" className="header-right">
                            <h3>{staffInfo.name.value}</h3>
                            <Row type = "flex">
                                <Col span = "4">
                                    <div className ="type-icon right icon"></div>
                                    <div className = "type-text right">司机</div>
                                </Col>
                                <Col span = "12">
                                    <div className = "status-icon right icon"></div>
                                    <div className = "status-text right">出车</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className = "middle-info">
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.code.aliasName+"："} required>
                                <p>{staffInfo.code.value}</p>
                            </FormItem>
                        </Col>
                        <Col span = '12'></Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.section.aliasName+"："} >
                                <p>{staffInfo.section.value}</p>
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.gender.aliasName+"："} required>
                                <p>{staffInfo.gender.value}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.idNumber.aliasName+"："} required>
                                <p>{staffInfo.idNumber.value}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.address.aliasName+"："}>
                                <p>{staffInfo.address.value}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.joinData.aliasName+"："}>
                                <p>{staffInfo.joinData.value}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.phoneNumber.aliasName+"："} required>
                                <p>{staffInfo.phoneNumber.value}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.remark.aliasName+"："} required>
                                <p>{staffInfo.remark.value}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.outAge.aliasName+":"}>
                                <label className = "isOutage">
                                    <Checkbox {...getFieldProps('outage')} defaultChecked={false} disabled/>
                                </label>
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Collapse defaultActiveKey={['1']} className = "is-driver">
                        <Panel header={(
                       <div className ="" style={{width:'110%',position:'relative',right:'38px',borderBottom:'10px solid #E6E5ED'}}>
                           <span className = 'driver-text' style={{position:'relative',left:'185px'}}>司机</span>
                           <Icon type="circle-down" />
                       </div>
                       )}>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label={staffInfo.drivingLicense.aliasName+"："}  required>
                                        <p>{staffInfo.drivingLicense.value}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label={staffInfo.validDate.aliasName+"："} required>
                                        <p>{staffInfo.validDate.value}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label={staffInfo.authorizedBy.aliasName+"："}  required>
                                        <p>{staffInfo.authorizedBy.value}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label={staffInfo.annualExamination.aliasName+"："}  required>
                                        <p>{staffInfo.annualExamination.value}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label={staffInfo.startLicenseData.aliasName+"："} required>
                                        <p>{staffInfo.startLicenseData.value}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label={staffInfo.licenseType.aliasName+"："}  required>
                                        <p>{staffInfo.licenseType.value}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </div>
                <div className = "footer-info" style={{backgroundColor:'#E6E5ED'}}>
                    <Row type='flex' justify="space-around">
                        <Col span = '6'>
                            <AntButton type="primary" htmlType="submit" onClick={this.handleEdit}>编辑</AntButton>
                        </Col>
                        <Col span = '6'>
                            <AntButton type ="primary" onClick={this.handleCancel}>任务记录</AntButton>
                        </Col>
                        <Col span = '6'>
                            <AntButton type ="primary" onClick={this.handleCancel}>病事假记录</AntButton>
                        </Col>
                        <Col span = '6'>
                            <AntButton type ="primary" onClick={this.handleCancel}>退出</AntButton>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
});
LookTable = Form.create()(LookTable);
//查看信息table (vehicle)
let LookTableVehicle = React.createClass({
    handleEdit(e) {
        e.preventDefault();
        //PubSub.publish('join-edit',this);
        this.props.callbackParentOfLook('isEdit');
    },
    handleCancel(){
        this.props.callbackParentOfLook(false);
    },
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <Form horizontal onSubmit={this.handleSubmit} className = 'look-form'>
                <div className = "up-info">
                    <Row type = 'flex' justify="center">
                        <Col span = "8">
                            <div className = "header-icon">
                                <img src= "/img/icon_user_head_50_50_have_9.png" />
                            </div>
                        </Col>
                        <Col span = "16" className="header-right">
                            <h3>赵日天</h3>
                            <Row type = "flex">
                                <Col span = "4">
                                    <div className = "type-text right">车牌号：</div>
                                </Col>
                                <Col span = "12">
                                    <div className = "status-text right">ABCDEFG</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className = "middle-info">
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆品牌：">
                                <p>车辆品牌</p>
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机：" >
                                <p>司机</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆型号：">
                                <p>车辆型号</p>
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机手机：">
                                <p>司机手机</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆类型：">
                                <p>车辆类型</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：">
                                <p>所在部门</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="标签：">
                                <p>标签</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车主：">
                                <p>所属车主</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="颜色：">
                                <p>颜色</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车主手机：" >
                                <p>车主手机</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="载重（吨）：" >
                                <p>载重（吨）</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车队：">
                                <p>所属车队</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="座位数：">
                                <p>座位数</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="油卡编号：">
                                <p>油卡编号</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="油耗：" >
                                <p>油耗</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="电卡编号：">
                                <p>电卡编号</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={<div><p>续航里程：</p><p>（电车）</p></div>}>
                                <p>续航里程</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆状态：">
                                <Select defaultValue="0" disabled>
                                    <Option value="0">可用</Option>
                                    <Option value="1">不可用</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="初始里程：">
                                <p>初始里程</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="是否停用：" >
                                <label className = "isOutage">
                                    <Checkbox {...getFieldProps('outage')} defaultChecked={false} disabled />
                                </label>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="发动机号：">
                                <p>发动机号</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="车架号：">
                                <p>车架号</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入单位：">
                                <p>购入单位</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入价格：" >
                                <p>购入价格</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入日期："  >
                                <p>购入日期</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                wrapperCol={{span:14,offset:8}}
                                label="备注：">
                                <AntInput  type="textarea" placeholder="请输入..." id="textarea-more" name="textarea" className = 'vehicle-more' />
                            </FormItem>

                        </Col>
                    </Row>
                </div>
                <div className = "footer-info" style={{backgroundColor:'#E6E5ED'}}>
                    <Row type='flex' justify="space-around">
                        <Col span = '6'>
                            <AntButton type="primary" htmlType="submit" onClick={this.handleEdit}>编辑</AntButton>
                        </Col>
                        <Col span = '6'>
                            <AntButton type ="primary" onClick={this.handleCancel}>出车记录</AntButton>
                        </Col>
                        <Col span = '6'>
                            <AntButton type ="primary" onClick={this.handleCancel}>维保记录</AntButton>
                        </Col>
                        <Col span = '6'>
                            <AntButton type ="primary" onClick={this.handleCancel}>退出</AntButton>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
});
LookTableVehicle = Form.create()(LookTableVehicle);
//查看信息弹窗
const LookDialog = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            visible : false
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            visible:nextProps.isLook
        });
    },
    showModal(){
        this.setState({
            visible:true
        });
    },
    handleChildrenChange(isChange){
        this.setState({
            visible:false
        });
        this.props.callbackParent(isChange);
    },
    render(){
        let pageShow = this.props.pageShow;
        var lookTable = function(){
            switch (pageShow){
                case 'staff':
                    return(<LookTable
                        visible={this.state.visible}
                        callbackParentOfLook={this.handleChildrenChange} model={this.getModel()}
                        />);
                    break;
                case 'vehicle':
                    return(<LookTableVehicle
                        visible={this.state.visible}
                        callbackParentOfLook={this.handleChildrenChange}
                        />);
                    break;
            }
        }.bind(this);
        return(
            <Modal  visible={this.state.visible}  footer="" closable={false} className = "look-modal">
                {lookTable()}
            </Modal>
        )
    }
});
//高级搜索下拉面板
const AdvancedSearchPanel = React.createClass({
    getInitialState(){
        return{
            tableDataStaff:[{headerName:'车辆类型：',value_0:'A1执照',value_1:'A2执照',value_2:'B1执照',value_3:'B2执照',value_4:'C1执照',value_5:'C2执照',value_6:'C3执照'},
                        {headerName:'所属部门：',value_0:'车队1',value_1:'车队2',value_2:'车队3',value_3:'车队4',value_4:'车队5',value_5:'',value_6:''},
                        {headerName:'状态：：',value_0:'空闲',value_1:'正在任务中',value_2:'休假中',value_3:'',value_4:'',value_5:'',value_6:''}
            ],
            tableDataVehicle:[],
            advancedSearchList:[],
            startValue:null,
            endValue:null
        }
    },
    componentDidMount(){
      this.advancedSearch_token = PubSub.subscribe('advanceSearch',function(topic,moveHeight){
          $('.advanced-search-panel').animate({
              top:moveHeight
          })
      }.bind(this))
    },
    componentWillUnMount(){
      PubSub.unsubscribe(this.advancedSearch_token)
    },
    clickSearchTab(e){
        let textValue = $(e.target).text();
        PubSub.publish('advanceSearchData',textValue);
    },
    disableStartDate(startValue){
      if(!startValue || !this.state.endValue){
          return false
      }
        return startValue.getTime() >= this.state.endValue.getTime()
    },
    disableEndDate(endValue){
        if(!endValue || !this.state.startValue){
            return false
        }
        return endValue.getTime() <= this.state.startValue.getTime()
    },
    onChange(field , value){
        console.log(field,'change',value);
        this.setState({
            [field]:value
        })
    },
    timeOnChange(){

    },
    render(){
        let generalTableContentStaff = this.state.tableDataStaff.map(function(item,index){
           return(
               <tr key={index}>
                   <td>{item.headerName}</td>
                   <td onClick={this.clickSearchTab}>{item.value_0}</td>
                   <td onClick={this.clickSearchTab}>{item.value_1}</td>
                   <td onClick={this.clickSearchTab}>{item.value_2}</td>
                   <td onClick={this.clickSearchTab}>{item.value_3}</td>
                   <td onClick={this.clickSearchTab}>{item.value_4}</td>
                   <td onClick={this.clickSearchTab}>{item.value_5}</td>
               </tr>
           )
        }.bind(this));
        let starTimeAndEndTime =
            <div className = 'vehicle-out-start'>
                <DatePicker className="car-out-start" disabledDate={this.disableStartDate}
                            value={this.state.startValue}
                            placeholder="开始日期"
                            onChange={this.onChange.bind(this, 'startValue')} />
                <span className = "start-date-space">至</span>
                <DatePicker  className="car-out-start" disabledDate={this.disableEndDate}
                            value={this.state.endValue}
                            placeholder="结束日期"
                            onChange={this.onChange.bind(this, 'endValue')} />
            </div>
        let panel ='';
        switch (this.props.pageShow){
            case 'staff':
                panel =(
                    <div>
                        <div className = 'table-title'>
                            <span>所有职员<Icon type="right" />共999个职员</span>
                        </div>
                        <table className = "advanced-table">
                            <tbody>
                            {generalTableContentStaff}
                            </tbody>
                        </table>
                    </div>
                );
                break;
            case 'vehicle':
                panel = (
                    <div>
                        <div className = 'table-title'>
                            <span>所有车辆<Icon type="right" />共999个车辆</span>
                        </div>
                        <table className = "advanced-table">
                            <tbody>
                                <tr className = "car-type-up">
                                    <td rowSpan="2">车辆类型：</td>
                                    <td onClick={this.clickSearchTab}>1-15座客车</td>
                                    <td onClick={this.clickSearchTab}>1-15座客车</td>
                                    <td onClick={this.clickSearchTab}>1-15座客车</td>
                                    <td onClick={this.clickSearchTab}>1-15座客车</td>
                                    <td onClick={this.clickSearchTab}>1-15座客车</td>
                                </tr>
                                <tr className = "car-type-down">
                                    <td onClick={this.clickSearchTab}>10-30吨客车</td>
                                    <td onClick={this.clickSearchTab}>货车（冷藏）</td>
                                    <td onClick={this.clickSearchTab}>货车（危险品）</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td onClick={this.clickSearchTab}>任务类型：</td>
                                    <td onClick={this.clickSearchTab}>周期任务</td>
                                    <td onClick={this.clickSearchTab}>普通任务</td>
                                    <td onClick={this.clickSearchTab}>多车任务</td>
                                    <td onClick={this.clickSearchTab}>单车任务</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>出车时间：</td>
                                    <td className="vehicle-out-start">
                                        <DatePicker className="car-out-start" disabledDate={this.disableStartDate}
                                                    value={this.state.startValue}
                                                    placeholder="开始日期"
                                                    onChange={this.onChange.bind(this, 'startValue')} />
                                    </td>
                                    <td>至</td>
                                    <td className="vehicle-out-start">
                                        <DatePicker  className="car-out-start" disabledDate={this.disableEndDate}
                                                     value={this.state.endValue}
                                                     placeholder="结束日期"
                                                     onChange={this.onChange.bind(this, 'endValue')} />
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>回车时间：</td>
                                    <td><TimePicker onChange={this.timeOnChange} /></td>
                                    <td>至</td>
                                    <td><TimePicker onChange={this.timeOnChange} /></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
        }
        return(
                <div className = "advanced-search-panel">
                    {panel}
                </div>
        )
    }
});
export{EditDialog,SendMessageDialog,AddDialog,LookDialog,AdvancedSearchPanel}
