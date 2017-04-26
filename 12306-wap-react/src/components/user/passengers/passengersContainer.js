import React,{ Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './passengers.scss';
import icon from '../../../styles/sprite.css';


import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';
import ModalLoading from '../../../components/modal/loading';
import ModalAlert from '../../../components/modal/Alert';


import PassengersButton from './passengersButton';
import PassengersList from './passengersList';



@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class PassengersContainer extends Component{

    constructor(props){
        super(props);
    }


    componentDidMount(){
        const { actions ,push } = this.props; 
        let token = TokenServer.getToken();
        if( token ){
            actions.requestPassengers(userModel.getPassengerList,{
                access_token : token.access_token,
            });
        }else{
            push('/user/login');
        }
    }
    

    render(){
        const { passengers,params } = this.props;
        return(
            <div styleName="container" >
                <PassengersButton />
                <PassengersList passengers={passengers} model={params.model} />
            </div>
        )
    }


}






export default PassengersContainer


