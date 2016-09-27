var HeaderChart = (function() {
    // "private" variables 
    var id, width, height, total_value, sub_value, str, flag, PosX, bottomStr, Ind;

    // constructor
    function HeaderChart() {
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    HeaderChart.prototype.draw = function() {

        var width = this.width;
        var height = this.height;
        var rect_height = height/100*35;
        var id = this.id;
        var total_value = this.total_value;
        var sub_value = this.sub_value;
        var str = this.str;
        var fontSize1 = rect_height/3, fontSize2 = rect_height/2, fontSize3 = rect_height/5*2;
        var flag = this.flag;
        var bottomStr = this.bottomStr;

        var svg = d3.select(id)
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + 0 + "," + 0 + ")");
        svg.append('rect')
          .attr('x',0)
          .attr('y',0)
          .attr('width',width)
          .attr('height',rect_height)
          .attr('fill',RectColor1);
        svg.append('rect')
          .attr('x',0)
          .attr('y',rect_height)
          .attr('width',width)
          .attr('height',rect_height)
          .attr('fill',RectColor3);
        var sub_rect_width = width*(sub_value/total_value);
        svg.append('rect')
          .attr('x',0)
          .attr('y',rect_height-rect_overflow)
          .attr('width',sub_rect_width)
          .attr('height',rect_height+rect_overflow)
          .attr('fill',RectColor2);
        svg.append('text')
          .attr('x',width/20)
          .attr('y',(fontSize1+rect_height)/2)
          .style("font-size",fontSize1+"px")
          .attr('fill',TextColor2)
          .attr('text-anchor','start')
          .text(str);
        svg.append('text')
          .attr('x',width - width/20)
          .attr('y',(fontSize2+rect_height)/2)
          .style("font-size",fontSize2+"px")
          .attr('fill',TextColor2)
          .attr('text-anchor','end')
          .text(getStr(total_value,true));
        svg.append('text')
          .attr('x',sub_rect_width/2)
          .attr('y',(fontSize3+rect_height)/2 + rect_height - rect_overflow*2)
          .style("font-size",fontSize3+"px")
          .attr('fill',TextColor2)
          .attr('text-anchor','middle')
          .text(getStr(sub_value,true));
        svg.append('text')
          .attr('x',width/2)
          .attr('y',height - height/100*15 + fontSize2/2)
          .style("font-size",fontSize2+"px")
          .attr('fill',TextColor1)
          .attr('text-anchor','middle')
          .text(bottomStr);
    }

    HeaderChart.prototype.drawPolyLine = function(){
        var width = this.width;
        var height = this.height;
        var rect_height = height/100*35;
        var id = this.id;
        var total_value = this.total_value;
        var sub_value = this.sub_value;
        var str = this.str;
        var fontSize1 = rect_height/3, fontSize2 = rect_height/2, fontSize3 = rect_height/5*2;
        var sub_rect_width = width*(sub_value/total_value);

        var svg = d3.select(id);

        var tri_size = rect_height/5;
        var PosX = this.PosX, PosY = rect_height*2 - tri_size - 1;
        var Ind = this.Ind;

        var circle = svg.select('circle');
        circle.remove();
        var ex_marker = $(id+' .ex_marker');
        ex_marker.remove();
        if(PosX > sub_rect_width){
          var r = rect_height/5;
          var circle = svg.append('circle')
            .attr('cx',PosX)
            .attr('cy',PosY - rect_height/3)
            .attr('r',r)
            .attr('fill',TriColor);
          svg.append('text')
            .attr('x',PosX)
            .attr('y',PosY - rect_height/3 + r - 1)
            .style("font-size",(r*2)+"px")
            .style('font-weight','bold')
            .attr('fill',TextColor3)
            .attr('text-anchor','middle')
            .attr('class','ex_marker')
            .text('!');
        }
        var polyline = svg.select('polyline');
        polyline.remove();
        var trianglePoints = PosX + ' '+ (PosY) + ', ' + (PosX-tri_size/5*4) + ' '+ (PosY + tri_size) + ', ' + (PosX+tri_size/5*4) 
                              + ' '+ (PosY + tri_size) + ',' + (PosX) + ' ' + PosY;
        svg.append('polyline')
            .attr('points', trianglePoints)
            .attr('cursor','pointer')
            .attr('class','header_marker'+Ind)
            .style('fill', TriColor);
    }

    return HeaderChart;
})();