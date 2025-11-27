(function () {
    // Set dimensions
    const width = 800;
    const height = 600;

    // Data with real dates and details, software as arrays
    const nodes = [
        { id: "Video jigsaw puzzle", software: ["Processing"], date: new Date(2023, 2, 1) },
        { id: "Magic circle ambient art", software: ["Processing"], date: new Date(2023, 3, 5) },
        { id: "Universe x Rhythm Survival Game", software: ["Processing"], date: new Date(2023, 4, 4) },
        { id: "“ (˙◠˙) ” Converter", software: ["Arduino"], date: new Date(2023, 11, 18) },
        { id: "Onyx Veil-The Abyss of Amnesia", software: ["Maya"], date: new Date(2024, 4, 5) },
        { id: "Image Processing Algorithms", software: ["Processing"], date: new Date(2025, 1, 10) },
        { id: "Edges highlighted effect using Convolution Kernels", software: ["Processing"], date: new Date(2025, 1, 10) },
        { id: "Pokemon card effect using 3D pixels", software: ["Processing"], date: new Date(2025, 1, 10) },
        { id: "Splitting RGB effect using the RGB value extracted", software: ["Processing"], date: new Date(2025, 1, 10) },
        { id: "Gothic stained glass windows using Mosaic concept", software: ["Processing"], date: new Date(2025, 1, 10) },
        { id: "Video Processing", software: ["Processing"], date: new Date(2025, 2, 13) },
        { id: "Temporal Face-Mapped Video Playback", software: ["Processing"], date: new Date(2025, 2, 13) },
        { id: "Pop Cat Defense: Motion-Activated Gameplay", software: ["Processing"], date: new Date(2025, 2, 13) },
        { id: "Move to Support Your Idol!", software: ["Processing"], date: new Date(2025, 2, 13) },
        { id: "AlchemAR-AR game", software: ["Processing"], date: new Date(2025, 2, 6) },
        { id: "Rhythm Trainer", software: ["Arduino"], date: new Date(2024, 10, 6) },
        { id: "Emoji Board", software: ["Arduino"], date: new Date(2024, 10, 17) },
        { id: "Machine Learning: Anime Character || Art Style Generator", software: ["Python"], date: new Date(2023, 11, 12) },
        { id: "“The Window Seat of Memory” with MemoralLens", software: ["Physical"], date: new Date(2025, 4, 5) },
        { id: "Chromatic Fractals", software: ["Processing"], date: new Date(2024, 11, 10) },
        { id: "Computational image collage work", software: ["TouchDesigner"], date: new Date(2025, 1, 11) },
        { id: "VisualText", software: ["TouchDesigner"], date: new Date(2025, 1, 18) },
        { id: "You Have the Power to Plant Seeds in Others’ Hearts", software: ["Processing", "TouchDesigner", "ChucK", "OpenCV"], date: new Date(2025, 3, 21) }
    ];

    // Unique softwares
    const softwaresList = Array.from(new Set(nodes.flatMap(d => d.software))).sort();

    // Colors
    const colors = d3.scaleOrdinal(d3.schemeCategory10).domain(softwaresList);

    // Positions
    const xPos = {
        "Processing": width * 0.5,
        "Arduino": width * 0.2,
        "TouchDesigner": width * 0.8,
        "Maya": width * 0.2,
        "Python": width * 0.8,
        "Physical": width * 0.4,
        "ChucK": width * 0.8,
        "OpenCV": width * 0.5
    };

    const yPos = {
        "Processing": height * 0.2,
        "Arduino": height * 0.6,
        "TouchDesigner": height * 0.6,
        "Maya": height * 0.4,
        "Python": height * 0.4,
        "Physical": height * 0.8,
        "ChucK": height * 0.7,
        "OpenCV": height * 0.3
    };

    // Image map for tooltips
    const imageMap = {
        "Video jigsaw puzzle": "images/Video jigsaw puzzle.png",
        "Magic circle ambient art": "Magic circle ambient art.png",
        "Universe x Rhythm Survival Game": "images/Universe x Rhythm Survival Game.png",
        "“ (˙◠˙) ” Converter": "https://img.youtube.com/vi/YH7MAvmmtLc/0.jpg",
        "Onyx Veil-The Abyss of Amnesia": "https://img.youtube.com/vi/x-KNQcRHjOo/0.jpg",
        "Edges highlighted effect using Convolution Kernels": "images/Edges highlighted effect using Convolution Kernels.png",
        "Pokemon card effect using 3D pixels": "images/Pokemon card effect using 3D pixels.png",
        "Splitting RGB effect using the RGB value extracted": "images/Splitting RGB effect using the RGB value extracted.png",
        "Gothic stained glass windows using Mosaic concept": "images/Gothic stained glass windows using Mosaic concept.png",
        "Temporal Face-Mapped Video Playback": "images/Temporal Face-Mapped Video Playback.png",
        "Pop Cat Defense: Motion-Activated Gameplay": "images/Pop Cat Defense.png",
        "Move to Support Your Idol!": "images/Move to Support Your Idol!.png",
        "AlchemAR-AR game": "images/AlchemAR.png",
        "Rhythm Trainer": "images/Rhythm Trainer.png",
        "Emoji Board": "images/Emoji Board.png",
        "Machine Learning: Anime Character || Art Style Generator": "images/Anime Character _ Art Style Generator.png",
        "“The Window Seat of Memory” with MemoralLens": "images/MemoraLens.png",
        "Chromatic Fractals": "images/Chromatic Fractals.png",
        "Computational image collage work": "images/Computational image collage work.png",
        "VisualText": "images/VisualText.png",
        "You Have the Power to Plant Seeds in Others’ Hearts": "https://isea2023.ensad.fr/Motherplant.png"
    };

    // Create links for artworks sharing the same software, with hierarchy for subgroups
    const links = [
        // Processing mains pairwise
        { source: "Video jigsaw puzzle", target: "Magic circle ambient art" },
        { source: "Video jigsaw puzzle", target: "Universe x Rhythm Survival Game" },
        { source: "Video jigsaw puzzle", target: "AlchemAR-AR game" },
        { source: "Video jigsaw puzzle", target: "Chromatic Fractals" },
        { source: "Video jigsaw puzzle", target: "Image Processing Algorithms" },
        { source: "Video jigsaw puzzle", target: "Video Processing" },
        { source: "Magic circle ambient art", target: "Universe x Rhythm Survival Game" },
        { source: "Magic circle ambient art", target: "AlchemAR-AR game" },
        { source: "Magic circle ambient art", target: "Chromatic Fractals" },
        { source: "Magic circle ambient art", target: "Image Processing Algorithms" },
        { source: "Magic circle ambient art", target: "Video Processing" },
        { source: "Universe x Rhythm Survival Game", target: "AlchemAR-AR game" },
        { source: "Universe x Rhythm Survival Game", target: "Chromatic Fractals" },
        { source: "Universe x Rhythm Survival Game", target: "Image Processing Algorithms" },
        { source: "Universe x Rhythm Survival Game", target: "Video Processing" },
        { source: "AlchemAR-AR game", target: "Chromatic Fractals" },
        { source: "AlchemAR-AR game", target: "Image Processing Algorithms" },
        { source: "AlchemAR-AR game", target: "Video Processing" },
        { source: "Chromatic Fractals", target: "Image Processing Algorithms" },
        { source: "Chromatic Fractals", target: "Video Processing" },
        { source: "Image Processing Algorithms", target: "Video Processing" },
        // Image processing subs to parent
        { source: "Image Processing Algorithms", target: "Edges highlighted effect using Convolution Kernels" },
        { source: "Image Processing Algorithms", target: "Pokemon card effect using 3D pixels" },
        { source: "Image Processing Algorithms", target: "Splitting RGB effect using the RGB value extracted" },
        { source: "Image Processing Algorithms", target: "Gothic stained glass windows using Mosaic concept" },
        // Video processing subs to parent
        { source: "Video Processing", target: "Temporal Face-Mapped Video Playback" },
        { source: "Video Processing", target: "Pop Cat Defense: Motion-Activated Gameplay" },
        { source: "Video Processing", target: "Move to Support Your Idol!" },
        // Arduino pairwise
        { source: "“ (˙◠˙) ” Converter", target: "Rhythm Trainer" },
        { source: "“ (˙◠˙) ” Converter", target: "Emoji Board" },
        { source: "Rhythm Trainer", target: "Emoji Board" },
        // TouchDesigner link
        { source: "Computational image collage work", target: "VisualText" },
        // Links for mixed work to related groups
        { source: "You Have the Power to Plant Seeds in Others’ Hearts", target: "AlchemAR-AR game" },
        { source: "You Have the Power to Plant Seeds in Others’ Hearts", target: "VisualText" }
    ];

    // Container
    const container = d3.select("#vis-node-link_diagram").style("position", "relative");

    // Legend with checkboxes (darker background)
    const legendDiv = container.append("div")
        .style("position", "absolute")
        .style("top", "10px")
        .style("left", "10px")
        .style("background", "#333333")  // Darker background
        .style("padding", "5px")
        .style("border", "1px solid #474747ff")
        .style("border-radius", "5px");

    softwaresList.forEach((s, i) => {
        legendDiv.append("div")
            .html(`<label style="color: white;"><input type="checkbox" checked data-software="${s}"> <span style="color: ${colors(s)}">●</span> ${s}</label>`);  // White text for checkboxes
    });

    // Create SVG container
    const svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .append("g")
        .attr("transform", "translate(0,30)");

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Artworks Network by Software");

    // Force simulation
    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id).distance(d => d.source.software.includes("Processing") && d.target.software.includes("Processing") ? 200 : 100).strength(0.5))
        .force("charge", d3.forceManyBody().strength(d => d.software.includes("Processing") ? -1500 : -800))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(d => d.software.includes("Processing") ? 50 : 20))
        .force("x", d3.forceX().x(d => d3.mean(d.software.map(s => xPos[s] || width / 2))).strength(0.6))
        .force("y", d3.forceY().y(d => d3.mean(d.software.map(s => yPos[s] || height / 2))).strength(0.6));

    // Tooltip (darker background)
    const tooltip = d3.select("body").select(".tooltip").empty()
        ? d3.select("body").append("div").attr("class", "tooltip").style("background", "#333333")  // Darker background
        : d3.select("body").select(".tooltip").style("background", "#333333");  // Darker background

    // Calculate min and max dates
    const minDate = d3.min(nodes, d => d.date);
    const maxDate = d3.max(nodes, d => d.date);
    const minTime = minDate.getTime();
    const maxTime = maxDate.getTime();

    // Add slider
    container.append("label").text("Month: ");
    const dateLabel = container.append("span").attr("id", "date-label").style("margin-left", "10px");
    let currentDate = maxDate;
    const initialMonthYear = maxDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    dateLabel.text(initialMonthYear);

    const slider = container.append("input")
        .attr("type", "range")
        .attr("min", minTime)
        .attr("max", maxTime)
        .attr("step", 86400000) // One day
        .attr("value", maxTime)
        .style("width", "780px") // Longer slider
        .on("input", function() {
            const selectedTime = +this.value;
            const selectedDate = new Date(selectedTime);
            const monthYear = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });
            dateLabel.text(monthYear);
            currentDate = selectedDate;
            updateGraph(currentDate, selectedSoftwares);
        });

    // Selected softwares
    let selectedSoftwares = [...softwaresList];

    // Listen for checkbox changes
    container.selectAll("input[type=checkbox]").on("change", function() {
        selectedSoftwares = [];
        container.selectAll("input[type=checkbox]").each(function() {
            if (this.checked) {
                selectedSoftwares.push(this.dataset.software);
            }
        });
        updateGraph(currentDate, selectedSoftwares);
    });

    // Update function
    function updateGraph(selectedDate, selected = softwaresList) {
        const filteredNodes = nodes.filter(d => d.date <= selectedDate && d.software.some(s => selected.includes(s)));
        const filteredNodeIds = new Set(filteredNodes.map(d => d.id));
        const filteredLinks = links.filter(l => filteredNodeIds.has(l.source.id || l.source) && filteredNodeIds.has(l.target.id || l.target));

        // Update links
        const linkUpdate = svg.selectAll("line")
            .data(filteredLinks, d => `${(d.source.id || d.source)}-${(d.target.id || d.target)}`);

        linkUpdate.enter()
            .append("line")
            .style("stroke", "#ffffffff")
            .style("stroke-opacity", 0.8)
            .style("stroke-width", 0.5);

        linkUpdate.exit().remove();

        // Update nodes
        const nodeUpdate = svg.selectAll("g.node")
            .data(filteredNodes, d => d.id);

        const nodeEnter = nodeUpdate.enter()
            .append("g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        nodeEnter.append("circle")
            .attr("r", 10)
            .style("fill", d => colors(d.software[0]))
            .style("stroke", "#a9a9a9ff")
            .style("stroke-width", 1.5);

        nodeEnter.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(d => d.id)
            .style("font-size", "10px")
            .style("fill", "#333333");  // Darker text color

        nodeUpdate.exit().remove();

        // Add mouse events to all nodes (enter + update)
        nodeUpdate.merge(nodeEnter)
            .on("mouseover", (event, d) => {
                const imageUrl = imageMap[d.id];
                const monthYear = d.date.toLocaleString('default', { month: 'long', year: 'numeric' });
                let htmlContent = '';
                if (imageUrl) {
                    htmlContent += `<img src="${imageUrl}" style="width:100px; height:auto; float:left; margin-right:10px;">`;
                }
                htmlContent += `<div><strong>${d.id}</strong><br>Software: ${d.software.join(", ")}<br>Month: ${monthYear}</div>`;
                tooltip.style("opacity", 1)
                    .html(htmlContent)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
            });

        // Update simulation
        simulation.nodes(filteredNodes);
        simulation.force("link").links(filteredLinks);
        simulation.alpha(1).restart();
    }

    // Tick handler
    simulation.on("tick", () => {
        svg.selectAll("line")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        svg.selectAll("g.node")
            .attr("transform", d => `translate(${d.x}, ${d.y})`);
    });

    // Drag functions
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    // Initial update
    updateGraph(maxDate, selectedSoftwares);
})();