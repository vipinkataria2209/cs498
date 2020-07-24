function loadFixedScene(dataSet) {
    /* Delete Exsiting Graph if Exists*/
    d3.select("#my_dataviz")
        .select("svg").selectAll("g").remove();

    var svg = d3.select("#my_dataviz")
        .select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var xAxis = get_scaleTime();
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xAxis));


    var yAxis = d3.scaleLinear()
        .domain([0, d3.max(dataSet, function (d) {
            return d.Value;
        })])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(yAxis));

    if (currentSceneIndex == 0) {
        hoverText = "NewCases"

    } else {
        hoverText = "Deaths"
    }

    svg.selectAll("#mybar")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return xAxis(d.Date);
        })
        .attr("y", function (d) {
            return yAxis(d.Value);
        })
        .attr("width", 3)
        .attr("height", function (d) {
            return height - yAxis(d.Value);
        })
        .attr("fill", "#bd2130")
        .on("mouseover", function () {
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            month = Number(1) + Number(d.Date.getMonth())
            date1 = d.Date.getDate() + "/" + month + "/" + d.Date.getFullYear()
            return tooltip.style("top", (event.pageY - 350) + "px").style("left", (event.pageX) + "px").html("<div class='hoverText'>" + d.Value + " :" + hoverText + "</div>" + "<div class='hoverText'>" + date1 + " :Date</div>");
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });


    var tooltip = d3.select("#my_dataviz")
        .append("div")
        .style("position", "absolute")
        .attr("class", "demo")
        .style("visibility", "hidden");


    parent = d3.select("#my_dataviz")
        .select("svg")
        .append("g")

    if (currentSceneIndex != 2) {
        xoffset = annotations[currentSceneIndex].xoffset
        linex1 = annotations[currentSceneIndex].linex1
        linex2 = annotations[currentSceneIndex].linex2

        maxIndex = getMaxIndex(dataSet)
        parent.append("rect")
            .attr("class", "nitin")
            .attr("opacity", 1)
            .attr("x", xAxis(dataSet[maxIndex].Date) - xoffset)
            .attr("y", yAxis(dataSet[maxIndex].Value))
            .attr("height", 50)
            .attr("width", 250)
            .attr("fill", "lightgrey")

        parent.append("text")
            .attr("class", "annotation_text")
            .attr("x", xAxis(dataSet[maxIndex].Date) - xoffset)
            .attr("y", 25 + yAxis(dataSet[maxIndex].Value))
            .text(annotations[currentSceneIndex].text);

        d3.select("#my_dataviz")
            .select("svg")
            .append("g")
            .attr("class", "vipin")
            .attr("id", 'adad')
            .selectAll("line")
            .data(dataSet)
            .enter()
            .append("line")
            .attr("opacity", 1)
            .attr("style", "stroke:rgb(0,0,0);stroke-width:0.5px")
            .attr("x1", linex1 + margin.left + xAxis(dataSet[maxIndex].Date) - 200)
            .attr("y1", 25 + yAxis(dataSet[maxIndex].Value))
            .attr("x2", linex2 + margin.left + xAxis(dataSet[maxIndex].Date))
            .attr("y2", 25 + yAxis(dataSet[maxIndex].Value))
    }

}


function handleNextScene() {
    if (currentSceneIndex == 2) {
        return
    }
    currentSceneIndex++;
    if (currentSceneIndex == 0) {
        d3.select("#scene2_id")
            .style("visibility", "hidden")
        loadFixedScene(newCasesDataSet)
        d3.select("#scene_1").style("display", "block")
        d3.select("#scene_2").style("display", "none")
        d3.select("#scene_3").style("display", "none")
    }
    if (currentSceneIndex == 1) {
        d3.select("#scene2_id")
            .style("visibility", "hidden")
        loadFixedScene(deathCasesDataSet)
        d3.select("#scene_1").style("display", "none")
        d3.select("#scene_2").style("display", "block")
        d3.select("#scene_3").style("display", "none")
    }
    if (currentSceneIndex == 2) {
        load_3rd_scene()
        d3.select("#scene_1").style("display", "none")
        d3.select("#scene_2").style("display", "none")
        d3.select("#scene_3").style("display", "block")
    }
}

function handleUserDrivenScene(sceneIndex) {
    if (sceneIndex == 0) {
        d3.select("#scene2_id")
            .style("visibility", "hidden")
        currentSceneIndex = 0
        loadFixedScene(newCasesDataSet)
        d3.select("#scene_1").style("display", "block")
        d3.select("#scene_2").style("display", "none")
        d3.select("#scene_3").style("display", "none")
    }
    if (sceneIndex == 1) {
        d3.select("#scene2_id")
            .style("visibility", "hidden")
        currentSceneIndex = 1
        loadFixedScene(deathCasesDataSet)
        //d3.select("#scene_2").innerHTML("adadadadad")
        d3.select("#scene_1").style("display", "none")
        d3.select("#scene_2").style("display", "block")
        d3.select("#scene_3").style("display", "none")

    }
    if (sceneIndex == 2) {
        currentSceneIndex = 2
        load_3rd_scene()
        d3.select("#scene_1").style("display", "none")
        d3.select("#scene_2").style("display", "none")
        d3.select("#scene_3").style("display", "block")
    }
}


function handlePreviousScene() {
    if (currentSceneIndex == 0) {
        return
    }
    currentSceneIndex--;
    if (currentSceneIndex == 0) {
        d3.select("#scene2_id")
            .style("visibility", "hidden")
        loadFixedScene(newCasesDataSet)
    }
    if (currentSceneIndex == 1) {
        d3.select("#scene2_id")
            .style("visibility", "hidden")
        loadFixedScene(deathCasesDataSet)
    }
    if (currentSceneIndex == 2) {
        load_3rd_scene()
    }

}

function handle_sequence(currentSceneIndex_id) {
    d3.select("#my_dataviz")
        .select("svg").selectAll("g").remove()
    loadchartarea(dataSet, currentSceneIndex_id)
    currentSceneIndex = currentSceneIndex_id

}

function load_3rd_scene() {
    d3.select("#scene2_id")
        .style("visibility", "visible")
    var selected = d3.select("#d3-dropdown").node().value;
    console.log(selected);
    var form = document.getElementById("test");
    if (form.elements["test"].value == 'A') {
        d3.select("#selected-dropdown").text(selected);
        data1 = countryNewCasesDataSet[selected]
        loadFixedScene(data1)

    } else {
        d3.select("#selected-dropdown").text(selected);
        data1 = countryDeathCasesDataSet[selected]
        loadFixedScene(data1)
    }
}

function handle_radio_button_change_event() {
    var selected = d3.select("#d3-dropdown").node().value;
    console.log(selected);
    var form = document.getElementById("test");
    if (form.elements["test"].value == 'A') {
        d3.select("#selected-dropdown").text(selected);
        data1 = countryNewCasesDataSet[selected]
        loadFixedScene(data1)

    } else {
        d3.select("#selected-dropdown").text(selected);
        data1 = countryDeathCasesDataSet[selected];
        loadFixedScene(data1);
    }
}


function getMaxIndex(dataset) {
    var counter = 1;
    var max = 0;
    for (counter; counter < dataset.length; counter++) {
        if (dataset[max].Value < dataset[counter].Value) {
            max = counter;
        }
    }
    return max;
}


