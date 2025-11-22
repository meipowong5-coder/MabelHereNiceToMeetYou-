// src/hobby.js — Animated & Interactive D3 Pie Chart for Hobbies (Fully Self-Contained, No HTML Dependencies)

(function() {
    'use strict';  // Enforce strict mode to catch errors early

    // Internal variables (not global to avoid conflicts)
    const drawingImages = [
        'images/twoboys.png',
        'images/twogirls.png',
        'images/night.png',
        'images/newyear.png',
        'images/miku.png'
    ];
    let currentDrawingIndex = 0;

    // Internal functions (self-contained)
    function openDrawingLightbox(index) {
        console.log('openDrawingLightbox called with index:', index);
        currentDrawingIndex = index || 0;
        updateDrawingImage();
        const lightbox = document.getElementById('drawing-lightbox');
        if (lightbox) {
            console.log('Lightbox found, setting display: flex');
            lightbox.style.display = 'flex';
            lightbox.style.flexDirection = 'column';
        } else {
            console.error('Lightbox element not found!');
        }
    }

    function closeDrawingLightbox() {
        console.log('closeDrawingLightbox called');
        const lightbox = document.getElementById('drawing-lightbox');
        if (lightbox) {
            lightbox.style.display = 'none';
        }
    }

    function changeDrawing(direction) {
        console.log('changeDrawing called with direction:', direction);
        currentDrawingIndex = (currentDrawingIndex + direction + drawingImages.length) % drawingImages.length;
        updateDrawingImage();
    }

    function updateDrawingImage() {
        const img = document.getElementById('drawing-img');
        if (img) {
            const src = drawingImages[currentDrawingIndex];
            console.log('Updating image src to:', src);
            img.src = src + '?t=' + new Date().getTime();  // Force reload
        } else {
            console.error('Image element not found!');
        }
    }

    // Expose only necessary functions to window for pie click (no onclick in HTML)
    window.openDrawingLightboxInternal = openDrawingLightbox;  // Renamed to avoid conflict
    window.closeDrawingLightboxInternal = closeDrawingLightbox;
    window.changeDrawingInternal = changeDrawing;

    // Target the vis container
    const container = d3.select("#vis-hobby");
    
    // Create SVG (scaled to fit the large container, centered)
    const svg = container.append("svg")
        .attr("width", 340)
        .attr("height", 340)
        .attr("viewBox", "0 0 340 340")
        .style("display", "block")
        .style("margin", "auto");

    const width = 340;
    const height = 340;
    const radius = Math.min(width, height) / 2 - 10;
    const centerX = width / 2;
    const centerY = height / 2;

    const data = [
        { label: 'Playing Games', value: 30 },
        { label: 'Animation', value: 20 },
        { label: 'Drawing', value: 15 },
        { label: 'DIY', value: 15 },
        { label: 'Dancing', value: 10 },
        { label: 'Writing', value: 10 }
    ];

    // Lighter colors for pie (original pastels for vibrancy)
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.label))
        .range([
            '#FFB3B3',  // Light red-pink for Playing Games
            '#B3D9FF',  // Light blue for Animation
            '#FF99CC',  // Light pink for Drawing
            '#B3FFB3',  // Light green for DIY
            '#FFFFB3',  // Light yellow for Dancing
            '#E0B3FF'   // Light purple for Writing
        ]);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Animation function for arc tween (smooth entry)
    function arcTween(a) {
        const i = d3.interpolate({ startAngle: a.startAngle, endAngle: a.startAngle }, a);
        return function(t) {
            const b = i(t);
            return arc(b);
        };
    }

    const arcs = svg.selectAll("g.arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", `translate(${centerX}, ${centerY})`);

    const paths = arcs.append("path")
        .attr("fill", (d, i) => color(data[i].label))
        .attr("stroke", "antiquewhite")
        .attr("stroke-width", 3)
        .attr("cursor", "pointer")
        .attr("d", d => {
            const smallArc = d3.arc()
                .innerRadius(0)
                .outerRadius(0)
                .startAngle(d.startAngle)
                .endAngle(d.endAngle);
            return smallArc(d);
        })
        .on("mouseover", function(event, d) {
            console.log('Mouseover on slice:', d.data.label);
            d3.select(this)
                .interrupt()
                .transition()
                .duration(200)
                .attr("d", d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius * 1.05)
                    (d));
            showTooltip(event, d.data.label, d.data.value);
        })
        .on("mouseout", function(event, d) {
            console.log('Mouseout from slice:', d.data.label);
            d3.select(this)
                .interrupt()
                .transition()
                .duration(200)
                .attr("d", arc(d));
            hideTooltip();
        })
        .on("click", function(event, d) {
            console.log('Pie slice clicked:', d.data.label);
            if (d.data.label === 'Drawing') {
                console.log('Drawing slice clicked - opening lightbox');
                window.openDrawingLightboxInternal(0);  // Use renamed internal function
            }
        })
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100)
        .attrTween("d", arcTween)
        .on("end", function() {
            animateLabels();
        });

    // Labels
    function animateLabels() {
        const labels = arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(d => d.data.label)
            .style("fill", "#2c3e50")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .style("opacity", 0);

        labels.transition()
            .duration(500)
            .delay(200)
            .style("opacity", 1);
    }

    // Tooltip
    let tooltip = d3.select("body").append("div")
        .attr("class", "pie-tooltip")
        .style("position", "absolute")
        .style("background", "rgba(0,0,0,0.85)")
        .style("color", "white")
        .style("padding", "8px 12px")
        .style("border-radius", "6px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("transition", "opacity 0.2s")
        .style("box-shadow", "0 2px 10px rgba(0,0,0,0.3)");

    function showTooltip(event, label, value) {
        tooltip.html(`<strong>${label}</strong><br>${value}% of hobbies`)
            .style("opacity", 1)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
    }

    function hideTooltip() {
        tooltip.style("opacity", 0);
    }

    // Self-contained event attachment (no reliance on HTML onclick)
    function attachLightboxListeners() {
        const lightbox = document.getElementById('drawing-lightbox');
        const closeBtn = document.querySelector('.drawing-close');
        const prevBtn = document.getElementById('drawing-prev');
        const nextBtn = document.getElementById('drawing-next');

        if (lightbox) {
            console.log('Attaching lightbox click listener');
            // Remove any existing listeners to prevent duplicates
            lightbox.replaceWith(lightbox.cloneNode(true));  // Clone to reset listeners
            const newLightbox = document.querySelector('#drawing-lightbox');
            newLightbox.addEventListener('click', window.closeDrawingLightboxInternal);
        } else {
            console.error('Lightbox not found on attach!');
        }

        if (closeBtn) {
            closeBtn.replaceWith(closeBtn.cloneNode(true));  // Reset
            const newClose = document.querySelector('.drawing-close');
            newClose.addEventListener('click', (e) => { 
                e.stopPropagation(); 
                window.closeDrawingLightboxInternal(); 
            });
        }

        if (prevBtn) {
            prevBtn.replaceWith(prevBtn.cloneNode(true));
            const newPrev = document.getElementById('drawing-prev');
            newPrev.addEventListener('click', (e) => { 
                e.stopPropagation(); 
                window.changeDrawingInternal(-1); 
            });
        }

        if (nextBtn) {
            nextBtn.replaceWith(nextBtn.cloneNode(true));
            const newNext = document.getElementById('drawing-next');
            newNext.addEventListener('click', (e) => { 
                e.stopPropagation(); 
                window.changeDrawingInternal(1); 
            });
        }
    }

    // Attach listeners safely
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachLightboxListeners);
    } else {
        attachLightboxListeners();
    }

    // ESC key handler
    document.addEventListener('keyup', e => {
        if (e.key === 'Escape') window.closeDrawingLightboxInternal();
    });

    console.log('Hobby script loaded - ready to test clicks!');

})();