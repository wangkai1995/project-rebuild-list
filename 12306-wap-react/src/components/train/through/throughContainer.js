import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './through.scss';

import trainModel from '../../../http/train/index';
import ModalLoading from '../../../components/modal/loading';




@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainTroughContainer extends Component{
    
    constructor(props){
        super(props);
    }
    

    //初始化参数请求车次信息
    componentDidMount(){
        const { actions ,params } = this.props;        
        actions.requestThroughInfo(trainModel.trainThrough,{
            deptDate: params.deptDate,
            trainCode: params.trainCode
        });
    }



    render(){
        const { throughData,loading } = this.props;
        return (
            <div styleName="through-container">
                <ModalLoading isVisible={loading} textContent="正在为您加载"  />
            </div>
        );
    }


}




export default TrainTroughContainer;


