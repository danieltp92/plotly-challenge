

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
    xaxis: {title: "Values"},
    yaxis: {title: "Bacteria ID"}
}

Plotly.newPlot("bar", bar_data, barLayout )