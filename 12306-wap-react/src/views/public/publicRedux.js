import { combineReducers } from 'redux';
import citys from './city/cityRedux';
import company from './company/companyRedux';


export default combineReducers({
	citys,
    company,
});