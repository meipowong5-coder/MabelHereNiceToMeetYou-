// src/hobby.js — FINAL PERFECT VERSION (labels 100% visible!)
(function() {
    'use strict';

    const drawingImages = [
        'images/twoboys.png',
        'images/twogirls.png',
        'images/night.png',
        'images/newyear.png',
        'images/miku.png'
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

    // Responsive size — max ~460px
    const size = Math.min(window.innerWidth * 0.35, 460);
    const radius = size / 2 - 10;

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
        .on("mouseover", function() {
            d3.select(this).transition().duration(200)
                .attr("d", d3.arc().innerRadius(0).outerRadius(radius * 1.08));
        })
        .on("mouseout", function() {
            d3.select(this).transition().duration(200).attr("d", arc);
        })
        .on("click", function(event, d) {
            if (d.data.label === 'Drawing') {
                openDrawingLightbox(0);
            }
        });

    // LABELS — NOW 100% VISIBLE
    arcs.append("text")
        .attr("transform", d => {
            const [x, y] = arc.centroid(d);
            // Move label slightly outward for better readability
            const angle = (d.startAngle + d.endAngle) / 2;
            const offset = radius * 0.7;
            return `translate(${x * 1.2}, ${y * 1.2})`;
        })
        .attr("dy", "0.35em")
        .style("text-anchor", "middle")
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .style("fill", "#39395aff")           // DARK NAVY — perfect contrast on all pastel
        .style("pointer-events", "none")
        .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.3)")
        .text(d => d.data.label);

    // Optional: show percentage inside (smaller)
    arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "1.em")
        .style("text-anchor", "middle")
        .style("font-size", "8px")
        .style("fill", "#1a1a2e")
        .style("font-weight", "bold")
        .style("pointer-events", "none");

    // Lightbox
    const lightbox = document.getElementById('drawing-lightbox');
    if (lightbox) {
        lightbox.onclick = closeDrawingLightbox;
        document.querySelector('.drawing-close').onclick = e => { e.stopPropagation(); closeDrawingLightbox(); };
        document.getElementById('drawing-prev').onclick = e => { e.stopPropagation(); changeDrawing(-1); };
        document.getElementById('drawing-next').onclick = e => { e.stopPropagation(); changeDrawing(1); };
        document.addEventListener('keyup', e => { if (e.key === 'Escape') closeDrawingLightbox(); });
    }
})();