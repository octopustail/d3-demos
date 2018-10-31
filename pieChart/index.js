var dataset = [30, 10, 45, 55, 13]

// 布局，为了进行数据转换 转换成可以画图可以用的数据
var pie = d3.layout.pie();

var piedata = pie(dataset)

var svgConfig = {
    "width": 400,
    "height": 400
}

var svg = d3.select("#container")
.append("svg")
.attr("class","pieSvg")
.attr("width",svgConfig.width)
.attr("height",svgConfig.height)


//颜色比例尺配置
var color = d3.scale.category10()

// 用来配置图形的参数
var pieConfig = {
    "innerRadius": 150,
    "outerRadius": 80
}

// 利用d3 接口提供的弧生成器
var arc = d3.svg.arc()
    .innerRadius(pieConfig.innerRadius)
    .outerRadius(pieConfig.outerRadius)


//arcs 是选中了piedata所对应的所有g的选择集
var arcs = svg.selectAll("g")
.data(piedata)
.enter()
.append("g")
.attr("transform","translate("+(svgConfig.width/2) + ","+(svgConfig.width/2)+")");

//为arcs中的每一个g添加路径, d是数据 调用弧生成器 color是颜色比例尺
arcs.append("path")
.attr("fill", function(d,i){
    return color(i);
})
.attr("d",function(d){
    return arc(d)
})


//每个弧线中心添加文本
arcs.append("text")
.attr("transform",function(d,i){
    //cemtroid 能够计算出弧线的中心
    return "translate("+arc.centroid(d)+")";
})
.attr("text-anchor","middle")
.text(function(d){
    return d.data
})
.attr("fill","white")




