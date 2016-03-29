//vehicle model and collection
import Backbone from 'backbone';
var vehicle = Backbone.Model.extend({
    defaults:{
        id:'',
        headImg:'',
        status:'',
        vehicleCode:'',
        vehicleNumber: '',
        vehicleBrand:'',
        vehicleModel:'',
        vehicleType:'',
        tag:'',
        color:'',
        vehicleLoad:'',
        vehicleStatus:'',
        seatNumber:'',
        fuelEfficient:'',
        ownerPhone:'',
        ownerTeam:'',
        oilCard:'',
        continuation:'',
        initialMileage:'',
        engineCode:'',
        frameCode:'',
        buyCompany:'',
        price:'',
        buyData:'',
        driver:'',
        driverPhone:'',
        section:'',
        onwerPeople:'',
        outAge:'',
        remark:'',
        electricCard:''
    }
});
var vehicleCollection = Backbone.Collection.extend({
    model:vehicle
});
var vehicleDataModel = [];
for(let i = 0; i < 100 ; i++){
    vehicleDataModel.push({
        id:i,
        headImg:'/img/vehicle-header.png',
        status:`${i%2}`,
        vehicleCode:`${i}`,
        vehicleNumber: `车牌号${i}`,
        vehicleBrand:`车辆品牌${i}`,
        vehicleModel:`车辆型号${i}`,
        type:`${i%3}`,
        tag:`标签${i}`,
        color:`颜色${i}`,
        vehicleLoad:`载重${i}`,
        vehicleStatus:`车辆状态${i}`,
        seatNumber:`座位数${i}`,
        fuelEfficient:`油耗${i}`,
        ownerPhone:`车主手机${i}`,
        ownerTeam:`所属车队${i}`,
        oilCard:`油卡编号${i}`,
        continuation:`续航里程${i}`,
        initialMileage:`初始里程${i}`,
        engineCode:`发动机号${i}`,
        frameCode:`车架号${i}`,
        buyCompany:`购入单位${i}`,
        price:`购入价格${i}`,
        buyData:`购入日期${i}`,
        driver:`司机${i}`,
        driverPhone:`司机手机${i}`,
        section:`所属部门${i}`,
        onwerPeople:`所属车主${i}`,
        outAge:`是否停用${i}`,
        remark:`备注${i}`,
        electricCard:`电卡编号${i}`
    })
}
let vehicleData = new vehicleCollection(vehicleDataModel);
let vehicleModel = new vehicle();
export{
    vehicleModel,vehicleData,vehicleCollection
}
