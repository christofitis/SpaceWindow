class Astroid {
    
    constructor (location) {
        this.location = createVector(location.x, location.y)
        this.direction = createVector(random(canvasW), random(canvasH));
        this.isInWindow = "spawn";
        this.direction = p5.Vector.sub(this.direction, this.location);
        this.speed = random(.01,10);
        this.r = random(1,10);
        this.numBlobs = random(100);
        

        this.body = createGraphics(this.r*2, this.r*2);
        push();
        this.body.noStroke();
        this.body.fill(255*random());
        //this.body.ellipse(this.r, this.r, this.r*2, this.r*2);
        this.body.translate(this.r, this.r);
        for (let i = 0; i < this.numBlobs; i++){
            this.body.fill(255*random());
            let tempr = random();
            this.body.ellipse((this.r/2*random()*random([1, -1])), (this.r/2*random()*random([1, -1])), this.r*tempr/2, this.r*tempr/2);
        }
        
        pop();
    }

    show() {
        
        image(this.body, this.location.x, this.location.y, this.r*2, this.r*2);
        
        
        //ellipse(this.location.x, this.location.y, this.r*2, this.r*2);
    }

    move() {
        this.direction.setMag(this.speed);
        this.location.add(this.direction);
        this.location.add(cameraDirection);

        //is in window
        if (isVisible(this.location, this.r, this.r)){
            this.isInWindow = "visible";
            //astroids.splice(astroids.indexOf(a), 1);
        }
        //is out of window
        if (!isVisible(this.location, this.r, this.r) && this.isInWindow === "visible"){
            //astroids.splice(astroids.indexOf(a), 1);
            this.isInWindow = "not visible";
        }

        //if astroid got too far from screen due to camera movement, set it to not visible
        if (this.location.x > canvasW*2 || this.location.x < -canvasW*2 || this.location.y > canvasH*2 || this.location.y < -canvasH*2){
            console.log("KILLED A STRAY");
            this.isInWindow = "not visible";
        }
    }

    getLocation() {
        return this.location;
    }

    getIsInWindow(){
        return this.isInWindow;
    }

    
}