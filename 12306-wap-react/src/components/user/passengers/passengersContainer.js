import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './passengers.scss';


import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';
import ModalLoading from '../../../components/modal/loading';
import ModalAlert from '../../../components/modal/Alert';


import PassengersButton from './passengersButton';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class PassengersContainer extends Component{

    constructor(props){
        super(props);
    }


    componentDidMount(){
        const { actions ,push } = this.props; 
        let token = TokenServer.getToken();
        if( token ){
            actions.requestPassengers(userModel.getPassenger,{
                access_token : token.access_token,
            });
        }else{
            push('/user/login');
        }
    }
    

    getPassengerList(){
        const{ model } = this.props;
        switch(model){
            case 'user':
                return this.getShowPassenger();
            default:
                return this.getShowPassenger();
        }
    }



    getShowPassenger(){

    }



    render(){
        return(
            <div styleName="container" >
                <PassengersButton />
                <ul styleName='passenger-list'>
                    {this.getPassengerList()}
                </ul>
            </div>
        )
    }


}






export default PassengersContainer


