// src/hobby.js — FINAL PERFECT VERSION (with hover tooltip!)
(function() {
    'use strict';

    const drawingImages = [
        'images/twogirls.png',
        'images/night.png',
        'images/newyear.png',
        'images/miku.png',
        'images/twoboys.png'
    ];
    let currentDrawingIndex = 0;

    function openDrawingLightbox(index = 0) {
        currentDrawingIndex = index;
        document.getElementById('drawing-img').src = drawingImages[currentDrawingIndex];
        document.getElementById('drawing-lightbox').style.display = 'flex';
    }

    function closeDrawingLightbox() {
        document.getElementById('drawing-lightbox').style.display = 'none';
    }

    function changeDrawing(dir) {
        currentDrawingIndex = (currentDrawingIndex + dir + drawingImages.length) % drawingImages.length;
        document.getElementById('drawing-img').src = drawingImages[currentDrawingIndex];
    }

    window.openDrawingLightboxInternal = openDrawingLightbox;
    window.closeDrawingLightboxInternal = closeDrawingLightbox;
    window.changeDrawingInternal = changeDrawing;

    const container = d3.select("#vis-hobby");

    // Responsive size
    const size = Math.min(window.innerWidth * 0.35, 460);
    const radius = size / 2 - 25;

    const svg = container.append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${size} ${size}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("display", "block")
        .style("margin", "0 auto")
        .style("max-width", "460px");

    const g = svg.append("g")
        .attr("transform", `translate(${size/2}, ${size/2})`);

    const data = [
        { label: 'Playing Games', value: 30 },
        { label: 'Animation',     value: 20 },
        { label: 'Drawing',       value: 15 },
        { label: 'DIY',           value: 15 },
        { label: 'Dancing',       value: 10 },
        { label: 'Writing',       value: 10 }
    ];

    const color = d3.scaleOrdinal()
        .range(['#FFB3B3', '#B3D9FF', '#FF99CC', '#B3FFB3', '#FFFFB3', '#E0B3FF']);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = g.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    // Pie slices
    arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.label))
        .attr("stroke", "antiquewhite")
        .attr("stroke-width", 3)
        .style("cursor", "pointer")
        .on("mouseover", function(event, d) {
            // Grow slice
            d3.select(this).transition().duration(200)
                .attr("d", d3.arc().innerRadius(0).outerRadius(radius * 1.08)(d));
            // Show tooltip
            showTooltip(event, d.data.label, d.data.value);
        })
        .on("mousemove", function(event) {
            tooltip.style("left", (event.pageX + 15) + "px")
                   .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", function() {
            d3.select(this).transition().duration(200).attr("d", arc);
            tooltip.style("opacity", 0);
        })
        .on("click", function(event, d) {
            if (d.data.label === 'Drawing') {
                openDrawingLightbox(0);
            }
        });

    // LABELS — Clean & visible
    arcs.append("text")
        .attr("transform", d => {
            const [x, y] = arc.centroid(d);
            const offset = radius * 0.7;
            return `translate(${x * 1.18}, ${y * 1.18})`;
        })
        .attr("dy", "0.35em")
        .style("text-anchor", "middle")
        .style("font-size", "8px")
        .style("font-weight", "5px")
        .style("fill", "#1a1a2e")
        .style("pointer-events", "none")
        .text(d => d.data.label);

    // Percentage inside
    arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "1.4em")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "#1a1a2e")
        .style("font-weight", "bold")
        .style("pointer-events", "none")

    // TOOLTIP — Beautiful hover info
    const tooltip = d3.select("body").append("div")
        .attr("class", "hobby-tooltip")
        .style("position", "absolute")
        .style("background", "rgba(0,0,0,0.9)")
        .style("color", "white")
        .style("padding", "10px 16px")
        .style("border-radius", "12px")
        .style("font", "bold 16px Tahoma")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("transition", "opacity 0.2s")
        .style("box-shadow", "0 8px 25px rgba(0,0,0,0.5)")
        .style("z-index", "1000");

    function showTooltip(event, label, value) {
        tooltip.html(`<strong>${label}</strong><br>${value}% of my hobby time`)
               .style("opacity", 1);
    }

    // Lightbox controls
    const lightbox = document.getElementById('drawing-lightbox');
    if (lightbox) {
        lightbox.onclick = closeDrawingLightbox;
        document.querySelector('.drawing-close').onclick = e => { e.stopPropagation(); closeDrawingLightbox(); };
        document.getElementById('drawing-prev').onclick = e => { e.stopPropagation(); changeDrawing(-1); };
        document.getElementById('drawing-next').onclick = e => { e.stopPropagation(); changeDrawing(1); };
        document.addEventListener('keyup', e => { if (e.key === 'Escape') closeDrawingLightbox(); });
    }
})();