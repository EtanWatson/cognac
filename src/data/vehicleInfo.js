import {createFragment} from 'react-addons-create-fragment'
const vehicleInfo=[];
for(let i = 0 ; i < 50 ; i ++){
    vehicleInfo.push({
        key:i,
        type:`${i%3}`,
        name:`赵日天${i}`,
        headerImage:'/img/icon/icon_user_head_50_50_have_1.png',
        status:`${i%3}`,
        section:{   name:'部门',
            value:`车队${i}`
        },
        phone:{
            name:'手机',
            value:'132123212323'
        },
        driverCar:{
            name:'准驾车型',
            value:'A1'
        },

        driverCode:{
            name:'驾驶证号',
            value:'2312321321'
        },
        more:{
            name:'备注',
            value:'hello'
        }
    })
}
export{vehicleInfo}
