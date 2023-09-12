let music = new Audio("music.mp3")
let audioTuirn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let winningTone = new Audio("winingtone.mp3")

let turn ="X"
let isgameover= false;
let isTie=false;


let player1Name;
let player2Name;
let player1Symbol = "X";
let player2Symbol = "O";

// Ask for player names
player1Name = prompt("Enter Player 1's Name:", "Player 1");
player2Name = prompt("Enter Player 2's Name:", "Player 2");

// Display the first player's turn
document.querySelector('.info').innerText = "Turn for " + player1Name;


const changeTurn = () =>{
    return turn === player1Symbol ? player2Symbol : player1Symbol;


}

const checkWin = () =>{
    let boxtext = document.getElementsByClassName('boxtext');

    let wins =[
        [0, 1, 2,5,5,0],
        [3, 4, 5,5,15,0],
        [6, 7, 8,5,25,0],
        [0, 3, 6,-5,15,90],
        [1, 4, 7,5,15,90],
        [2, 5, 8,15,15,90],
        [0, 4, 8,5,15,45],
        [2, 4, 6,5,15,135],
    ];
    let winMobile = [
        [0, 1, 2, 0, 10, 0],
        [3, 4, 5, 0,30, 0],
        [6, 7, 8, , 50, 0],
        [0, 3, 6, -20, 29, 90],
        [1, 4, 7, 0, 29, 90],
        [2, 5, 8, 20, 15, 90],
        [0, 4, 8, 0, 30, 45],
        [2, 4, 6, 0, 30, 135],
    ];
    wins.forEach((e,index) => {
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText  ) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText  ) && (boxtext[e[0]].innerText !=="")){
            // document.querySelector('.info').innerText = boxtext[e[0]].innerText + "Won"
            isgameover = true
            document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width= "150px";
            
           
            if (window.innerWidth > 600) {
                document.querySelector('.line').style.width="20vw";

                document.querySelector('.line').style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
            } else {
                document.querySelector('.line').style.width="60vw";
                const mobileValues = winMobile[index] || [0, 0, 0, 0, 0, 0];
                document.querySelector('.line').style.transform = `translate(${mobileValues[3]}vw,${mobileValues[4]}vw) rotate(${mobileValues[5]}deg)`;
            }

            disableAllBoxes();
            winningTone.play();
            

        }
    });
    if (!isgameover && Array.from(boxtext).every(box => box.innerText !== "")) {
        isTie = true;
         gameover.play();
        document.querySelector('.info').innerText = "It's a Tie!";
    }



}

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if (boxtext.innerText === '' && !isgameover && !isTie){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTuirn.play();
            checkWin();
            if (!isgameover && !isTie){ 

                document.getElementsByClassName("info")[0].innerText = "Turn For" + (turn === player1Symbol ? player1Name : player2Name);
            }
            }

    })


})


reset.addEventListener('click',()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element =>{
        element.innerText=""
    });
    turn ="X"
     isgameover= false;
     isTie=false;
     document.getElementsByClassName("info")[0].innerText = "Turn For" + turn;
     document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width= "0px";

     document.getElementById('winningLine').style.width="0";
    //  document.getElementById('winningLine').style.transform="";

    enableAllBoxes();
   



});

// Function to disable all boxes
const disableAllBoxes = () => {
    Array.from(boxes).forEach(box => {
        box.removeEventListener('click', () => { });
    });
};

// Function to enable all boxes
const enableAllBoxes = () => {
    Array.from(boxes).forEach(box => {
        let boxtext = box.querySelector('.boxtext');
        if (boxtext.innerText === '') {
            box.addEventListener('click', () => {
                if (boxtext.innerText === '' && !isgameover && !isTie) {
                    boxtext.innerText = turn;
                    turn = changeTurn();
                    audioTuirn.play();
                    checkWin();
                    if (!isgameover && !isTie) {
                        document.querySelector('.info').innerText = "Turn for " + (turn === player1Symbol ? player1Name : player2Name);
                    }
                }
            });
        }
    });
};





