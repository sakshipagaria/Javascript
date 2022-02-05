let gameState ='start';
let paddle1=document.querySelector('.paddle1');
let paddle2=document.querySelector('.paddle2');
let board=document.querySelector('.board');
let initial_ball=document.querySelector('.ball');
let ball=document.querySelector('.ball');
let score1=document.querySelector('.player1_score');
let score2=document.querySelector('.player2_score');
let message=document.querySelector('.message');
let paddle1_coord=paddle1.getBoundingClientRect();
let paddle2_coord=paddle2.getBoundingClientRect();
let initial_ball_coord=ball.getBoundingClientRect();
let ball_coord=initial_ball_coord;
let board_coord=board.getBoundingClientRect();
let paddle_common=document.querySelector('.paddle').getBoundingClientRect();

let dx=Math.floor(Math.random()*4)+3;
let dy=Math.floor(Math.random()*4)+3;
let dxd=Math.floor(Math.random()*2);
let dyd=Math.floor(Math.random()*2);

document.addEventListener('keydown',(e) =>{
    if(e.key=='Enter'){
        gameState=gameState=='start'? 'play':'start';
        if(gameState=='play'){
            message.innerHTML='Game Started';
            message.style.left=42 +'vw';
            requestAnimationFrame(() =>{
                dx=Math.floor(Math.random()*4)+3;
               dy=Math.floor(Math.random()*4)+3;
               dxd=Math.floor(Math.random()*2);
               dyd=Math.floor(Math.random()*2);
            });
        }
    }
    if(gameState=='play'){
        if(e.key=='w'){
            paddle1.style.top= Math.max(board_coord.top,paddle1_coord.top-window.innerHeight*0.06)+'px';
            paddle1_coord=paddle1.getBoundingClientRect();
        }
        if (e.key=='s'){
            paddle1.style.top= Math.min(board_coord.bottom- paddle_common.height,paddle1_coord.top+window.innerHeight*0.06)+'px';
            paddle1_coord=paddle1.getBoundingClientRect();
        }     
        if(e.key=='ArrowUp'){
            paddle2.style.top=Math.max(board_coord.top,paddle2_coord.top-window.innerHeight*0.1)+'px';
            paddle2_coord=paddle2.getBoundingClientRect();
        }
        if (e.key=='ArrowDown'){
            paddle2.style.top= Math.min(board_coord.bottom- paddle_common.height,paddle2_coord.top+window.innerHeight*0.1)+'px';
            paddle2_coord=paddle2.getBoundingClientRect();
    }
  }
});

function moveBall(dx,dy,dxd,dyd){
  if(ball_coord.top <= board_coord.top){
      dyd=1;
  }
  if(ball_coord.bottom<=board_coord.bottom){
      dyd=0;
  }
  if(ball_coord.left<=paddle1_coord.right && 
    ball_coord.top>=paddle1_coord.top &&
    ball_coord.bottom<=paddle1_coord.bottom)
    {
        dxd=1;
        dx=Math.floor(Math.random()*4)+3;
        dy=Math.floor(Math.random()*4)+3;
    }
    if(ball_coord.right>=paddle2_coord.left &&
        ball_coord.top>=paddle2_coord.top &&
        ball_coord.bottom<=paddle2_coord.bottom)
    {
        dxd=0;
        dx=Math.floor(Math.random()*4)+3;
        dy=Math.floor(Math.random()*4)+3;
    }
    if(ball_coord.left<=board_coord.left ||
        ball_coord.right>=board_coord.right)
        {
            if (ball_coord.left<=board_coord.left){
                score2.innerHTML= +score2.innerHTML+1;
            }
            else{
                score1.innerHTML= +score1.innerHTML+1;
            }
            gameState='start';
            ball_coord=initial_ball_coord;
            ball.style=initial_ball.style;
            message.innerHTML='Press Enter to start the game';
            message.style.left=38+'vw';
            return;
        }
    ball.style.top=ball_coord.top+dy*(dyd==0 ?-1:1)+'px';
    ball.style.left=ball_coord.left+dx*(dxd==0 ?-1:1)+'px';
    ball_coord=ball.getBoundingClientRect();
    requestAnimationFrame(()=>{
        moveBall(dx,dy,dxd,dyd);
    });
}