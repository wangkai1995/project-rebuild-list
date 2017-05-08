import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import styles from './robTrainInfo.scss';

import { actions } from './robTrainInfoRedux';

import Header from '../../../layouts/header/header';
import RobTrainInfoContainer from '../../../components/train/robTrainInfo/robTrainInfoContainer';



@CSSModules(styles,{allowMultiple : true})
class TrainRobTrainInfo extends Component{

    render(){
        const{ robTrainInfo ,robTrainInfoAction ,params ,push } = this.props;
        return(
            <div styleName="container">
                <Header title="车次列表" />
                <RobTrainInfoContainer  {...robTrainInfo} actions={robTrainInfoAction} params={params} push={push} />
            </div>
        )
    }
}



export default connect( state =>{
    return{
        robTrainInfo : state.train.robTrainInfo.robTrainInfo,
    };
},dispatch =>{
    return{
        robTrainInfoAction : bindActionCreators(actions , dispatch),
        push : bindActionCreators(push , dispatch),
    }
})(TrainRobTrainInfo);


