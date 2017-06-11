import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './index.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ValidateCode extends Component{

    constructor(props){
        super(props);
        this.state={
            count:0,
            text:'获取验证码'
        }
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(){
        const self = this;
        const { disabled ,onHandleSubmit } = this.props;
        const { count, text } = this.state;
        if( !disabled && count === 0){
            this.setState({
                count:59,
            })
            onHandleSubmit();
            var time =setInterval(function(){
                var { count } = self.state;
                if(count-1 === 0){
                    self.setState({
                        count:0,
                    });
                    return clearInterval(time);
                }
                count--;
                self.setState({
                    count:count,
                });
            },1000);
        }
    }

    
    render(){
        const { disabled ,prefix } = this.props;
        const { count, text } = this.state;
        const buttonClass=classnames({
            [`${prefix}-validcode`]: true,
            'disabled': disabled || count !== 0,
        });
        return(
            <span 
                onClick={this.handleClick}
                styleName={buttonClass}
            >
                {count === 0? text : count}
            </span>
        );
    }

}





export default ValidateCode;

