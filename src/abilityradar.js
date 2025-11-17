// Set dimensions and margins
const width = 270;
const height = 270;
const margin = { top: 20, right: 30, bottom: 15, left: 30 };

// Create SVG container
const svg = d3.select("#vis-abilityradar")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Add title
svg.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .text("My Skill and Ability Radar");

// Hierarchical data (16 attributes)
const treeData = {
    name: "Mabel Wong Mei Po",
    children: [
        {
            name: "Personal Qualities",
            children: [
                { name: "Wisdom", score: 7 },
                { name: "Luck", score: 7 },
                { name: "Patience", score: 6.5 },
                { name: "Health", score: 7 },
                { name: "Resilience", score: 6.5 },
                { name: "Confidence", score: 6.5 },
                { name: "Curiosity", score: 7 },
                { name: "Mindful.", score: 5.5 }
            ]
        },
        {
            name: "Social Skills",
            children: [
                { name: "Empathy", score: 6 },
                { name: "Comm.", score: 7 },
                { name: "Social", score: 6 }
            ]
        },
        {
            name: "Professional Skills",
            children: [
                { name: "Creativity", score: 5 },
                { name: "Discipline", score: 8.5 },
                { name: "Adapt.", score: 8 },
                { name: "Time Mgmt", score: 7.5 },
                { name: "Focus", score: 6.5 }
            ]
        }
    ]
};

// Flatten and sort leaves by score descending
const allLeaves = [];
treeData.children.forEach(category => {
    category.children.forEach(skill => {
        allLeaves.push(skill);
    });
});
allLeaves.sort((a, b) => b.score - a.score);

// Features and scores
const features = allLeaves.map(d => d.name);
const scores = {};
allLeaves.forEach(d => {
    scores[d.name] = d.score;
});
const data = [scores];

// Center and radius
const centerX = width / 2;
const centerY = height / 2;
const radius = Math.min(width / 2 - Math.max(margin.left, margin.right), height / 2 - Math.max(margin.top, margin.bottom));

// Radial scale
const radialScale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, radius]);
const ticks = [2, 4, 6, 8, 10];

// Plot gridlines (circles)
svg.selectAll("circle")
    .data(ticks)
    .join("circle")
    .attr("cx", centerX)
    .attr("cy", centerY)
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("r", d => radialScale(d));

// Plot tick labels (placed along the top axis)
svg.selectAll(".ticklabel")
    .data(ticks)
    .join("text")
    .attr("class", "ticklabel")
    .attr("x", centerX + 5)
    .attr("y", d => centerY - radialScale(d))
    .style("font-size", "8px")
    .text(d => d.toString());

// Convert angle and value to SVG coordinates
function angleToCoordinate(angle, value) {
    const x = Math.cos(angle) * radialScale(value);
    const y = Math.sin(angle) * radialScale(value);
    return { x: centerX + x, y: centerY - y };
}

// Map features to angles and coordinates
const featureData = features.map((f, i) => {
    const angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
    return {
        name: f,
        angle: angle,
        line_coord: angleToCoordinate(angle, 10),
        label_coord: angleToCoordinate(angle, 10.5)
    };
});

// Draw axis lines
svg.selectAll("line")
    .data(featureData)
    .join("line")
    .attr("x1", centerX)
    .attr("y1", centerY)
    .attr("x2", d => d.line_coord.x)
    .attr("y2", d => d.line_coord.y)
    .attr("stroke", "black");

// Draw axis labels
svg.selectAll(".axislabel")
    .data(featureData)
    .join("text")
    .attr("class", "axislabel")
    .attr("x", d => d.label_coord.x)
    .attr("y", d => d.label_coord.y)
    .attr("text-anchor", "middle")
    .style("font-size", "6px")
    .text(d => d.name);

// Get path coordinates for a data point (close the path)
function getPathCoordinates(data_point) {
    const coordinates = [];
    for (let i = 0; i < features.length; i++) {
        const ft_name = features[i];
        const angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    coordinates.push(coordinates[0]); // Close the polygon
    return coordinates;
}

// Define line generator
const line = d3.line()
    .x(d => d.x)
    .y(d => d.y);

// Draw data path
svg.selectAll("path")
    .data(data)
    .join("path")
    .datum(d => getPathCoordinates(d))
    .attr("d", line)
    .attr("stroke-width", 2)
    .attr("stroke", "steelblue")
    .attr("fill", "steelblue")
    .attr("stroke-opacity", 1)
    .attr("opacity", 0.5);

// Prepare point data for tooltips and circles
const pointData = [];
for (let i = 0; i < features.length; i++) {
    const ft_name = features[i];
    const value = data[0][ft_name];
    const angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
    const coord = angleToCoordinate(angle, value);
    pointData.push({ name: ft_name, value, coord });
}

// Color scale for points
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// Tooltip
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background", "lightgray")
    .style("padding", "5px")
    .style("border-radius", "5px")
    .style("font-size", "12px");

// Draw points with tooltips
svg.selectAll(".point")
    .data(pointData)
    .join("circle")
    .attr("class", "point")
    .attr("cx", d => d.coord.x)
    .attr("cy", d => d.coord.y)
    .attr("r", d => 3 + (d.value - 5) * 0.5)
    .style("fill", d => colorScale(d.value / 10))
    .style("stroke", "#fff")
    .on("mouseover", (event, d) => {
        tooltip.style("opacity", 1)
            .html(`${d.name}: Score ${d.value}/10`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", () => {
        tooltip.style("opacity", 0);
    });