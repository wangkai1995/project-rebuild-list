import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './index.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class UserHeader extends Component{

    constructor(props){
        super(props);
        console.log(this.props);
    }
    

    render(){
        return(
            <div>
               
            </div>
        );
    }


}






export default UserHeader;

