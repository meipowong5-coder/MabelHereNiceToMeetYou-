// grades-scatter.js — dropdown with full names + correct filtering + your exact positioning
(function () {
    const width = 800;
    const height = 600;
    const margin = { top: 80, right: 100, bottom: 80, left: 200 };

    const container = d3.select("#vis-grades");

    const svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height]);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Dropdown — exactly your requested size & position
    const dropdown = svg.append("foreignObject")
        .attr("width", 270)
        .attr("height", 60)
        .attr("x", width - 270)
        .attr("y", -10);

    const dropdownBody = dropdown.append("xhtml:div")
        .style("background", "rgba(255,255,255,0.12)")
        .style("padding", "12px 16px")
        .style("border-radius", "12px")
        .style("border", "1px solid antiquewhite")
        .style("font-size", "14px")
        .style("color", "antiquewhite")
        .style("display", "flex")
        .style("align-items", "center")
        .style("justify-content", "center")
        .style("height", "100%")
        .style("box-sizing", "border-box");

    dropdownBody.append("span").text("Filter:");

    const select = dropdownBody.append("select")
        .style("margin-left", "10px")
        .style("padding", "8px 12px")
        .style("border-radius", "8px")
        .style("background", "#2c3e50")
        .style("color", "khaki")
        .style("border", "1px solid antiquewhite")
        .style("font-size", "12px")
        .style("min-width", "180px");

    // Options with full display text + correct value for filtering
    const options = [
        { text: "All Courses", value: "All" },
        { text: "School of Creative Media", value: "SM" },
        { text: "General Education", value: "GE" },
        { text: "Joint Course", value: "JC" }
    ];

    select.selectAll("option")
        .data(options)
        .enter()
        .append("option")
        .text(d => d.text)
        .attr("value", d => d.value);

    // Title (shifted left for space)
    g.append("text")
        .attr("x", (width - margin.left - margin.right) / 2 - 50)
        .attr("y", -40)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .style("fill", "antiquewhite")
        .text("University Course Grades");

    // Data with short names
    const data = [
        { name: "University English", shortName: "University English", credits: 3, grade: "B+", type: "GE" },
        { name: "Introduction to Media Computing", shortName: "Intro Media Computing", credits: 3, grade: "A-", type: "SM" },
        { name: "New Media Art", shortName: "New Media Art", credits: 3, grade: "A-", type: "SM" },
        { name: "Movies and Psychology", shortName: "Movies & Psychology", credits: 3, grade: "A-", type: "GE" },
        { name: "Chinese Civilisation - History and Philosophy", shortName: "Chinese Civilisation", credits: 3, grade: "A-", type: "GE" },
        { name: "Word, Sound, Image: Writing for Creative Media", shortName: "Word, Sound, Image", credits: 3, grade: "B", type: "GE" },
        { name: "Creative Media Studio I", shortName: "Creative Media Studio I", credits: 6, grade: "B+", type: "SM" },
        { name: "Interdisciplinary Practices in Art, Science and the Humanities", shortName: "Interdisciplinary Practices", credits: 3, grade: "B+", type: "SM" },
        { name: "Creative Coding", shortName: "Creative Coding", credits: 3, grade: "A", type: "SM" },
        { name: "Introduction to Economics", shortName: "Intro to Economics", credits: 3, grade: "A-", type: "GE" },
        { name: "Creative Media Studio II", shortName: "Creative Media Studio II", credits: 6, grade: "B", type: "SM" },
        { name: "Critical Theory and Socially Engaged Practices", shortName: "Critical Theory", credits: 3, grade: "A-", type: "SM" },
        { name: "Physical Computing and Tangible Media", shortName: "Physical Computing", credits: 3, grade: "A-", type: "SM" },
        { name: "Machine Learning for Artists", shortName: "ML for Artists", credits: 3, grade: "A-", type: "SM" },
        { name: "Visual Expression and Communication", shortName: "Visual Expression", credits: 3, grade: "A", type: "GE" },
        { name: "Psychology for Young Professionals", shortName: "Psych for Young Pros", credits: 3, grade: "A-", type: "GE" },
        { name: "Psychology of Interaction and Games: Testing and Evaluation", shortName: "Psychology of Games", credits: 3, grade: "A-", type: "SM" },
        { name: "Computer Programming for Animators", shortName: "Programming for Animators", credits: 3, grade: "B+", type: "SM" },
        { name: "Game Prototyping and Design", shortName: "Game Prototyping", credits: 3, grade: "A", type: "SM" },
        { name: "Hardware Hacking", shortName: "Hardware Hacking", credits: 3, grade: "A+", type: "SM" },
        { name: "Understanding Data", shortName: "Understanding Data", credits: 3, grade: "A-", type: "SM" },
        { name: "Special Topics in Art and Science Studio II", shortName: "Art & Science Studio II", credits: 6, grade: "B+", type: "SM" },
        { name: "Image Processing and Augmented Reality", shortName: "Image Proc & AR", credits: 3, grade: "A-", type: "SM" },
        { name: "Imaging Science Studio", shortName: "Imaging Science Studio", credits: 6, grade: "A+", type: "SM" },
        { name: "Special Topics in Art and Science Studio I", shortName: "Art & Science Studio I", credits: 6, grade: "A", type: "SM" },
        { name: "Interpersonal Skills and Positive Personal Development", shortName: "Interpersonal Skills", credits: 3, grade: "A-", type: "GE" },
        { name: "Artists in the Labs", shortName: "Artists in the Labs", credits: 3, grade: "A+", type: "JC" }
    ].sort((a, b) => {
        const order = { "A+": 0, "A": 1, "A-": 2, "B+": 3, "B": 4 };
        return order[a.grade] - order[b.grade];
    });

    // Scales
    const gradeOrder = ["A+", "A", "A-", "B+", "B"];
    const x = d3.scalePoint()
        .domain(gradeOrder)
        .range([0, width - margin.left - margin.right])
        .padding(0.5);

    const y = d3.scalePoint()
        .domain(data.map(d => d.shortName))
        .range([0, height - margin.top - margin.bottom])
        .padding(0.8);

    // Color
    const color = d3.scaleOrdinal()
        .domain(["SM", "GE", "JC"])
        .range(["#ff6b6b", "#4ecdc4", "#ffe66d"]);

    // Axes
    g.append("g")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom + 20})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("font-size", "20px")
        .style("fill", "antiquewhite");

    g.append("text")
        .attr("x", (width - margin.left - margin.right) / 2)
        .attr("y", height - margin.top - margin.bottom + 60)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("fill", "antiquewhite")
        .text("Grade");

    g.append("g")
        .call(d3.axisLeft(y).tickFormat(d => d))
        .selectAll("text")
        .style("font-size", "13px")
        .style("fill", "khaki");

    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height - margin.top - margin.bottom) / 2)
        .attr("y", -160)   // even more left
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("fill", "antiquewhite")
        .text("Course");

    // Dots — smaller
    const jitter = 10;
    const dots = g.selectAll(".dot")
        .data(data)
        .join("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.grade) + (Math.random() - 0.5) * jitter)
        .attr("cy", d => y(d.shortName))
        .attr("r", d => d.credits === 6 ? 11 : 8)
        .attr("fill", d => color(d.type))
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .style("opacity", 0.95);

    // Tooltip
    const tooltip = d3.select("body").select(".tooltip").empty()
        ? d3.select("body").append("div").attr("class", "tooltip")
        : d3.select(".tooltip");

    tooltip.style("position", "absolute")
        .style("background", "rgba(0,0,0,0.85)")
        .style("color", "white")
        .style("padding", "12px")
        .style("border-radius", "8px")
        .style("font-size", "14px")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("max-width", "300px")
        .style("box-shadow", "0 4px 15px rgba(0,0,0,0.4)");

    dots.on("mouseover", function(event, d) {
            tooltip.html(`
                <strong>${d.name}</strong><br>
                <strong>Grade: ${d.grade}</strong> • Credits: ${d.credits}<br>
                Type: ${d.type === "SM" ? "School of Creative Media" : d.type === "GE" ? "General Education" : "Joint Course"}
            `)
            .style("opacity", 1)
            .style("left", (event.pageX + 12) + "px")
            .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", () => tooltip.style("opacity", 0));

// Dropdown filter — now works perfectly with full names
    select.on("change", function() {
        const selected = this.value;  // "All", "SM", "GE", or "JC"
        dots.transition()
            .duration(600)
            .style("opacity", d => selected === "All" || d.type === selected ? 0.95 : 0.1);
    });
})();