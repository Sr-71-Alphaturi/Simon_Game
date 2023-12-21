var array = ["red","yellow","blue","green"];
var level = 0;
var gamePattern=[];
var userpattern=[];
var game=1;
$(".btn").click(function(e)
{
  var x = e.target.id;
  $("#"+x).addClass("pressed");
  userpattern.push(x);
  playSound(x);
  setTimeout(function()
{
  $("#"+x).removeClass("pressed");
},100);
    checkSeq(userpattern.length);
});
function playSound(x)
{
  var t = new Audio("./sounds/"+x+".mp3");
  t.play();
}
function getColor()
{
  var x = Math.floor(Math.random()*3 + 1);
  return array[x];
}

function checkSeq(t)
{
  var isEqual=true;
  for(var i=0;i<t;i++)
  {
    if(gamePattern[i] !== userpattern[i])
    {
      isEqual=false;break;
    }
  }
  if(isEqual && (t===level))
  {

    $("#level-title").text("Level: "+ (++level));
    setTimeout(originalSequence,1000)
  }
  else if(isEqual === false || t>level) {
    game=1;
    $("body").addClass("game-over");
    setTimeout(endGame,200);
  }
}

function endGame()
{
  $("body").removeClass("game-over");
  $("#level-title").text("Game over. To restart press a key.");
}

$(document).keypress(function()
{
  if(game===1)
  {
    level=1;
    game=0
    gamePattern=[];
    $("#level-title").text("Level: "+ level);
    setTimeout(originalSequence,1000);
  }
});
function originalSequence()
{
  userpattern=[];
  var rancol=getColor();
  gamePattern.push(rancol);
  playSound(rancol);
  $("#"+rancol).fadeOut(150).fadeIn(150);
}
