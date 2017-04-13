import React ,{ Component,PropTypes } from 'react';
import RecatDOM from 'react-dom';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import classnames from 'classnames';
import styles from './modal.scss';

import Popup from './Popup';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ModalAlertDialog extends Component{
    static propTypes = {
        title: PropTypes.string,
        content:  PropTypes.string,
        buttonText: PropTypes.string,
        onClick: PropTypes.func,
    };

    constructor(props){
        super(props);
    }
    

    render(){
        let {  content ,title ,onClick ,buttonText } = this.props;
        title = title? title :'提示';
        buttonText = buttonText? buttonText :'确定';
        return (
            <Popup>
                    <div styleName="dialog-body">
                        <h3 styleName="dialog-title">{title}</h3>
                        <p styleName="dialog-content">{content}</p>
                        <div styleName="dialog-buttons">
                            <button styleName="modal-button modal-button-alone" onClick={onClick}>{buttonText}</button>
                        </div>
                    </div>
            </Popup>
        );   
    }

}

const modalAlert = function(){
    var self = this;
    var container = document.createElement('div');

    var addAlert = function(props){
        document.body.appendChild(container);
        return  RecatDOM.render(
                    <ModalAlertDialog {...props} />,
                    container
        );
        
    }

    var removeAlert = function(){
        return RecatDOM.render(
                <div />,
            container
        )
    }

    return{
        show:addAlert,
        hide:removeAlert,
    }
}


export default modalAlert();

