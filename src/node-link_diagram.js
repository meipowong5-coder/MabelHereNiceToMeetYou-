(function () {
    // Set dimensions
    const width = 600;
    const height = 600;

    // Data
    const nodes = [
        { id: "Black and White drawing", software: "Procreate", details: "Black and white artwork" },
        { id: "Animate characters drawings", software: "Procreate", details: "Animated character illustrations" },
        { id: "Sketches", software: "Procreate", details: "Practice sketches" },
        { id: "Original characters", software: "Procreate", details: "Unique character designs" },
        { id: "Universe x Rhythm Survival game", software: "Processing", details: "Universe x Rhythm Survival game" },
        { id: "Simple video jigsaw puzzle", software: "Processing", details: "Simple video jigsaw puzzle" },
        { id: "Image Processing Algorithms", software: "Processing", details: "Edges highlighted effect using Convolution Kernels, Pokemon card effect using 3D pixels, splitting effect using RGB values, gothic stained glass windows using Mosaic concept" },
        { id: "Edge Highlight Effect", software: "Processing", details: "Edges highlighted using Convolution Kernels" },
        { id: "Pokemon Card Effect", software: "Processing", details: "Pokemon card effect using 3D pixels" },
        { id: "RGB Split & Mosaic Effect", software: "Processing", details: "Splitting effect using RGB values, gothic stained glass windows using Mosaic concept" },
        { id: "AlchemAR", software: "Processing", details: "An interactive AR platform where users can engage with chemical elements to form compounds through virtual reactions." },
        { id: "Barrier Grid Animation on Meme Cat", software: "Processing", details: "Barrier grid animation on meme cat" }, // New
        { id: "Mood expressor", software: "Arduino", details: "System for individuals unable to express facial emotions" },
        { id: "Rhythm trainer", software: "Arduino", details: "Rhythm trainer" },
        { id: "Bad mood convertor", software: "Arduino", details: "Bad mood convertor" },
        { id: "Collage of HatsukiYura's Album Cover", software: "TouchDesigner", details: "Collage of HatsukiYura's album cover" },
        { id: "Animated Composition (Barbara Kruger Style)", software: "TouchDesigner", details: "Animated composition referencing Barbara Kruger’s text and image works. Randomize image and text selections." },
        { id: "Visual-Text Generator", software: "TouchDesigner", details: "Generative visual-text responding to music in a rhythmic way" },
        { id: "Animated Alphabets (Jeffrey Gibson Style)", software: "TouchDesigner", details: "Invented typographic visual style referencing American artist Jeffrey Gibson" },
        { id: "Sonify a Drawing", software: "TouchDesigner", details: "Take an image of a drawing as a 'score' and create a network/system/process to turn the drawing into sound" }
    ];

    // Create links for artworks sharing the same software
    const links = [
        // Procreate links (pairwise among 4 nodes)
        { source: "Black and White drawing", target: "Animate characters drawings" },
        { source: "Black and White drawing", target: "Sketches" },
        { source: "Black and White drawing", target: "Original characters" },
        { source: "Animate characters drawings", target: "Sketches" },
        { source: "Animate characters drawings", target: "Original characters" },
        { source: "Sketches", target: "Original characters" },
        // Processing links (Universe, Jigsaw, Image Processing Algorithms; Image Processing Algorithms to 3 algorithms; new links for Barrier Grid and AlchemAR)
        { source: "Universe x Rhythm Survival game", target: "Simple video jigsaw puzzle" },
        { source: "Universe x Rhythm Survival game", target: "Image Processing Algorithms" },
        { source: "Universe x Rhythm Survival game", target: "AlchemAR" },
        { source: "Universe x Rhythm Survival game", target: "Barrier Grid Animation on Meme Cat" }, // New link
        { source: "Simple video jigsaw puzzle", target: "Image Processing Algorithms" },
        { source: "AlchemAR", target: "Image Processing Algorithms" },
        { source: "Barrier Grid Animation on Meme Cat", target: "Image Processing Algorithms" }, // New link
        { source: "Image Processing Algorithms", target: "Edge Highlight Effect" },
        { source: "Image Processing Algorithms", target: "Pokemon Card Effect" },
        { source: "Image Processing Algorithms", target: "RGB Split & Mosaic Effect" },
        // Arduino links (pairwise among 3 nodes)
        { source: "Mood expressor", target: "Rhythm trainer" },
        { source: "Mood expressor", target: "Bad mood convertor" },
        { source: "Rhythm trainer", target: "Bad mood convertor" },
        // TouchDesigner links (pairwise among 5 nodes)
        { source: "Collage of HatsukiYura's Album Cover", target: "Animated Composition (Barbara Kruger Style)" },
        { source: "Collage of HatsukiYura's Album Cover", target: "Visual-Text Generator" },
        { source: "Collage of HatsukiYura's Album Cover", target: "Animated Alphabets (Jeffrey Gibson Style)" },
        { source: "Collage of HatsukiYura's Album Cover", target: "Sonify a Drawing" },
        { source: "Animated Composition (Barbara Kruger Style)", target: "Visual-Text Generator" },
        { source: "Animated Composition (Barbara Kruger Style)", target: "Animated Alphabets (Jeffrey Gibson Style)" },
        { source: "Animated Composition (Barbara Kruger Style)", target: "Sonify a Drawing" },
        { source: "Visual-Text Generator", target: "Animated Alphabets (Jeffrey Gibson Style)" },
        { source: "Visual-Text Generator", target: "Sonify a Drawing" },
        { source: "Animated Alphabets (Jeffrey Gibson Style)", target: "Sonify a Drawing" }
    ];

    // Create SVG container
    const svg = d3.select("#vis-node-link_diagram")
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
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(70))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(18))
        .force("x", d3.forceX().x(d => {
            const softwareIndex = ["Procreate", "Processing", "Arduino", "TouchDesigner"].indexOf(d.software);
            return width / 2 + (softwareIndex % 2 === 0 ? -30 : 30);
        }).strength(0.05))
        .force("y", d3.forceY().y(height / 2).strength(0.05));

    // Add edges
    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .style("stroke", "#ccc")
        .style("stroke-opacity", 0.8)
        .style("stroke-width", 1.5);

    // Add nodes
    const node = svg.append("g")
        .selectAll("g")
        .data(nodes)
        .enter()
        .append("g")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("circle")
        .attr("r", 10)
        .style("fill", d => {
            const softwareIndex = ["Procreate", "Processing", "Arduino", "TouchDesigner"].indexOf(d.software);
            return d3.schemeCategory10[softwareIndex >= 0 ? softwareIndex : 0];
        })
        .style("stroke", "#fff")
        .style("stroke-width", 1.5);

    // Add node labels
    node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(d => d.id)
        .style("font-size", "10px")
        .style("fill", "black");

    // Add software labels at centroids
    const softwareLabels = svg.append("g")
        .selectAll("text")
        .data(["Procreate", "Processing", "Arduino", "TouchDesigner"])
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "black")
        .style("font-weight", "bold")
        .text(d => d);

    // Tooltip
    const tooltip = d3.select("body").select(".tooltip").empty()
        ? d3.select("body").append("div").attr("class", "tooltip")
        : d3.select("body").select(".tooltip");

    node.on("mouseover", (event, d) => {
        tooltip.style("opacity", 1)
            .html(`${d.id}<br>Software: ${d.software}${d.details ? `<br>${d.details}` : ""}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", () => {
        tooltip.style("opacity", 0);
    });

    // Simulation tick
    simulation.on("tick", () => {
        // Update edges
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        // Update nodes
        node.attr("transform", d => `translate(${d.x}, ${d.y})`);

        // Update software labels at centroids
        softwareLabels.each(function (software) {
            const relatedNodes = nodes.filter(d => d.software === software);
            const centroidX = d3.mean(relatedNodes, d => d.x) || width / 2;
            const centroidY = d3.mean(relatedNodes, d => d.y) || height / 2;
            d3.select(this)
                .attr("x", centroidX)
                .attr("y", centroidY);
        });
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
})();