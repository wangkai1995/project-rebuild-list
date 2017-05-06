import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import styles from './orderDetail.scss';


import SessionServer from '../../../server/session/index';
import Popup from '../../modal/Popup';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class OrderDetailProgress extends Component {
    
    constructor(props){
        super(props);
        this.state={
            progress: SessionServer.get('trainProgressValue')? SessionServer.get('trainProgressValue') : 0 ,
            timeout:false,
        }
    }



    componentDidMount(){
        var timeout = this.handleProgressStatus();
        this.setState({
            timeout:timeout,
        })
    }


    componentWillUnmount(){
        var { timeout } = this.state;
        clearInterval(timeout);
        SessionServer.remove('trainProgressValue');
    }


    
    handleProgressStatus(){
        let { progress } = this.state;
        let { onQuery ,onTimeout } = this.props;
        var count = 0;
        var self = this;
        var timeout = setInterval(function(){
            //最高不超过2分15秒
            //超过则主动通知服务器取消订单
            if( progress+1 > 90 ){
                clearInterval(timeout);
                SessionServer.remove('trainProgressValue');
                onTimeout()
                return false;
            }
            progress++;
            count++;
            SessionServer.set('trainProgressValue',progress);
            self.setState({
                progress:progress,
            })
            //请求一次是否占座成功
            if(count > 4){
                onQuery();
                count = 0;
            }
        },1500)
        return timeout;
    }


    render(){
        const { progress } = this.state;
        return(
           <div styleName="train-progress-container" >
                <p styleName="progress" style={{width:`${progress}%`}}></p>
                <div styleName="meesage">
                    <span styleName="fl" >占座中</span>
                    <span styleName="fr" >{progress}%</span>
                </div>
            </div>
        );
    }
    
}




export default  OrderDetailProgress;
