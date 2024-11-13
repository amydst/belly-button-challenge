// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("data ",data)
    // get the metadata field
    let metadata = data.metadata;
    console.log("metadata:",metadata)
    // Filter the metadata for the object with the desired sample number
    let recoveredObject = metadata.filter(recoveredObj => recoveredObj.id == sample)[0]
    console.log("object ", recoveredObject)
    // Use d3 to select the panel with id of `#sample-metadata`
    let samplePanel = d3.select("#sample-metadata");
    console.log("panel ",samplePanel)

    // Use `.html("") to clear any existing metadata
    samplePanel.html("");
    console.log("clean panel ",samplePanel)
    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(recoveredObject).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
      console.log("new tag", ("h6").text(`${key}: ${value}`) )
  });
});

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let sampleArray = samples.filter(sample => sample.id == sampleID);
    let sample = sampleArray[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = sample.otu_ids
    let sample_values = sample.sample_values
    let otu_labels = sample.otu_labels

    // Build a Bubble Chart
    let bubbleTrace = [
      {x: otu_ids,
       y: sample_values,
       text: otu_labels,
       mode:"markers",
       marker:{
          size: sample_values, 
          color: otu_ids,
          colorscale: "Earth"
       }

      }];

    // Render the Bubble Chart
       //Define layout
    let layout = {
      xaxis: {title:"OTU ID"}
  };
  //Call Plotly to plot
  Plotly.newPlot("bubble", trace2, layout)

  });

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let trace1 = [
      {x: sample_values.slice(0,10).reverse(),
      y: otu_ids.slice(0,10).map(otu_id => "OTU "+otu_id).reverse(),
      text: otu_labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h" }
  ];
  //Define layout
  let layout = {
      title:""
  };

  //Call Plotly to plot 
  Plotly.newPlot("bar", trace1, layout)

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
