/**
 * dialog
 * use Ant Design UI
 */
import React from 'react';
import {render} from 'react-dom';
import {Button as AntButton,Modal,Row, Col,Input as AntInput,Icon,Form, Select, Checkbox, Radio ,Tooltip,DatePicker,Collapse,Upload} from 'antd';
import {SearchInput} from "./selectAutoCompletion"
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
let EditTable = React.createClass({
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
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        let cardInfo = this.props.cardInfo;
        return (
            <Form horizontal onSubmit={this.handleSubmit} className = 'edit-form'>
               <div className = "up-info">
                   <Row type = 'flex' justify="center">
                        <Col span = "8">
                            <div className = "header-icon">
                                <img src= "/img/icon/icon_user_head_50_50_have_9.png" />
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
                               <DatePicker  />
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
                                       <AntInput type="text" placeholder="" {...getFieldProps('driver-id')} />
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
        return(
            <Modal  visible={this.state.visible}  footer="" closable={false} className = "edit-modal">
                <EditTable
                    visible={this.state.visible}
                    callbackParentOfEdit={this.handleChildrenChange}
                    cardInfo={this.props.cardInfo}
                    />
            </Modal>
        )
    }
});
let AddTable = React.createClass({
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
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
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
                                <img src="/img/icon/icon_userpic.png" />
                            </Upload>
                            </FormItem>
                        </Col>
                        <Col span = '12' className = 'up-info-header-text'>
                            <FormItem
                                {...formItemLayout}
                                label="姓名：" labelCol={{span: 8}} required>
                                <AntInput type="text" {...getFieldProps('name')} placeholder="" value="" />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="职务：" labelCol={{span: 8}} required>
                                <AntInput type="text" {...getFieldProps('job')} placeholder="" value="" />
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className = "middle-info">
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="编码：" labelCol={{span: 8}} required>
                                <AntInput type="text" {...getFieldProps('code')} placeholder="" value="01" />
                            </FormItem>
                        </Col>
                        <Col span = '12'></Col>
                    </Row>
                    <Row type = 'flex' justify="center">
                        <Col span = '12'>
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：" labelCol={{span: 8}}>
                                <AntInput type="text" {...getFieldProps('section')} placeholder="" />
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
                                <DatePicker  />
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
                                        <AntInput type="text" placeholder="" {...getFieldProps('driver-id')} />
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

AddTable = Form.create()(AddTable);
const AddDialog  = React.createClass({
    getInitialState(){
        return{
            visible : false
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
        return(
            <Modal  visible={this.state.visible}  footer="" closable={false} className = "add-modal">
                <AddTable
                    visible={this.state.visible}
                    callbackParentOfAdd={this.handleChildrenChange}
                    />
            </Modal>
        )
    }

});

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
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        return (
            <Form horizontal onSubmit={this.handleSubmit} className = 'look-form'>
                <div className = "up-info">
                    <Row type = 'flex' justify="center">
                        <Col span = "8">
                            <div className = "header-icon">
                                <img src= "/img/icon/icon_user_head_50_50_have_9.png" />
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
                                label="编码：" labelCol={{span: 8}} required>
                                <AntInput type="text" {...getFieldProps('code')} placeholder="请输入密码" value="01" />
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
                                <DatePicker  />
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
                                        <AntInput type="text" placeholder="" {...getFieldProps('driver-id')} />
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
        console.log('isChangeLookOfEdit');
        this.props.callbackParent(isChange);
    },
    render(){
        return(
            <Modal  visible={this.state.visible}  footer="" closable={false} className = "look-modal">
                <LookTable
                    visible={this.state.visible}
                    callbackParentOfLook={this.handleChildrenChange}
                    />
            </Modal>
        )
    }
});
export{EditDialog,SendMessageDialog,AddDialog,LookDialog}