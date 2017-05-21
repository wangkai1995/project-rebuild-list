import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'



@immutableRenderDecorator
class CountDown extends Component{

    constructor(props){
        super(props);
        this.state={
            count:0,
            timeout:false,
        }
    }

    componentDidMount(){
        let { time } = this.props; 
        if(!time){ 
            time='00:00';
        }
        var timeout = this.handleCountDown(time);
        this.setState({
            count: time,
            timeout: timeout,
        })
    }
    
    //倒计时修正
    componentWillReceiveProps(nextProps){
         let { time } = nextProps; 
         var { count ,timeout } = this.state;
         if(count !== time){
            clearInterval(timeout);
            var timeout = this.handleCountDown(time);
            this.setState({
                count: time,
                timeout: timeout,
            })
         }
    }

    componentWillUnmount(){
        var { timeout } = this.state;
        clearInterval(timeout);
    }

    handleCountDown(countTime){
        const { onOver } = this.props;
        var self = this;
        let time =  countTime.split(':');
        let minute = time[0]? parseInt(time[0]): 29;
        let seconds = time[1]? parseInt(time[1]): 59;
        let buff = [];

        var timeout = setInterval(function(){
            if(minute >0 || seconds >0){
                    seconds--;
                    if(seconds < 0){
                        minute--;
                          
                        if(minute < 0 && seconds < 0){
                            clearInterval(timeout);
                            onOver();
                        }
                        seconds = 59;                   
                    }
                    buff[0] = minute+'';
                    buff[1] = seconds+'';
                    if(minute < 10){
                        buff[0] = '0'+minute;
                    }
                    if(seconds < 10){
                        buff[1] = '0'+seconds;
                    }
                    let countDown = buff[0]+":"+buff[1];
                    self.setState({
                        count:countDown,
                    })
            }else{
                clearInterval(timeout);
                onOver();
            }
        },1000);
        return timeout;
    }

    
    render(){
        const { count } = this.state;
        return(
            <span>
                {count}
            </span>
        );
    }

}





export default CountDown;

