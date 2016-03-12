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
        HeadImg:{
            name:'HeadImg',
            aliasName:'头像',
            value:'',
            isShowInCard:''
        },
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
            value:`Code${i}`
        },
        Name :{
            value:`王宇亭${i}`
        },
        Section : {
            value:`车队${i}`
        },
        Job :{
            value:`Job${i}`
        },
        Id :{
            value:`身份证号码${i}`
        },
        PhoneNumber :{
            value:`电话号码${i}`
        },
        Address : {
            value:`地址${i}`
        },
        JoinData:{
            value:`入职日期${i}`
        },
        Remark :{
            value:`备注${i}`
        },
        OutAge :{
            value:`${i%2}`
        },
        Type : `${i%3}` ,
        DrivingLicense :{
            value:`驾驶证号${i}`
        },
        ValidDate : {
            value:`有效期${i}`
        },
        AuthorizedBy:{
            value:`发证机关${i}`
        },
        AnnualExamination :{
            value:`年检${i}`
        },
        StartLicenseData:{
            value:`领证日期${i}`
        },
        LicenseType:{
            value:`准驾类型${i}`
        },
    })
}
let staffData = new staffCollection(staffDataModel);
export{
    staffData
}