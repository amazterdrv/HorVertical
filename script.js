var canvas,canvas2;
var ctx;
var dx = 12;
var dy = 22;
var x = 0;
var y = 0;
var frameRate = 60;
var bgrimg;
var i=0;
var m=0;
var upperpipes = [];
var lowerpipes = [];
var bird;
var endi = 0;
var canvasContext;
var RedX = 80;
var RedY = 50;
var speedX = 10;
var speedY = 5;
var speedY2 = 6;
var paddle2Y;
var gamefinished=0;
var newX,newY,oldX=0,oldY=0;

function circle(x,y,r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.fill();
}


function rect(x,y,w,h) {
    ctx.beginPath();
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}


function onLoad(){
  console.log("Fuck off");
}


var Bird = function() {
    this.spritex = 200;
    this.spritey = 120;
    this.spritewidth = 40;
    this.spriteheight = 22;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    this.draw = function(x,y,width,height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        ctx.drawImage(bgrimg,this.spritex,this.spritey,this.spritewidth,this.spriteheight,x,y,width,height);
    }


    this.collision = function(x, y, width, height)
    {
        if (this.x >= x && this.x <= x + width) {
            if (this.y >= y && this.y <= y + height) {
                endi = 1000;
                return true;
            }
        }
        return false;
    }
}

var UpperPipe = function(ran)
{
    this.sprite1x = 301;
    this.sprite1y = 0;
    this.sprite1w = 27;
    this.sprite1h = 135;
    this.ran = ran;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    this.draw = function(x1,y1,w1,h1) {
        this.x = x1;
        this.y = y1;
        this.width = w1;
        this.height = h1;
        ctx.drawImage(bgrimg, this.sprite1x, this.sprite1y, this.sprite1w, this.sprite1h,x1, y1, w1, h1);
        }

}

var LowerPipe = function(ran)
{
    this.sprite2x = 330;
    this.sprite2y = 0;
    this.sprite2w = 27;
    this.sprite2h = 135;
    this.ran = ran;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    this.draw = function(x2,y2,w2,h2) {
        this.x = x2;
        this.y = y2;
        this.width = w2;
        this.height = h2;
        ctx.drawImage(bgrimg, this.sprite2x, this.sprite2y, this.sprite2w, this.sprite2h,x2,y2,w2,h2);
    }

}


function init() {
    canvas = document.getElementById("myCanvas");
    canvas2 = document.getElementById('canvasView');
    canvasContext = canvas2.getContext('2d');
    canvas.width = window.innerWidth/2.1;
    canvas.height = window.innerHeight/1.25;
    canvas2.width = window.innerWidth/2.1;
    canvas2.height = window.innerHeight/1.25;
    ctx = canvas.getContext("2d");
    bgrimg = new Image();
    bgrimg.onload = onLoad;
    bgrimg.src = "flappysprite.png";
    paddle2Y = canvas2.height/2;
          canvas2.addEventListener("mousemove",function(e)
          {
            //var rect = canvas.getBoundingClientRect();
            //var root = document.documentElement
            newX = e.clientX ;//- rect.left-root.scrollLeft;
            newY = e.clientY ;//- rect.top-root.scrollRight;
          });

    for(var f=0;f<=100;f++)
    {
        var ran = Math.random()*150;
        upperpipes.push(new UpperPipe(ran));
        lowerpipes.push(new LowerPipe(ran));
    }
    bird = new Bird();
}

function Ai()
    {
        if(RedY>paddle2Y) paddle2Y = paddle2Y +speedY2;
        else paddle2Y = paddle2Y - speedY2;
    }

    function collision()
    {
        if(RedX==20&&RedY>=newY-25&&RedY<=newY+25)
        {
            speedY = 0.25*(RedY-newY);
        }
    }

function doKeyDown(evt){
    switch (evt.keyCode) {
        case 38:  /* Up arrow was pressed */
                y -= dy;

            break;
        case 40:  /* Down arrow was pressed */


            break;
        case 37:  /* Left arrow was pressed */

                x -= dx;

            break;
        case 39:  /* Right arrow was pressed */

                x += dx;

            break;
    }
}
var bl = false;


 function draw() {
    clear();
    ctx.save();
    ctx.translate(m,0);
    ctx.restore();
    ctx.drawImage(bgrimg,0,0,120,250,0,0,canvas.width,canvas.height);
     if(bl === false)
     {
         bird.draw(100,i+y+endi,40,40);
         for(var f = 0;f<=100;f++) {
             upperpipes[f].draw(canvas.width+m+f*200,0,80,upperpipes[f].ran+canvas.height/2.25);
             lowerpipes[f].draw(canvas.width+m+f*200,3*canvas.height/5+lowerpipes[f].ran,80,canvas.height/2);
             bl = bird.collision(upperpipes[f].x,upperpipes[f].y,upperpipes[f].width,upperpipes[f].height);
             if(bl === false)
             {bl = bird.collision(lowerpipes[f].x,lowerpipes[f].y,lowerpipes[f].width,lowerpipes[f].height);}
             if(bl === true)
             {

                 break;
             }
         }
         ctx.fillText("Score: "+i,10,40);
         ctx.stroke();
     }
     else
     {
         ctx.font="40px Arial";
        ctx.fillText("GAME OVER",canvas.width/2 - 100,150,200);
        ctx.stroke();
         ctx.font="30px Typewriter ";
        ctx.fillText("Score:  "+i,canvas.width/2 - 50,250,100);
        ctx.stroke();
     }


    //ctx.fillStyle = "white";
    //ctx.strokeStyle = "black";
    //rect(0,0,x,y);
    //ctx.fillStyle = "purple";
    //circle(x, y, 10);
    RedX = RedX+speedX;
          RedY = RedY+speedY;

          //if(gamefinished==1)
          //{
            //  canvasContext.fillStyle = "Black";
              //canvasContext.fillRect(0,0,canvas.width,canvas.height);
              //return;
           //}
          //SpeedX
          if(RedX>canvas2.width) speedX=-speedX;
          if(RedX<=20) speedX=-speedX;

          //SpeedY
          if(RedY>canvas2.height) {speedY=-speedY;}
          if(RedY<0) {speedY=-speedY;}

          //Background
          canvasContext.fillStyle = "Black";
          canvasContext.fillRect(0,0,canvas.width,canvas.height);

          //UserPaddle
          canvasContext.fillStyle = "White";
          canvasContext.fillRect(0,newY-25,20,50);

          //AIPaddle
          Ai();
          canvasContext.fillStyle = "White";
          canvasContext.fillRect(canvas.width-20,paddle2Y,20,50);

          //Ball
          collision();
          canvasContext.fillStyle = "Red";
          canvasContext.beginPath();
          canvasContext.arc(RedX,RedY,10,0,Math.PI*2,true);
          canvasContext.fill();

}



function update()
{
    if(bl === false)
    {i+=2;
    m-=3;}
}

init();
window.addEventListener('keydown',doKeyDown,true);
setInterval(function(){
    draw();
    update();
}, 1000/frameRate);
