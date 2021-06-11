function metaData(x){
    var panel = d3.select("#sample-metadata");
    panel.html("");
    d3.json("samples.json").then((data)=>{
        var variable = data.metadata;
        var metaList = variable.filter(dataX => dataX.id == x);
        var meta = metaList[0];
        Object.entries(meta).forEach(([key, value]) => {
            panel.append("h6").text(`${key}   ${value}`);
        });
    });
}

function fillCharts(x){
    d3.json("samples.json").then((data) => {

        var sampleData = data.samples;
        var sampleList = sampleData.filter(sampleX => sampleX.id == x);
        var sample = sampleList[0];

        var value = sample.sample_values;
        var id = sample.otu_ids;
        var label = sample.otu_labels;

        var chart = {
            x: id.slice(0, 10).map(OTU => ` OTU-${OTU}`),
            y: value.slice(0, 10),
            text: label.slice(0, 10),
            marker:{
                color: ['rgba(222,45,38,0.8)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)']
            },
            type:"bar"
        }

        var bar_chart = [chart];

        var barChart = {
            title: "10 most founded bacteria",
            xaxis: {title: "Samples Values"},
            yaxis: {title: "Bacteria ID"},
            margin: { t: 30, l:150}
        }

        Plotly.newPlot("bar", bar_chart, barChart)


        var bubbles = {
            x: id,
            y: value,
            text: label,
            mode: "markers",
            marker: {
                color: id,
                size: value
            }
        }

        var bubble_chart = [bubbles];

        var bubbleChart = {
            xaxis: {title: "Bacteria IDs"},
            yaxis: {title: "Samples Values"}
        };

        Plotly.plot("bubble", bubbles, bubbleChart)

    });

}

function initial(){
    var dropMenu = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var optionId = data.names;
        optionId.forEach(element => {
            dropMenu.append("option").text(element).property("value", element)
        });
        
        var firstRecord = optionId[0];
        metaData(firstRecord);
        fillCharts(firstRecord);
    });

}

function changeOption(x){
    metaData(x);
    fillCharts(x);
}

initial();
