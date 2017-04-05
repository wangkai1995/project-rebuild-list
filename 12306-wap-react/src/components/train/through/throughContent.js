import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './through.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainTroughContent extends Component{
    
    constructor(props){
        super(props);
    }


    getThroughHeader(){
        return(
            <tr>
               <td>站次</td>
               <td>站名</td>
               <td>到站时间</td>
               <td>出发时间</td>
               <td>停留时间</td>
            </tr>
        );
    }


    getThroughInfo(){
        const { throughData } = this.props;
        if(Array.isArray(throughData) && throughData.length >0){
            return throughData.map(function(item,index){
                const indexClass=classnames({
                    'index-num': true,
                    'index-unit': index+1 < 9,
                })
                return(
                    <tr>
                        <td styleName={indexClass}>
                            {item.stationNum}
                        </td>
                        <td>
                            {item.stationName}
                        </td>
                        <td>
                            {item.arrTime}
                        </td>
                        <td>
                            {item.deptTime}
                        </td>
                        <td>
                            {item.stayTime}
                        </td>
                    </tr>
                );
            });
        }   
    }


    render(){
        return (
            <table>
                <thead>
                    { this.getThroughHeader() }
                </thead>
                <tbody>
                    { this.getThroughInfo() }
                </tbody>
            </table>
        );
    }


}




export default TrainTroughContent;


