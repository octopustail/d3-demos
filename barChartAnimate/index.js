   

var width = 400;	//画布的宽度
var height = 400;	//画布的高度

var padding = { left: 100, right: 30, top: 20, bottom: 20 };

var svg = d3.select("#container")				//选择文档中的body元素
    .append("svg")				//添加一个svg元素
    .attr("width", width)		//设定宽度
    .attr("height", height);	//设定高度

var dataset = [2.3, 1.2, 2.4, 1.4, 0.8,3.2,4.3]

var xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0, width - padding.left - padding.right]);

var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset)])
    .range([height - padding.top - padding.bottom, 0])


var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

var rectPadding = 4

svg.selectAll(".MyRect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", ".MyRect")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .attr("x", function (d, i) {
        return xScale(i) + rectPadding / 2
    })
    .attr("y", function (d) {
        return yScale(d);
    })
    .attr("width", xScale.rangeBand() - rectPadding)

    .attr("fill","steelblue")


    .attr("y",function(d){
        var min = yScale.domain()[0];
        return yScale(min)
    })
    .attr("height",function(d){return 0})
    .transition()
    .delay(function(d,i){
        return i*200
    })
    .duration(2000)
    .ease("bounce")
    .attr("y",function(d){
        return yScale(d)
    })
    .attr("height", function (d) {
        return height - padding.top - padding.bottom - yScale(d);
    })

    var texts = svg.selectAll(".MyText")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class","MyText")
    .attr("transform","translate(" + padding.left + "," + padding.top + ")")
    .attr("x", function(d,i){
        return xScale(i) + rectPadding/2;
    } )
    .attr("dx",function(){
        return (xScale.rangeBand() - rectPadding)/2;
    })
    .attr("dy",function(d){
        return 20;
    })
    .text(function(d){
        return d;
    })


    .attr("y",function(d){
        var min = yScale.domain()[0];
        return yScale(min)
    })
    .transition()
    .delay(function(d,i){
        return i*200
    })
    .duration(2000)
    .ease("bounce")
    .attr("y",function(d){
        return yScale(d)
    })



svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
    .call(xAxis);

svg.append('g')
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .call(yAxis)





