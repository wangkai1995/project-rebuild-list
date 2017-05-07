import React,{ Component } from 'react';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './robPack.scss';


import TrainRobPackContainer from '../../../components/train/robPack/robPackContainer';


@CSSModules(styles,{allowMultiple: true})
class TrainRobPack extends Component {
    
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div styleName="container" >
                <TrainRobPackContainer push={push} />
            </div>
        );
    }
}



export default TrainRobPack;

