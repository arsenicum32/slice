import styles from './Login.styl';
import template from './Login.jade';

import React from 'react';
import {Component} from 'react';
//import * as d3 from "d3";

class Login extends Component {
 rd(){
   return [
     Math.floor(Math.random() * window.innerWidth),
     Math.floor(Math.random() * window.innerHeight)
   ]
 }
 selone(...ar){
   if(ar[0] && typeof ar[0] === typeof new Array()) {
     return ar[0][Math.floor(Math.random() * ar[0].length)];
   }else{
     return ar ? ar[Math.floor(Math.random() * ar.length)]:0;
   }
 }
 componentDidMount(){
   var b = d3.select('#back');
   b.append('svg').style({
     'width': 'inherit',//b.attr('width'),
     'height': 'inherit'//b.attr('height')
   })
   var svg = d3.select('svg');

   for(let i of new Array(100)){
     const w = Math.floor(Math.random() * 12 + 8);
     svg.append(this.selone('rect', 'circle' , 'path')).attr({
       width: w,
       height: w,
       fill: this.selone('#f55', 'blue', 'yellow', 'lightgreen','pink', 'hotpink'),
       cx:this.rd()[0],
       cy:this.rd()[1],
       r:w,
       d: d3.svg.symbol().type(this.selone( d3.svg.symbolTypes ) ),
       transform: `translate(${this.rd()[0]},${this.rd()[1]})`,
       stroke: 0
     })
   }
 }
 render(){
   return template({ styles });
 }
}

export default Login;
