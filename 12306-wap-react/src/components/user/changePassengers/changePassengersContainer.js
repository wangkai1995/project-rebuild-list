import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './changePassengers.scss';


import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';
import ModalLoading from '../../../components/modal/loading';
import ModalAlert from '../../../components/modal/Alert';


import ChangePassengersForm from './changePassengersForm';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ChangePassengersContainer extends Component{

    constructor(props){
        super(props);
    }


    render(){
        console.log(this.props);
        const { actions ,error ,isVisible } = this.props;
        return(
            <div styleName='container'>
                <ChangePassengersForm />
            </div>
        );
    }

}






export default ChangePassengersContainer


