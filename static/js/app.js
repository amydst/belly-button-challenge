// Build the metadata panel
function buildMetadata(sampleID) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the metadata field
    let metadata = data.metadata;
    // Filter the metadata for the object with the desired sample number
    let recoveredObject = metadata.filter(obj => obj.id == sampleID)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let samplePanel = d3.select("#sample-metadata");
    
    // Clear any existing metadata
    samplePanel.html("");

    // Append new tags for each key-value in the filtered metadata
    Object.entries(recoveredObject).forEach(([key, value]) => {
      samplePanel.append("h6").text(`${key}: ${value}`);
    });
  });
}

// Build the charts
function buildCharts(sampleID) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let sampleArray = samples.filter(sample => sample.id == sampleID);
    let sampleData = sampleArray[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = sampleData.otu_ids;
    let sample_values = sampleData.sample_values;
    let otu_labels = sampleData.otu_labels;

    // Build a Bubble Chart
    let bubbleTrace = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }];

    let bubbleLayout = {
      title: "Bubble Chart",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" },
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleTrace, bubbleLayout);

    // Build a Bar Chart
    let barTrace = [{
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).map(otu_id => "OTU " + otu_id).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    }];

    let barLayout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU ID" },
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barTrace, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Select dropdown menu with D#
    let dropdownMenu = d3.select("#selDataset");
    
    // Populate dropdown menu with id's
    let sampleNames = data.names;

    // Iterate through array and append each name to the dropdown
    sampleNames.forEach((name) => {
      dropdownMenu.append("option").text(name).property("value", name);
    });

    // Call the first sample from the list
    let firstSample = sampleNames[0];

    // Call first plots to initialize
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();
