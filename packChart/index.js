//读取json数据文件

//如果要画树图，就将所有用到cluster替换成tree就好了
d3.json("./city2.json", function (error, root) {
    //读取到的json数据是保存在root中的
    var nodes = pack.nodes(root)
    var links = pack.links(nodes)
    //因为原来的数据就有name 和 children属性，这里用cluster.nodes 和cluster.links布局的时候，就能直接有布局后的parents 和 children,以及name的信息


    var node = svg.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("fill", "rgba(31, 119, 190, 0.6)")
        .attr("cx", function (d) {
            return d.x
        })
        .attr("cy", function (d) {
            return d.y
        })
        .attr("r", function (d) {
            return d.r
        })
        .on("mouseover", function (d) {
            d3.select(this).attr("fill", "#223")
        })
        .on("mouseout", function (d) {
            d3.select(this).attr("fill", "rgba(31, 119, 190, 0.6)")
        })

    svg.selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "node-text")
        .attr("fill-opacity", function (d) {
            return (d.depth == 2) ? 0.8 : 0
        })
        .attr("x", function (d) {
            return d.x
        })
        .attr("y", function (d) {
            return d.y
        })
        .attr("dx",-12)
        .attr("dy",4)
        .text(function (d) {
            return d.name
        })

})

var width = 800,
    height = 800;

var svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height - 100)
    .append("g")
    .attr("transform", "translate(40,0)");

//pack 的布局
var pack = d3.layout.pack()
    .size([width, height]) //设置转换后顶点的范围，转换后的顶点的坐标（x,y）都会在这个范围之内
    .radius(25) //转换后最小的圆的半径




