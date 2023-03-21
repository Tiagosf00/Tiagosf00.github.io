let number_points = 50;
let points = [];
let velocity = [];
var canvas;

// Resize canvas when window is resized
function windowResized() {
    resizeCanvas(windowWidth+1, windowHeight+1);
    canvas.position(-1, -1);
}

function setup() {
    canvas = createCanvas(windowWidth+1, windowHeight+1);
    canvas.position(-1, -1);
    canvas.style('z-index', '-1'); // Set canvas behind other elements
    
    // Initialize random points and velocities
    for (let i = 0; i < number_points; i++) {
        points.push([random(0, width), random(0, height)]);
        velocity.push([random(-1, 1), random(-1, 1)]);
    }
}

function draw() {
    clear(); 
    background(21, 34, 70); // Blue background
    stroke(255);
    
    // Include mouse pointer
    points.push([mouseX, mouseY]);
    
    // Compute voronoin diagram
    delaunay = d3.Delaunay.from(points);
    voronoi = delaunay.voronoi([0, 0, width, height]);
    
    // Show voronoi cells
    noFill();
    for (let polygon of voronoi.cellPolygons()) {
        beginShape();
        for (let point of polygon) {
            vertex(point[0], point[1]);
        }
        endShape();
    }
    
    // Show points
    fill(170);
    for (let i = 0; i < points.length; i++) {
        [x, y] = points[i];
        ellipse(x, y, 5);
    }

    points.pop(); // Remove mouse pointer

    // Update positions and velocities
    for (let i = 0; i < points.length; i++) {
        [x, y] = points[i];
        [vx, vy] = velocity[i];
        x += vx;
        y += vy;

        if ((x < 0 && vx < 0) || (x > width && vx > 0)) {
            vx = -vx;
        }
        if ((y < 0 && vy < 0) || (y > height && vy > 0)) {
            vy = -vy;
        }

        points[i] = [x, y];
        velocity[i] = [vx, vy];
    }

}