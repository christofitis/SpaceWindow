class Planet {
    constructor(location, radius) {
        this.location = createVector(location.x, location.y);
        this.isInWindow = "spawn";
        this.z = random(.3, .5);
        this.speed = createVector();
        this.speed.set(cameraDirection);
        this.r = radius*this.z*random();
        this.color = map(this.z, .3, .5, 10, 255);
    }

    show() {
        noStroke();
        fill(0, 0, this.color);
        ellipse(this.location.x, this.location.y, this.r*2, this.r*2);

    }

    move() {
        
        this.speed.set(cameraDirection);
        let mag = this.speed.mag();
        this.speed.setMag(mag*this.z)
        this.location.add(this.speed);

        //is in window
        if (isVisible(this.location, this.r, this.r)){
            this.isInWindow = "visible";
           
        }
        //is out of window
        if (!isVisible(this.location, this.r, this.r) && this.isInWindow === "visible"){
          
            this.isInWindow = "not visible";
        }

        //if astroid got too far from screen due to camera movement, set it to not visible
        if (this.location.x > canvasW*2 || this.location.x < -canvasW*2 || this.location.y > canvasH*2 || this.location.y < -canvasH*2){
            console.log("KILLED A STRAY PLANET");
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