import React,{ Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './passengers.scss';
import icon from '../../../styles/sprite.css';

import SessionServer from '../../../server/session/index';
import ModalAlert from '../../../components/modal/Alert';

@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class PassengersList extends Component{

    constructor(props){
        super(props);
        this.state={
            selectPassenger:false,
        };
    }


    componentDidMount(){
        const{ model } = this.props;
        if(model !== 'user'){
            var select = SessionServer.get(model+'Passenger');
            this.setState({
                selectPassenger : select,
            });
        }
    }
    

    handleCheckedPassenger(checked,item){
        const{ model } = this.props;
        let { selectPassenger } = this.state;
        if(checked){
            if(!Array.isArray(selectPassenger)){
                selectPassenger = [];
            }
            if(selectPassenger.length +1 >5){
                return  ModalAlert.show({
                    content:'最对只能添加5名乘客',
                    onClick:function(){
                        ModalAlert.hide();
                    }
                });
            }
            selectPassenger.push(item);
            this.setState({
                selectPassenger:selectPassenger,
            })
        }else{
            if(Array.isArray(selectPassenger) && selectPassenger.length >0){
                selectPassenger = selectPassenger.filter(function(item){
                    if(item.passportId !== item.passportId){
                        return item;
                    }
                    return false;
                })
                this.setState({
                    selectPassenger:selectPassenger,
                });
            }
        }
        SessionServer.set(model+'Passenger',selectPassenger);
    }
    

    getSubmit(){
        const{ model } = this.props;
        if(model !== 'user'){
            return <button styleName="submit-btn"
                           onClick={ ()=>{ window.history.back() } }
                    >
                        提交
                    </button>
        }
    }
    

    getPassengerList(){
        const{ model } = this.props;
        switch(model){
            case 'user':
                return this.getShowPassenger();
            default:
                return this.getSelectPassenger();
        }
    }


    getSelectPassenger(){
        const self = this;
        const { passengers } = this.props;
        const { selectPassenger } = this.state;
        if(passengers){
            var list = passengers.map(function(item){
                var checked = false;

                if(Array.isArray(selectPassenger) && selectPassenger.length >0){
                    for(var i=0; i<selectPassenger.length; i++ ){
                        if(selectPassenger[i].passportId === item.passportId){
                            checked = true;
                            break;
                        }
                    }
                }

                const checkClass= classnames({
                    'check-select' : true,
                    'cicon': true,
                    'icon-att-icon': checked,
                    'icon-order-choice-n': !checked,
                });

                return(
                        <li     styleName="passenger-item" 
                                key={item.passportId}
                        >
                            <label styleName={checkClass}>
                                <input checked={checked}  type="checkBox" onClick={self.handleCheckedPassenger.bind(self,!checked,item)} />   
                            </label>
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
                {this.getSubmit()}
            </ul>
        )
    }


}






export default PassengersList


