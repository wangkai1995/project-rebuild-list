import React ,{ Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './footer.scss';
import icon from '../../styles/sprite.css';



@immutableRenderDecorator
@CSSModules(Object.assign({},styles,icon),{allowMultiple: true})
class SearchFooter extends Component{

	render(){
        const { Model } = this.props;
        const trainIcon = classnames({
            'cicon':true,
            'icon-train_gray': Model !== 'train',
            'icon-train-select' : Model === 'train',
        });
        const busIcon = classnames({
            'cicon':true,
            'icon-bus': Model !== 'bus',
            'icon-bus-select' : Model === 'bus',
        });
        const userIcon = classnames({
            'cicon':true,
            'icon-geren': Model !== 'user',
            'icon-geren-select' : Model === 'user',
        });
        return(
    		<div styleName="footer">
                <Link>
                    <i styleName={trainIcon}></i>
                    <span>火车票</span>
                </Link>
                <Link>
                    <i styleName={busIcon}></i>
                    <span>汽车票</span>
                </Link>
                <Link>
                    <i styleName={userIcon}></i>
                    <span>个人中心</span>
                </Link>
            </div>
        );
	}
}




export default SearchFooter;


