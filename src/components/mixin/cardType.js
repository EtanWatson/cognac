import React from 'react';
//用于判断卡片的类型
const cardTypeMinx = {
   cardType(item) {
        let typeIcon = ''; //卡片底部类别icon
        let typeText = '';//卡片文案
        let colorIcon ='';//卡片颜色
        let type = item.role;
       console.log(type);
        if(this.props.pageShow == 'staff'){
            if(item.nonUse ==1){
                colorIcon = "/img/card_title_stop.png";
                typeIcon = <img src="/img/icon_stop.png" />;
                switch (type){
                    case "0":
                        typeText = "司机";
                        break;
                    case "1":
                        typeText = "管理员";
                        break;
                    case "2":
                        typeText = "其他";
                        break
                }
            }else{
                switch (type){
                    case "0":
                        typeIcon = <img src="/img/staff-driver.png" />;
                        typeText = "司机";
                        colorIcon = '/img/card_title_driver.png';
                        break;
                    case "1":
                        typeIcon = <img src="/img/icon_driver.png" />;
                        typeText = "管理员";
                        colorIcon = '/img/card_title_manage.png';
                        break;
                    case "2":
                        typeIcon = <img src="/img/icon_driver.png" />;
                        typeText = "其他";
                        colorIcon = '/img/card_title_others.png';
                        break
                }
            }

        }else{
            if(item.nonUse ==1){
                colorIcon = "/img/card_title_stop.png";
                typeIcon = <img src="icon_stop.png" />;
                switch (type){
                    case "0":
                        typeText = "客车";
                        break;
                    case "1":
                        typeText = "货车";
                        break;
                    case "2":
                        typeText = "其他";
                        break
                }
            }else{
                typeIcon = <img src="/img/vehicle-icon.png" style={{width:'80%'}} />;
                switch (type){
                    case "0":
                        typeText = "客车";
                        colorIcon = '/img/card_title_driver.png';
                        break;
                    case "1":
                        typeText = "货车";
                        colorIcon = '/img/card_title_manage.png';
                        break;
                    case "2":
                        typeText="其他";
                        colorIcon = '/img/card_title_others.png';
                        break;
                }
            }
        }
        return(
            <div className = "footer-img">
                <img src = {colorIcon} />
                <div className = "type-text">{typeText}</div>
                <div className = "type-icon">
                    {typeIcon}
                </div>
            </div>
        )
    }
};
export{cardTypeMinx}