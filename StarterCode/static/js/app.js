

let value = sample.sample_values;
let id = sample.otu_ids;
let label = smaple.otu_labels;

let chart = {
    y: id,
    x: value,
    text: label,
    marker:{
        color: ['rgba(222,45,38,0.8)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)']
    },
    type:"bar",
    orientation:"h"
}

let bar_chart = [chart];

let barChart = {
    title: "10 most founded bacteria",
    xaxis: {title: "Samples Values"},
    yaxis: {title: "Bacteria ID"}
}

Plotly.newPlot("bar", bar_data, barLayout)


let bubbles = {
    x: id,
    y: value,
    text: label,
    mode: "markers",
    marker: {
        color: id,
        size: value
    }
}

let bubble_chart = [bubbles];

let bubbleChart = {
    xaxis: {title: "Bacteria IDs"},
    yaxis: {title: "Samples Values"}
}

Plotly.newPlot("bubble", bubbles, bubbleChart)

let dropMenu = d3.select("#selDataset");

d3.json("samples.json").then(function(data){
    let optionId = data.names;
    optionId.forEach(value => {
        dropMenu.append("option").text(value).property("value", value)
    });

    
});