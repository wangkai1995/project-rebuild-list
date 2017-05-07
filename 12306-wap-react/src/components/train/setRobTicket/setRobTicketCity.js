import React ,{ Component ,PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './setRobTicket.scss';
import icon from '../../../styles/sprite.css';



@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class SetRobTicketCity extends Component{
	static propTypes = {
		fromCityName: PropTypes.string,
		toCityName: PropTypes.string,
		onSelectCity: PropTypes.func,
	};

	handleClick(direction){
		this.props.onSelectCity(direction);
	}
	
	render(){
		const { fromCityName, toCityName } = this.props; 
		
		return(
			<div styleName='set-rob-city '>
				<div styleName="rob-city">
					<div styleName="fromCity">
						<span>出发城市</span>
						<br></br>
						<a onClick={ () =>{ this.handleClick('from'); } }>
							{fromCityName}
						</a>
					</div>
					<i styleName='cicon icon-jiaohuan-ico'></i>
					<div styleName="toCity">
						<span>到达城市</span>
						<br></br>
						<a onClick={ () =>{ this.handleClick('to'); } }>
							{toCityName}
						</a>
					</div>
				</div>
			</div>
		);
	}
}




export default SetRobTicketCity;


