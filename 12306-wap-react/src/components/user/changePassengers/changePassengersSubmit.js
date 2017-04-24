import React ,{ Component , PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './changePassengers.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ChangePassengersSubmit extends Component{

    constructor(props){
        super(props);
    }


    addSubmit(){
        const { disabled ,handleSubmit } = this.props;
        const buttonClass=classnames({
            'submit': true,
            'disabled-add':disabled,
        });
        return <span styleName={buttonClass} onClick={handleSubmit}>保存</span>
    }


    updateSubmit(){
        const { disabled ,handleSubmit, onDelete } = this.props;
        const updateClass=classnames({
            'inline-submit': true,
            'submit-stable': disabled,
            'submit-update': !disabled,
        });
        const deleteClass=classnames({
            'inline-submit':true,
            'submit-delete': true,
        });
        return(
            <div>
                <span styleName={updateClass} onClick={handleSubmit}>保存</span>
                <span styleName={deleteClass} onClick={onDelete}>删除</span>
            </div>
        )
    }
    

    getSubmit(){
        const { model } = this.props;
        if(model === 'add'){
            return this.addSubmit();
        }else{
            return this.updateSubmit();
        }

    }
    
    render(){
        const { error } = this.props;
        return (
            <div>
                <p styleName="error" >{error}</p>
                { this.getSubmit() }
            </div> 
        )
    }


}





export default ChangePassengersSubmit;
