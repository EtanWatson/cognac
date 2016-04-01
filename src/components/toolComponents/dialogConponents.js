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
import {typeStatusStaffMixin} from './../mixin/typeStatus';
import {advanceSearchMixin} from  './../mixin/advanceSearch';
import {utilMixin} from './../mixin/util';
import {staff} from '../../models/staff'
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
    getInitialState(){
      return{
          //测试数据
          editInfo:{
              id:'1001',
          avatar :'/img/icon_user_head_50_50_have_1.png',
          code : 'code',
          name :'王宇亭$',
          sex:'0',
          department:'部门',
          duties:'职务',
          IDCardNo:'身份证号',
          tel:'w12312',
          address:'地址',
          employmentDate:'12313',
          comment:'321312',
          nonUse:'0',
          status:'0',
          role:'0',
          licenseType:'准驾类型',
          licenseNo:'你好',
          expirationDate:'dsasda',
          licensingOrganization:'dasda',
          auditDate:'sda',
          licensingDate:'ads'}
      }
    },
    componentDidMount(){
        //发送请求获取数据
        //对应aliasName
    },
    componentWillReceiveProps(){

    },
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        let modifyForm  = this.props.form.getFieldsValue();
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
        const  validateForm = this.validateFormEdit(this.props.form.getFieldProps);
        const  getFieldProps = validateForm.getFieldProps;
        const  staffInfo = this.state.editInfo;
        console.log(staffInfo);
        let isDriver = this.typeStatusInfo(staffInfo,validateForm).isDriver;
        let typeStatus =this.typeStatusInfo(staffInfo,validateForm).typeStatus;
        console.log(typeStatus);
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
                                <img src= {staffInfo.avatar} className = "header-img" />
                            </div>
                        </Col>
                        <Col span = "16" className="header-right">
                            <h3>{staffInfo.name}</h3>
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
                               label="编码：" labelCol={{span: 8}} required>
                               <AntInput type="text" {...validateForm.code} placeholder="" />
                           </FormItem>
                       </Col>
                       <Col span = '12'></Col>
                   </Row>
                   <Row type = 'flex' justify="center">
                       <Col span = '12'>
                           <FormItem
                               {...formItemLayout}
                               label="部门：" labelCol={{span: 8}}>
                               <AntInput type="text" {...getFieldProps('department',{initialValue:staffInfo.department})} placeholder=""/>
                           </FormItem>
                       </Col>
                       <Col span = '12'>
                           <FormItem
                               {...formItemLayout}
                               label="性别：" required>
                               <RadioGroup {...getFieldProps('sex', { initialValue: "0" })}>
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
                               label="身份证号：" labelCol={{span: 8}} required>
                               <AntInput type="text" placeholder="" {...validateForm.IDCardNo} />
                           </FormItem>
                       </Col>
                       <Col span = "12"></Col>
                   </Row>
                   <Row type = 'flex' justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label="地址：" labelCol={{span: 8}}>
                               <AntInput type="text" placeholder="" {...getFieldProps('address',{initialValue:staffInfo.address})} />
                           </FormItem>
                       </Col>
                       <Col span = "12"></Col>
                   </Row>
                   <Row type = "flex" justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label="入职日期：" labelCol={{span: 8}} >
                               <DatePicker  {...getFieldProps('employmentDate',{initialValue:'2015-01-01'})}/>
                           </FormItem>
                       </Col>
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               hasFeedback
                               label="电话号码：" required>
                               <AntInput type="text" placeholder="" {...validateForm.tel} />
                           </FormItem>
                       </Col>
                   </Row>
                   <Row type = "flex" justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label="备注：" labelCol={{span: 8}} >
                               <AntInput type="text" placeholder="" {...getFieldProps('comment',{initialValue:staffInfo.comment})} />
                           </FormItem>
                       </Col>
                       <Col span = "12"></Col>
                   </Row>
                   <Row type = "flex" justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label="是否停用：" labelCol={{span: 8}}>
                               <label className = "isOutage">
                                   <Checkbox {...getFieldProps('nonUse')} />
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
    getInitialState(){
      return{
          editInfo:{
              id:'1002',
              avatar:'/img/vehicle-header.png',
              label:'车辆代号',
              code:'编码',
              brand: '车辆品牌',
              model:'车辆型号',
              type:'0',
              tags:'车辆标签',
              color:'车辆颜色',
              capacity:'载重量',
              seats:'座位数',
              oilWear:'油耗',
              enduranceMileage:'续航里程',
              startMileage:'初始里程',
              engineNo:'发动机号',
              vin:'车架号',
              vehicleNo:'车牌号',
              purchaseCompany:'购入单位',
              purchasePrice:'购入价格',
              purchaseDate:'购入日期',
              driverName:'司机',
              driverTel:'手机手机',
              department:'所属部门',
              vehicleOwner:'所属车主',
              vehicleOwnerTel:'车主手机',
              vehicleGroup:'所属车队',
              oilCardNo:'油卡编号',
              electricCardNo:'电卡编号',
              status:'0',
              nonUse:'是否停用',
              comment:'备注'
          }
      }
    },
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
        let cardInfo =this.state.editInfo;
        return (
            <Form horizontal onSubmit={this.handleSubmit} className = 'add-form'>
                <div className = "up-info">
                    <Row type = 'flex' justify="center">
                        <Col span = "8">
                            <div className = "header-icon">
                                <img src= {cardInfo.avatar} />
                            </div>
                        </Col>
                        <Col span = "16" className="header-right">
                            <h3>{cardInfo.code}</h3>
                            <Row type = "flex">
                                <Col span = "4">
                                    <div className = "type-text right">车牌号</div>
                                </Col>
                                <Col span = "12">
                                    <div className = "status-text right">{cardInfo.vehicleNo}</div>
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
                                <AntInput type="text" {...getFieldProps('brand')} placeholder="" />
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机：" >
                                <AntInput type="text" {...getFieldProps('driverName')} placeholder=""  />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆型号：">
                                <AntInput type="text" {...getFieldProps('model')} placeholder="" />
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机手机：">
                                <AntInput type="text" {...getFieldProps('driverTel')} placeholder="" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆类型：">
                                <AntInput type="text" placeholder="" {...getFieldProps('type')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：">
                                <AntInput type="text" placeholder="" {...getFieldProps('department')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="标签：">
                                <AntInput type="text" placeholder="" {...getFieldProps('tags')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车主：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vehicleOwner')} />
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
                                <AntInput type="text" placeholder="" {...getFieldProps('vehicleOwnerTel')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="载重（吨）：" >
                                <AntInput type="text" placeholder="" {...getFieldProps('capacity')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车队：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vehicleGroup')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="座位数：">
                                <AntInput type="text" placeholder="" {...getFieldProps('seats')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="油卡编号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('oilCardNo')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12" className = "oil-input">
                            <FormItem
                                {...formItemLayout}
                                label="油耗：" >
                                <AntInput type="text" placeholder="" {...getFieldProps('oilWear')} />
                                <span className = "unit">升/百公里</span>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="电卡编号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('oilCardNo')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12" className = "continue-input">
                            <FormItem
                                {...formItemLayout}
                                label="续航里程：">
                                <AntInput type="text" placeholder="" {...getFieldProps('enduranceMileage')} />
                                <span className = "unit">KM</span>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆状态：">
                                <Select defaultValue="0" {...getFieldProps('status')}>
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
                                <AntInput type="text" placeholder="" {...getFieldProps('startMileage')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="是否停用：" >
                                <label className = "isOutage">
                                    <Checkbox {...getFieldProps('nonUse')} />
                                </label>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="发动机号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('engineNo')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="车架号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vin')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入单位：">
                                <AntInput type="text" placeholder="" {...getFieldProps('purchaseCompany')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入价格：" >
                                <AntInput type="text" placeholder="" {...getFieldProps('purchasePrice')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入日期："  >
                                <DatePicker  {...getFieldProps('purchaseDate')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                wrapperCol={{span:14,offset:8}}
                                label="备注：">
                                <AntInput  type="textarea"   {...getFieldProps('comment')} placeholder="请输入..." id="textarea-more" name="textarea" className = 'vehicle-more'/>
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
    mixins:[BackboneReactMixin,validateMixin],
    getInitialState(){
        return{
            visible : false,
            isCreateTask:false
        }
    },
    handleSubmit(e) {
        this.setState({
            isCreateTask:false,
            visible:false
        });
        this.props.callbackParentOfAdd(false);
        console.log('收到表单值：', this.props.form.getFieldsValue());
        //let formValue = this.props.form.getFieldsValue().id='12233';
        //this.getCollection().push(this.props.form.getFieldsValue());
        //console.log('保存表单值'+this.state.collection);
        //this.props.callbackParentOfAdd(true);
    },

    handleCancel(){
        this.setState({
            visible:false
        })
        this.props.form.resetFields();
        this.props.callbackParentOfAdd(false);
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

        //console.log( $("#createTask").serializeArray());
    } ,
    handleAlertCancel(event){
        this.setState({
            isCreateTask:false
        });
        this.props.form.resetFields();
    },
    render() {
        //const  validateForm = this.validateFormAdd(this.props.form.getFieldProps);
        //const getFieldProps = validateForm.getFieldProps;
        const { getFieldProps } = this.props.form;
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var week = date.getDay();
        var today = year+"-"+month+"-"+day;
        var todayWeek = '';
        switch(week){
            case 0:
                todayWeek='日';
                break;
            case 1:
                todayWeek='一';
                break;
            case 2:
                todayWeek='二';
                break;
            case 3:
                todayWeek='三';
                break;
            case 4:
                todayWeek='四';
                break;
            case 5:
                todayWeek='五';
                break;
            case 6:
                todayWeek='六';
                break;
        }
        var showWeek = "(周"+todayWeek+")";
        let addTaskShow = function (){

            if(this.state.isCreateTask)
            {
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
                                            <span>{today}</span>
                                            <span>{showWeek}</span>
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
                                    <button className="okbtn" onClick={this.handleSubmit}>确认</button>
                                    <button className="canclebtn" onClick={this.handleAlertCancel}>取消</button>
                                </li>
                            </ul>
                         </div>
                    </div>
                )
            }
        }.bind(this);
        return (
            <Form id="createTask" className = 'add-task'onSubmit={this.handleSubmit}   form={this.props.form}>
                <div className="title">添&nbsp;加&nbsp;任&nbsp;务</div>
                <div className="task-dialog-content">
                    <ul>
                        <li className="first-messsage">
                            <span className="span1">编</span><span className="span2">码：</span>
                            <span className="number">1</span>
                            <label htmlFor="" className="destination">&nbsp;目的地：</label>
                            <AntInput className="inputBox" type="text" {...getFieldProps('destination')} id='name'/>
                        </li>
                        <li>
                            <label className="people" htmlFor="">用车人：</label>
                            <AntInput className="inputBox" type="text" name="a2" {...getFieldProps('vehicleUser')}/>
                            <label htmlFor="">用车时间：</label>
                            <DatePicker {...getFieldProps('vehicleUseTime')}/>
                        </li>
                        <li>
                            <label htmlFor="">估计用时：</label>
                            <AntInput className="inputBox" type="text" name="a3" {...getFieldProps('costTime')}/>
                            <label htmlFor="">用车原因：</label>
                            <AntInput className="inputBox" type="text" name="a4" {...getFieldProps('vehicleUseReason')}/>
                        </li>
                        <li>
                            <label htmlFor="">申请车型：</label>
                            <AntInput className="inputBox" type="text" name="a5" {...getFieldProps('applyForVehicleModel')}/>
                            <label htmlFor="">随车人数：</label>
                            <AntInput className="inputBox" type="text" name="a6" {...getFieldProps('passengers')}/>
                        </li>
                        <li>
                            <label htmlFor="">出车备注：</label>
                            <AntInput className="inputBox-long" type="text" name="a7" {...getFieldProps('comment')}/>
                        </li>
                        <li>
                            <label className="Perio-task">
                                <Checkbox defaultChecked={false} {...getFieldProps('scheduledMission')}/>
                                周期任务
                            </label>
                        </li>
                        <li>
                            <ul className="startDate">
                                <li>
                                    <label htmlFor="">起始日期：</label>
                                    <DatePicker {...getFieldProps('startDate')}/>
                                    <label className="endDate" htmlFor="">结束日期(选填)：</label>
                                    <DatePicker {...getFieldProps('endDate')} />
                                </li>
                                <li>
                                    <label>
                                        <Checkbox defaultChecked={false} {...getFieldProps('sunday')}/>
                                        日
                                    </label>
                                    <label>
                                        <Checkbox defaultChecked={false} {...getFieldProps('monday')}/>
                                        一
                                    </label>
                                    <label>
                                        <Checkbox defaultChecked={false} {...getFieldProps('tuesday')}/>
                                        二
                                    </label>
                                    <label>
                                        <Checkbox defaultChecked={false} {...getFieldProps('wednesday')}/>
                                        三
                                    </label>
                                    <label>
                                        <Checkbox defaultChecked={false} {...getFieldProps('thursday')}/>
                                        四
                                    </label>
                                    <label>
                                        <Checkbox defaultChecked={false} {...getFieldProps('friday')}/>
                                        五
                                    </label>
                                    <label>
                                        <Checkbox defaultChecked={false} {...getFieldProps('saturday')}/>
                                        六
                                    </label>
                                </li>
                            </ul>
                        </li>
                        <li className="creator">任务创建人：admin</li>
                        <li className="create-task-submit">
                            <AntButton className="btn create-btn" onClick={this.handleCreateTask}>创建任务</AntButton>
                            <AntButton className="btn cancel-btn" onClick ={this.handleCancel}>取消</AntButton>
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
        let model = this.props.form.getFieldsValue();
        model.isDriver = true;
        //$.ajax(
        //    {
        //        type:'post',
        //        url:'http://10.1.1.132:8080/api/staff/new',
        //        data:model,
        //        dataType:'json',
        //        success:function(){
        //
        //        },
        //        error:function(){
        //
        //        }
        //    }
        //);

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
        const upLoadProps = {
            action: '/upload.do',
            listType: 'picture-card'
        };
        return (
            <Form horizontal onSubmit={this.handleSubmit} className = 'add-form' form={this.props.form}>
                <div className = "up-info">
                    <Row type = 'flex' justify="center">
                        <Col span = '8' className = 'up-info-header-img'>
                            <FormItem>
                            <Upload {...upLoadProps}>
                                <img className = "upLoad-img-btn" src="/img/icon_userpic.png" />
                            </Upload>
                            </FormItem>
                        </Col>
                        <Col span = '12' className = 'up-info-header-text'>
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="姓名："  required>
                                <AntInput type="text" {...validateForm.name} id='name' placeholder=""  />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="职务："  required>
                                <AntInput type="text" {...validateForm.duties} id='duties' placeholder=""  />
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
                                <AntInput type="text" {...validateForm.code} id='code' placeholder=""  />
                            </FormItem>
                        </Col>
                        <Col span = '12'></Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：">
                                <AntInput type="text" {...getFieldProps('department')} id = 'department'  placeholder="" />
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="性别：" required>
                                <RadioGroup {...getFieldProps('sex', { initialValue: "male" })}>
                                    <Radio value="male">男</Radio>
                                    <Radio value="female">女</Radio>
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
                                <AntInput type="text" {...validateForm.IDCardNo} placeholder="" id = "IDCardNo" />
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
                                <DatePicker placeholder="" {...getFieldProps('employmentDate')} id = "employmentDate"/>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="手机：" required>
                                <AntInput type="text" placeholder="" {...validateForm.tel} id = 'tel' />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="备注：">
                                <AntInput type="text" placeholder="" {...getFieldProps('comment')} id = "comment" />
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
                                    <Checkbox {...getFieldProps('nonUse',{ initialValue: false })} defaultChecked ={false}  />
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
                                        <AntInput type="text" placeholder="" {...validateForm.licenseNo}id = "licenseNo" />
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
                                        <DatePicker id = "expirationDate" {...validateForm.expirationDate} />
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
                                        <AntInput type="text" placeholder="" id = "licensingOrganization" {...validateForm.licensingOrganization}/>
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
                                        <DatePicker  placeholder="" id = "auditDate" {...validateForm.auditDate} />
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
                                        <DatePicker id = "licensingDate" {...validateForm.licensingDate} />
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
        console.log('收到表单值：', this.props.form.getFieldsValue());
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
                                <AntInput type="text" {...getFieldProps('code')} placeholder="" value="" />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="车牌号：" >
                                <AntInput type="text" {...getFieldProps('vehicleNo')} placeholder="" value="" />
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
                                <AntInput type="text" {...getFieldProps('brand')} placeholder="" value="01" />
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机：" >
                                <AntInput type="text" {...getFieldProps('driverName')} placeholder="" value="01" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆型号：">
                                <AntInput type="text" {...getFieldProps('model')} placeholder="" />
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机手机：">
                                <AntInput type="text" {...getFieldProps('driverTel')} placeholder="" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆类型：">
                                <AntInput type="text" placeholder="" {...getFieldProps('type')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：">
                                <AntInput type="text" placeholder="" {...getFieldProps('department')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="标签：">
                                <AntInput type="text" placeholder="" {...getFieldProps('tags')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车主：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vehicleOwner')} />
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
                                <AntInput type="text" placeholder="" {...getFieldProps('vehicleOwnerTel')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="载重（吨）：" >
                                <AntInput type="text" placeholder="" {...getFieldProps('capacity')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车队：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vehicleGroup')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="座位数：">
                                <AntInput type="text" placeholder="" {...getFieldProps('seats')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="油卡编号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('oilCardNo')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="油耗：" >
                                <AntInput type="text" placeholder="" {...getFieldProps('oilWear')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="电卡编号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('electricCardNo')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={<div><p>续航里程：</p><p>（电车）</p></div>}>
                                <AntInput type="text" placeholder="" {...getFieldProps('enduranceMileage')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆状态：">
                                <Select defaultValue="0" {...getFieldProps('status')} >
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
                                <AntInput type="text" placeholder="" {...getFieldProps('startMileage')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="是否停用：" >
                                <label className = "isOutage">
                                    <Checkbox {...getFieldProps('nonUse')} />
                                </label>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="发动机号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('engineNo')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="车架号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vin')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入单位：">
                                <AntInput type="text" placeholder="" {...getFieldProps('purchaseCompany')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入价格：" >
                                <AntInput type="text" placeholder="" {...getFieldProps('purchasePrice')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入日期：" {...getFieldProps('purchaseDate')} >
                                <DatePicker  />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                wrapperCol={{span:14,offset:8}}
                                label="备注：">
                                <AntInput  type="textarea" placeholder="请输入..."
                                    {...getFieldProps('comment')}
                                           id="textarea-more" name="textarea" className = 'vehicle-more' />
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
        if(nextProps.isSendMessage){
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
            if(nextProps.selectItem){
                this.setState({
                    visible:true,
                    selectValueArray:nextProps.selectItem
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
    mixins:[BackboneReactMixin,typeStatusStaffMixin],
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
        let isDriver = this.typeStatusInfoLook(staffInfo).isDriver;
        let typeStatus = this.typeStatusInfoLook(staffInfo).typeStatus;
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
                            <h3>{staffInfo.name}</h3>
                            {typeStatus}
                        </Col>
                    </Row>
                </div>
                <div className = "middle-info">
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="编码：" required>
                                <p>{staffInfo.code}</p>
                            </FormItem>
                        </Col>
                        <Col span = '12'></Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="部门：" >
                                <p>{staffInfo.department}</p>
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="性别：" required>
                                <p>{staffInfo.sex}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="身份证号：" required>
                                <p>{staffInfo.IDCardNo}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="地址：">
                                <p>{staffInfo.address}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="入职：">
                                <p>{staffInfo.employmentDate}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="：" required>
                                <p>{staffInfo.tel}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="备注" required>
                                <p>{staffInfo.comment}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="是否停用">
                                <label className = "isOutage">
                                    <Checkbox {...getFieldProps('nonUse')} defaultChecked={false} disabled/>
                                </label>
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    {isDriver}
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
        console.log(this.state.model);
        const vehicleInfo = this.state.model;
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
                            <h3>{vehicleInfo.label}</h3>
                            <Row type = "flex">
                                <Col span = "4">
                                    <div className = "type-text right">车牌号：</div>
                                </Col>
                                <Col span = "12">
                                    <div className = "status-text right">{vehicleInfo.vehicleNo}</div>
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
                                <p>{vehicleInfo.brand}</p>
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机：" >
                                <p>{vehicleInfo.driverName}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆型号：">
                                <p>{vehicleInfo.model}</p>
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机手机：">
                                <p>{vehicleInfo.driverTel}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆类型：">
                                <p>{vehicleInfo.type}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：">
                                <p>{vehicleInfo.department}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="标签：">
                                <p>{vehicleInfo.tags}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车主：">
                                <p>{vehicleInfo.vehicleOwner}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="颜色：">
                                <p>{vehicleInfo.color}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车主手机：" >
                                <p>{vehicleInfo.driverTel}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="载重（吨）：" >
                                <p>{vehicleInfo.capacity}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车队：">
                                <p>{vehicleInfo.vehicleGroup}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="座位数：">
                                <p>{vehicleInfo.seats}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="油卡编号：">
                                <p>{vehicleInfo.oilCardNo}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="油耗：" >
                                <p>{vehicleInfo.oilWear}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="电卡编号：">
                                <p>{vehicleInfo.electricCardNo}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="续航里程">
                                <p>{vehicleInfo.enduranceMileage}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆状态：">
                                <Select defaultValue={vehicleInfo.status} disabled>
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
                                <p>{vehicleInfo.startMileage}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="是否停用：" >
                                <label className = "isOutage">
                                    <Checkbox {...getFieldProps('nonUse')} defaultChecked={false} disabled />
                                </label>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="发动机号：">
                                <p>{vehicleInfo.engineNo}</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="车架号：">
                                <p>{vehicleInfo.vin}</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入单位：">
                                <p>{vehicleInfo.purchaseCompany}</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入价格：" >
                                <p>{vehicleInfo.purchasePrice}</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入日期："  >
                                <p>{vehicleInfo.purchaseDate}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                wrapperCol={{span:14,offset:8}}
                                label="备注：">
                                <AntInput  type="textarea" placeholder="请输入..." id="textarea-more" name="textarea" className = 'vehicle-more' value={vehicleInfo.comment}/>
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
    mixins:[advanceSearchMixin],
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
            </div>;
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
                panel = this.advanceSearch();
                break;
            case 'task':
                panel = this.advanceSearch();
                break;
        }
        return(
                <div className = "advanced-search-panel">
                    {panel}
                </div>
        )
    }
});
export{EditDialog,SendMessageDialog,AddDialog,LookDialog,AdvancedSearchPanel}
