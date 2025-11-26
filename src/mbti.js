// src/mbti.js — D3 Horizontal Stacked Bar Chart for MBTI Dimensions (with Right Y-Axis + Dynamic Highlighting)

(function() {
    // Target the vis container
    const container = d3.select("#vis-mbti");
    
    // Dimensions (increased width for dual axes)
    const margin = { top: 45, right: 100, bottom: 40, left: 100 };  // Wider right margin for right axis
    const width = 500 - margin.left - margin.right;  // Adjusted total width
    const height = 200 - margin.top - margin.bottom;

    // Create SVG
    const svg = container.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Data: MBTI dimensions (stacked: left side vs right side, percentages add to 100%)
    const data = [
        { dimension: "Extraversion (E)", left: 58, right: 42, leftLabel: "External", rightLabel: "Internal" },
        { dimension: "Intuition (N)", left: 52, right: 48, leftLabel: "Intuitive", rightLabel: "Sensing" },
        { dimension: "Feeling (F)", left: 60, right: 40, leftLabel: "Feeling", rightLabel: "Thinking" },
        { dimension: "Perceiving (P)", left: 46, right: 54, leftLabel: "Perceiving", rightLabel: "Judging" }
    ];

    // Scales
    const x = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const y = d3.scaleBand()
        .domain(data.map(d => d.dimension))
        .range([0, height])
        .padding(0.1);

    // Base colors: Lighter teal for smaller, darker for larger (dynamic per bar)
    const lightColor = "#A0D0D0";  // Lighter teal
    const darkColor = "#3A7D7D";   // Darker teal

    // Draw stacked bars (horizontal) with dynamic coloring
    data.forEach((d, i) => {
        const yPos = y(d.dimension);
        const isLeftLarger = d.left > d.right;
        
        // Determine colors: larger gets dark, smaller gets light
        const leftColor = isLeftLarger ? lightColor : darkColor;
        const rightColor = isLeftLarger ? darkColor : lightColor;
        
        // Left segment (e.g., E/N/F/P %)
        svg.append("rect")
            .attr("class", "left-bar")
            .attr("x", 0)
            .attr("y", yPos)
            .attr("width", 0)  // Start at 0 for animation
            .attr("height", y.bandwidth())
            .attr("fill", leftColor)
            .transition()
            .duration(800)
            .delay(i * 200)
            .attr("width", x(d.left));

        // Right segment (e.g., I/S/T/J %)
        svg.append("rect")
            .attr("class", "right-bar")
            .attr("x", x(d.left))
            .attr("y", yPos)
            .attr("width", 0)  // Start at 0 for animation
            .attr("height", y.bandwidth())
            .attr("fill", rightColor)
            .transition()
            .duration(800)
            .delay(i * 200 + 100)
            .attr("width", x(d.right));

        // Dimension label (left)
        svg.append("text")
            .attr("class", "dim-label-left")
            .attr("x", -10)
            .attr("y", yPos + y.bandwidth() / 2)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .text(d.dimension)
            .style("fill", "antiquewhite")
            .style("font-size", "14px")
            .style("font-weight", "bold");

        // Percentage labels on bars
        svg.append("text")
            .attr("class", "left-percent")
            .attr("x", x(d.left) / 2)
            .attr("y", yPos + y.bandwidth() / 2)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(`${d.left}%`)
            .style("fill", "white")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .style("opacity", 0)
            .transition()
            .duration(800)
            .delay(i * 200 + 400)
            .style("opacity", 1)
            .attr("x", x(d.left) / 2);  // Animate position if needed

        svg.append("text")
            .attr("class", "right-percent")
            .attr("x", x(d.left) + x(d.right) / 2)
            .attr("y", yPos + y.bandwidth() / 2)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(`${d.right}%`)
            .style("fill", "white")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .style("opacity", 0)
            .transition()
            .duration(800)
            .delay(i * 200 + 400)
            .style("opacity", 1)
            .attr("x", x(d.left) + x(d.right) / 2);

        // Sub-labels below bars (e.g., External/Internal)
        svg.append("text")
            .attr("class", "left-sublabel")
            .attr("x", x(d.left) / 2)
            .attr("y", yPos + y.bandwidth() + 15)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(d.leftLabel)
            .style("fill", "khaki")
            .style("font-size", "11px");

        svg.append("text")
            .attr("class", "right-sublabel")
            .attr("x", x(d.left) + x(d.right) / 2)
            .attr("y", yPos + y.bandwidth() + 15)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(d.rightLabel)
            .style("fill", "khaki")
            .style("font-size", "11px");
    });

    // X-axis (percentage, bottom)
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height + 20})`)
        .call(d3.axisBottom(x).ticks(5))
        .selectAll("text")
        .style("fill", "antiquewhite")
        .style("font-size", "12px");

    // Left Y-axis (dimensions)
    svg.append("g")
        .attr("class", "y-axis-left")
        .call(d3.axisLeft(y).tickSize(0))
        .selectAll("text")
        .remove();  // Hide default ticks, use custom labels

    // Right Y-axis (duplicate labels for symmetry)
    const yAxisRight = d3.axisRight(y).tickSize(0);
    svg.append("g")
        .attr("class", "y-axis-right")
        .attr("transform", `translate(${width}, 0)`)
        .call(yAxisRight)
        .selectAll("text")
        .remove();  // Hide default ticks

    // Add custom labels to right y-axis (mirror left)
    data.forEach((d, i) => {
        svg.append("text")
            .attr("class", "dim-label-right")
            .attr("x", width + 10)
            .attr("y", y(d.dimension) + y.bandwidth() / 2)
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .text(d.dimension)
            .style("fill", "antiquewhite")
            .style("font-size", "14px")
            .style("font-weight", "bold");
    });

    // Title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("fill", "antiquewhite")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("MBTI Percentiles");

})();