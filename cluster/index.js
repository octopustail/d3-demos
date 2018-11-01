//读取json数据文件

//如果要画树图，就将所有用到cluster替换成tree就好了
d3.json("./mock.json", function (error, root) {
    //读取到的json数据是保存在root中的
    var nodes = cluster.nodes(root)
    var links = cluster.links(nodes)
    //因为原来的数据就有name 和 children属性，这里用cluster.nodes 和cluster.links布局的时候，就能直接有布局后的parents 和 children,以及name的信息

    var link = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", 'link')
        .attr("d", diagonal)

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")" })
        //通过选取孩子节点来添加事件监听
        .on("mouseover", function (d, i) {
            console.log(this.firstChild,"this")//返回的就是dom节点 <g></g>
            d3.select(this.firstChild).transition().duration(100).attr("r", 10.5)
            d3.select(this.lastChild).transition().duration(100).attr("font-size", 18)
            
        })
        .on("mouseout", function (d, i) {
            d3.select(this.firstChild).transition().duration(100).attr("r", 4.5)
            d3.select(this.lastChild).transition().duration(100).attr("font-size", 12)
        })

    //添加节点圆圈
    node.append("circle").attr("r", 4.5)
    //添加文字
    node.append("text").attr("dx", function (d) { return d.children ? -10 : 10 })
        .style("text-anchor", function (d) { return d.children ? "end" : "start" })
        .text(function (d) { return d.name })

})

var width = 1000,
    height = 600;

var svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height - 100)
    .append("g")
    .attr("transform", "translate(40,0)");

//cluster 的布局
var cluster = d3.layout.cluster()
    .size([width - 500, height - 200])

//绘制
var diagonal = d3.svg.diagonal()
    //projection: 交换连线的x，y坐标，否则画出来的图是根结点在上，向下伸展的。
    .projection(function (d) { return [d.y, d.x] })



