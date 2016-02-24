/**
 * header 区组件
 */
import React from 'react';
import {render} from 'react-dom';
import BackboneReactMixin from 'backbone-react-component';

//系统设置组件
const SysTemSetting = React.createClass({
    render(){
        return(
            <h4>系统设置</h4>
        )
    }
});
//管理员组件
const Admin = React.createClass({
   render(){
       return(
           <div>
               <ul className = "list-inline">
                   <li className = "header-img"></li>
                   <li>管理员</li>
               </ul>
           </div>
       )
   }
});
const LoginOut = React.createClass({
   render(){
       return(
           <div>
               <h4>退出</h4>
           </div>
       )
   }
});
const Header = React.createClass({
    render(){
        return (
            <div>
                <div>
                    <ul className="list-inline">
                        <li>
                            <h2>长江电动汽车</h2>
                        </li>
                        <li>
                            <h4>车队管理系统</h4>
                        </li>
                    </ul>
                    <ul className="list-inline">
                        <li>
                            <SysTemSetting />
                        </li>
                        <li>
                            <Admin />
                        </li>
                        <li>
                            <h4>|</h4>
                        </li>
                        <li>
                            <LoginOut />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
});
export{Header}