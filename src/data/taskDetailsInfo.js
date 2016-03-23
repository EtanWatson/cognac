/**
 * Created by zhaiyujia on 2016/3/22.
 */
import React from 'react';
const columns = [{
    title: '所属车队',
    dataIndex: 'motorcade',
}, {
    title: '姓名',
    dataIndex: 'name',
}, {
    title: '驾照类别',
    dataIndex: 'licensetype',
}
    , {
        title: '人员状态',
        dataIndex: 'peoplestatus',
    }
    , {
        title: '备注',
        dataIndex: 'marker',
    }
    , {
        title: '家庭住址',
        dataIndex: 'address',
    },
    {
        title:<div className = "div"></div>
    }
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        motorcade: `${i}`,
        name: `张三${i}`,
        licensetype: `A${i}`,
        peoplestatus :`空闲${i}`,
        marker : `记性好${i}`,
        address: `大兴${i}号`
    });
}
export{columns,data}