/**
 * 内容组件
 */
import React from 'react';
import {render} from 'react-dom';
import BackboneReactMixin from 'backbone-react-component';
import {TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord,NavMenu} from './navItem';

const Content = React.createClass({
    render(){
        return (
            <div id="content" className="content">
                <div>Content</div>
            </div>
        )
    }
});
export{Content}