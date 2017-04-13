import React ,{ Component,PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import classnames from 'classnames';
import styles from './modal.scss';

import Popup from './Popup';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ModalDialog extends Component{
    static propTypes = {
        title: PropTypes.string,
        content:  PropTypes.string,
        isVisible: PropTypes.bool,
        buttonText: PropTypes.string,
        buttonClick: PropTypes.func,
        leftText: PropTypes.string,
        leftClick: PropTypes.func,
        rightText: PropTypes.string,
        rightClick: PropTypes.func,
    };

    constructor(props){
        super(props);
    }
    

    getButton(){
        const { buttonText, buttonClick, leftText, leftClick ,rightText ,rightClick } = this.props;
        const btnAloneClass= classnames({
            'modal-button' : true,
            'modal-button-alone' : true,
        });
        const btnClass = classnames({
            'modal-button' : true,
        });
        if(buttonText ,buttonClick){
            return <button styleName={btnAloneClass} onClick={buttonClick}>{buttonText}</button>
        }
        var buttonList = [];
        buttonList.push( <button styleName={btnClass} onClick={leftClick}>{leftText}</button> );
        buttonList.push( <button styleName={btnClass} onClick={rightClick}>{rightText}</button> );
        return buttonList;
    }
    
    
    componentWillReceiveProps(nextProps){
        this.setState({
            isVisible : nextProps.isVisible,
        });
    }   


    render(){
        const { isVisible, content ,title } = this.props;
        if(isVisible){
            return (
                <Popup>
                        <div styleName="dialog-body">
                            <h3 styleName="dialog-title">{title}</h3>
                            <p styleName="dialog-content">{content}</p>
                            <div styleName="dialog-buttons">
                                {this.getButton()}
                            </div>
                        </div>
                </Popup>
            );
        }else{
            return null;
        }
    }     
}



export default ModalDialog;