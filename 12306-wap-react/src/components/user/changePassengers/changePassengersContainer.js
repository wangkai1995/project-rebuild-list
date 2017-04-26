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
        this.handleAddPassenger = this.handleAddPassenger.bind(this);
        this.handleUpdatePassenger = this.handleUpdatePassenger.bind(this);
    }

    componentDidMount(){
        const { actions ,push ,params } = this.props; 
        if(params.model === 'update'){
            let token = TokenServer.getToken();
            actions.requestPassengersInfo(userModel.getPassenger,{
                access_token : token.access_token,
                passengerId: params.id,
            });
        }
    }

    componentWillUnmount(){
         const { actions } = this.props;
         actions.resetPassengerInfo();
    }
    
    //更新的时候判断
    componentWillReceiveProps(nextProps){
        const { actions } = this.props;
        const { error ,addFlag ,updateFlag } = nextProps;
        //如果有错误
        if(error){
            ModalAlert.show({
                content:error,
                onClick:function(){
                    ModalAlert.hide();
                    actions.resetError();
                }
            });
        }
        //添加成功
        if(addFlag){
            ModalAlert.show({
                content:'添加成功',
                onClick:function(){
                    ModalAlert.hide();
                    window.history.back();
                }
            });
        }
        //更新成功
        if(updateFlag){
            ModalAlert.show({
                content:'更新成功',
                onClick:function(){
                    ModalAlert.hide();
                    window.history.back();
                }
            });
        }
    }
    
    //添加乘客
    handleAddPassenger(data){
        const { name, phone ,passportId } = data;
        const { actions } = this.props;
        let token = TokenServer.getToken();
        let birthday =  new Date(passportId.slice(6, 10), passportId.slice(10, 12), passportId.slice(12, 14));
        let yy = birthday.getFullYear();
        let m = birthday.getMonth() + 1;
        let dd = birthday.getDate();
        let mm = m < 10 ? '0' + m : m;
        birthday = yy + '-' + mm + '-' + dd;

        actions.requestAddPassengers(userModel.addPassenger,{
            access_token: token.access_token,
            userName: name,
            mobile1: phone ,
            sex: 'M',
            passengerType: 1,
            passportType:1,
            birthday:birthday,
            passportId: passportId,
        });
    }

    //更新乘客
    handleUpdatePassenger(data){
        const { name, phone ,passportId } = data;
        const { actions ,params } = this.props;
        let token = TokenServer.getToken();
        let birthday =  new Date(passportId.slice(6, 10), passportId.slice(10, 12), passportId.slice(12, 14));
        let yy = birthday.getFullYear();
        let m = birthday.getMonth() + 1;
        let dd = birthday.getDate();
        let mm = m < 10 ? '0' + m : m;
        birthday = yy + '-' + mm + '-' + dd;

        actions.requestUpdatePassengers(userModel.updatePassenger,{
            passengerId:params.id,
            info:{
                access_token: token.access_token,
                userName: name,
                mobile1: phone ,
                sex: 'M',
                passengerType: 1,
                passportType:1,
                birthday:birthday,
                passportId: passportId, 
            },
        });
    }

    render(){
        const { actions ,error ,isVisible, params ,loading } = this.props;
        return( 
            <div styleName='container'>
                <ChangePassengersForm 
                            loading={loading}
                            onAddSubmit={this.handleAddPassenger} 
                            onUpdateSubmit={this.handleUpdatePassenger}
                            model={params.model} 
                />
                <ModalLoading isVisible={loading && params.model === 'update' } />
            </div>
        );
    }

}





export default ChangePassengersContainer;


