let canvasW = 500;
let canvasH = 500;

let numOfStars = 500;
let stars = []

let maxNumAstroids = 5;
let astroids = []
let astroidSpawnRate = 1;

let maxNumPlanets = 5;
let planets = [];
let planetSpawnRate = 90;

let cameraLocation;
let cameraDirection;
let cameraSpeed = 1;

let spawnQuadrants = []


function setup() {
    
    canvasW = windowWidth;
    canvasH = windowHeight;
    createCanvas(canvasW, canvasH);
    cameraLocation = createVector(0,0);
    cameraDirection = createVector(cameraSpeed, 0);
    //initialize stars
    //randomSeed(1);
    for (let i = 0; i < numOfStars; i++) {
        let s = new Star(createVector(random(canvasW), random(canvasH)));
        stars.push(s);
    }
    setSpawnQuadrants();
}

function draw() {
    background(0);

    cameraLocation.add(cameraDirection);
    
    //draw stars
    for (let star of stars) {
        star.show();
        
        if (star.getIsInWindow() == "not visible"){
            let loc = getVectorOutsideWindow(random(spawnQuadrants), 10);
            let s = new Star(createVector(loc.x, loc.y));
            stars.splice(stars.indexOf(star), 1, s);
            //choose which quadrant to add stars too 0 = top (up) 2 = left 
            
            //stars.push(s);
        }
    }

    //console.log(astroids);
    //create astroid
    if (random(100) < astroidSpawnRate && astroids.length < maxNumAstroids) {
        let astroid = new Astroid(getVectorOutsideWindow(floor(random(4)), 20));
        astroids.push(astroid);
    }

    //draw astroids
    for (let a of astroids) {
        a.show();
        a.move();
        //remove astroid if out of canvas
        if (a.getIsInWindow() === "not visible"){
            astroids.splice(astroids.indexOf(a), 1);
        }
    }

    //create planet
    if (random(100) < planetSpawnRate && planets.length < maxNumPlanets) {
        let planet = new Planet(getVectorOutsideWindow(random(spawnQuadrants), 300), 300);
        planets.push(planet);
        planets.sort((a, b) => (a.z > b.z) ? 1 : -1);
        
    }

    //draw planet
    for (let p of planets) {
        p.move();
        p.show();
        //remove astroid if out of canvas
        if (p.getIsInWindow() === "not visible"){
            planets.splice(planets.indexOf(p), 1);
        }
    }


    
}


function isVisible(point, xOffset, yOffset) {
    if (point.x > 0-xOffset && point.x < canvasW+xOffset && point.y < canvasH+yOffset && point.y > 0-yOffset){
        return true;
    }
    else if (point.x < 0-xOffset || point.x > canvasW+xOffset || point.y > canvasH+yOffset || point.y < 0-yOffset) {
        return false;
    }
}

function getVectorOutsideWindow(quadrant, offset){
    let location = createVector(0, 0);
    //console.log(quadrant);
    switch (quadrant){
        case 0:
            //up
            location.set(random(0, canvasW+offset), random(-offset, -offset-(offset*2)));
            break;
        case 1:
            //down
            location.set(random(0, canvasW), random(canvasH+offset, canvasH+(offset*2)));
            break;
        case 2:
            //left
            location.set(random(-offset, -offset-(offset*2)), random(0, canvasH));
            break;
        case 3:
            //right
            location.set(random(canvasW+offset, canvasW+(offset*2)), random(0, canvasH));
            break;
    }
    return location;
}

function setSpawnQuadrants() {
    spawnQuadrants = [];
    if (cameraDirection.x > 0) {
        spawnQuadrants.push(2);
    }
    if (cameraDirection.x < 0) {
        spawnQuadrants.push(3);
    }
    if (cameraDirection.y > 0) {
        spawnQuadrants.push(0);
    }
    if (cameraDirection.y < 0) {
        spawnQuadrants.push(1);
    }

}


function mousePressed() {
    cameraSpeed += .5;
    cameraDirection.set(cameraSpeed, -1);
    console.log(`Current speed: ${cameraSpeed}`);
    setSpawnQuadrants();
}