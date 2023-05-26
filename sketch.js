let points = [[0,0],[0,6],[-1,6],[-1,7],[-3,7],[-3,6],[-4,6],[-4,5],[-5,5],[-5,3],[-3,3],[-3,-7],[-2,-7],[-2,-4],[-2,-7],[0,-7],[0,-4],[1,-4],[1,-7],[3,-7],[3,-4],[4,-4],[4,-7],[6,-7],[6,-4],[7,-4],[7,-5],[9,-5],[9,-6],[11,-6],[11,-5],[10,-5],[10,-4],[9,-4],[9,-3],[8,-3],[8,-2],[7,-2],[7,-1],[6,-1],[6,0],[5,0],[5,1]]//list資料
var stroke_colors = "cad2c5-84a98c-52796f-354f52-2f3e46".split("-").map(a=>"#"+a)
var fill_colors = "22577a-38a3a5-57cc99-80ed99-c7f9cc".split("-").map(a=>"#"+a)
var bullet_colors = "264653-2a9d8f-e9c46a-f4a261-e76f51".split("-").map(a=>"#"+a)

function preload(){ //最早執行的程式碼
  dino_sound = loadSound("sound/dino.mp3")
  biu_sound = loadSound("sound/biu.mp3")
  mon_sound = loadSound("sound/mon.mp3")
  bg_sound = loadSound("sound/bg.mp3")
}

var ball //恐龍物件，代表單一個物件，利用這個物件來做正在處理的物件
var balls =[] //陣列，放所有的物件資料，物件倉庫，裡面儲存所有物件資料
var bullet//飛彈物件
var bullets =[]
var monster//怪物物件
var monsters =[]
var score = 0
var shipP//設定砲台的位置

function setup() { //設定恐龍倉庫內的資料
  createCanvas(windowWidth, windowHeight);
  bg_sound.play()
  shipP = createVector(width/2,height/2)//預設砲台位置為視窗中間（使用向量座標）
  //產生幾個物件
  for(var j=0;j<10;j=j+1){
    ball = new obj({}) //產生一個新的物件，暫時放入到ball變數中
    balls.push(ball) //把ball物件放入到balls物件群(陣列)中
  }
  for(var j=0;j<20;j=j+1)
  {
      monster = new Monster({})
      monsters.push(monster) //把ball物件放入到balls物件群(陣列)中
  }
}

function draw() { //每秒執行60次
  background(255);
  if(keyIsPressed){ //鍵盤是否被按下，如果有，keyPressed的值為true
    if(key=="ArrowLeft" || key=="a"){ //按下鍵盤a鍵往左
      shipP.x = shipP.x-5
    }
    if(key=="ArrowRight" || key=="d"){ //按下鍵盤d鍵往右
      shipP.x = shipP.x+5
    }
    if(key=="ArrowUp" || key=="w"){ //按下鍵盤w鍵往上
      shipP.y = shipP.y-5
    }
    if(key=="ArrowDown" || key=="s"){ //按下鍵盤s鍵往下
      shipP.y = shipP.y+5
    }
  }

  for(let ball of balls){ //針對陣列變數，取出陣列內一個一個的物件
    ball.draw()
    ball.update()

    //由此判斷，每一隻恐龍有沒有接觸到每一個飛彈
    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)) //判斷ball與bullet有沒有碰觸
      {
        score = score - 1 //分數減一
        dino_sound.play()
        balls.splice(balls.indexOf(ball),1) //讓大象從大象倉庫內移除
        bullets.splice(bullets.indexOf(bullet),1) //讓飛彈從飛彈倉庫內移除
      }
    }
  }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  for(let bullet of bullets){ //針對飛彈倉庫內的資料，一筆一筆的顯示出來
    bullet.draw()
    bullet.update()
  }

  for(let monster of monsters){ //針對怪物倉庫內的資料，取出陣列內一個一個的物件
    if(monster.IsDead && monster.timenum==6){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()

    //+++++++++++++++由此判斷，每隻怪物有沒有接觸每一個飛彈++++++++++++++++++
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)) //判斷monster與bullet有沒有碰觸
      {
        score = score + 1 //分數加一
        mon_sound.play()
        monster.IsDead = true //已經被打到了，準備執行爆炸畫面
        bullets.splice(bullets.indexOf(bullet),1) //讓飛彈從飛彈倉庫內移除
      }
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  }
  
  textSize(50)
  text(score,50,50)
  //++++++++畫出中間三角形的砲台+++++++++++++++++++++++
  push()
    let dx = mouseX-width/2 //滑鼠座標到中心點的x軸距離
    let dy = mouseY-height/2 //滑鼠座標到中心點的y軸距離
    let angle = atan2(dy,dx)  //利用反tan算出角度

    translate(shipP.x,shipP.y) //砲台的位置，使用shipP的向量值
    rotate(angle) //讓三角形翻轉一個angle角度
    noStroke()
    fill("#f5ebe0")
    ellipse(0,0,65) //畫出中間的圓
    fill("#d4a373")
    triangle(50,0,-25,-25,-25,25) //畫出三角形
  pop()
}

function mousePressed(){
  //新增一筆飛彈資料（還沒有顯示）
  bullet = new Bullet({
    r:random(10,30),
    color: random(bullet_colors)
  })
  bullets.push(bullet) //把這一筆資料放入飛彈倉庫
  biu_sound.play()
  }

  function keyPressed(){
  if(key==" "){ //按下鍵盤空白鍵發射飛彈
      //新增一筆飛彈資料（還沒有顯示）
  bullet = new Bullet({
    r:random(10,30),
    color: random(bullet_colors)
  })
  bullets.push(bullet) //把這一筆資料放入飛彈倉庫
  biu_sound.play()
  }

}