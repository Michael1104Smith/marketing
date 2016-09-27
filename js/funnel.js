var FunnelChart = (function() {
    // "private" variables 
    var id, width, height, total_value, sub_value, str, flag, PosX, bottomStr, Ind, exist_val;

    // constructor
    function FunnelChart() {
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    FunnelChart.prototype.draw = function() {

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
        var Ind = this.Ind;
        var exist_val = this.exist_val;

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

        start_rate++;
        var Points = (rate_width*start_rate) + ' '+ (rect_height) + ', ' + (width-start_rate*rate_width) + ' '+ (rect_height) + ', ' + (width-(start_rate+1)*rate_width) 
                              + ' '+ (rect_height*2) + ',' + ((start_rate+1)*rate_width) + ' ' + (rect_height*2);
        svg.append('polygon')
            .attr('points', Points)
            .style('fill', PolygonColor2);

        var sub_rect_width = (width - start_rate*rate_width*2)*(sub_value/total_value);
        var exist_rect_width = (width - start_rate*rate_width*2)*(exist_val/total_value);
        
        if(exist_rect_width > 0){
          Points = (rate_width*start_rate) + ' '+ (rect_height) + ', ' + (rate_width*start_rate+exist_rect_width) + ' '+ (rect_height) + ', ' + (rate_width*start_rate+exist_rect_width) 
                                + ' '+ (rect_height*2) + ',' + ((start_rate+1)*rate_width) + ' ' + (rect_height*2);
          svg.append('polygon')
              .attr('points', Points)
              .style('fill', PolygonColor4); 
          Points = (rate_width*start_rate + exist_rect_width) + ' '+ (rect_height) + ', ' + (rate_width*start_rate+sub_rect_width+exist_rect_width) + ' '+ (rect_height) + ', ' + (rate_width*start_rate+sub_rect_width+exist_rect_width) 
                              + ' '+ (rect_height*2) + ',' + ((start_rate)*rate_width+exist_rect_width) + ' ' + (rect_height*2);
          svg.append('polygon')
              .attr('points', Points)
              .style('fill', PolygonColor3);
          svg.append('text')
            .attr('x',exist_rect_width/2 + start_rate*rate_width)
            .attr('y',(fontSize3+rect_height)/2 + rect_height - rect_overflow*2)
            .style("font-size",fontSize3+"px")
            .attr('fill',TextColor2)
            .attr('text-anchor','middle')
            .text('EXIST '+getStr(exist_val));
          svg.append('text')
            .attr('x',sub_rect_width/2 + exist_rect_width+ start_rate*rate_width)
            .attr('y',(fontSize3+rect_height)/2 + rect_height - rect_overflow*2)
            .style("font-size",fontSize3+"px")
            .attr('fill',TextColor2)
            .attr('text-anchor','middle')
            .text(getStr(sub_value));
        }else{
          Points = (rate_width*start_rate + exist_rect_width) + ' '+ (rect_height) + ', ' + (rate_width*start_rate+sub_rect_width+exist_rect_width) + ' '+ (rect_height) + ', ' + (rate_width*start_rate+sub_rect_width+exist_rect_width) 
                              + ' '+ (rect_height*2) + ',' + ((start_rate+1)*rate_width+exist_rect_width) + ' ' + (rect_height*2);
          svg.append('polygon')
              .attr('points', Points)
              .style('fill', PolygonColor3);
          svg.append('text')
            .attr('x',sub_rect_width/2 + start_rate*rate_width)
            .attr('y',(fontSize3+rect_height)/2 + rect_height - rect_overflow*2)
            .style("font-size",fontSize3+"px")
            .attr('fill',TextColor2)
            .attr('text-anchor','middle')
            .text(getStr(sub_value));
        }

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
        svg.append('text')
          .attr('x',width/2)
          .attr('y',height - height/100*15 + fontSize2/2)
          .style("font-size",fontSize2+"px")
          .attr('fill',TextColor1)
          .attr('text-anchor','middle')
          .text(bottomStr);
    }

    FunnelChart.prototype.drawPolyLine = function(){
        var width = this.width;
        var height = this.height;
        var rect_height = height/100*35;
        var id = this.id;
        var total_value = this.total_value;
        var sub_value = this.sub_value;
        var str = this.str;
        var fontSize1 = rect_height/3, fontSize2 = rect_height/2, fontSize3 = rect_height/5*2;
        var Ind = this.Ind;
        var exist_val = this.exist_val;
        var rate_width = width*rate;
        var start_rate = Ind*2+1;
        var marker_offset = rate_width*start_rate;
        var sub_rect_width = (width - start_rate*rate_width*2)*(sub_value/total_value);
        var exist_rect_width = (width - start_rate*rate_width*2)*(exist_val/total_value);

        var svg = d3.select(id);

        var tri_size = rect_height/5;
        var PosX = this.PosX, PosY = rect_height*2 - tri_size - 1;
        if(PosX < marker_offset + rect_height/10) PosX = marker_offset + rect_height/10;
        if(PosX > width - marker_offset - rect_height/10) PosX = width - marker_offset - rect_height/10;

        var circle = svg.select('circle');
        circle.remove();
        var ex_marker = $(id+' .ex_marker');
        ex_marker.remove();
        if(PosX > sub_rect_width + marker_offset + exist_rect_width){
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
            .attr('class','funnel_marker'+Ind)
            .style('fill', TriColor);
    }

    return FunnelChart;
})();