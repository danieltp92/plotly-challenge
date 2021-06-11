function metaData(x){
    let panel = d3.select("#sample-metadata");
    panel.html("");
    d3.json("samples.json").then((data)=>{
        let variable = data.metadata;
        let metaList = variable.filter(dataX => dataX.id == x);
        let meta = metaList[0];
        Object.entries(meta).forEach(([key,value]) => {
            panel.append("h6").text(`${key} ${value}`);
        });
    });
}

function fillCharts(x){
    d3.json("samples.json").then((data) => {

        let sampleData = data.samples;
        let sampleList = sampleData.filter(sampleX => sampleX.id == x);
        let sample = sampleList[0];

        let value = sample.sample_values;
        let id = sample.otu_ids;
        let label = sample.otu_labels;

        let chart = {
            x: id.slice(0, 10).map(OTU => ` OTU-${OTU}`),
            y: value.slice(0, 10),
            text: label.slice(0, 10),
            marker:{
                color: ['rgba(222,45,38,0.8)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)', 'rgba(49,130,189,1)']
            },
            type:"bar"
        }

        let bar_chart = [chart];

        let barChart = {
            title: "10 most founded bacteria",
            xaxis: {title: "Samples Values"},
            yaxis: {title: "Bacteria ID"},
            margin: { t: 30, l:150}
        }

        Plotly.newPlot("bar", bar_chart, barChart)


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
        };

        Plotly.newPlot("bubble", bubble_chart, bubbleChart);

    });

}

function initial(){
    let dropMenu = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        let optionId = data.names;
        optionId.forEach(element => {
            dropMenu.append("option").text(element).property("value", element)
        });
        
        let firstRecord = optionId[0];
        metaData(firstRecord);
        fillCharts(firstRecord);
    });

}

function optionChanged(x){
    metaData(x);
    fillCharts(x);
}

initial();
