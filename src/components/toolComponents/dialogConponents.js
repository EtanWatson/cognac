/**
 * dialog
 * use Ant Design UI
 */
import React from 'react';
import {render} from 'react-dom';
import {Button as AntButton,Modal,Row, Col,Input as AntInput,Icon,Form, Select, Checkbox, Radio ,Tooltip,DatePicker,Collapse,Upload,Menu,Cascader} from 'antd';
import BackboneReactMixin from 'backbone-react-component';
import {SearchInput} from "./selectAutoCompletion"
import {staffs} from "../../models/staffInfo"
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
//form的整体布局
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 }
};
//准驾车型options
const licenseTypeOptions=[
    {
    value: 'A',
    label: 'A',
    children: [
        {
            value: 'A1',
            label: 'A1'
        },
        {
            value: 'A2',
            label: 'A2'
        }
    ]
}, {
    value: 'B',
    label: 'B',
    children: [
        {
            value: 'B1',
            label: 'B1'
        },
        {
            value: 'B2',
            label: 'B2'
        }
    ]
}];
//准驾车型，只展示最后一项
function displayRender(label) {
    return label[label.length - 1];
}
let EditTable = React.createClass({
    mixins:[BackboneReactMixin],
    componentDidMount(){
    },
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        let modifyForm  = this.props.form.getFieldsValue();
        for( var modifyItem in modifyForm){
            if(modifyForm[modifyItem]){
                if(typeof modifyForm[modifyItem]=='object'){
                    modifyForm[modifyItem]=modifyForm[modifyItem].toString();
                }
                this.getModel().get(modifyItem).value=modifyForm[modifyItem]
            }
        }
        this.props.callbackParentOfEdit('edit');
    },
    handleCancel(){
        this.props.callbackParentOfEdit('noEdit');
    },
    render() {
        const { getFieldProps } = this.props.form;
        let staffInfo = this.state.model;
        return (
            <Form horizontal onSubmit={this.handleSubmit} className = 'edit-form'>
               <div className = "up-info">
                   <Row type = 'flex' justify="center">
                        <Col span = "8">
                            <div className = "header-icon">
                                <img src= "/img/icon_user_head_50_50_have_9.png" />
                            </div>
                        </Col>
                        <Col span = "16" className="header-right">
                            <h3>{staffInfo.Name.value}</h3>
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
                               label={staffInfo.Code.aliasName+"："} labelCol={{span: 8}} required>
                               <AntInput type="text" {...getFieldProps('Code')} placeholder=""/>
                           </FormItem>
                       </Col>
                       <Col span = '12'></Col>
                   </Row>
                   <Row type = 'flex' justify="center">
                       <Col span = '12'>
                           <FormItem
                               {...formItemLayout}
                               label={staffInfo.Section.aliasName+"："} labelCol={{span: 8}}>
                               <AntInput type="text" {...getFieldProps('Section')} placeholder=""/>
                           </FormItem>
                       </Col>
                       <Col span = '12'>
                           <FormItem
                               {...formItemLayout}
                               label={staffInfo.Gender.aliasName+"："} required>
                               <RadioGroup {...getFieldProps('Gender', { initialValue: 'female' })}>
                                   <Radio value="0">男的</Radio>
                                   <Radio value="1">女的</Radio>
                               </RadioGroup>
                           </FormItem>
                       </Col>
                   </Row>
                   <Row type = 'flex' justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label={staffInfo.Id.aliasName+"："} labelCol={{span: 8}} required>
                               <AntInput type="text" placeholder="" {...getFieldProps('Id')} />
                           </FormItem>
                       </Col>
                       <Col span = "12"></Col>
                   </Row>
                   <Row type = 'flex' justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label={staffInfo.Address.aliasName+"："} labelCol={{span: 8}}>
                               <AntInput type="text" placeholder="" {...getFieldProps('Address')} />
                           </FormItem>
                       </Col>
                       <Col span = "12"></Col>
                   </Row>
                   <Row type = "flex" justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label={staffInfo.JoinData.aliasName+"："} labelCol={{span: 8}} >
                               <DatePicker  {...getFieldProps('JoinData')}/>
                           </FormItem>
                       </Col>
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label={staffInfo.PhoneNumber.aliasName+"："} required>
                               <AntInput type="text" placeholder="" {...getFieldProps('PhoneNumber')} />
                           </FormItem>
                       </Col>
                   </Row>
                   <Row type = "flex" justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label={staffInfo.Remark.aliasName+"："} labelCol={{span: 8}} required>
                               <AntInput type="text" placeholder="" {...getFieldProps('Remark')} />
                           </FormItem>
                       </Col>
                       <Col span = "12"></Col>
                   </Row>
                   <Row type = "flex" justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label={staffInfo.OutAge.aliasName+":"} labelCol={{span: 8}}>
                               <label className = "isOutage">
                                   <Checkbox {...getFieldProps('OutAge')} />
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
                                       label={staffInfo.DrivingLicense.aliasName+"："} labelCol={{span: 8}} required>
                                       <AntInput type="text" placeholder="" {...getFieldProps('DrivingLicense')} />
                                   </FormItem>
                               </Col>
                               <Col span = "12"></Col>
                          </Row>
                           <Row type = 'flex' justify="center">
                               <Col span = "12">
                                   <FormItem
                                       {...formItemLayout}
                                       label={staffInfo.ValidDate.aliasName+"："} labelCol={{span: 8}} required>
                                       <DatePicker {...getFieldProps('ValidDate')} />
                                   </FormItem>
                               </Col>
                               <Col span = "12"></Col>
                           </Row>
                           <Row type = 'flex' justify="center">
                               <Col span = "12">
                                   <FormItem
                                       {...formItemLayout}
                                       label={staffInfo.AuthorizedBy.aliasName+"："} labelCol={{span: 8}} required>
                                       <AntInput type="text" placeholder="" {...getFieldProps('AuthorizedBy')} />
                                   </FormItem>
                               </Col>
                               <Col span = "12"></Col>
                           </Row>
                           <Row type = 'flex' justify="center">
                               <Col span = "12">
                                   <FormItem
                                       {...formItemLayout}
                                       label={staffInfo.AnnualExamination.aliasName+"："} labelCol={{span: 8}} required>
                                       <DatePicker  {...getFieldProps('AnnualExamination')}/>
                                   </FormItem>
                               </Col>
                               <Col span = "12"></Col>
                           </Row>
                           <Row type = 'flex' justify="center">
                               <Col span = "12">
                                   <FormItem
                                       {...formItemLayout}
                                       label={staffInfo.StartLicenseData.aliasName+"："} labelCol={{span: 8}} required>
                                       <DatePicker  {...getFieldProps('StartLicenseData')} />
                                   </FormItem>
                               </Col>
                               <Col span = "12"></Col>
                           </Row>
                           <Row type = 'flex' justify="center">
                               <Col span = "12">
                                   <FormItem
                                       {...formItemLayout}
                                       label={staffInfo.LicenseType.aliasName+"："} labelCol={{span: 8}} required>
                                       <Cascader  options={licenseTypeOptions} expandTrigger="hover" popupClassName="form-cascader"
                                                  displayRender={displayRender}  {...getFieldProps('LicenseType')} />
                                   </FormItem>
                               </Col>
                               <Col span = "12"></Col>
                           </Row>
                       </Panel>
                   </Collapse>
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
        let cardInfo = this.props.cardInfo;
        return (
            <Form horizontal onSubmit={this.handleSubmit} className = 'add-form'>
                <div className = "up-info">
                    <Row type = 'flex' justify="center">
                        <Col span = "8">
                            <div className = "header-icon">
                                <img src= "/img/icon_user_head_50_50_have_9.png" />
                            </div>
                        </Col>
                        <Col span = "16" className="header-right">
                            <h3>{cardInfo.name}</h3>
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
                                <AntInput  type="textarea" placeholder="随便写" id="textarea-more" name="textarea" className = 'vehicle-more' />
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
        //console.log('editItem pageShow:'+pageShow);

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
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        let formValue = this.props.form.getFieldsValue().id='12233';
        this.getCollection().push(this.props.form.getFieldsValue());
        //console.log('保存表单值'+this.state.collection);
        this.props.callbackParentOfAdd(true);
    },
    handleCancel(){
        this.props.callbackParentOfAdd(false);
    },
    handleUpload(){

    },
    createEntry: function (entry) {
    },
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className = 'add-task'>
                <div className="title">添&nbsp;加&nbsp;任&nbsp;务</div>
                <div className="task-content">
                    <ul>
                        <li className="first-messsage">
                            <span className="span1">编</span><span className="span2">码：</span>
                            <span className="number">1</span>
                            <label for="" className="destination">&nbsp;目的地：</label>
                            <input className="inputBox" type="text"/>
                        </li>
                        <li>
                            <label className="people" for="">用车人：</label>
                            <input className="inputBox" type="text"/>
                            <label for="">用车时间：</label>
                            <DatePicker placeholder="" {...getFieldProps('JoinData')} />
                        </li>
                        <li>
                            <label for="">估计用时：</label>
                            <input className="inputBox" type="text"/>
                            <label for="">用车原因：</label>
                            <input className="inputBox" type="text"/>
                        </li>
                        <li>
                            <label for="">申请车型：</label>
                            <input className="inputBox" type="text"/>
                            <label for="">随车人数：</label>
                            <input className="inputBox" type="text"/>
                        </li>
                        <li>
                            <label for="">出车备注：</label>
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
                                    <label for="">起始日期：</label>
                                    <DatePicker  placeholder="" {...getFieldProps('JoinData')} />
                                    <label className="endDate" for="">结束日期(选填)：</label>
                                    <DatePicker  placeholder="" {...getFieldProps('JoinData')} />
                                </li>
                                <li>
                                    <label for="">起始日期：</label>
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
                            <button className="btn create-btn">创建任务</button>
                            <button className="btn cancel-btn">取消</button>
                        </li>
                    </ul>
                </div>
            </Form>
        );
    }
});
//添加条目table(task)
AddTask = Form.create()(AddTask);
//添加条目table(staff)
let AddTable = React.createClass({
    mixins:[BackboneReactMixin],
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        let formValue = this.props.form.getFieldsValue().id='12233';
        this.getCollection().push(this.props.form.getFieldsValue());
        //console.log('保存表单值'+this.state.collection);
        this.props.callbackParentOfAdd(true);
    },
    handleCancel(){
        this.props.callbackParentOfAdd(false);
    },
    handleUpload(){

    },
    createEntry: function (entry) {
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
                                label="姓名："  required>
                                <AntInput type="text" {...getFieldProps('Name')} placeholder=""  />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="职务："  required>
                                <AntInput type="text" {...getFieldProps('Job')} placeholder=""  />
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className = "middle-info">
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="编码：" required>
                                <AntInput type="text" {...getFieldProps('Code')} placeholder=""  />
                            </FormItem>
                        </Col>
                        <Col span = '12'></Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：">
                                <AntInput type="text" {...getFieldProps('Section')} placeholder="" />
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="性别：" required>
                                <RadioGroup {...getFieldProps('Gender', { initialValue: 'female' })}>
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
                                label="身份证号："  required>
                                <AntInput type="text" placeholder="" {...getFieldProps('Id')} />
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="家庭住址：">
                                <AntInput type="text" placeholder="" {...getFieldProps('Address')} />
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="入职日期：" >
                                <DatePicker placeholder="" {...getFieldProps('JoinData')} />
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="手机：" required>
                                <AntInput type="text" placeholder="" {...getFieldProps('PhoneNumber')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="备注：" required>
                                <AntInput type="text" placeholder="" {...getFieldProps('Remark')} />
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
                                    <Checkbox {...getFieldProps('OutAge')} />
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
                                        label="驾驶证号：" required>
                                        <AntInput type="text" placeholder="" {...getFieldProps('DrivingLicense')} />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="有效期限：" required>
                                        <DatePicker {...getFieldProps('ValidDate')} />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="发证机关：" required>
                                        <AntInput type="text" placeholder="" {...getFieldProps('AuthorizedBy')} />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="年审到期：" required>
                                        <DatePicker  placeholder=""  {...getFieldProps('AnnualExamination')} />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="领证日期："  required>
                                        <DatePicker {...getFieldProps('StartLicenseData')} />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="准驾车型：" required>
                                        <DatePicker {...getFieldProps('LicenseType')} />
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
                                <AntInput  type="textarea" placeholder="随便写" id="textarea-more" name="textarea" className = 'vehicle-more' />
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
            visible:nextProps.isAdd,
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
            visible :this.props.isSendMessage,
            selectVisible:false,
            inputValue :'',
            selectValue:'',
            selectValueArray:[],
            searchSelectHeight:'100px'
        };
    },
    componentDidMount(){

    },
    componentWillReceiveProps(nextProps){
        this.setState({
            visible:nextProps.isSendMessage,
            inputValue:this.state.model.Name.value
        });
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
    handleInputChange(event){
        //this.setState({value: event.target.value});
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
            return(
                <li className = "select-item" key={index}>
                    <span className = "item-content">{item}</span>
                    <span className = "item-remove" data-index={index} onClick={this.handleClickCancel}></span>
                </li>
            )
        }.bind(this));
        return(
            <div className = "send-message">
                <Modal  visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer="" closable={false} className="send-message-modal">
                    <Row>
                        <Col span = "4"><span>短信接收人员:</span></Col>
                        <Col span ="16" >
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
                        <Col span ="4" className = "plus-icon-box">
                            <Icon type="plus-circle-o" className="plus-icon" onClick={this.handleIconClick} />
                            <div className="search-select is-display" >
                                <div className = "search-select-title">添加新的联系人</div>
                                <SearchInput placeholder="搜索关键字" callbackParent = {this.handleSelectChoose} />
                                <AntButton type="primary" size="large" style={{position:'absolute',bottom:'10px',left:'30px'}} onClick={this.handleAddName}>确认添加</AntButton>
                            </div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="start">
                        <Col span ="16" offset="4" className = "input-tip"><span className = "">使用"@姓名"可以快速添加短信内容</span></Col>
                    </Row>
                    <Row className ="send-content">
                        <Col span = "4"><span>消息内容:</span></Col>
                        <Col span ="16" className = "input-textarea" ><AntInput type="textarea" placeholder="" /></Col>
                    </Row>
                    <Row className = "send-message-er-box">
                        <Col span = "4"><span>消息创建人:</span></Col>
                        <Col span ="4" ><div className = "send-message-er">张三</div></Col>
                    </Row>

                    <Row className = "send-btn">
                        <Col span = "4"><AntButton type="primary" onClick = {this.handleOK}>发送</AntButton></Col>
                        <Col span = "4" offset="16"><AntButton type="primary" onClick ={this.handleCancel}>退出</AntButton></Col>
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
                            <h3>{staffInfo.Name.value}</h3>
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
                                label={staffInfo.Code.aliasName+"："} required>
                                <p>{staffInfo.Code.value}</p>
                            </FormItem>
                        </Col>
                        <Col span = '12'></Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.Section.aliasName+"："} >
                                <p>{staffInfo.Section.value}</p>
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.Gender.aliasName+"："} required>
                                <p>{staffInfo.Gender.value}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.Id.aliasName+"："} required>
                                <p>{staffInfo.Id.value}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.Address.aliasName+"："}>
                                <p>{staffInfo.Address.value}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.JoinData.aliasName+"："}>
                                <p>{staffInfo.JoinData.value}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.PhoneNumber.aliasName+"："} required>
                                <p>{staffInfo.PhoneNumber.value}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.Remark.aliasName+"："} required>
                                <p>{staffInfo.Remark.value}</p>
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label={staffInfo.OutAge.aliasName+":"}>
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
                                        label={staffInfo.DrivingLicense.aliasName+"："}  required>
                                        <p>{staffInfo.DrivingLicense.value}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label={staffInfo.ValidDate.aliasName+"："} required>
                                        <p>{staffInfo.ValidDate.value}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label={staffInfo.AuthorizedBy.aliasName+"："}  required>
                                        <p>{staffInfo.AuthorizedBy.value}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label={staffInfo.AnnualExamination.aliasName+"："}  required>
                                        <p>{staffInfo.AnnualExamination.value}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label={staffInfo.StartLicenseData.aliasName+"："} required>
                                        <p>{staffInfo.StartLicenseData.value}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label={staffInfo.LicenseType.aliasName+"："}  required>
                                        <p>{staffInfo.LicenseType.value}</p>
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
                                <AntInput  type="textarea" placeholder="随便写" id="textarea-more" name="textarea" className = 'vehicle-more' />
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

export{EditDialog,SendMessageDialog,AddDialog,LookDialog}
