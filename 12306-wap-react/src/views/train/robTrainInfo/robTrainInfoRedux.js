import { combineReducers } from 'redux';
import robTrainInfo from '../../../components/train/robTrainInfo/robTrainInfoContainerRedux';
import * as robTrainInfoActions from '../../../components/train/robTrainInfo/robTrainInfoContainerAction';


//reducer
export default combineReducers({
    robTrainInfo,
});



//action
export const actions = robTrainInfoActions;

