var TinyFunnelChart = (function() {
    // "private" variables 
    var id, width, height, total_value, str, Ind;

    // constructor
    function TinyFunnelChart() {
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    TinyFunnelChart.prototype.draw = function() {

        var width = this.width;
        var height = this.height;
        var rect_height = height;
        var id = this.id;
        var total_value = this.total_value;
        var str = this.str;
        var fontSize1 = rect_height/3, fontSize2 = rect_height/2, fontSize3 = rect_height/5*2;
        var bottomStr = this.bottomStr;
        var Ind = this.Ind;

        var svg = d3.select(id)
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + 0 + "," + 0 + ")");
        var start_rate = Ind*2;
        var rate_width = width*rate;
        var Points = (rate_width*start_rate) + ' '+ (0) + ', ' + (width-start_rate*rate_width) + ' '+ (0) + ', ' + (width-(start_rate+1)*rate_width) 
                              + ' '+ (rect_height) + ',' + ((start_rate+1)*rate_width) + ' ' + (rect_height);
        svg.append('polygon')
            .attr('points', Points)
            .style('fill', PolygonColor1);

        svg.append('text')
          .attr('x',width/20 + start_rate*rate_width)
          .attr('y',(fontSize1+rect_height)/2)
          .style("font-size",fontSize1+"px")
          .attr('fill',TextColor3)
          .attr('text-anchor','start')
          .text(str);
        svg.append('text')
          .attr('x',width - width/20 - start_rate*rate_width)
          .attr('y',(fontSize2+rect_height)/2)
          .style("font-size",fontSize2+"px")
          .attr('fill',TextColor3)
          .attr('text-anchor','end')
          .text(getStr(total_value));
    }

    return TinyFunnelChart;
})();