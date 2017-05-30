
import SessionServer from '../../session/index';


function urlRestore(){
    var location = window.location
    var url =location.protocol+'//'+location.hostname+location.pathname+location.hash;
    window.location.href = url;
}


function getRequest(search){
   	var theRequest = {};
    var str = search,
        strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }
   return theRequest;
}




class WechatPayServer {

	constructor(){
		this.isWechatBrowser = this.initJudgeBrowser();
	}


	//判断微信环境
	initJudgeBrowser(){
		var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) === 'micromessenger'){
            return true;
        }else{
            return false;
        }
	}


	//初始化支付判断用于页面Code回调后检测
    initValidCode(){
         var location = window.location
         if(location.search.indexOf('code') > -1 ){
            var wechatCode = getRequest( location.search.split("?")[1] );
            SessionServer.set('wechatCode',wechatCode);
            urlRestore();
         }else if( SessionServer.get('wechatCode') ){
            var wechatCode  = SessionServer.get('wechatCode');
            SessionServer.remove('wechatCode');
            this.H5Pay(wechatCode);
         }
    }
    

    //H5支付
    H5Pay(userCode){
    }


    //扫码支付
    scanCodePay(payInfo){
          
    }
    

    //汽车票支付
    busPay(payInfo){
    }


    //火车票支付
    trainPay(payInfo){
        const { isWechatBrowser } = this;
        if(!isWechatBrowser){
            //非微信环境扫码支付
            return scanCodePay(payInfo);
        }else{
            //获取用户Code调取H5支付
            var href  = encodeURIComponent(location.href);
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx209ee71dfe228029&redirect_uri='+href+'&response_type=code&scope=snsapi_base&state=12306#wechat_redirect'; 
        }
    }


    

    //支付开始
    pay(payInfo){
        switch(payInfo){
            case 'train':
                this.trainPay(payInfo);
                break;
            case 'bus':
                this.busPay(payInfo);
                break;
        }
    }


}





export default new WechatPayServer;



