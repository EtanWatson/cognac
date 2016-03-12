/**
 * dialog
 * use Ant Design UI
 */
import React from 'react';
import {render} from 'react-dom';
import {Button as AntButton,Modal,Row, Col,Input as AntInput,Icon,Form, Select, Checkbox, Radio ,Tooltip,DatePicker,Collapse,Upload,Menu} from 'antd';
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
let EditTable = React.createClass({
    componentDidMount(){
    },
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        this.props.callbackParentOfEdit('edit');
    },
    handleCancel(){
        this.props.callbackParentOfEdit('noEdit');
    },
    render() {
        const { getFieldProps } = this.props.form;
        let cardInfo = this.props.cardInfo;
        //console.log('editDialog cardInfo：'+cardInfo);
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
                            <h3>{cardInfo.name}</h3>
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
                               label="编码：" labelCol={{span: 8}} required>
                               <AntInput type="text" {...getFieldProps('code')} placeholder="请输入密码" value={cardInfo.key} />
                           </FormItem>
                       </Col>
                       <Col span = '12'></Col>
                   </Row>
                   <Row type = 'flex' justify="center">
                       <Col span = '12'>
                           <FormItem
                               {...formItemLayout}
                               label="所在部门：" labelCol={{span: 8}}>
                               <AntInput type="text" {...getFieldProps('section')} placeholder="请输入密码" />
                           </FormItem>
                       </Col>
                       <Col span = '12'>
                           <FormItem
                               {...formItemLayout}
                               label="性别：" required>
                               <RadioGroup {...getFieldProps('gender', { initialValue: 'female' })}>
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
                               label="身份证号：" labelCol={{span: 8}} required>
                               <AntInput type="text" placeholder="" {...getFieldProps('id')} />
                           </FormItem>
                       </Col>
                       <Col span = "12"></Col>
                   </Row>
                   <Row type = 'flex' justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label="家庭住址：" labelCol={{span: 8}}>
                               <AntInput type="text" placeholder="" {...getFieldProps('address')} />
                           </FormItem>
                       </Col>
                       <Col span = "12"></Col>
                   </Row>
                   <Row type = "flex" justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label="入职日期：" labelCol={{span: 8}} >
                               <DatePicker  {...getFieldProps('joinData')}/>
                           </FormItem>
                       </Col>
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label="手机：" required>
                               <AntInput type="text" placeholder="" {...getFieldProps('phone')} />
                           </FormItem>
                       </Col>
                   </Row>
                   <Row type = "flex" justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label="备注：" labelCol={{span: 8}} required>
                               <AntInput type="text" placeholder="" {...getFieldProps('more')} />
                           </FormItem>
                       </Col>
                       <Col span = "12"></Col>
                   </Row>
                   <Row type = "flex" justify="center">
                       <Col span = "12">
                           <FormItem
                               {...formItemLayout}
                               label="是否停用:" labelCol={{span: 8}}>
                               <label className = "isOutage">
                                   <Checkbox {...getFieldProps('outage')} />
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
                                       label="驾驶证号：" labelCol={{span: 8}} required>
                                       <AntInput type="text" placeholder="" {...getFieldProps('driverId')} />
                                   </FormItem>
                               </Col>
                               <Col span = "12"></Col>
                          </Row>
                           <Row type = 'flex' justify="center">
                               <Col span = "12">
                                   <FormItem
                                       {...formItemLayout}
                                       label="有效期限：" labelCol={{span: 8}} required>
                                       <DatePicker  />
                                   </FormItem>
                               </Col>
                               <Col span = "12"></Col>
                           </Row>
                           <Row type = 'flex' justify="center">
                               <Col span = "12">
                                   <FormItem
                                       {...formItemLayout}
                                       label="发证机关：" labelCol={{span: 8}} required>
                                       <AntInput type="text" placeholder="" {...getFieldProps('issue-office')} />
                                   </FormItem>
                               </Col>
                               <Col span = "12"></Col>
                           </Row>
                           <Row type = 'flex' justify="center">
                               <Col span = "12">
                                   <FormItem
                                       {...formItemLayout}
                                       label="年审到期：" labelCol={{span: 8}} required>
                                       <DatePicker  />
                                   </FormItem>
                               </Col>
                               <Col span = "12"></Col>
                           </Row>
                           <Row type = 'flex' justify="center">
                               <Col span = "12">
                                   <FormItem
                                       {...formItemLayout}
                                       label="领证日期：" labelCol={{span: 8}} required>
                                       <DatePicker  />
                                   </FormItem>
                               </Col>
                               <Col span = "12"></Col>
                           </Row>
                           <Row type = 'flex' justify="center">
                               <Col span = "12">
                                   <FormItem
                                       {...formItemLayout}
                                       label="准驾车型：" labelCol={{span: 8}} required>
                                       <DatePicker  />
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
                    return(<EditTable
                        visible={this.state.visible}
                        callbackParentOfEdit={this.handleChildrenChange}
                        cardInfo = {cardInfo}/>);
                    break;
                case 'vehicle':
                    return(<EditTableVehicle
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
                       return(<AddTable
                                    visible={this.state.visible}
                                    callbackParentOfAdd={this.handleChildrenChange} collection={staffs}
                                 />);
                        break;
                case 'vehicle':
                        return(<AddTableOfVehicle
                                        visible={this.state.visible}
                                        callbackParentOfAdd={this.handleChildrenChange}
                                    />);
                        break;
            }
        }.bind(this);
        return(
            <Modal  visible={this.state.visible}  footer="" closable={false} className = "add-modal">
                {addTable()}
            </Modal>
        )
    }

});
//发送消息窗口
const SendMessageDialog = React.createClass({
    getInitialState(){
        return {
            visible :this.props.isSendMessage,
            selectVisible:false
        };

    },
    componentWillReceiveProps(nextProps){
        this.setState({
                visible:nextProps.isSendMessage
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
    render(){
        return(
            <div className = "send-message">
                <Modal  visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer="" closable={false} className="send-message-modal">
                    <Row>
                        <Col span = "4"><span>短信接收人员:</span></Col>
                        <Col span ="16"><AntInput className = "underline-input" /></Col>
                        <Col span ="4" className = "plus-icon-box">
                            <Icon type="plus-circle-o" className="plus-icon" onClick={this.handleIconClick} />
                            <div className="search-select is-display" >
                                <div className = "search-select-title">添加新的联系人</div>
                                <SearchInput placeholder="搜索关键字" />
                                <AntButton type="primary" size="large" style={{position:'absolute',bottom:'10px',left:'35px'}} onClick={this.handleIconClick}>确认添加</AntButton>
                            </div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="start">
                        <Col span ="16" offset="4" className = "input-tip"><span className = "">使用"@姓名"可以快速添加短信内容</span></Col>
                    </Row>
                    <Row>
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
                                label="编码：" required>
                                <p>编码</p>
                            </FormItem>
                        </Col>
                        <Col span = '12'></Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：" >
                                <p>所在部门</p>
                            </FormItem>
                        </Col>
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="性别：" required>
                                <p>性别</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="身份证号：" required>
                                <p>身份证号</p>
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="家庭住址：">
                                <p>家庭住址</p>
                            </FormItem>
                        </Col>
                        <Col span = "12"></Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="入职日期：">
                                <p>入职日期</p>
                            </FormItem>
                        </Col>
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="手机：" required>
                                <p>手机</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type = "flex" justify="center">
                        <Col span = "12">
                            <FormItem
                                {...formItemLayout}
                                label="备注：" required>
                                <p>备注</p>
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
                                        label="驾驶证号："  required>
                                        <p>驾驶证号</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="有效期限：" required>
                                        <p>有效期限</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="发证机关："  required>
                                        <p>发证机关</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="年审到期："  required>
                                        <p>年审到期</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="领证日期：" required>
                                        <p>领证日期</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="准驾车型："  required>
                                        <p>准驾车型</p>
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
        //console.log('isChangeLookOfEdit');
        this.props.callbackParent(isChange);
    },
    render(){
        //console.log("LookDialog pageShow:"+this.props.pageShow);
        let pageShow = this.props.pageShow;
        var lookTable = function(){
            switch (pageShow){
                case 'staff':
                    return(<LookTable
                        visible={this.state.visible}
                        callbackParentOfLook={this.handleChildrenChange}
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

//checkbox下拉框(列表)
const popoverCheckMenu = (
    <div className = 'popover-check-menu'>
        <label>
            <Checkbox />
            测试框一
        </label>
        <label>
            <Checkbox  />
            测试框二
        </label>
        <label>
            <Checkbox />
            测试框三
        </label>
        <label>
            <Checkbox />
            测试框三
        </label>
        <label>
            <Checkbox />
            测试框三
        </label>
        <label>
            <Checkbox />
            测试框三
        </label>
        <label>
            <Checkbox />
            测试框三
        </label>
        <label>
            <Checkbox />
            测试框三
        </label>
    </div>
);
export{EditDialog,SendMessageDialog,AddDialog,LookDialog,popoverCheckMenu}