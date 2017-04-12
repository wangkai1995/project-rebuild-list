import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './forgotPassword.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ForgotPasswordSubmit extends Component{

    constructor(props){
        super(props);
    }

    
    render(){
        const { disabled ,handleSubmit } = this.props;
        const buttonClass=classnames({
            'submit': true,
            'disabled':disabled,
        });
        return (
            <div styleName="btn-Submit">
                <span
                    styleName={buttonClass}
                    disabled={disabled}
                    onClick={handleSubmit}
                >
                    下一步
                </span>
            </div> 
        )
    }


}





export default ForgotPasswordSubmit;
