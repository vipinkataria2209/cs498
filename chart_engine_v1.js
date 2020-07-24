function update_covid_death_cases_db(data) {
    var parseDate = d3.timeParse("%m/%d/%Y");
    for (count = 0; count < data.length; count++) {
        date = parseDate(data[count].Date)
        covid_new_cases_db.push({
            "Date": date, "CurrentCases": Number(data[count].Count)})
    }
}

function get_scaleTime(current_sequence_id) {

    var parseDate = d3.timeParse("%m/%d/%Y");
    startDate = "3/1/2020"
    endDate = "7/30/2020"

    return d3.scaleTime()
        .range([0, width])
        .domain([parseDate(startDate), parseDate(endDate)]);
}

function loadchartarea(data, current_sequence_id) {

    update_covid_death_cases_db(data)
    d3.select("#my_dataviz")
        .select("svg").select('#mybar').remove()
    var svg = d3.select("#my_dataviz")
        .select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var x = get_scaleTime(current_sequence_id)

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));


    var y = d3.scaleLinear()
        .domain([-100, 18000])
        .range([height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("#mybar")
        .data(covid_new_cases_db)
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return x(d.Date);
        })
        .attr("y", function (d) {
            return y(d.CurrentCases);
        })
        .attr("width", 3)
        .attr("height", function (d) {
            return height - y(d.CurrentCases);
        })
        .attr("fill", "#bd2130")
        .on("mouseover", function () {
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            return tooltip.style("top", (event.pageY - 350) + "px").style("left", (event.pageX) + "px").
            html("<div>"+d.CurrentDeath+" Deaths</div>"+ "<div>"+d.CurrentCases+" NewCases</div>");
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });

    var tooltip = d3.select("#my_dataviz")
        .append("div")
        .style("position", "absolute")
        .attr("class", "demo")
        .style("visibility", "hidden");



    /*
    svg.selectAll("#mybar")
        .data(covid_new_cases_db[current_sequence_id])
        .enter().append("text")
        .attr("x", function (d) {
            return x(d.Date)
        })
        .attr("y", function (d) {
            return y(d.CurrentCases)
        })
        .attr("dx", 5)
        .attr("dy", "-.75em")
        .attr("text-anchor", "end")
        .text(function (d) {
            return d.CurrentCases
        });

*/
    parent = d3.select("#my_dataviz")
        .select("svg")
        .append("g")

    dateIndex = annotations[current_sequence_id-3].dateindex
    heightdiff = annotations[current_sequence_id-3].heightdiff
    rectposty = annotations[current_sequence_id-3].rectposty
    rectpostx = annotations[current_sequence_id-3].rectpostx
    linex1 = annotations[current_sequence_id-3].linex1
    liney2 = annotations[current_sequence_id-3].liney2

    parent.append("rect")
        .attr("class", "nitin")
        .attr("opacity", 1)
        .attr("x", x(covid_new_cases_db[current_sequence_id][dateIndex].Date)-rectpostx)
        .attr("y", height - margin.top-rectposty)
        .attr("height", 50)
        .attr("width", 250)
        .attr("fill", "lightgrey")

    parent.append("text")
        .attr("class", "annotation_text")
        .attr("x", x(covid_new_cases_db[current_sequence_id][dateIndex].Date)-rectpostx+30)
        .attr("y", height - margin.top-rectposty+30)
        .text( annotations[current_sequence_id-3].text);

    d3.select("#my_dataviz")
        .select("svg")
        .append("g")
        .attr("class", "vipin")
        .attr("id", 'adad')
        .selectAll("line")
        .data(covid_new_cases_db[current_sequence_id])
        .enter()
        .append("line")
        .attr("opacity", 1)
        .attr("style", "stroke:rgb(0,0,0);stroke-width:0.5px")
        .attr("x1", margin.left+x(covid_new_cases_db[current_sequence_id][dateIndex].Date)-linex1)
        .attr("y1", margin.top + height + heightdiff - y(covid_new_cases_db[current_sequence_id][dateIndex].CurrentCases))
        .attr("x2", margin.left+ x(covid_new_cases_db[current_sequence_id][dateIndex].Date))
        .attr("y2", function (d) {
            return height + 50-liney2;
        })
}
