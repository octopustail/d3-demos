var nodes = [{ name: "桂林" }, { name: "广州" },
{ name: "厦门" }, { name: "杭州" },
{ name: "上海" }, { name: "青岛" },
{ name: "天津" }];

var edges = [{ source: 0, target: 1 }, { source: 0, target: 2 },
{ source: 0, target: 3 }, { source: 1, target: 4 },
{ source: 1, target: 5 }, { source: 1, target: 6 }];

var forceConfig = {
    "width": 300,
    "height": 300
}

var svgConfig = {
    "width": 400,
    "height": 400,

}

//定义画布

var svg = d3.select("#container")
    .append("svg")
    .attr("width", svgConfig.width)
    .attr("height", svgConfig.height)

//布局

var force = d3.layout.force()
    //对nodes 和 edges做了布局数据转换
    .nodes(nodes)
    .links(edges)
    .size([forceConfig.width, forceConfig.height])
    .linkDistance(150)
    .charge([-500])
// 可以console一下nodes 和 edges 看看转换的结果： 计算出了布局的px，py，x， y， weight
force.start()

//绘制连线

var svg_edges = svg.selectAll("line")
    .data(edges)
    .enter()
    .append("line")
    .style("stroke", "#333")
    .style("stroke-width", 1)

var color = d3.scale.category20();

//添加节点
var svg_nodes = svg.selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", 20)
    .style("fill", function (d, i) {
        return color(i)
    })
    .call(force.drag)

var svg_texts = svg.selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .style("fill", "black")
    .attr("dx", 20)
    .attr("dy", 8)
    .text(function (d) {
        return d.name
    })

force.on("tick", function () {
    svg_edges.attr("x1", function (d) { return d.source.x })
        .attr("y1", function (d) { return d.source.y })
        .attr("x2", function (d) { return d.target.x })
        .attr("y2", function (d) { return d.target.y })

    svg_nodes.attr("cx", function (d) { return d.x })
        .attr("cy", function (d) { return d.y });

    svg_texts.attr("x", function (d) { return d.x })
        .attr("y", function (d) { return d.y })
})

