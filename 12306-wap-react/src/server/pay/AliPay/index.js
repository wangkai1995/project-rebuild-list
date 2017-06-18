
import Constant from '../../../constant/config';
import SessionServer from '../../session/index';
import TokenServer from '../../token/index';

import PayModel from '../../../http/pay/index';


import ModalAlert from '../../../components/modal/Alert';


class AliPayServer {

	constructor(){
	}


    //汽车票支付
    busPay(payInfo){
    }


    //火车票支付
    trainPay(payInfo){
        const token = TokenServer.getToken();
        console.log(payInfo)
        // if( document.forms.length >  0 ){
        //     var div = document.querySelector('.apply-form')
        //         div.innerHTML="";
        // }
        // payModel.mobileTrainAliPay({
        //         order: $scope.oData.order,
        //         token: token.access_token,
        // }).then(function(data){
        //     if(data.code === '00000'){
        //         var div = document.querySelector('.apply-form');
        //         if(!div){
        //             div = document.createElement('div');
        //             div.className = "apply-form"
        //         }
        //         div.innerHTML = data.data;
        //         document.body.appendChild(div);
        //         document.forms[0].submit();
        //     }else{
        //         ModalAlert.show({
        //             content:data.message,
        //             onClick:function(){
        //                 ModalAlert.hide();
        //             }
        //         });
        //     }
        // });
    }


    //支付开始
    pay(payInfo){
        switch(payInfo.model){
            case 'train':
                this.trainPay(payInfo,callback);
                break;
            case 'bus':
                this.busPay(payInfo);
                break;
        }
    }
    


}






export default new AliPayServer;


