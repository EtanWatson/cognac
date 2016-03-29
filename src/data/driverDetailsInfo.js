/**
 * Created by zhaiyujia on 2016/3/28.
 */
import React from 'react';
const driverColumns = [
    {
        key:'0',
        title: <div className="blank"></div>

    },
    {
        key:'1',
        title: '所属车队',
        dataIndex: 'motorcade'
    },
    {
        key:'2',
        title: '姓名',
        dataIndex: 'name'
    },
    {
        key:'3',
        title: '驾照类别',
        dataIndex: 'licenseType'
    },
    {
        key:'4',
        title: '人员状态',
        dataIndex: 'personnelStatus'
    },
    {
        key:'5',
        title: '备注',
        dataIndex: 'marker'
    },
    {
        key:'6',
        title: '家庭住址',
        dataIndex: 'address'
    }
];
export{driverColumns}