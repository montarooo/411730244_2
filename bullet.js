class Bullet{
    constructor(args){  //預設值，基本資料(包含物件的顏色，位置，速度，大小)
        this.r = args.r || 10 //如果飛彈有傳回直徑，就以參數為直徑，否則預設為10
        this.p = args.p || shipP.copy()  //createVector(width/2,height/2) //飛彈起始位置（以向量方式表示該座標），要以中間砲台發射，所以座標為(width/2,height/2)
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(6) //飛彈的方向、速度
        this.size = random(5,10)
        this.color = args.color || "#F4989C" //飛彈顏色
      }

      draw(){ //畫出飛彈
        push()
            translate(this.p.x,this.p.y)
            fill(this.color)
            noStroke();
            ellipse(0,0,this.r)
        pop()
      }

      update(){ //計算移動後的位置
        this.p.add(this.v)
    //飛彈超出視窗的處理程式碼+++++++++++++++++++++++++++++++++++++++++++++
    for(let bullet of bullets){
        if(this.p.x < -10 || this.p.x > width+10) //<-10超出左邊，>width+10為超出右邊
        {
            bullets.splice(bullets.indexOf(bullet),1) //讓飛彈從飛彈倉庫內移除
        }
        if(this.p.y < -10 || this.p.y > height+10) //<-10超出上緣，>height+10為超出下緣
        {
            bullets.splice(bullets.indexOf(bullet),1) //讓飛彈從飛彈倉庫內移除
        }
    }   
    }
}