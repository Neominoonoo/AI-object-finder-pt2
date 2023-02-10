objects = [];
status = "";
function preload(){

}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status = detecting objects";
    object_name = document.getElementById("text-input").value;
}
function modelLoaded(){
    console.log("Model has loaded");
    status = true;
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
    objectText = document.getElementById("text-input");
    if(objects == objectText){
        document.getElementById("ifTextInputCor").innerHTML = "Found object is the same!"
    }
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i=0; i <objects.length; i++){
            document.getElementById("status").innerHTML = "objects detecting";
            document.getElementById("objects-found").innerHTML = "objects found = "+objects[i].length;

            fill("#110011");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label +" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke("#110011");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}
