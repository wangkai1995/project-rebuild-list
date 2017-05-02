import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './fillOrder.scss';
import icon from '../../../styles/sprite.css';

import SessionServer from '../../../server/session/index';
import ModalAlert from '../../../components/modal/Alert';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class TrainfillOrderPublicPassenger extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            passengerInfo : false,
        }
        this.handleAddPassenger = this.handleAddPassenger.bind(this);
        this.handleAddChilder = this.handleAddChilder.bind(this);
    }


    componentWillReceiveProps(nextProps){
        const { passengerInfo } = nextProps;
        if(passengerInfo){
            var passenger = passengerInfo.map(function(item){
                var buff = item;
                buff.delete = false;
                return buff;
            })
            this.setState({
                passengerInfo:passenger,
            });
        }
    }
    

    handleAddPassenger(){
        const { passengerInfo } = this.state;
        const { push } = this.props;
        if(passengerInfo.length +1 > 5){
            return ModalAlert.show({
                content:'最多只能添加5名乘客',
                onClick:function(){
                    ModalAlert.hide();
                }
            });
        }
        push('/user/passenger/train');
    }


    handleAddChilder(){
        const { passengerInfo } = this.state;
        const { push } = this.props;
        if(passengerInfo.length +1 > 5){
            return ModalAlert.show({
                content:'最多只能添加5名乘客',
                onClick:function(){
                    ModalAlert.hide();
                }
            });
        }
        if(!passengerInfo){
            return ModalAlert.show({
                content:'至少有一名成人乘客',
                onClick:function(){
                    ModalAlert.hide();
                }
            });
        }
        push('/user/addChilder');
    }


    handleClick(flag,index){
        let { passengerInfo } = this.state;
        if(passengerInfo[index]){
            passengerInfo[index].delete = flag;
            this.setState({
                passengerInfo:passengerInfo,
            })
        }
    }


    handleDelete(index){
        const { onPassengerChange } = this.props;
        let { passengerInfo } = this.state;
        let deletes = passengerInfo.splice(index,1);
        if(passengerInfo.length ===0){
            passengerInfo = false;
        }
        this.setState({
            passengerInfo:passengerInfo,
        });
        SessionServer.set('trainPassenger',passengerInfo);
        onPassengerChange();
    }


    getPassengerItem(){
        const { passengerInfo } = this.state;
        const self = this;
        return passengerInfo.map(function(item,index){
            const passengerIcon = classnames({
                 'passenger-icon' : true,
                 'active': item.delete,
            });
            const passengerDelete = classnames({
                 'passenger-delete' : true,
                 'active': item.delete,
            });
            //成人
            if(!item.childer){
                return(
                    <div key={item.passportId}  styleName="passenger-item" onClick={ self.handleClick.bind(self,!item.delete,index) }>
                        <div styleName={passengerIcon}>
                            <i styleName="cicon icon-icon-fillorder-cho"></i>
                        </div>
                        <div styleName="passenger-message">
                            <p>{item.userName}</p>
                            <p>{item.passportId}</p>
                        </div>
                        <div styleName={passengerDelete} onClick={ self.handleDelete.bind(self,index) }>
                            <span>删除</span>
                        </div>
                    </div>
                )
            }
            //儿童
            return(
                <div key={item.userName}  styleName="passenger-item" onClick={ self.handleClick.bind(self,!item.delete,index) }>
                    <div styleName={passengerIcon}>
                        <i styleName="cicon icon-icon-fillorder-cho"></i>
                    </div>
                    <div styleName="passenger-message">
                        <p>{item.userName}&nbsp;<i styleName="cicon icon-label-child"></i></p>
                        <p>请使用{item.adult.userName}身份证取票</p>
                    </div>
                    <div styleName={passengerDelete} onClick={ self.handleDelete.bind(self,index) }>
                        <span>删除</span>
                    </div>
                </div>
            )
           
        })
    }


    getPassengerInfo(){
        const { passengerInfo } = this.state;
        return(
            <div styleName="passenger-container">
                <div styleName="passenger-label">
                    <label>乘车人&nbsp;</label>
                    <span>还可以添加&nbsp;({5-passengerInfo.length}人)</span>
                </div>
                {this.getPassengerItem()}
                <div styleName="passenger-change">
                    <a onClick={this.handleAddPassenger} >
                        <span>添加/编辑乘客</span>
                    </a>
                    <a onClick={this.handleAddChilder} >添加儿童</a>
                </div>
            </div>
        )
    }
    

    render(){
        const { passengerInfo } = this.state;
        if(passengerInfo){
            return this.getPassengerInfo();
        }else{
            return  <Link to="/user/passenger/train" styleName="add-passenger">
                        <i styleName="cicon icon-icon-add-passenger"></i>&nbsp;
                        添加乘客(成人/儿童)
                    </Link>
        }
    }
    
}



export default  TrainfillOrderPublicPassenger;



