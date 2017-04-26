import React,{ Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './passengers.scss';
import icon from '../../../styles/sprite.css';



@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class PassengersList extends Component{

    constructor(props){
        super(props);
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
        const { passengers } = this.props;
        if(passengers){
            var list = passengers.map(function(item){
                return(
                        <li     styleName="passenger-item" 
                                key={item.passportId}
                        >
                            <h2>{item.userName}</h2>
                            <p>身份证: {item.passportId}</p>
                            <Link to={`/user/changePassenger/update/${item.passengerId}`}>
                                <i styleName="cicon icon-right-icon"></i>
                            </Link>
                        </li>
                )
            });
            return list;
        }
    }



    render(){
        return(
            <ul styleName='passenger-list'>
                {this.getPassengerList()}
            </ul>
        )
    }


}






export default PassengersList


