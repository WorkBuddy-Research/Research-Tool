//Hoi tom

// const timestamp = Date.now();

// OOCSI.connect('my_unique_handle', 'oocsi.id.tue.nl');

var mic;
var interruption = false;
var sound = false;
var showbuttons = false;
var duration = 0;
var time;
var lasttime = 0;
var lasttime2 = 0;
var lasttime3 = 0;
var sensortimer;
var noisetimer;
var soundtimer = 0;
var pausetimer = 0;
var timestamp;
var start = false;
var database;
var notification = false;
let sound1;               // sound for notification when interruption longer than....
var i = 0;
var amount = 0;            // counting amount of interruptions

var q = 0;
var w = 0;
var e = 0;

var clicked = false;

function setup() {
  createCanvas(500,500);
 
  mic = new p5.AudioIn();
  mic.start(); 
  sound1 = loadSound('juntos.mp3');
  
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA5KycXBQ13fCgPVhyaTRekDIpQtUp64f0",
    authDomain: "research-tool-197cc.firebaseapp.com",
    databaseURL: "https://research-tool-197cc.firebaseio.com",
    projectId: "research-tool-197cc",
    storageBucket: "research-tool-197cc.appspot.com",
    messagingSenderId: "20179227319",
    appId: "1:20179227319:web:b9aa07fe6f448f178e3332"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  database = firebase.database();
  
  
//   var data = {
//     name: "participant 1",
//     score: 5
//   }
  
//   ref.push(data);

}

function draw() {
      
  var d = day();
  var m = month();
  var y = year();
  var hi = hour();
  var mi = minute();
  var se = second();
  
  timestamp = (d +'.'+ m + '.' + y + '--' + hi + ':' + mi + ';' + se);
  
  
  var ref = database.ref('participant 1');
  
  mouseClicked = function(){
    clicked = true;
  }
  
  background(0);
  
  time = millis();            // starting timer      
  
  var vol = mic.getLevel();

 
  if (vol > 0.02) {
    start = true;
    ellipse(250,250,50,50);
  }else{
    start = false;
  }
  
 if ((time - lasttime3)>100){
    lasttime3 = time;
    if (start == true){
      soundtimer ++;
      pausetimer = 0;
    }else{
      pausetimer ++;
   }
 }
  
  if (pausetimer > 20){
    soundtimer = 0;
    pausetimer = 0;
  }
  
  if (soundtimer > 0){
    sound = true;
  }else{
    sound = false;
  }
  
  if (sound == true){
    ellipse(250,250,100,100);
  }
    
  if ((time - lasttime)>100){
    lasttime = time; 
    if (sound == true){
      noisetimer ++;
    }else{
      noisetimer = 0;
    }
  }
  
  if (noisetimer > 50){
    interruption = true;
  }else{
    interruption = false;
  }
  
  if (interruption == true){
    fill(255,255,255);
    ellipse(250,250,200,200);
  } 
  
  if ((time - lasttime2)>100){
    lasttime2 = time; 
    if (interruption == true){
      sensortimer ++;
    }else{
      sensortimer = 0;
    }
  }
    
  if (sensortimer > 20){
    fill(0,255,0);
    ellipse(100,100,100,100);
    duration = sensortimer; 
    notification =  true;
    showbuttons = true;
    // window.alert("try");
  }else{
    notification = false;
  }
  
  if (showbuttons == true){
    fill(255,255,255);
    rect(50,200,140,50);
    rect(50,300,140,50);
    rect(50,400,140,50);
    fill(20,20,20);
    text("Ignore interruption", 70,230);
    text("Take a Break", 85,330);
    text("There was no interruption", 60,430);
  }

  if (showbuttons == true && clicked == true && mouseX>50 && mouseX<190 && mouseY>200 && mouseY<250){
    q ++;
    showbuttons = false;
    clicked = false;
    var data2 = {
      time: timestamp,
      notification: notification,
      duration: duration,
      ignore: q,
      interruptionnumber: amount
    }
    ref.push(data2);
  }
  
  if (showbuttons == true && clicked == true && mouseX>50 && mouseX<190 && mouseY>300 && mouseY<350){
    w ++;
    showbuttons = false;
     var data3 = {
      time: timestamp,
      notification: notification,
      duration: duration,
      accept: w,
      interruptionnumber: amount
    }
    ref.push(data3)
    clicked = false;
  }
  
  if (showbuttons == true && clicked == true && mouseX>50 && mouseX<190 && mouseY>400 && mouseY<450){
    e ++;
    showbuttons = false;
     var data4 = {
      time: timestamp,
      notification: notification,
      duration: duration,
      error: e,
      interruptionnumber: amount
    }
    ref.push(data4)
    clicked = false;
  }
  
  // sensortimer=6;
    
  if (notification == true){
    if (i<1){
      sound1.play();
      i ++;
      amount ++;
    //   var data5 = {
    //   time: timestamp,
    //   amount: amount
    //   }
    // ref.push(data5);
    }
  }else{
    i = 0;
  }

  console.log(q,w,e, duration);
  
}