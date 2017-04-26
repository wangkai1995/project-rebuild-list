import React ,{ Component,PropTypes } from 'react';
import RecatDOM from 'react-dom';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './modal.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class PopupContainer extends Component{
	constructor(props){
		super(props);
	}

	render(){
        const { prefix } = this.props;
        const popupClass=classnames({
            'popup-container': !prefix,
            [`${prefix}-popup-container`]: prefix,
        });
		return (
			<div styleName={popupClass} >
				{this.props.children}
			</div>
		);
	}
}



@immutableRenderDecorator
class Popup extends Component{
	constructor(props){
		super(props);
	}

	appendMaskIntoDoc() {
        RecatDOM.unstable_renderSubtreeIntoContainer(
            this,
            <PopupContainer {...this.props}>
                {this.props.children}
            </PopupContainer>,
            this.container
        )
    }

    componentDidMount() {
        this.container = document.createElement('div')
        document.body.appendChild(this.container)
        this.appendMaskIntoDoc()
    }

    componentDidUpdate() {
        this.appendMaskIntoDoc()
    }

    componentWillUnmount() {
        document.body.removeChild(this.container)
    }


	render(){
		return null;
	}
}


export default Popup ;


