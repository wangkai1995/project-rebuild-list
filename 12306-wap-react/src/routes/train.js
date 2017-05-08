import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';


import Train from '../views/train/train';
import TrainIndex from '../views/train/index/index';
import TrainList from '../views/train/list/list';
import TrainSeat from '../views/train/seat/seat';
import TrainThrough from '../views/train/through/through'
import TrainFillOrder from '../views/train/fillOrder/fillOrder';
import TrainOrderDetail from '../views/train/orderDetail/orderDetail';
import TrainSetRobTicket from '../views/train/setRobTicket/setRobTicket';
import TrainRobPack from '../views/train/robPack/robPack';
import TrainRobTrainInfo from '../views/train/robTrainInfo/robTrainInfo'



const TrainRoutes =  function(){
    return(
        <Route path='/train' component={Train} >
            <IndexRoute  component={TrainIndex} />
            <Route path='/train/list/:fromCityName/:fromCityCode/:toCityName/:toCityCode/:detpDate/:findGD'  component={TrainList} />
            <Route path='/train/seat/:fromCityCode/:toCityCode/:detpDate/:trainCode'  component={TrainSeat} />
            <Route path='/train/through/:deptDate/:trainCode'  component={TrainThrough} />
            <Route path='/train/fillOrder/:type' component={TrainFillOrder} />
            <Route path='/train/orderDetail/:orderNo' component={TrainOrderDetail} />
            <Route path='/train/setRobTicket/:detpDate' component={TrainSetRobTicket} />
            <Route path='/train/robPack' component={TrainRobPack} />
            <Route path='/train/robTrainInfo/:fromCityName/:fromCityCode/:toCityName/:toCityCode/:detpDate' component={TrainRobTrainInfo} />
        </Route> 
    )      
};





export default TrainRoutes;


