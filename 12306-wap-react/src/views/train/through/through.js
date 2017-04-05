import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';


import styles from './through.scss';
import { actions } from './throughRedux';

import Header from '../../../layouts/header/header';
import TrainTroughContainer from '../../../components/train/through/throughContainer';



@CSSModules(styles,{allowMultiple: true})
class TrainThrough extends Component {
    
    constructor(props){
        super(props);
    }

    render(){
        const { params, through, throughAction  }= this.props;
        return(
            <div styleName="through-container" >
                <Header title="经停查询" />
                <TrainTroughContainer params={params} actions={throughAction} {...through} />
            </div>
        );
    }
}




export default connect( state =>{
    return{
        through : state.train.through.through,
    };
},dispatch =>{
    return{
        throughAction : bindActionCreators(actions , dispatch),
    };
})(TrainThrough);



