import Backbone from 'backbone';
var cardKey = Backbone.Model.extend({
   defaults:{
       Name:'',
       Value:''
   }
});
var cardList = Backbone.Collection.extend({
    model:cardKey
});
var cardsDriver =[
    {
        name:'Code',
        value:'编码'
    },
    {
        name:'Section',
        value:'所在部门'
    },
    {
        name:'Gender',
        value:'性别'
    },
    {
        name:'id',
        value:'身份证号'
    },
    {
        name:'phoneNumber',
        value:'手机'
    },
    {
        name:'address',
        value:'家庭住址'
    },
    {
        name:'joinData',
        value:'入职日期'
    },
    {
        name:'remark',
        value:'备注'
    },
    {
        name:'driverLicense',
        value:'驾驶证号'
    },
    {
        name:'getData',
        value:'领证日期'
    },
    {
        name:'expiry',
        value:'有效期限'
    },
    {
        name:'licenseType',
        value:'准驾车型'
    },
    {
        name:'AuthorizedBy',
        value:'发证机关'
    },
    {
        name:'drivingAge',
        value:'驾龄'
    },
    {
        name:'annualExamination',
        value:'年审到期'
    }
];
var cardsStaff =[
    {
    name:'Code',
    value:'编码'
    },
    {
        name:'Section',
        value:'所在部门'
    },
    {
        name:'Gender',
        value:'性别'
    },
    {
        name:'id',
        value:'身份证号'
    },
    {
        name:'phoneNumber',
        value:'手机'
    },
    {
        name:'address',
        value:'家庭住址'
    },
    {
        name:'joinData',
        value:'入职日期'
    },
    {
        name:'remark',
        value:'备注'
    }
];
var cardVehicle = [
    {
        name:'vehicleCode',
        value:'车辆编码'
    },
    {
        name:'vehicleNumber',
        value:'车牌号'
    },
    {
        name:'vehicleBrand',
        value:'车辆品牌'
    },
    {
        name:'vehicleType',
        value:'车辆类型'
    },
    {
        name:'tag',
        value:'标签'
    },
    {
        name:'color',
        value:'颜色'
    },
    {
        name:'vehicleLoad',
        value:'载重（吨）'
    },
    {
        name:'vehicleStatus',
        value:'车辆状态'
    },
    {
        name:'seatNumber',
        value:'座位数'
    },
    {
        name:'fuelEfficient',
        value:'油耗'
    },
    {
        name:'ownerPhone',
        value:'车主手机'
    },
    {
        name:'ownerTeam',
        value:'所属车队'
    },
    {
        name:'oilCard',
        value:'油卡编号'
    },
    {
        name:'continuation',
        value:'续航里程（电车）'
    },
    {
        name:' initialMileage',
        value:'初始里程'
    },
    {
        name:'engineCode',
        value:'发动机号'
    },
    {
        name:'frameCode',
        value:'车架号'
    },
    {
        name:'buyCompany',
        value:'购入单位'
    },
    {
        name:'price',
        value:'购入价格'
    },
    {
        name:'buyData',
        value:'购入日期'
    },
    {
        name:'driver',
        value:'司机'
    },
    {
        name:'driverPhone',
        value:'司机手机'
    },
    {
        name:'section',
        value:'所属部门'
    },
    {
        name:'onwerPeople',
        value:'所属车主'
    },
    {
        name:'outAge',
        value:'是否停用'
    },
    {
        name:'remark',
        value:'备注'
    },
    {
        name:' electricCard',
        value:'电卡编号'
    }
];

export{cardList,cardsDriver,cardsStaff,cardVehicle}
