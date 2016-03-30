import React from 'react';
import {Button as AntButton,Modal,Row, Col,Input as AntInput,Icon,Form, Select, Checkbox, Radio ,Tooltip,DatePicker,Collapse,Upload,Menu,Cascader,TimePicker} from 'antd';
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 }
};
const typeStatusStaffMixin = {
  typeStatusInfo(staffInfo,validateForm){
      const  getFieldProps = validateForm.getFieldProps;
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
      let isDriver = '';
      let typeStatus = '';
      switch (staffInfo.role){
          //司机
          case '0':
              isDriver = (
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
                                      label="驾驶证号：" labelCol={{span: 8}} required>
                                      <AntInput type="text" placeholder="" {...validateForm.licenseNo} />
                                  </FormItem>
                              </Col>
                              <Col span = "12"></Col>
                          </Row>
                          <Row type = 'flex' justify="center">
                              <Col span = "12">
                                  <FormItem
                                      hasFeedback
                                      {...formItemLayout}
                                      label="有效期：" labelCol={{span: 8}} required>
                                      <DatePicker {...getFieldProps('expirationDate')} />
                                  </FormItem>
                              </Col>
                              <Col span = "12"></Col>
                          </Row>
                          <Row type = 'flex' justify="center">
                              <Col span = "12">
                                  <FormItem
                                      {...formItemLayout}
                                      hasFeedback
                                      label="发证机关：" labelCol={{span: 8}} required>
                                      <AntInput type="text" placeholder="" {...validateForm.licensingOrganization} />
                                  </FormItem>
                              </Col>
                              <Col span = "12"></Col>
                          </Row>
                          <Row type = 'flex' justify="center">
                              <Col span = "12">
                                  <FormItem
                                      {...formItemLayout}
                                      hasFeedback
                                      label="年审到期：" labelCol={{span: 8}} required>
                                      <DatePicker  {...getFieldProps('auditDate')}/>
                                  </FormItem>
                              </Col>
                              <Col span = "12"></Col>
                          </Row>
                          <Row type = 'flex' justify="center">
                              <Col span = "12">
                                  <FormItem
                                      {...formItemLayout}
                                      hasFeedback
                                      label="领证日期：" labelCol={{span: 8}} required>
                                      <DatePicker  {...getFieldProps('licensingDate')} />
                                  </FormItem>
                              </Col>
                              <Col span = "12"></Col>
                          </Row>
                          <Row type = 'flex' justify="center">
                              <Col span = "12">
                                  <FormItem
                                      {...formItemLayout}
                                      label="准驾类型：" labelCol={{span: 8}} required>
                                      <Cascader  options={licenseTypeOptions} expandTrigger="hover" popupClassName="form-cascader"
                                                 displayRender={displayRender}  {...getFieldProps('licenseType')} />
                                  </FormItem>
                              </Col>
                              <Col span = "12"></Col>
                          </Row>
                      </Panel>
                  </Collapse>
              );
              switch (staffInfo.status){

              }
              typeStatus = (
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
              );
              break;
          //管理员
          case '1':
              typeStatus =(
                  <Row type = "flex">
                      <Col span = "4">
                          <div className ="type-icon right icon"></div>
                          <div className = "type-text right">管理</div>
                      </Col>
                      <Col span = "12">
                          <div className = "status-icon right icon"></div>
                          <div className = "status-text right">上班</div>
                      </Col>
                  </Row>
              );
              break;
          //其他
          case '2':
              typeStatus =(
                  <Row type = "flex">
                      <Col span = "4">
                          <div className ="type-icon right icon"></div>
                          <div className = "type-text right">其他</div>
                      </Col>
                      <Col span = "12">
                          <div className = "status-icon right icon"></div>
                          <div className = "status-text right">上班</div>
                      </Col>
                  </Row>
              );
              break;
      }
      return{
          typeStatus:typeStatus,
          isDriver:isDriver
      }
  },
    typeStatusInfoLook(staffInfo){
        let isDriver = '';
        let typeStatus = '';
        switch (staffInfo.type){
            //司机
            case '0':
                isDriver = (
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
                );
                switch (staffInfo.status){

                }
                typeStatus = (
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
                );
                break;
            //管理员
            case '1':
                typeStatus =(
                    <Row type = "flex">
                        <Col span = "4">
                            <div className ="type-icon right icon"></div>
                            <div className = "type-text right">管理</div>
                        </Col>
                        <Col span = "12">
                            <div className = "status-icon right icon"></div>
                            <div className = "status-text right">上班</div>
                        </Col>
                    </Row>
                );
                break;
            //其他
            case '2':
                typeStatus =(
                    <Row type = "flex">
                        <Col span = "4">
                            <div className ="type-icon right icon"></div>
                            <div className = "type-text right">其他</div>
                        </Col>
                        <Col span = "12">
                            <div className = "status-icon right icon"></div>
                            <div className = "status-text right">上班</div>
                        </Col>
                    </Row>
                );
                break;
        }
        return{
            typeStatus:typeStatus,
            isDriver:isDriver
        }
    }
};
export {typeStatusStaffMixin}
