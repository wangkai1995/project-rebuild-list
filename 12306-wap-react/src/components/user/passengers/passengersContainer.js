import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './passengers.scss';


import userModel from '../../../http/user/index';
import ModalLoading from '../../../components/modal/loading';
import ModalAlert from '../../../components/modal/Alert';


import PassengersButton from './passengersButton';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class PassengersContainer extends Component{

    constructor(props){
        super(props);
         console.log(this.props);
    }


    render(){
        return(
            <div styleName="container" >
                <PassengersButton />

                

            </div>
        )
    }

}






export default PassengersContainer


