import Backbone from 'backbone';
import {staff} from '../models/staffInfo';

let staffModels = [];
for(let i = 0; i < 100 ; i++){
    staffModels.push({
        Code : i,
        Name : `ÍõÓîÍ¤${i}`,
        Section :`³µ¶Ó${i}`,
        Job : "dsad",
        Id :i,
        PhoneNumber :"12321321232",
        Address : "213213213",
        JoinData:"213123",
        Remark :"2323121",
        OutAge :"21312321312",
        Type : `${i%3}` ,
        DrivingLicense : "weqew3",
        ValidDate : "wqeqwewq",
        AuthorizedBy: "qweqwe",
        AnnualExamination :"ewqeqe",
        StartLicenseData:"qweqw",
        LicenseType:"A"
    })
}
var  staffList = Backbone.Collection.extend({
    model:staff
});

let staffs = new staffList(staffModels);
export{staffs}

