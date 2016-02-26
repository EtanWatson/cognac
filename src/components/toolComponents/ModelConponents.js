import React from 'react';
import {render} from 'react-dom';
import {Modal,Button,Input,ButtonInput } from 'react-bootstrap';
import {Checkbox,Radio} from 'react-icheck';
const ModalDialog = React.createClass({
    render(){
        return(
            <Modal {...this.props}  aria-labelledby="contained-modal-title-lg" >
                <Modal.Body>
                    <form className = "">
                        <ul className = "list-inline dialog-header">
                            <li style={{width:'35%'}}>
                                <img src="/img/icon/icon_userpic.png" />
                                <Input type="file" labelClassName="col-xs-2 col-sm-2 col-md-2 col-lg-2" wrapperClassName="upload-icon"/>
                            </li>
                            <li style={{width:'65%'}}>
                                <Input type="text" bsSize="small" label="姓名" labelClassName="col-xs-3 col-sm-3 col-md-3 col-lg-3" wrapperClassName="col-xs-9 col-sm-9 col-md-9 col-lg-9"/>
                                <Input type="text" bsSize="small" label="职务" labelClassName="col-xs-3 col-sm-3 col-md-3 col-lg-3" wrapperClassName="col-xs-9 col-sm-9 col-md-9 col-lg-9"/>
                            </li>
                        </ul>
                        <ul className = "list-inline dialog-body-up" >
                            <li style={{width:'50%'}}>
                                <Input type="text"  bsSize="small" label="编码"  labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="col-xs-7 col-sm-7 col-md-7 col-lg-7"/>
                                <Input type="text"  bsSize="small" label="所在部门"  labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="col-xs-7 col-sm-7 col-md-7 col-lg-7"/>
                                <Input type="text"  bsSize="small" label="身份证号码"  labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="col-xs-7 col-sm-7 col-md-7 col-lg-7" />
                                <Input type="text"  bsSize="small" label="家庭住址" labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="col-xs-7 col-sm-7 col-md-7 col-lg-7" />
                                <Input type="text"  bsSize="small" label="入职日期"  labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="col-xs-7 col-sm-7 col-md-7 col-lg-7" />
                            </li>
                            <li style ={{width:'50%'}}>
                                <Input type="text"  bsSize="small" label="手机"  labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="col-xs-7 col-sm-7 col-md-7 col-lg-7"/>
                            </li>
                            <Input type="text"  bsSize="small" label="备注"  labelClassName="col-xs-3 col-sm-3 col-md-3 col-lg-3" wrapperClassName="col-xs-9 col-sm-9 col-md-9 col-lg-9"/>
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
                            <li style = {{width:'50%'}}>
                            <Input type="text" bsSize="small" label="驾驶证号"   labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="col-xs-7 col-sm-7 col-md-7 col-lg-7" />
                            <Input type="text" bsSize="small" label="有效期限"   labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="col-xs-7 col-sm-7 col-md-7 col-lg-7" />
                            <Input type="text" bsSize="small" label="发证机关"   labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="col-xs-7 col-sm-7 col-md-7 col-lg-7" />
                            <Input type="text" bsSize="small" label="年审到期"   labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="col-xs-7 col-sm-7 col-md-7 col-lg-7"/>
                            <Input type="text" bsSize="small" label="领证日期"   labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="col-xs-7 col-sm-7 col-md-7 col-lg-7" />
                            <Input type="text" bsSize="small" label="准驾车型"   labelClassName="col-xs-5 col-sm-5 col-md-5 col-lg-5" wrapperClassName="col-xs-7 col-sm-7 col-md-7 col-lg-7"/>
                            </li>
                            <li style = {{width:'50%'}}>
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
