import React ,{ Component,PropTypes } from 'react';
import RecatDOM from 'react-dom';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import classnames from 'classnames';
import _ from 'lodash';
import styles from './weChat.scss';
import icon from '../../../styles/sprite.css';

import Popup from '../../../components/modal/Popup';
import ModalAlert from '../../../components/modal/Alert';

import PayModel from '../../../http/pay/index';


@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class ScanCodeWechat extends Component{
	constructor(props){
        super(props);
    }

    render(){
    	const { qrCode ,onClose } = this.props; 
        return(
            <Popup>
                <div styleName="qrcode-container">
                    <img styleName="code" src={qrCode} alt="ScanCodeWechat"/>
                    <i  onClick={onClose} styleName="close cicon icon-icon-close"></i>
                </div>
            </Popup>
        );
    }
}




const ScanCode = function(){
	var self = this;
	var container = document.createElement('div');
	var time;
    
    //显示扫码
    function showScanCodeModal(payInfo){      
        const { qrCode } = payInfo;
        document.body.appendChild(container);
        return  RecatDOM.render(
            <ScanCodeWechat qrCode={qrCode} onClose={hideScanCodeModal} />,
            container
        );
    }
    
    //关闭扫码
    function hideScanCodeModal(){
        clearInterval(time);
        return RecatDOM.render(
                <div />,
            container
        );
    }

	//检查汽车票是否支付
    function examineBus(payInfo,callBack){
        time = setInterval(function(){
            PayModel.busState({
                order: payInfo.orderNo,
                token: payInfo.token
            }).then(function(state){
                if(state.code === '00000'){
                    if(state.data === 1){
                        clearInterval(time);
                        hideScanCodeModal();
                        ModalAlert.show({
			                content:'支付成功!',
			                onClick:function(){
			                    ModalAlert.hide();
			                    callBack();
			                }
			            });
                    }
                }
            },function(error){
                console.log('出错了');
            });
        },1500);
    }

    //检查火车票是否支付
    function examineTrain(payInfo,callBack){
        time = setInterval(function(){
            PayModel.trainState({
                order: payInfo.orderNo,
                token: payInfo.token
            }).then(function(state){
                if(state.code === '00000'){
                    if( state.data.status === 4 || state.data.status === 14 ){
                        clearInterval(time);
                        hideScanCodeModal();
                        ModalAlert.show({
			                content:'支付成功!',
			                onClick:function(){
			                    ModalAlert.hide();
			                    callBack();
			                }
			            });
                    }
                }
            },function(error){
                console.log('出错了');
            });
        },1500);
    }

    //开始支付
    function SacnCodePay(Info,fn){
        showScanCodeModal(Info);
        switch(Info.model){
            case 'train':
                examineTrain(Info,fn);
                break;
            case 'bus':
                examineBus(Info,fn);
                break;
        }
    }


    return {
        SacnCodePay: SacnCodePay,
    }

}






export default ScanCode();




