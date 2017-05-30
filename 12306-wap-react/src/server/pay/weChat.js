
import SessionServer from '../session/index';


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
            var search = getRequest( location.search.split("?")[1] );
            SessionServer.set('wechatCode',search);
            urlRestore();
         }else if( SessionServer.get('wechatCode') ){
            var search  = SessionServer.get('wechatCode');
            //开始支付
            SessionServer.remove('wechatCode');
            // $scope.statePay( search );
         }
    }



}



export default new WechatPayServer;


