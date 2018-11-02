//读取json数据文件

//如果要画树图，就将所有用到cluster替换成tree就好了
d3.json("./china.geojson", function (error, root) {
    //读取到的json数据是保存在root中的
    console.log("root",root.features)
    var node = svg.selectAll("path")
        .data(root.features)
        .enter()
        .append("path")
        .attr("stroke","#000")
        .attr("stroke-width",1)
        .attr("fill", function(d,i){
            return color(i);
        })
        .attr("d",path)
        .on("mouseover", function (d) {
            console.log("d",d)
            d3.select(this).attr("fill", "#223")
        })
        .on("mouseout", function (d,i) {
            d3.select(this).attr("fill", function(d,i){return color(i)})
        })
        .append("text")
        .attr("fill","#333")
        .attr("d",function(d,i){
            return d.properties.name
        })


    // var text = svg.select("text")
    // .data(root.features)
    // .enter()
    // .append("text")        
    // .attr("x",function(d){return "translate("++})

})

var width = 1000,
    height = 900;

var svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(40,0)");

//geo 的布局 使用投影函数
var projection = d3.geo.mercator()
    .center([107, 31])
    .scale(850)
    .translate([width / 2, height / 2+100])

var path = d3.geo.path()
    .projection(projection)

var color = d3.scale.category20();    



