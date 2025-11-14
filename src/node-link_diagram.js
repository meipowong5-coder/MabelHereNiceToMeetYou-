(function () {
    // Set dimensions
    const width = 800;
    const height = 600;

    // Data with real dates and details
    const nodes = [
        { id: "Video jigsaw puzzle", software: "Processing", details: "After the user pressed the spacebar, the video will be upsetted by inverting the nine areas from area 0 to area 8 randomly. The user can choose to restore the video immediately or keep watching the video as if using a new way to enjoy it. If the user want to restore the video which means the user wants to change it back to the original appearance, he or she has to click on the upper or bottom half of an inverted area depends on the area has been flipped horizontally or vertically or not. If the area is inverted horizontally, click the upper half to restore it, otherwise click the bottom half if the area has been inverted vertically (see figure 2). I would call it a game because the user has to think whether they should click the upper half or the bottom half by determining whether an area has been inverted or not. Although there is only a 3 x 3 squares canvas which looks quite easy to solve, the image will keep changing since it is a video so it contains a certain extent of the challenge.", date: new Date(2023, 2, 1) },
        { id: "Magic circle ambient art", software: "Processing", details: "The ambient art mainly contains three things: circles that form a round with diﬀerent sizes and distances between the circles and the center point (pattern A), the popping white-stroke squares (pattern B), and colorful lines with ever-changing length (pattern C). I used analyze() to check the loudness which would aﬀect the value of noise together with the position and the opacity of pattern C. The length of patterns C and B, and the distance between the ellipses and the center in pattern A would be adjusted by the amplitude too. I set the ﬀt to calculate the frequency of sound and save the data in the spectrum. The data would be shown through the size of the circles in pattern A. Therefore, the visual elements are all based on the data received from the sound and the user could press the space bar to remove the fading eﬀect to create a mesh, magic circle-like drawing as time goes by.", date: new Date(2023, 3, 5) },
        { id: "Universe x Rhythm Survival Game", software: "Processing", details: "This game looks like a combination of a survival game and a rhythm game since it involves HP and the use of beat detector, and atmosphere makes me feel like I am in the universe so here comes the name “Universe x Rhythm Survival Game”. The combo icons are released based on the beat of songs, but they look like attacks from aliens too. Pressing the button when the combo arrives the circles at the bottom somehow looks like blocking their attacks and defending the player especially the HP will be deducted if s/he misses it.", date: new Date(2023, 4, 4) },
        { id: "“ (˙◠˙) ” Converter", software: "Arduino", details: "https://youtu.be/YH7MAvmmtLc In recent years, there has been a growing recognition of the importance of anxiety and its impact on individuals and society as a whole. The heightened awareness of anxiety issues has inspired us to take action and find ways to address these challenges. We have developed a comprehensive system to address the issue of anxiety by implementing various features and techniques. Through extensive research, we have gained insights into anxiety and effective methods for managing it.", date: new Date(2023, 11, 18) },
        { id: "Onyx Veil-The Abyss of Amnesia", software: "Maya", details: "https://youtu.be/x-KNQcRHjOo Discovered the song “Onyx Veil -The Abyss of Amnesia-” Imaginations popped up in my mind Learning Maya -> the ability to create 3D animations Want to create an animation for this song", date: new Date(2024, 4, 5) },
        { id: "Image Processing Algorithms", software: "Processing", details: "Image processing algorithms including edges highlight, pokemon card, RGB split, and mosaic effects.", date: new Date(2025, 1, 10) },
        { id: "Edges highlighted effect using Convolution Kernels", software: "Processing", details: "Edges highlighted effect using Convolution Kernels", date: new Date(2025, 1, 10) },
        { id: "Pokemon card effect using 3D pixels", software: "Processing", details: "Pokemon card effect using 3D pixels", date: new Date(2025, 1, 10) },
        { id: "Splitting RGB effect using the RGB value extracted", software: "Processing", details: "Splitting RGB effect using the RGB value extracted", date: new Date(2025, 1, 10) },
        { id: "Gothic stained glass windows using Mosaic concept", software: "Processing", details: "Gothic stained glass windows using Mosaic concept", date: new Date(2025, 1, 10) },
        { id: "Video Processing", software: "Processing", details: "Video processing projects including temporal face-mapped playback, pop cat defense, and move to support.", date: new Date(2025, 2, 13) },
        { id: "Temporal Face-Mapped Video Playback", software: "Processing", details: "Temporal Face-Mapped Video Playback", date: new Date(2025, 2, 13) },
        { id: "Pop Cat Defense: Motion-Activated Gameplay", software: "Processing", details: "Pop Cat Defense: Motion-Activated Gameplay", date: new Date(2025, 2, 13) },
        { id: "Move to Support Your Idol!", software: "Processing", details: "Move to Support Your Idol!", date: new Date(2025, 2, 13) },
        { id: "AlchemAR-AR game", software: "Processing", details: "The objective of “AlchemAR ” is to create an interactive AR platform where users can engage with chemical elements to form compounds through virtual reactions. Seven elements were selected to demonstrate ten chemical reactions, with AR markers designed to represent each element. These markers enable users to select elements and observe corresponding 3D visualizations and reactions. The project aims to foster an engaging and educational experience, allowing users to explore chemistry in an innovative and interactive manner.", date: new Date(2025, 2, 6) },
        { id: "Rhythm Trainer", software: "Arduino", details: "Rhythm trainer", date: new Date(2024, 10, 6) },
        { id: "Emoji Board", software: "Arduino", details: "Emoji board", date: new Date(2024, 10, 17) },
        { id: "Machine Learning: Anime Character || Art Style Generator", software: "Python", details: "A Convolutional VAE model that: Offer inspiration for creating new characters, Foster a stronger sense of individuality and Preserve the art style.", date: new Date(2023, 11, 12) },
        { id: "“The Window Seat of Memory” with MemoralLens", software: "Physical", details: "Physical installation", date: new Date(2025, 4, 5) },
        { id: "Chromatic Fractals", software: "Processing", details: "Made with Processing and GLSL", date: new Date(2024, 11, 10) },
        { id: "Computational image collage work", software: "TouchDesigner", details: "A computational image collage work makes use of a replicator network to show album covers of a Japanese singer. I chose them because I could see the subtle evolution of the art style in the covers from different periods. Automate the arrangement of the images so that it will generate (almost) infinite combinations.", date: new Date(2025, 1, 11) },
        { id: "VisualText", software: "TouchDesigner", details: "A generative visual-text responds to music in a rhythmic way, referencing the style of the work of Korea artist group Young-Hae Chang Heavy Industries. The composition \"loop through\" the text in an automated manner.", date: new Date(2025, 1, 18) },
        { id: "You Have the Power to Plant Seeds in Others’ Hearts", software: "Mixed", details: "It is an interactive installation that blends technology and human connection to share my personal reflections.", date: new Date(2025, 3, 21) }
    ];

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
        { source: "Computational image collage work", target: "VisualText" }
    ];

    // Container
    const container = d3.select("#vis-node-link_diagram");

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

    // Force simulation with adjusted parameters for closer clustering and positioning
    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id).distance(d => d.source.software === "Processing" ? 200 : 150).strength(0.5))
        .force("charge", d3.forceManyBody().strength(-1200)) // Stronger repulsion for more space
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(d => d.software === "Processing" ? 50 : 30))
        .force("x", d3.forceX().x(d => {
            switch (d.software) {
                case "Processing": return width * 0.5;
                case "Arduino": return width * 0.2;
                case "TouchDesigner": return width * 0.8;
                case "Maya": return width * 0.2;
                case "Python": return width * 0.8;
                case "Physical": return width * 0.4;
                case "Mixed": return width * 0.6;
                default: return width / 2;
            }
        }).strength(0.6))
        .force("y", d3.forceY().y(d => {
            switch (d.software) {
                case "Processing": return height * 0.3;
                case "Arduino": return height * 0.7;
                case "TouchDesigner": return height * 0.7;
                case "Maya": return height * 0.3;
                case "Python": return height * 0.3;
                case "Physical": return height * 0.9;
                case "Mixed": return height * 0.9;
                default: return height / 2;
            }
        }).strength(0.6));

    // Tooltip
    const tooltip = d3.select("body").select(".tooltip").empty()
        ? d3.select("body").append("div").attr("class", "tooltip")
        : d3.select("body").select(".tooltip");

    // Calculate min and max dates
    const minDate = d3.min(nodes, d => d.date);
    const maxDate = d3.max(nodes, d => d.date);
    const minTime = minDate.getTime();
    const maxTime = maxDate.getTime();

    // Add slider
    container.append("label").text("Select Date: ");
    const dateLabel = container.append("span").attr("id", "date-label").style("margin-left", "10px");
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
            dateLabel.text(selectedDate.toDateString());
            updateGraph(selectedDate);
        });

    // Initial date label
    dateLabel.text(maxDate.toDateString());

    // Update function
    function updateGraph(selectedDate) {
        const filteredNodes = nodes.filter(d => d.date <= selectedDate);
        const filteredNodeIds = new Set(filteredNodes.map(d => d.id));
        const filteredLinks = links.filter(l => filteredNodeIds.has(l.source.id || l.source) && filteredNodeIds.has(l.target.id || l.target));

        // Update links
        const linkUpdate = svg.selectAll("line")
            .data(filteredLinks, d => `${(d.source.id || d.source)}-${(d.target.id || d.target)}`);

        linkUpdate.enter()
            .append("line")
            .style("stroke", "#ccc")
            .style("stroke-opacity", 0.8)
            .style("stroke-width", 1.5);

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
            .style("fill", d => {
                const softwaresList = ["Processing", "Arduino", "TouchDesigner", "Maya", "Python", "Physical", "Mixed"];
                const softwareIndex = softwaresList.indexOf(d.software);
                return d3.schemeCategory10[softwareIndex >= 0 ? softwareIndex : 0];
            })
            .style("stroke", "#fff")
            .style("stroke-width", 1.5);

        nodeEnter.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(d => d.id)
            .style("font-size", "10px")
            .style("fill", "black");

        nodeUpdate.exit().remove();

        // Add mouse events to all nodes (enter + update)
        nodeUpdate.merge(nodeEnter)
            .on("mouseover", (event, d) => {
                tooltip.style("opacity", 1)
                    .html(`${d.id}<br>Software: ${d.software}${d.details ? `<br>${d.details}` : ""}<br>Date: ${d.date.toDateString()}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
            });

        // Update software labels
        const softwares = Array.from(new Set(filteredNodes.map(d => d.software)));
        const labelUpdate = svg.selectAll("text.label")
            .data(softwares, d => d);

        labelUpdate.enter()
            .append("text")
            .attr("class", "label")
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("fill", "black")
            .style("font-weight", "bold")
            .text(d => d);

        labelUpdate.exit().remove();

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

        // Update software labels at centroids
        svg.selectAll("text.label").each(function (software) {
            const relatedNodes = simulation.nodes().filter(d => d.software === software);
            if (relatedNodes.length > 0) {
                const centroidX = d3.mean(relatedNodes, d => d.x) || width / 2;
                const centroidY = d3.mean(relatedNodes, d => d.y) || height / 2;
                d3.select(this)
                    .attr("x", centroidX)
                    .attr("y", centroidY - 30); // Offset above the cluster
            }
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

    // Initial update
    updateGraph(maxDate);
})();