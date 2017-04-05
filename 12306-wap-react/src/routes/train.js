import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';


import Train from '../views/train/train';
import TrainIndex from '../views/train/index/index';
import TrainList from '../views/train/list/list';
import TrainSeat from '../views/train/seat/seat';
import TrainThrough from '../views/train/through/through'



const TrainRoutes =  function(){
    return(
        <Route path='/train' component={Train} >
            <IndexRoute  component={TrainIndex} />
            <Route path='/train/list/:fromCityName/:fromCityCode/:toCityName/:toCityCode/:detpDate/:findGD'  component={TrainList}/>
            <Route path='/train/seat/:fromCityCode/:toCityCode/:detpDate/:trainCode'  component={TrainSeat}/>
            <Route path='/train/through/:deptDate/:trainCode'  component={TrainThrough}/>
        </Route> 
    )      
};


export default TrainRoutes;