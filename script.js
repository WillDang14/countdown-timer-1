let start = document.getElementById('start');
let reset = document.getElementById('reset');



let h = document.getElementById("hour");
let m = document.getElementById("minute");
let s = document.getElementById("sec");



//store a reference to the startTimer variable
let startTimer = null;


// let pause = document.getElementById('pause');

/* /////////////////////////////////////////////////////////////// */
// Cách đặt hàm startInterval()  trong này có vẻ không hợp lý lắm
// Vì lỡ như mỗi khi nhấn strat thì lại gọi setInterval()  lần nữa

start.addEventListener('click', function() {

    // tự thêm vô ==>> cần cái này
    stopInterval();


    // Check and Validate input value
    checkInputValue();


    startInterval();


    // tự thêm vô để ẩn Arrow Scroll của Input khi bắt đầu đếm time
    h.classList.add("display-arrow");
    m.classList.add("display-arrow");
    s.classList.add("display-arrow");

});


//initialize the variable
function startInterval(){
    startTimer = setInterval( function() {
        timer();
    }, 1000);
};


/* /////////////////////////////////////////////////////////////// */
reset.addEventListener('click', function(){

    h.value = 0;
    m.value = 0;
    s.value = 0;

    //stop the timer after pressing "reset"
    stopInterval();

});



/* /////////////////////////////////////////////////////////////// */
// Chú ý là khi gán giá trị input.value thì tự động HMTL sẽ cập nhật hiển thị

function timer() {

    if (h.value == 0 && m.value == 0 && s.value == 0){
        
        // Khi mà đếm xong về 0 hết thì dừng (nếu không sẽ nhảy thêm về số âm)
        h.value = 0;
        m.value = 0;
        s.value = 0;

        // Nên thêm cái này vô để chương trình không chạy liên tục
        // console.log(s.value);
        stopInterval();

        return;
    };


    if(s.value != 0){

        s.value--;

        return;
    };


    if(m.value != 0 && s.value == 0){

        s.value = 59;

        m.value--;

        return;

    }

    
    if (h.value != 0 && m.value == 0) {

        m.value = 59;

        s.value = 59;
        
        h.value--;
        
        return;
    }



}



/* /////////////////////////////////////////////////////////////// */

//stop the function after pressing the reset button, 
//so the time wont go down when selecting a new time after pressing reset

function stopInterval() {

    clearInterval(startTimer);


    // tự thêm vô
    h.classList.remove("display-arrow");
    m.classList.remove("display-arrow");
    s.classList.remove("display-arrow");
}


/* /////////////////////////////////////////////////////////////// */
// Dùng cái này để khi click vào từng input rồi wheel chuột thì số tự động nhảy

const inputs = document.querySelectorAll("input");

inputs.forEach( element => {
    element.addEventListener("wheel", () => {});
});



h.addEventListener("keyup", () => {
    if (h.value > 99) {
        alert("Maximum value of Hours is 99!");
        h.value = 99;
    };


    // Cái này để đảm bảo là luôn có 2 chữ số và không có số 0 ở đầu
    // Chú ý là 012 thì JS xem là 12 nhưng vẫn giữ nguyên số 0 ở đầu
    // ==>> vì vậy cần bỏ số 0 đi
    if (h.value.length === 3) {
        h.value = h.value.slice(1, 3);
    };

});


m.addEventListener("keyup", () => {

    if (m.value > 60) {
        alert("Maximum value of Minute is 60!");
        m.value = 60;
    };


    if (m.value.length === 3) {
        m.value = m.value.slice(1, 3);
    }

});


s.addEventListener("keyup", () => {
    if (s.value > 60) {
        alert("Maximum value of Second is 60!");
        s.value = 60;
    };


    if (s.value.length === 3) {
        s.value = s.value.slice(1, 3);
    };

});



/* /////////////////////////////////////////////////////////////// */
// Thêm cái này vô để dừng thời gian
pause.addEventListener('click', function(){
    //stop the timer after pressing "reset"
    stopInterval();
});


/* /////////////////////////////////////////////////////////////// */
// Validate data

function checkInputValue() {

    // 99h:60m:60s ==>> 100h:0m:0s
    // 0h:60m:60s ==>> 1h:1m:0s
    if (m.value == 60 && s.value == 60) {
        if(h.value == 99) {
            h.value = 100;
            m.value = 0;
            s.value = 0;
        } else {
            h.value++;
            m.value = 1;
            s.value = 0;
        };
    };


    // 00m:60s ==>> 1m:0s
    if (m.value != 60 && s.value == 60) {
        m.value++;
        s.value = 0;    
    };    


    // Quên nhập value thì gán = 0
    (h.value == "") ? h.value = 0 : h.value;
    (m.value == "") ? m.value = 0 : m.value;
    (s.value == "") ? s.value = 0 : s.value;


    

}


