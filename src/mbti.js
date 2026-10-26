// src/mbti.js — D3 Horizontal Stacked Bar Chart for MBTI Dimensions (with Right Y-Axis + Dynamic Highlighting)

// src/mbti.js — D3 Horizontal Stacked Bar Chart for MBTI Dimensions

(function() {
    // Target the vis container
    const container = d3.select("#vis-mbti");
    
    // Increased margins to prevent labels on left/right from clipping
    const margin = { top: 45, right: 120, bottom: 40, left: 120 };  
    const width = 500 - margin.left - margin.right;  
    const height = 220 - margin.top - margin.bottom;

    // Create SVG
    const svg = container.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Data: MBTI dimensions (stacked: left side vs right side, percentages add to 100%)
    const data = [
        { dimension: "Introversion (I)", left: 54, right: 46, leftLabel: "Introversion (I)", rightLabel: "Extraversion (E)" },
        { dimension: "Intuition (N)", left: 51, right: 49, leftLabel: "Intuition (N)", rightLabel: "Sensing (S)" },
        { dimension: "Feeling (F)", left: 58, right: 42, leftLabel: "Feeling (F)", rightLabel: "Thinking (T)" },
        { dimension: "Judging (J)", left: 65, right: 35, leftLabel: "Judging (J)", rightLabel: "Perceiving (P)" },
        { dimension: "Assertive (A)", left: 53, right: 47, leftLabel: "Assertive (A)", rightLabel: "Turbulent (T)" }
    ];

    // Scales
    const x = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const y = d3.scaleBand()
        .domain(data.map(d => d.dimension))
        .range([0, height])
        .padding(0.2);

    // Base colors: Lighter teal for larger %, darker for smaller %
    const lightColor = "#A0D0D0";  
    const darkColor = "#3A7D7D";   

    // Draw stacked bars (horizontal) with dynamic coloring
    data.forEach((d, i) => {
        const yPos = y(d.dimension);
        const isLeftLarger = d.left > d.right;
        
        // Determine colors: larger side gets lightColor, smaller side gets darkColor
        const leftColor = isLeftLarger ? lightColor : darkColor;
        const rightColor = isLeftLarger ? darkColor : lightColor;
        
        // Left segment bar
        svg.append("rect")
            .attr("class", "left-bar")
            .attr("x", 0)
            .attr("y", yPos)
            .attr("width", 0)  // Start at 0 for animation
            .attr("height", y.bandwidth())
            .attr("fill", leftColor)
            .transition()
            .duration(800)
            .delay(i * 150)
            .attr("width", x(d.left));

        // Right segment bar
        svg.append("rect")
            .attr("class", "right-bar")
            .attr("x", x(d.left))
            .attr("y", yPos)
            .attr("width", 0)  // Start at 0 for animation
            .attr("height", y.bandwidth())
            .attr("fill", rightColor)
            .transition()
            .duration(800)
            .delay(i * 150 + 100)
            .attr("width", x(d.right));

        // Left label (Left Y-Axis label)
        svg.append("text")
            .attr("class", "dim-label-left")
            .attr("x", -10)
            .attr("y", yPos + y.bandwidth() / 2)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .text(d.leftLabel)
            .style("fill", "antiquewhite")
            .style("font-size", "14px")
            .style("font-weight", "bold");

        // Right label (Right Y-Axis label)
        svg.append("text")
            .attr("class", "dim-label-right")
            .attr("x", width + 10)
            .attr("y", yPos + y.bandwidth() / 2)
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .text(d.rightLabel)
            .style("fill", "antiquewhite")
            .style("font-size", "14px")
            .style("font-weight", "bold");

        // Percentage label inside left bar segment
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
            .delay(i * 150 + 300)
            .style("opacity", 1);

        // Percentage label inside right bar segment
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
            .delay(i * 150 + 300)
            .style("opacity", 1);
    });

    // X-axis (percentage scale on bottom)
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height + 10})`)
        .call(d3.axisBottom(x).ticks(5))
        .selectAll("text")
        .style("fill", "antiquewhite")
        .style("font-size", "12px");

    // Title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -15)
        .attr("text-anchor", "middle")
        .style("fill", "antiquewhite")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("MBTI Percentiles");

})();