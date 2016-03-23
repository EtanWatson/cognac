/**
 * Created by zhaiyujia on 2016/3/21.
 */
import Backbone from 'backbone';
var completedTask = Backbone.Model.extend({
    defaults:{
        id:'',
        taskNum:{
            name:'taskNum',
            aliasName:'任务编码',
            value:'',
            isShowInCard:''
        },
        useDate:{
            name:'userDate',
            aliasName:'出车日期',
            value:'',
            isShowInCard:''
        },
        drawInTime: {
            name:'drawInTime',
            aliasName:'回车日期',
            value:'',
            isShowInCard:''
        },
        plateNumber :{
            name:'plateNumber',
            aliasName:'车牌号码',
            value:'',
            isShowInCard:''
        },
        carType: {
            name:'carType ',
            aliasName:'车辆类型',
            value:'',
            isShowInCard:''
        },
        Type : {
            name:'Type',
            aliasName:'任务类型',
            value:'',
            isShowInCard:''
        }
    }
});
var CompletedtaskCollection = Backbone.Collection.extend({
    model:completedTask
});
const completedtaskInfo=[];
for(let i = 0 ; i < 10; i ++){
    completedtaskInfo.push({
        id:i,
        taskNum:{
            name:'taskNum',
            aliasName:'任务编码',
            value:'',
            isShowInCard:''
        },
        useDate:{
            name:'userDate',
            aliasName:'出车日期',
            value:`出车日期${i}`,
            isShowInCard:''
        },
        drawInTime: {
            name:'drawInTime',
            aliasName:'回车日期',
            value:`回车日期${i}`,
            isShowInCard:'1'
        },
        plateNumber :{
            name:'plateNumber',
            aliasName:'车牌号码',
            value:`车牌号码${i}`,
            isShowInCard:''
        },
        carType: {
            name:'carType',
            aliasName:'车辆类型',
            value:`车辆类型${i}`,
            isShowInCard:''
        },
        Type : `${i%2}`
    })
}
var completedtaskList = new CompletedtaskCollection(completedtaskInfo);
var completedtaskModel = new completedTask();
export{
    completedtaskModel,completedtaskList
}