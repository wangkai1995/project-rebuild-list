import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './login.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ValidateCode extends Component{

    constructor(props){
        super(props);
    }

    
    render(){
         const { disabled ,handleSubmit } = this.props;
        const buttonClass=classnames({
            'login-validcode': true,
            'button-disabled': disabled,
        });
        return(
            <button 
                onClick={handleSubmit}
                styleName={buttonClass}
            >
                获取动态密码
            </button>
        );
    }

}





export default ValidateCode;



