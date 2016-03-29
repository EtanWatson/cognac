//staff model and collection
import Backbone from 'backbone';
var staff = Backbone.Model.extend({
    defaults:{
        id:'',
        code :'',
        headImg:'',
        gender:'',
        name:'',
        section:'',
        job:'',
        idNumber:'',
        phoneNumber:'',
        address:'',
        joinData:'',
        remark:'',
        outAge:'',
        type:'',
        drivingLicense:'',
        validDate:'',
        authorizedBy:'',
        annualExamination:'',
        startLicenseData:'',
        licenseType:''
    }
});
var staffCollection = Backbone.Collection.extend({
    model:staff
});

var staffDataModel = [];
for(let i = 0; i < 100 ; i++){
    staffDataModel.push({
        id:i,
        code : `Code${i}`,
        headImg:'/img/icon_user_head_50_50_have_1.png',
        status:`${i%2}`,
        gender:`${i%2}`,
        name :`王宇亭${i}`,
        section: `车队${i}`,
        job : `Job${i}`,
        idNumber : `身份证号码${i}`,
        phoneNumber :`电话号码${i}`,
        address : `地址${i}`,
        joinData: `入职日期${i}`,
        remark : `备注${i}`,
        outAge :`${i%2+1}`,
        type : `${i%3}` ,
        drivingLicense : `驾驶证号${i}`,
        validDate : `有效期${i}`,
        authorizedBy: `发证机关${i}`,
        annualExamination :`年检${i}`,
        startLicenseData:`领证日期${i}`,
        licenseType:`准驾类型${i}`
    })
}
let staffData = new staffCollection(staffDataModel);
let staffModel = new staff();
export{
    staffModel,staffData,staffCollection
}