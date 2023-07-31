img="";
status="";
object=[];

function preload(){
    img=loadImage("bottle.jpg");
}

function setup(){
    canvas=createCanvas(450,325);
    canvas.center();
    object_detector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status= Detecting Objects";
}

function modelLoaded(){
    console.log("Model is loaded");
    status=true;
}

function gotResult(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        object=result;
    }
}

function draw(){
    image(img,0,0,450,325);
    if(status!=""){
        object_detector.detect(img,gotResult);
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status= object detected";
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%", object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}