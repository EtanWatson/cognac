import Backbone from 'backbone';
var staff = Backbone.Model.extend({
    defaults:{
        id:'',
        Code : {
            name:'Code',
            aliasName:'编码',
            value:'',
            isShowInCard:''
        },
        HeadImg:'',
        Gender:{
            name:'Gender',
            aliasName:'性别',
            value:'',
            isShowInCard:''
        },
        Name :{
            name:'Name',
            aliasName:'姓名',
            value:'',
            isShowInCard:''
        },
        Section :{
            name:'Section',
            aliasName:'部门',
            value:'',
            isShowInCard:'1'
        },
        Job : {
            name:'Job',
            aliasName:'工作',
            value:'',
            isShowInCard:''
        },
        Id :{
            name:'Id',
            aliasName:'身份证号',
            value:'',
            isShowInCard:''
        },
        PhoneNumber :{
            name:'PhoneNumber',
            aliasName:'手机',
            value:'',
            isShowInCard:'1'
        },
        Address : {
            name:'Address',
            aliasName:'家庭住址',
            value:'',
            isShowInCard:''
        },
        JoinData:{
            name:'JoinData',
            aliasName:'入职日期',
            value:'',
            isShowInCard:''
        },
        Remark : {
            name:'Remark',
            aliasName:'备注',
            value:'',
            isShowInCard:'1'
        },
        OutAge :{
            name:'OutAge',
            aliasName:'是否停用',
            value:'',
            isShowInCard:''
        },
        Type : {
            name:'Type',
            aliasName:'职员类型',
            value:'',
            isShowInCard:''
        },
        DrivingLicense : {
            name:'DrivingLicense',
            aliasName:'驾驶证号',
            value:'',
            isShowInCard:'1'
        },
        ValidDate : {
            name:'ValidDate',
            aliasName:'有效期',
            value:'',
            isShowInCard:''
        },
        AuthorizedBy: {
            name:'AuthorizedBy',
            aliasName:'发证机关',
            value:'',
            isShowInCard:''
        },
        AnnualExamination :{
            name:'AnnualExamination',
            aliasName:'年审到期',
            value:'',
            isShowInCard:''
        },
        StartLicenseData:{
            name:'StartLicenseData',
            aliasName:'领证日期',
            value:'',
            isShowInCard:''
        },
        LicenseType:{
            name:'LicenseType',
            aliasName:'准驾车型',
            value:'',
            isShowInCard:'1'
        }
    }
});
var staffCollection = Backbone.Collection.extend({
   model:staff
});

var staffDataModel = [];
for(let i = 0; i < 100 ; i++){
    staffDataModel.push({
        id:i,
        Code :{
            name:'Code',
            aliasName:'编码',
            isShowInCard:'',
            value:`Code${i}`
        },
        HeadImg:'/img/icon_user_head_50_50_have_1.png',
        Status:`${i%2}`,
        Gender:{
            name:'Gender',
            aliasName:'性别',
            value:`${i%2}`,
            isShowInCard:''
        },
        Name :{
            name:'Code',
            aliasName:'姓名',
            isShowInCard:'',
            value:`王宇亭${i}`
        },
        Section : {
            name:'Code',
            aliasName:'部门',
            isShowInCard:'1',
            value:`车队${i}`
        },
        Job :{
            name:'Code',
            aliasName:'工作',
            isShowInCard:'',
            value:`Job${i}`
        },
        Id :{
            name:'Code',
            aliasName:'身份证号',
            isShowInCard:'',
            value:`身份证号码${i}`
        },
        PhoneNumber :{
            name:'Code',
            aliasName:'手机号码',
            isShowInCard:'1',
            value:`电话号码${i}`
        },
        Address : {
            name:'Code',
            aliasName:'地址',
            isShowInCard:'',
            value:`地址${i}`
        },
        JoinData:{
            name:'Code',
            aliasName:'入职日期',
            isShowInCard:'',
            value:`入职日期${i}`
        },
        Remark :{
            name:'Code',
            aliasName:'备注',
            isShowInCard:'1',
            value:`备注${i}`
        },
        OutAge :{
            name:'Code',
            aliasName:'是否停用',
            isShowInCard:'',
            value:`${i%2}`
        },
        Type : `${i%3}` ,
        DrivingLicense :{
            name:'Code',
            aliasName:'驾驶证号',
            isShowInCard:'1',
            value:`驾驶证号${i}`
        },
        ValidDate : {
            name:'Code',
            aliasName:'有效期',
            isShowInCard:'',
            value:`有效期${i}`
        },
        AuthorizedBy:{
            name:'Code',
            aliasName:'发证机关',
            isShowInCard:'',
            value:`发证机关${i}`
        },
        AnnualExamination :{
            name:'Code',
            aliasName:'年审到期',
            isShowInCard:'',
            value:`年检${i}`
        },
        StartLicenseData:{
            name:'Code',
            aliasName:'领证日期',
            isShowInCard:'',
            value:`领证日期${i}`
        },
        LicenseType:{
            name:'Code',
            aliasName:'准驾车型',
            isShowInCard:'1',
            value:`准驾类型${i}`
        },
    })
}
let staffData = new staffCollection(staffDataModel);
export{
    staffData,staffCollection
}