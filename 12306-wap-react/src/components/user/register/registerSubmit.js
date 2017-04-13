import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './register.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class RegisterSubmit extends Component{

    constructor(props){
        super(props);
        this.state={
            checked:true,
        }
        this.handleCheck=this.handleCheck.bind(this);
    }


    handleCheck(){
        let { checked } = this.state;
        checked = !checked;
        this.setState({
            checked: checked,
        });
        this.props.onCheckAgreement(checked);
    }

    
    render(){
        const { disabled ,handleSubmit } = this.props;
        const { checked } = this.state;
        const buttonClass=classnames({
            'submit': true,
            'disabled':disabled,
        });
        const checkClass = classnames({
            'checked-icon-on' : checked,
            'checked-icon-off' : !checked,
        });
        return (
            <div styleName="btn-Submit">
                <span
                    styleName={buttonClass}
                    disabled={disabled}
                    onClick={handleSubmit}
                >
                    完成注册
                </span>
                <div styleName="checkbox-select">
                    <input type="checkBox" id="-checkBox" onChange={ this.handleCheck }  />
                    <label for="-checkBox" styleName={checkClass}></label>
                    <span styleName="agreement">
                        &nbsp;我已阅读并同意遵守
                        <Link>《点点出行用户服务协议》</Link>    
                    </span>
                </div>
            </div> 
        )
    }


}





export default RegisterSubmit;
