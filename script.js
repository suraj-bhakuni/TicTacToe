const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer ;
let gameGrid;

//Winning Positions

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//function to initialise the game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    //Empty boxes on UI after clicking on New Button
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //Removing Green Color OR initializing box with css again
        box.classList = `box box${index+1}`;
        
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`; 
}
initGame();


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        swapTurn();  //Swapping Player turn

        checkGameOver(); //Cheching Game is over or not
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }

    else{
        currentPlayer = "X";
    }

    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    
    let winner = "";

    winningPositions.forEach((position) => {
        //All 3 boxes should be non-empty and have same value.
        
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]]))
        //Checking if winner is X
        {   
            if(gameGrid[position[0]] === "X"){
                winner = "X";
            }
            else{
                winner = "O";
            }

            //Disabling the poiter events after winning
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            //Now we have a winner as X/O. For marking the background

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //it means we have a Winner
    if(winner !== ""){
        gameInfo.innerText = `Winner Player - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }
    //Checking the Tied game
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    //Board is Filled
    if(fillCount===9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add(active);
    }
}

 


boxes.forEach((box, index) =>{
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);
