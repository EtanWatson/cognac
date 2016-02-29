import React from 'react';
import {render} from 'react-dom';
import {Modal,Button,Input,ButtonInput } from 'react-bootstrap';
import {Checkbox,Radio,RadioGroup} from 'react-icheck';
const ModalDialog = React.createClass({
    render(){
        return(
            <Modal {...this.props}  aria-labelledby="contained-modal-title-lg" >
                <Modal.Body>
                    <form className = "">
                        <ul className = "list-inline dialog-header">
                            <li className = "dialog-up-file" >
                                <img src="/img/icon/icon_userpic.png" />
                                <Input type="file" labelClassName="col-xs-2 col-sm-2 col-md-2 col-lg-2" wrapperClassName="upload-icon"/>
                            </li>
                            <li className = "dialog-header-content">
                                <Input type="text" bsSize="small" label="姓名" className = "input-space" labelClassName="col-xs-3 col-sm-3 col-md-3 col-lg-3" wrapperClassName="input-wrapper col-xs-9 col-sm-9 col-md-9 col-lg-9"/>
                                <Input type="text" bsSize="small" label="职务" className = "input-space" labelClassName="col-xs-3 col-sm-3 col-md-3 col-lg-3" wrapperClassName="input-wrapper col-xs-9 col-sm-9 col-md-9 col-lg-9"/>
                            </li>
                        </ul>
                        <ul className = "list-inline dialog-body-up" >
                            <li style={{width:'55%'}}>
                                <Input type="text"  bsSize="small" label="编码" className= "input-space"  labelClassName="star code col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="input-wrapper col-xs-7 col-sm-7 col-md-7 col-lg-7"/>
                                <Input type="text"  bsSize="small" label="所在部门" className= "input-space"  labelClassName="star col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="input-wrapper col-xs-7 col-sm-7 col-md-7 col-lg-7"/>
                                <Input type="text"  bsSize="small" label="身份证号码" className= "input-space" labelClassName="star id col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="input-wrapper col-xs-7 col-sm-7 col-md-7 col-lg-7" />
                                <Input type="text"  bsSize="small" label="家庭住址" className= "input-space" labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="input-wrapper col-xs-7 col-sm-7 col-md-7 col-lg-7" />
                                <Input type="text"  bsSize="small" label="入职日期" className= "input-space"  labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="input-wrapper col-xs-7 col-sm-7 col-md-7 col-lg-7" />
                            </li>
                            <li style ={{width:'45%'}} className ="up-right">
                                <div className = "sex-box">
                                    <ul className = "list-inline sex-radio" >
                                        <li>
                                            <label className = "star sex"><span>性别:</span></label>
                                        </li>
                                        <li className = "sex-select">
                                            <RadioGroup name="sex" value="0" label="性别">
                                                <Radio
                                                    value="0"
                                                    radioClass="iradio_minimal-green"
                                                    increaseArea="20%"
                                                    label="男"
                                                    />
                                                <Radio
                                                    value="1"
                                                    radioClass="iradio_minimal-green"
                                                    increaseArea="20%"
                                                    label="女"
                                                    />
                                            </RadioGroup>
                                        </li>
                                    </ul>
                                </div>
                                <Input type="text"  bsSize="small" label="手机" className = "input-space" labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="input-wrapper phone col-xs-7 col-sm-7 col-md-7 col-lg-7"/>
                            </li>
                            <Input type="text"  bsSize="small" label="备注" className = "input-space" labelClassName="remark-label col-xs-3 col-sm-3 col-md-3 col-lg-3" wrapperClassName="remark-input input-wrapper col-xs-9 col-sm-9 col-md-9 col-lg-9"/>
                            <div className = "col-xs-2 col-sm-2 col-md-2 col-lg-2 is-outage">
                                <Checkbox
                                    checkboxClass="icheckbox_minimal-green"
                                    increaseArea="20%"
                                    label="<span class='outage-record-text'>是否停用</span>"
                                    />
                            </div>
                            <div className = "col-xs-10 col-sm-10 col-md-10 col-lg-10"></div>
                        </ul>
                        <ul className = "list-inline dialog-body-down">
                            <li style = {{width:'55%'}}>
                            <Input type="text" bsSize="small" label="驾驶证号" className = "input-space"  labelClassName="star col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="input-wrapper col-xs-7 col-sm-7 col-md-7 col-lg-7" />
                            <Input type="text" bsSize="small" label="有效期限" className = "input-space"  labelClassName="star col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="input-wrapper col-xs-7 col-sm-7 col-md-7 col-lg-7" />
                            <Input type="text" bsSize="small" label="发证机关" className = "input-space"  labelClassName="star col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="input-wrapper col-xs-7 col-sm-7 col-md-7 col-lg-7" />
                            <Input type="text" bsSize="small" label="年审到期" className = "input-space"  labelClassName="star col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="input-wrapper col-xs-7 col-sm-7 col-md-7 col-lg-7"/>
                            <Input type="text" bsSize="small" label="领证日期" className = "input-space"  labelClassName="star col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="input-wrapper col-xs-7 col-sm-7 col-md-7 col-lg-7" />
                            <Input type="text" bsSize="small" label="准驾车型" className = "input-space"  labelClassName="star col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="input-wrapper col-xs-7 col-sm-7 col-md-7 col-lg-7"/>
                            </li>
                            <li style = {{width:'45%'}}>
                            </li>
                        </ul>
                        <div className = "list-inline dialog-footer">
                            <div className = "col-xs-4 col-sm-4 col-md-4 col-lg-4 footer-btn btn-left">
                                <ButtonInput type="submit" value="保存并添加"/>
                            </div>
                            <div className = "col-xs-4 col-sm-4 col-md-4 col-lg-4 footer-btn btn-middle">
                                <Button>保存</Button>
                            </div>
                            <div className = "col-xs-4 col-sm-4 col-md-4 col-lg-4 footer-btn btn-right">
                                <Button onClick={this.props.onHide}>退出</Button>
                            </div>
                        </div>
                     </form>
                </Modal.Body>
            </Modal>
        )
    }
});
export{ModalDialog}
