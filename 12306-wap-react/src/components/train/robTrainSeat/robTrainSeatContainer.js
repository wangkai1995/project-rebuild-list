import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './robTrainSeat.scss';



import SessionServer from '../../../server/session/index'

import ModalLoading from '../../../components/modal/loading';
import ModalAlert from '../../../components/modal/Alert';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class RobTrainSeatContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            tabType: 0,
            firstSeat: false,
            standbySeat: false,
        };
    }



    render(){
        return(
            <div styleName="container">

            </div>
        )
    }
}





export default RobTrainSeatContainer;

