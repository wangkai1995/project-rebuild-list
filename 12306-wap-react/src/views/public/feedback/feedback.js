import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './feedback.scss';


import FeedbackContainer from '../../../components/public/feedback/feedbackContainer';



@CSSModules(styles,{allowMultiple : true})
class Feedback extends Component{
    render(){
        return(
            <div styleName="container">
                <FeedbackContainer />
            </div>
        )
    }
}



export default  Feedback;



