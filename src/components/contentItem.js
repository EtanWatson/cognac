/**
 * 内容组件
 */
import React from 'react';
import {render} from 'react-dom';
import BackboneReactMixin from 'backbone-react-component';

const Content = React.createClass({
    render(){
        return (
            <div>
                <div>Content</div>
            </div>
        )
    }
});
export{Content}