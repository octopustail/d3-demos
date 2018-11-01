
// 整个过程就是先要想数据进行布局，即数据转换。然后设置好相应的”绘图模具“，将如何在画布（相应的dom元素）上展现（位置，交互等）定义好，用画图模具将数据在画布上画出来
var dataset = {
    "city_name": ["北京", "上海", "广州", "深圳", "香港"],
    "population": [
        [1000, 3045, 4567, 1234, 3714],
        [3214, 2000, 2060, 124, 3234],
        [8761, 6545, 3000, 8045, 647],
        [3211, 1067, 3214, 4000, 1006],
        [2146, 1034, 6745, 4764, 5000]
    ]
}

// chord graph 布局
// 将population进行数据转换
var chord_layout = d3.layout.chord()
    .padding(0.03)
    .sortSubgroups(d3.descending)
    .matrix(dataset.population)

//groups: 节点 chords: 弦，也就是连线
var groups = chord_layout.groups(),
    chords = chord_layout.chords();

//画布，chord图，以及色彩的配置
var width = 600,
    height = 600,
    innerRadius = width / 2 * 0.7,
    outerRadius = innerRadius * 1.1,
    color20 = d3.scale.category20()

var svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

//绘制节点： 即绘制分组，有多少个城市画多少个弧形 设置“绘图模具”
var outer_arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)



//画出chord的外围节点
var g_outer = svg.append("g")
    .selectAll("path")
    .data(groups)
    .enter()
    .append("path")
    .style("fill", function (d) { return color20(d.index) })
    .style("stroke", function (d) { return color20(d.index) })
    //将数据绑定到arc上
    .attr("d", outer_arc)


//绘制文字 注意这里面绘制位置的计算
g_outer.selectAll("text")
    .data(groups)
    .enter()
    .append("text")
    .each(function (d, i) {
        //文字应该位于节点弧的中间
        d.angle = (d.startAngle + d.endAngle) / 2;
        d.name = dataset.city_name[i]
    })
    .attr("dy", ".35em")
    .attr("transform", function (d) {

        return "rotate(" + (d.angle * 180 / Math.PI) + ")" + //d.angle的数值要先转化成为度数，然后再rotate相应的角度
            "translate(0," + -1.0 * (outerRadius + 10) + ")" +    //将它平移到outerRadius之外，
            ((d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5 / 4) ? "rotate(180)" : "")  //将角度在西南方向到西北方向文字翻转，否则他们是倒着放的
    })
    .text(function (d) {
        return d.name
    })

//绘制连线 调用 d3提供的svg 的chord 设置“绘图模具”

var inner_chord = d3.svg.chord()
    .radius(innerRadius)

svg.append("g")
    .attr("class", "chord")
    .selectAll("path")
    .data(chords)
    .enter()
    .append("path")
    .attr("d", inner_chord)
    .style("fill", function (d) { return color20(d.source.index) })
    .style("opacity", 0.8)
    .on("mouseover", function (d, i) {
        d3.select(this).style("fill", "yellow")
    })
    .on("mouseout", function (d, i) {
        d3.select(this).transition().duration(1000).style("fill", color20(d.source.index))
    })

