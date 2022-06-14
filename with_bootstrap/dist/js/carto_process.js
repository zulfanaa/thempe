function allowDrop(event) {
  event.preventDefault();
}
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}
function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.currentTarget.appendChild(document.getElementById(data));
}

var answer1 = {
  'size':['dropBox1', 'dropBox3', 'dropBox4'],
  'colval':['dropBox1', 'dropBox3', 'dropBox4'],
  'orientation':['dropBox1', 'dropBox2'],
  'texture':['dropBox1', 'dropBox2'],
  'colhue':['dropBox1', 'dropBox2'],
  'position':['dropBox1', 'dropBox2', 'dropBox3', 'dropBox4'],
  'shape':['dropBox2'],
}
function check(){
  var correctAnswer = 0;
  var elements = document.getElementsByClassName("visvar1");
  for (var i = 0; i < elements.length; i++){
    var myElem = elements[i];
    if(answer1[myElem.id].includes(myElem.parentElement.id)){
        correctAnswer++;
    }
  }
  var score = document.getElementById('checkAnswer');
    
  score.textContent ='You got ' + correctAnswer + ' questions out of ' +
               elements.length + ' right!!!';
}

var answer2 = {
  'vis_size':['dropBox6'],
  'vis_hue':['dropBox5'],
  'vis_value':['dropBox7'],
  'vis_position':['dropBox8']
}
function checkRight(){
  var rightAnswer = 0;
  var elements = document.getElementsByClassName("visvar2");
  for (var i = 0; i < elements.length; i++){
    var myElem = elements[i];
    if(answer2[myElem.id].includes(myElem.parentElement.id)){
        rightAnswer++;
    }
  }
  var score = document.getElementById('checkRight');
    
  score.textContent ='You got ' + rightAnswer + ' questions out of ' +
               elements.length + ' right!!!';
}