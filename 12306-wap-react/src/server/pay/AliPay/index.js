
import Constant from '../../../constant/config';
import SessionServer from '../../session/index';
import TokenServer from '../../token/index';


class AliPayServer {

	constructor(){
	}


    //汽车票支付
    busPay(payInfo){
    }


    //火车票支付
    trainPay(payInfo){
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


