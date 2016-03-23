import Backbone from 'backbone';
var task = Backbone.Model.extend({
    defaults:{
        id:'',
        carUser : {
            name:'carUser',
            aliasName:'用车人',
            value:'',
            isShowInCard:''
        },
        useDate:{
            name:'userDate',
            aliasName:'用车时间',
            value:'',
            isShowInCard:''
        },
        useSection :{
            name:'useSection',
            aliasName:'用车部门',
            value:'',
            isShowInCard:''
        },
        useCase :{
            name:'useCase',
            aliasName:'用车原因',
            value:'',
            isShowInCard:'1'
        },
        destination : {
            name:'destination',
            aliasName:'目的地',
            value:'',
            isShowInCard:''
        },
        aboutTime :{
            name:'aboutTime',
            aliasName:'估计用时',
            value:'',
            isShowInCard:''
        },
        followNum :{
            name:'followNum',
            aliasName:'随车人数',
            value:'',
            isShowInCard:'1'
        },
        drawOutTime: {
            name:'drawOutTiem',
            aliasName:'出车时间',
            value:'',
            isShowInCard:''
        },
        applyCarType:{
            name:'applyCarType',
            aliasName:'申请车型',
            value:'',
            isShowInCard:''
        },
        drawInTime: {
            name:'drawInTime',
            aliasName:'回车时间',
            value:'',
            isShowInCard:'1'
        },
        plateNumber :{
            name:'plateNumber',
            aliasName:'车牌号',
            value:'',
            isShowInCard:''
        },
        collectionPosition: {
            name:'collectionPosition ',
            aliasName:'取车位置',
            value:'',
            isShowInCard:''
        },
        cycleTask: {
            name:'cycleTask',
            aliasName:'周期任务',
            value:'',
            isShowInCard:'1'
        },
        outCarRemark : {
            name:'outCarRemark',
            aliasName:'出车备注',
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
var taskCollection = Backbone.Collection.extend({
    model:task
});
const taskInfo=[];
for(let i = 0 ; i < 5 ; i ++){
    taskInfo.push({
        id:i,
        carUser : {
            name:'carUser',
            aliasName:'用车人',
            value:`用车人${i}`,
            isShowInCard:''
        },
        useDate:{
            name:'userDate',
            aliasName:'用车时间',
            value:`用车时间${i}`,
            isShowInCard:''
        },
        useSection :{
            name:'useSection',
            aliasName:'用车部门',
            value:`用车部门${i}`,
            isShowInCard:''
        },
        useCase :{
            name:'useCase',
            aliasName:'用车原因',
            value:`用车原因${i}`,
            isShowInCard:'1'
        },
        destination : {
            name:'destination',
            aliasName:'目的地',
            value:`目的地${i}`,
            isShowInCard:''
        },
        aboutTime :{
            name:'aboutTime',
            aliasName:'估计用时',
            value:`估计用时${i}`,
            isShowInCard:''
        },
        followNum :{
            name:'followNum',
            aliasName:'随车人数',
            value:`随车人数${i}`,
            isShowInCard:'1'
        },
        drawOutTime: {
            name:'drawOutTiem',
            aliasName:'出车时间',
            value:`出车时间${i}`,
            isShowInCard:''
        },
        applyCarType:{
            name:'applyCarType',
            aliasName:'申请车型',
            value:`申请车型${i}`,
            isShowInCard:''
        },
        drawInTime: {
            name:'drawInTime',
            aliasName:'回车时间',
            value:`回车时间${i}`,
            isShowInCard:'1'
        },
        plateNumber :{
            name:'plateNumber',
            aliasName:'车牌号',
            value:`车牌号${i}`,
            isShowInCard:''
        },
        collectionPosition: {
            name:'collectionPosition ',
            aliasName:'取车位置',
            value:`取车位置${i}`,
            isShowInCard:''
        },
        cycleTask: {
            name:'cycleTask',
            aliasName:'周期任务',
            value:`周期任务${i}`,
            isShowInCard:'1'
        },
        outCarRemark : {
            name:'outCarRemark',
            aliasName:'出车备注',
            value:`出车备注${i}`,
            isShowInCard:''
        },
        Type : `${i%3}`
    })
}
var taskList = new taskCollection(taskInfo);
var taskModel = new task();
export{
    taskModel,taskList
}