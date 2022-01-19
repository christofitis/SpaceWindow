class Star {
    constructor (location) {
        this.location = createVector(location.x, location.y)
        this.z = random(.3, .31);
        this.r = random(3);
        this.isInWindow = "spawn";
        this.speed = createVector();
        this.speed.set(cameraDirection);
        this.twinkle = false;
        this.color = createVector(255, 255, 255);
        this.fade = floor(random(100,256));
        
        if (random(100) < 1){
            this.color = createVector(random()*255, random()*255, random()*255);
            
        }
        else {
            this.color.set(this.fade, this.fade, this.fade);
        }
        if (random(100) < .1){
            this.twinkle = true;
        }

    }

    show() {
        if (this.twinkle){
            stroke(random()*255, random()*255, random()*255);
            strokeWeight(random());
            //strokeWeight(100);
            
        }
        else {
            noStroke();
        }
        fill(this.color.x, this.color.y, this.color.z);
        
        //this.speed.setMag(this.z*3);
        //this.location.add(this.speed);
        this.speed.set(cameraDirection);
        let mag = this.speed.mag();
        this.speed.setMag(mag*this.z)
        this.location.add(this.speed);

        ellipse(this.location.x, this.location.y, this.r*2, this.r*2);

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
    }

    getIsInWindow(){
        return this.isInWindow;
    }
}