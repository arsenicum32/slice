//import styles from './Main.styl';
import React from 'react';
import {Component} from 'react';
//import * as d3 from "d3";

class Main extends Component {
 componentDidMount(){
    ld();
 }
 render(){
   return <div id="test"></div>;
 }
}

export default Main;



function ld(){
  var width = window.innerWidth,
   height = window.innerHeight;

 var nodes = [];

 var svg = d3.select("#test").append("svg")
     .attr("width", width*1.5)
     .attr("height", height*1.5)
     .append('g')
     .call(d3.behavior.zoom().on("zoom", zoom));

 svg.append('rect').attr({
   'width' : 4000,
   'height' : 4000,
   'x': -2000,
   'y': -2000,
   'fill':'white'
 })

 //alert(d3.layout)

 var force = d3.layout.force()
     .charge(-500)
     .size([width, height])
     .nodes(nodes)
     .on("tick", tick)
     .start();

 function tick() {
   svg.selectAll("circle")
       .attr("cx", function(d) { return d.x; })
       .attr("cy", function(d) { return d.y; });
 }

 var interval = setInterval(function() {
   var d = {
     x: width / 2 + 2 * Math.random() - 1,
     y: height / 2 + 2 * Math.random() - 1
   };

   svg.append("circle")
       .data([d])
       .attr("r", 1)
     .transition()
       .ease(Math.sqrt)
       .attr("r", Math.random()*60 + 10)
       .style('fill', "#"+((1<<24)*Math.random()|0).toString(16) );

   if (nodes.push(d) > 100) {
     clearInterval(interval);
     setInterval(function(){
       svg.selectAll('circle').each(function(o,i){

         Math.random()>.9?
         d3.select(this).transition()
           .ease(Math.sqrt)
           .attr('r' ,   Math.floor(d3.select(this).attr('r')) + Math.random()*10 ):Math.random()>.98? end(this):void(0);
       })
     }, 500);
   };
   force.start();
 }, 30);

 function end(e){
   d3.select(e).transition().attr('r' , 1).each('end', function(){
     d3.select(this).remove()
   })
 }


 function zoom() {
   svg.attr("transform", "translate(" + d3.event.translate + ")"); //scale(" + d3.event.scale + ")
 }
}
