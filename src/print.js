import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import  'antd/lib/index.css';
import {Icon,Row,Col,Table} from 'antd';
import {columns ,data} from './data/printData'
const PrintPage = React.createClass({
    getInitialState(){
        return{
            isShow:false
        }
    },
    componentDidMount(){
      PubSub.subscribe('print-show',function(topic,printData){
        this.setState({
            isShow:true
        })
      }.bind(this))
    },
    handlePrintHideClick(){
        PubSub.publish('print-hide');
        this.setState({
            isShow:false
        })
    },
    render(){
        var isShowPrint = function(){
            if(this.state.isShow){
                return(
                    <div>
                        <Row type = "flex" className = "print-header">
                            <Col span = "12" className = "print-header-left">
                                <img src="/img/icon/icon_print_pressed.png" className = "print-icon" />
                                <div className = "print-btn">打印</div>
                            </Col>
                            <Col span = "12" className = "print-header-right">
                                <div className = "print-out" onClick={this.handlePrintHideClick}>退出</div>
                            </Col>
                        </Row>
                        <Table columns={columns} dataSource={data} pagination={false} bordered  />
                    </div>
                    )
            }else{
                return(
                    <div></div>
                )
            }

        }.bind(this);
        return(
            <div>
                {isShowPrint()}
            </div>

        )
    }
});
ReactDOM.render(
  <PrintPage />,
  document.getElementById('print-content')
);