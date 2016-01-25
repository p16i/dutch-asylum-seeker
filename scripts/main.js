function Map(t){this.element=d3.select(t),this.width=document.getElementById("map").offsetWidth,this.height=this.width/2;var e=d3.geo.mercator().translate([this.width/2-30,this.height/2+50]).scale(this.width/2/Math.PI),a=d3.geo.path().projection(e);this.path=a;var r=this.element.append("svg").attr("width",this.width).attr("height",this.height).append("g");this.svg=r;var n=this.element.append("div").attr("class","tooltip hidden");this.tooltip=n,this.topo=null}function TimelineGraph(t,e){var a=this;this.element=d3.select(t),this.datasets=[];var r=2010,n=2007,i=2015,o=[n,i-1],s=30,l=document.getElementById("timeline").offsetWidth,c={top:20,right:20,bottom:30,left:50},u=l-c.left-c.right,p=200-c.top-c.bottom+s;this.height=p,this.width=u,this.xScale=d3.scale.linear().domain(o).range([0,u]);var h=this.xScale;this.element.select("select").on("change",function(){var t=parseInt(a.element.select("select").node().value);a.graphs[t].element.attr("opacity",1),a.graphs[(t+1)%2].element.attr("opacity",0)});var m=d3.svg.axis().scale(h).tickPadding(s).tickFormat(d3.format("d")).orient("bottom");this.svg=this.element.select("#chart").append("svg").attr("width",u+c.left+c.right).attr("height",p+c.top+c.bottom+s).append("g").attr("transform","translate("+c.left+","+c.top+")"),this.svg.append("g").attr("class","x axis").attr("transform","translate(0,"+p+")").call(m);var f=this.svg.append("g"),y=p+20;f.append("line").attr("x1",0).attr("x2",u).attr("y1",y).attr("y2",y).attr("class","year-selector").style("stroke","black");var v=h(r),g=this.svg.append("line").attr("class","focus-line current").attr("x1",v).attr("x2",v).attr("y1",0).attr("y2",p+s/4);f.append("g").selectAll("circle").data(d3.range(n,i)).enter().append("circle").attr("class","year-bullet").classed("selected",function(t){return t==r}).attr("cx",function(t){return h(t)}).attr("cy",y).attr("r",8).on("click",function(t,e){var r=h(t);g.attr("x1",r).attr("x2",r).attr("y1",0),d3.select("#chart").selectAll(".year-bullet").classed("selected",function(t,a){return e==a}),a.onClick(t,e)}),this.tip=d3.tip().attr("class","timeline-tip").offset([-10,50]).html(function(t){return JSON.stringify(t)}),this.svg.call(this.tip),this.focusLine=this.svg.append("line").attr("class","focus-line").attr("x1",5).attr("y1",0).attr("x2",50).attr("y2",p+s/4).style("opacity",0),this.highestValueForYear=function(t){var e=_.filter(_.flatten(a.datasets),function(e){return console.log(e),e.year==t});return _.max(e,function(){return d.number})};var x=["number","relative"];this.graphs=_.map(["absolute-chart","relative-chart"],function(t,e){var r=new LineGraph(a,t,x[e]);return r}),this.graphs[1].element.attr("opacity",0)}function LineGraph(t,e,a){this.parent=t,this.element=t.svg.append("g").attr("id",e);d3.scale.linear().range([t.height,0]);this.valueKey=a}function type(t){return t.year=+t.year,t.number=+t.number,t}function ready(t,e,a){console.log(t),console.log(e),console.log(a),map=new Map("#map"),timeline=new TimelineGraph("#timeline"),map.onClick=function(t,e){var a=t.properties.name;asylum[a]&&timeline.addData(asylum[a].toYearlyData())},timeline.onClick=function(t,e){map.colorMap(t)};var r=topojson.feature(e,e.objects.countries).features;map.topo=r;for(var n=0;n<a.length;n++){var i=a[n];null==asylum[i.Country]?(tmp={},tmp.Citizenship=i.Citizenship,tmp[2007]={Total:0,M:{1:0,2:0},F:{1:0,2:0}},tmp[2008]={Total:0,M:{1:0,2:0},F:{1:0,2:0}},tmp[2009]={Total:0,M:{1:0,2:0},F:{1:0,2:0}},tmp[2010]={Total:0,M:{1:0,2:0},F:{1:0,2:0}},tmp[2011]={Total:0,M:{1:0,2:0},F:{1:0,2:0}},tmp[2012]={Total:0,M:{1:0,2:0},F:{1:0,2:0}},tmp[2013]={Total:0,M:{1:0,2:0},F:{1:0,2:0}},tmp[2014]={Total:0,M:{1:0,2:0},F:{1:0,2:0}},tmp[i.Periods].Total=+i.number,tmp[i.Periods][i.Sex][i.Age]=+i.number,asylum[i.Country]=tmp):(tmp[i.Periods].Total+=+i.number,tmp[i.Periods][i.Sex][i.Age]+=+i.number)}_.forEach(asylum,function(t,e){t.toYearlyData=function(){var a=_.map(t,function(t,a){return{country:e,number:t.Total,year:parseInt(a)}});return _.filter(a,"year")}}),map.draw(asylum),timeline.addData(asylum[config.country].toYearlyData())}!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define("queue",e):t.queue=e()}(this,function(){"use strict";function t(){}function e(e){function a(){if(!c)try{i()}catch(t){u[m+d-1]&&s(t)}}function i(){for(;c=h&&e>d;){var t=m+d,a=u[t],r=a.length-1,i=a[r];a[r]=o(t),--h,++d,a=i.apply(null,a),u[t]&&(u[t]=a||n)}}function o(t){return function(e,r){u[t]&&(--d,++m,u[t]=null,null==f&&(null!=e?s(e):(p[t]=r,h?a():d||y(f,p))))}}function s(t){var e,a=u.length;for(f=t,p=void 0,h=NaN;--a>=0;)if((e=u[a])&&(u[a]=null,e.abort))try{e.abort()}catch(t){}d=NaN,y(f,p)}if(!(e>=1))throw new Error;var l,c,u=[],p=[],h=0,d=0,m=0,f=null,y=t;return l={defer:function(e){if("function"!=typeof e||y!==t)throw new Error;if(null!=f)return l;var n=r.call(arguments,1);return n.push(e),++h,u.push(n),a(),l},abort:function(){return null==f&&s(new Error("abort")),l},await:function(e){if("function"!=typeof e||y!==t)throw new Error;return y=function(t,a){e.apply(null,[t].concat(a))},d||y(f,p),l},awaitAll:function(e){if("function"!=typeof e||y!==t)throw new Error;return y=e,d||y(f,p),l}}}function a(t){return e(arguments.length?+t:1/0)}var r=[].slice,n={};return a.version="1.2.2",a});var ColorProvider={maps:{},availableColors:["#31a354","orange","steelblue"],colorForKey:function(t){if(!this.maps[t]){var e=this.availableColors.pop();this.maps[t]=e}return this.maps[t]},releaseColor:function(t){var e=this.maps[t];e&&(this.availableColors.push(e),delete this.maps[t])}};Map.prototype.draw=function(){var t=this,e=this.svg.selectAll(".country").data(this.topo),a=this.path,r=d3.geo.graticule();this.svg.append("path").datum(r).attr("class","graticule").attr("d",a),this.svg.append("path").datum({type:"LineString",coordinates:[[-180,0],[-90,0],[0,0],[90,0],[180,0]]}).attr("class","equator").attr("d",a),e.enter().insert("path").attr("class","country").attr("d",a).attr("id",function(t,e){return t.id}).attr("title",function(t,e){return t.properties.name}),this.colorMap(2013);var n=this.element.node().getBoundingClientRect(),i=n.left+20,o=n.top+10;e.on("mousemove",function(e,a){var r=d3.mouse(t.svg.node()).map(function(t){return parseInt(t)});t.tooltip.classed("hidden",!1).attr("style","left:"+(r[0]+i)+"px;top:"+(r[1]+o)+"px").html(e.properties.name)}).on("mouseout",function(e,a){t.tooltip.classed("hidden",!0)}),e.on("click",this.onClick)},Map.prototype.colorMap=function(t){var e=this,a=[],r="Greens",n=colorbrewer[r],i=5,o=d3.scale.quantile().range(n[i]),s=[],l=999999,c=0;for(var u in asylum)a.push(u),s.push[asylum[u][t].Total],l>asylum[u][t].Total&&(l=asylum[u][t].Total),c<asylum[u][t].Total&&(c=asylum[u][t].Total);o.domain([l,c]),console.log("minmax::"+l+"::"+c),this.svg.selectAll(".country").style("fill",function(e,a){return asylum[e.properties.name]?o(asylum[e.properties.name][t].Total):"#DDE7EB"});var p=this.svg.selectAll("g.legend").data(o.range()).enter().append("g").attr("class","legend");p.append("rect").attr("x",this.width-(this.width-30)).attr("y",function(t,a){return e.height-200+20*a}).attr("width",10).attr("height",10).style("stroke","black").style("stroke-width",1).style("fill",function(t){return t}),p.append("text").attr("x",this.width-(this.width-45)).attr("y",function(t,a){return e.height-200+20*a}).attr("dy","0.8em").text(function(t,e){var a=o.invertExtent(t),r=d3.format("0.2f");return r(+a[0])+" - "+r(+a[1])})},TimelineGraph.prototype.addData=function(t){var e=this,a=t[0].country;if(_.find(e.datasets,function(t){return t[0].country==a}))return void console.log("country in the list already");_.each(t,function(e,a){if(0==a)e.relative=0;else{var r=t[a-1].number;0==r&&(console.log(t[a-1]),r=1),e.relative=(e.number-t[a-1].number)/r}});var r=this.element,n=(this.datasets.length,r.select("ul").append("li").attr("class","legend").html(function(t){return"<li><span>●</span>"+a+' <span class="close">[x]</span></li>'}));n.select("span.close").on("click",function(){e.removeData(a),n.remove()}),n.select("span").style("color",ColorProvider.colorForKey(a)),this.datasets.push(t),this.render()},TimelineGraph.prototype.removeData=function(t){var e=_.findIndex(this.datasets,function(e){return t==e[0].country});this.datasets.splice(e,1),this.render()},TimelineGraph.prototype.render=function(){var t=this;_.each(this.graphs,function(e){e.render(t.datasets)})},LineGraph.prototype.render=function(t){this.element.selectAll("*").remove();var e=this.parent.tip,a=this.parent.xScale,r=d3.scale.linear().range([this.parent.height,0]),n=this.parent.focusLine,i=this.valueKey,o=_.flatten(t),s=_.maxBy(o,i);if(s){var l=[0,s[i]];if("relative"==i){var c=_.minBy(o,i),u=_.map([s[i],c[i]],function(t){return Math.abs(t)}),p=_.max(u);l=[-p,p]}r.domain(l);var h=d3.format(".2s");"relative"==i&&(h=d3.format("1.1f"));var d=d3.svg.axis().scale(r).ticks(5).tickFormat(h).orient("left"),m=d3.svg.line().x(function(t){return a(t.year)}).y(function(t){return r(t[i])});this.element.append("g").attr("class","y axis").attr("transform","translate(-20,0)").call(d).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em"),this.element.selectAll(".country").data(t).enter().append("path").attr("class","line").attr("stroke",function(t){return ColorProvider.colorForKey(t[0].country)}).attr("d",m),"relative"==i&&this.element.append("line").attr("x1",0).attr("x2",this.parent.width).attr("y1",r(0)).attr("y2",r(0)).attr("stroke","black").attr("opacity",.2),this.element.append("g").attr("class","line-point").selectAll("circle").data(o).enter().append("circle").attr("cx",function(t){return a(t.year)}).attr("cy",function(t,e){return r(t[i])}).attr("r",5).style("fill",function(t){return ColorProvider.colorForKey(t.country)}).on("mouseover",function(t,s){var l=_.filter(o,function(e){return e.year==t.year});e.show(l);var c=_.max(l,function(t){return t[i]}),u=a(t.year),p=r(c[i]);n.attr("x1",u).attr("x2",u).attr("y1",p).style("opacity",.7)}).on("mouseout",function(t){e.hide(t),n.style("opacity",0)})}};var datasets=[[],[]],timeline=new TimelineGraph("#timeline-panel");d3.tsv("data.tsv",type,function(t,e){if(t)throw t;for(var a=0;a<e.length;a++){var r=0;"India"==e[a].country&&(r=1),datasets[r].push(e[a])}timeline.addData(datasets[0]),console.log(datasets[0])});var config={country:"Turkey",year:"2008"},asylum={},datasets=[[],[]],map,timeline;queue().defer(d3.json,"./data/world-topo-min.json").defer(d3.csv,"./data/dutch.csv").await(ready);