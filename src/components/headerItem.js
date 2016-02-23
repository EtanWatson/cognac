/**
 * header 区组件
 */
import React from 'react';
import {render} from 'react-dom';
import BackboneReactMixin from 'backbone-react-component';

const Header = React.createClass({
    mixins:[BackboneReactMixin],
    render(){
        return <div></div>
    }
});
export{Header}