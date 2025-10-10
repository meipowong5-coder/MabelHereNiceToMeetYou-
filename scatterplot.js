// Set dimensions and margins
const scatterMargin = { top: 50, right: 50, bottom: 80, left: 80 };
const scatterWidth = 600 - scatterMargin.left - scatterMargin.right;
const scatterHeight = 400 - scatterMargin.top - scatterMargin.bottom;

// Data
const scatterData = [
    { attribute: "Wisdom", value: 7 },
    { attribute: "Luck", value: 7 },
    { attribute: "Patience", value: 6.5 },
    { attribute: "Health", value: 7 },
    { attribute: "Resilience", value: 6.5 },
    { attribute: "Empathy", value: 6 },
    { attribute: "Creativity", value: 5 },
    { attribute: "Self-discipline", value: 8.5 },
    { attribute: "Adaptability", value: 8 },
    { attribute: "Confidence", value: 6.5 },
    { attribute: "Communication Skills", value: 7 },
    { attribute: "Curiosity", value: 7 },
    { attribute: "Time Management", value: 7.5 },
    { attribute: "Social Skills", value: 6 },
    { attribute: "Mindfulness", value: 5.5 }
];

// Create SVG container for scatterplot
const scatterSvg = d3.select("#vis-scatterplot")
    .append("svg")
    .attr("width", scatterWidth + scatterMargin.left + scatterMargin.right)
    .attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom)
    .append("g")
    .attr("transform", `translate(${scatterMargin.left}, ${scatterMargin.top})`);

// Add title
scatterSvg.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -20)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("My Abilities and Qualities Scatterplot");

// Scales
const scatterXScale = d3.scaleBand()
    .domain(scatterData.map(d => d.attribute))
    .range([0, scatterWidth])
    .padding(0.1);

const scatterYScale = d3.scaleLinear()
    .domain([0, 10])
    .range([scatterHeight, 0]);

// Create axes
const scatterXAxis = d3.axisBottom(scatterXScale);
const scatterYAxis = d3.axisLeft(scatterYScale);

// Add X axis
scatterSvg.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(scatterXAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");

// Add Y axis
scatterSvg.append("g")
    .call(scatterYAxis);

// Add axis labels
scatterSvg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - scatterMargin.left)
    .attr("x", 0 - (scatterHeight / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Rating (0-10)");

scatterSvg.append("text")
    .attr("transform", `translate(${scatterWidth / 2}, ${scatterHeight + scatterMargin.bottom - 10})`)
    .style("text-anchor", "middle")
    .text("Attributes");

// Add data points
scatterSvg.selectAll(".scatter-dot")
    .data(scatterData)
    .enter()
    .append("circle")
    .attr("class", "scatter-dot")
    .attr("cx", d => scatterXScale(d.attribute) + scatterXScale.bandwidth() / 2)
    .attr("cy", d => scatterYScale(d.value))
    .attr("r", 6)
    .style("fill", "steelblue")
    .style("opacity", 0.7);

// Add value labels on points
scatterSvg.selectAll(".scatter-value-label")
    .data(scatterData)
    .enter()
    .append("text")
    .attr("class", "scatter-value-label")
    .attr("x", d => scatterXScale(d.attribute) + scatterXScale.bandwidth() / 2)
    .attr("y", d => scatterYScale(d.value) - 10)
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .text(d => d.value);