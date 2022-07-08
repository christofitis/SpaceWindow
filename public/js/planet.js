class Planet {
    constructor(location, radius) {
        this.location = createVector(location.x, location.y);
        this.isInWindow = "spawn";
        this.z = random(.3, .5);
        this.speed = createVector();
        this.speed.set(cameraDirection);
        this.r = radius*this.z*random();

       

        this.color = {
            r: 255*random()*this.z,
            g: 255*random()*this.z,
            b: 255*random()*this.z,
        };

        this.rot = TWO_PI*random();
        
   
        this.img = loadImage('images/planets/' + floor(random(1, 151)) + '.png');
     
        
    }

    

    show() {
        //noStroke();
        
        
        //fill(255);
        //ellipse(this.location.x+this.r, this.location.y+this.r, this.r*2, this.r*2);
     
        //this.img.mask(this.circleMask);
      push();
        translate(this.location.x, this.location.y)
        rotate(this.rot);
        imageMode(CENTER);
        image(this.img, 0, 0, this.r*2, this.r*2)
       pop();
       ellipseMode(CENTER);
       fill(0,0,0,map(this.z, .3, .5, 255, 0));
       ellipse(this.location.x, this.location.y, this.r*2, this.r*2);
       
        //this.rot += .01;
        //fill(this.color.r, this.color.g, this.color.b, 99);
        


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
        if (this.location.x > canvasW*2*this.r || this.location.x < -canvasW*2*this.r || this.location.y > canvasH*2*this.r || this.location.y < -canvasH*2*this.r){
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
