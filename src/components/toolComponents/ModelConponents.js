import React from 'react';
import {render} from 'react-dom';
import {Modal,Button,Input,ButtonInput } from 'react-bootstrap';
const ModalDialog = React.createClass({
    render(){
        return(
            <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg" >
                <Modal.Body>
                    <form className = "">
                        <Input type="file" />
                        <Input type="text" label="姓名" labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
                        <Input type="text" label="职务" labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
                        <Input type="text" label="编码"  labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
                        <Input type="text" label="所在部门"  labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
                        <Input type="text" label="身份证号码"  labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                        <Input type="text" label="家庭住址"  labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                        <Input type="text" label="入职日期"  labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                        <Input type="text" label="手机"  labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                        <Input type="text" label="备注"  labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                        <Input type="text" label="驾驶证号"  labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                        <Input type="text" label="有效期限"  labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                        <Input type="text" label="发证机关"  labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                        <Input type="text" label="年审到期"  labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
                        <Input type="text" label="领证日期"  labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                        <Input type="text" label="准驾车型"  labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                        <ButtonInput type="submit" value="保存并添加"/>
                        <Button>保存</Button>
                        <Button onClick={this.props.onHide}>Close</Button>
                     </form>
                </Modal.Body>
            </Modal>
        )
    }
});
export{ModalDialog}
