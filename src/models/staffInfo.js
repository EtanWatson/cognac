import Backbone from 'backbone';
var staff = Backbone.Model.extend({
   defaults:{
       Code : "",
       Name : "",
       Section :"",
       Job : "",
       Id :"",
       PhoneNumber :"",
       Address : "",
       JoinData:"",
       Remark :"",
       OutAge :"",
       Type : "" ,
       DrivingLicense : "",
       ValidDate : "",
       AuthorizedBy: "",
       AnnualExamination :"",
       StartLicenseData:"",
       LicenseType:""
   }
});
export{staff}