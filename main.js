var canvas = document.getElementById('gamezone');
var context = canvas.getContext('2d');
var scoreshow = document.getElementById('score');


//import image
var birdimg = new Image();
var hinhnenchinh = new Image();
var ongtren = new Image();
var ongduoi = new Image();
birdimg.src = "images/bird.png";
hinhnenchinh.src = "images/nenchinh.png";
ongtren.src = "images/ongtren.png";
ongduoi.src = "images/ongduoi.png";

//Declare variable
var score = 0;
var khoangcachhaiong = 140; 
var khoangcachdenongduoi;

//Declare object bird 
var bird = {
    x: hinhnenchinh.width/5,
    y: hinhnenchinh.height/2
};

//declare array ong
var ong = [];
ong[0] = {
    x: canvas.width,
    y: 0 // Khởi tạo ống đầu tiên nằm bên phải ngoài cùng và y = 0
}

//Make function to run game
var fps = 90
function run() {
    //load image
    context.drawImage(hinhnenchinh, 0, 0);
    context.drawImage(birdimg, bird.x, bird.y);

    for(var i = 0; i <ong.length; i++){
        khoangcachdenongduoi = ongtren.height + khoangcachhaiong;
        context.drawImage(ongtren, ong[i].x, ong[i].y);
        //vẽ ống trên theo tọa độ của ống đó
        //Ống dưới phụ thuộc vào ống trên
        context.drawImage(ongduoi, ong[i].x, ong[i].y + khoangcachdenongduoi);
        //Lấy vị trí ống trên cộng khoảng cách đến ống dưới vì sẽ random lên xuống
        ong[i].x-=5;

        //Lập trình thêm ống khi ống di chuyển đến giữa nó sẽ tạo thêm 1 ống nữa
        if(ong[i].x == canvas.width/2){
        //    setTimeout(() => {
            ong.push({
                x: canvas.width,
                y: Math.floor(Math.random()*ongtren.height) - ongtren.height
            })
        //    }, 200)
        }
        if(ong[i].x == 0 ) ong.splice(0,1); // nếu đụng ống bên lề trái thì sẽ xóa nó đi tránh mảng ống bị đầy làm chậm
        if(ong[i].x == bird.x) score++;
        
        //Thua
        if(bird.y+birdimg.height==canvas.height||
            bird.x+birdimg.width>= ong[i].x && bird.x <= ong[i].x +ongtren.width
            && (bird.y<=ong[i].y+ongtren.height||
            bird.y +birdimg.height>= ong[i].y+ khoangcachdenongduoi)    
            ){
                var r = confirm(`You losed! Your score: " ${score}  "\n Do you want to play again?`);
                if (r == true) {
                    location.reload();
                } else {
                    window.stop();
                };
            }                 

    };

    scoreshow.innerHTML="score: " + score;
    //cho bird roi xuong
    bird.y+=3;
    setTimeout(function() {
        requestAnimationFrame(run);
    }, 1000 / fps);
};

//thêm function cho bird bay lên khi nhấn 
var x = screen.width;
if(x >= 900) {
    document.addEventListener("keydown", function(){
        bird.y-=80;
    })
}
document.addEventListener("touchend", function(){
    bird.y-=70;
})

run();