function loadDOM() {

    function handleStartButtonClick() {
        // Retrieve player names from input fields
        player1Name = document.getElementById("player1").value || "Player 1";
        player2Name = document.getElementById("player2").value || "Player 2";

        // Hide the landing page and show the game board
        document.getElementById("landingPage").classList.add("hidden");
        document.getElementById("gameBoard").classList.remove("hidden");

        // Display player names on the game board

        document.getElementById("player1_name").textContent = player1Name;
        document.getElementById("player2_name").textContent = player2Name;

        // Initialize game state and display initial player
        player1Score = 0;
        player2Score = 0;
        currentPlayer = player1Name
        document.getElementById("theScore1").innerHTML = player1Score || ("0");
        document.getElementById("theScore2").innerHTML = player2Score || ("0");
    }
    // Function to handle the restart button click event
    function handleRestartButtonClick() {
        //   Reset the board / game
        let cellSet = document.querySelectorAll(".cell");
        cellSet.forEach((cell) => {
            cell.textContent = "";
        });

        cellSet.forEach((cell) => {
            cell.classList.remove("pink", "yellow");
        });

        currentPlayer = player1Name;
        numberOfMoves = 0;
    }
    // Function to handle the quit button click event
    function handleQuitButtonClick() {
        // Display the results screen
        document.getElementById("gameBoard").classList.add("hidden");
        document.getElementById("resultScreen").classList.remove("hidden");

        // Determine the winner or tie
        let resultMessage = "";
        if (player1Score > player2Score) {
            resultMessage = `${player1Name} has won the game!`;
        } else if (player2Score > player1Score) {
            resultMessage = `${player2Name} has won the game!`;
        } else {
            resultMessage = "It's a tie!";
        }

        // Determine who to  congratulate
        let congratulate = "";
        if (player1Score > player2Score) {
            congratulate = `Congratulations ${player1Name} !!`;
        } else if (player2Score > player1Score) {
            congratulate = `Congratulations ${player2Name} !!`;
        } else {
            congratulate = "Oh no..";
        }

        // Display the winner or tie message
        document.getElementById("congratulate").textContent = congratulate;


        // Display the winner or tie message
        document.getElementById("results-message").textContent = resultMessage;
    }

    function handleGoButtonClick() {
        // Hide the landing page and show the game board
        document.getElementById("resultScreen").classList.add("hidden");
        document.getElementById("gameBoard").classList.remove("hidden");


        // Initialize game state and display initial player
        player1Score = 0;
        player2Score = 0;

        resetBoard();
        player1Score = 0
        player1Score = 0
        document.getElementById("theScore1").innerHTML = player1Score || ("0");
        document.getElementById("theScore2").innerHTML = player2Score || ("0");

        // Retrieve player names from input fields
        player1Name = document.getElementById("player1").value || "Player 1";
        player2Name = document.getElementById("player2").value || "Player 2";

        //Renaming the players

        document.getElementById("player1_name").textContent = player1Name;
        document.getElementById("player2_name").textContent = player2Name;

    }
    // Variables to store player names, scores, and game state
    let player1Name = "Player 1";
    let player2Name = "Player 2";
    let player1Score = 0;
    let player2Score = 0;
    let currentPlayer = player1Name;
    let numberOfMoves = 0;



    // Hide game board and resultscreen when on landing page
    document.getElementById("gameBoard").classList.add("hidden");
    document.getElementById("resultScreen").classList.add("hidden");


    // get and array of all the cells
    let cellSet = document.querySelectorAll(".cell");
    // loop through all the cells and add a click event
    for (let i = 0; i < cellSet.length; i++) {
        cellSet[i].addEventListener("click", function() {

            // if current cell (this) has a class name of pink or yellow then do nothing
            if (this.classList.contains("pink") || this.classList.contains("yellow")) {
                return;
            } else {
                //get a list of classes on what is clicked 
                let myArrayofBoxes = this.className.split(" ");
                //remove the cell class from the list 
                const cellPos = myArrayofBoxes.indexOf("cell");
                myArrayofBoxes.splice(cellPos, 1);
                //do quesry selctor all of the column id 
                const columnElements = document.querySelectorAll(".grid ." + myArrayofBoxes[0]);

                //loop through the the array backwards let my A = [
                for (let i = columnElements.length - 1; i >= 0; i--) {

                    // if the cell selected in not filled (not pink or not yellow)
                    if (!columnElements[i].classList.contains("pink") && !columnElements[i].classList.contains("yellow")) {
                        //then fill the cell with the appropriate color

                        if (currentPlayer === player1Name) {
                            columnElements[i].classList.add("pink")
                            numberOfMoves++;
                        } else {
                            columnElements[i].classList.add("yellow")
                            numberOfMoves++;;
                        }
                        i = -1;
                    }
                }


                if (checkWin()) {
                    // Notify the players
                    alert(`${currentPlayer} wins!`)
                    document.getElementById("theScore1").innerHTML = player1Score;
                    document.getElementById("theScore2").innerHTML = player2Score;


                    // Reset the board
                    setTimeout(resetBoard, 1000);

                }

                if (numberOfMoves === 42) {
                    // Notify the players
                    alert(`It's a tie`);
                    // Reset the board
                    resetBoard();
                    numberOfMoves = 0
                }
                // switch players
                switchPlayer();
            }

        });

    }

    function switchPlayer() {
        if (currentPlayer === player1Name) {
            currentPlayer = player2Name
            document.getElementById("whosTurn").textContent = currentPlayer;
        } else {
            currentPlayer = player1Name
            document.getElementById("whosTurn").textContent = currentPlayer;
        };
    }

    // adding winning arrays
    function checkWin() {
        const winningArray = [
            [0, 1, 2, 3],
            [1, 2, 3, 4],
            [2, 3, 4, 5],
            [3, 4, 5, 6],
            [7, 8, 9, 10],
            [8, 9, 10, 11],
            [9, 10, 11, 12],
            [10, 11, 12, 13],
            [14, 15, 16, 17],
            [15, 16, 17, 18],
            [16, 17, 18, 19],
            [17, 18, 19, 20],
            [21, 22, 23, 24],
            [22, 23, 24, 25],
            [23, 24, 25, 26],
            [24, 25, 26, 27],
            [28, 29, 30, 31],
            [29, 30, 31, 32],
            [30, 31, 32, 33],
            [31, 32, 33, 34],
            [35, 36, 37, 38],
            [36, 37, 38, 39],
            [37, 38, 39, 40],
            [38, 39, 40, 41],
            [0, 7, 14, 21],
            [7, 14, 21, 28],
            [14, 21, 28, 35],
            [1, 8, 15, 22],
            [8, 15, 22, 29],
            [15, 22, 29, 36],
            [2, 9, 16, 23],
            [9, 16, 23, 30],
            [16, 23, 30, 37],
            [3, 10, 17, 24],
            [10, 17, 24, 31],
            [17, 24, 31, 38],
            [4, 11, 18, 25],
            [11, 18, 25, 32],
            [18, 25, 32, 39],
            [5, 12, 19, 26],
            [12, 19, 26, 33],
            [19, 26, 33, 40],
            [6, 13, 20, 27],
            [13, 20, 27, 34],
            [20, 27, 34, 41]
        ];

        let currentPlayerColor = "pink";
        if (currentPlayer !== player1Name) {
            currentPlayerColor = "yellow";
        }


        for (let combination of winningArray) {
            if (
                cellSet[combination[0]].classList.contains(currentPlayerColor) &&
                cellSet[combination[1]].classList.contains(currentPlayerColor) &&
                cellSet[combination[2]].classList.contains(currentPlayerColor) &&
                cellSet[combination[3]].classList.contains(currentPlayerColor)

            ) {


                // Increase current player's score
                if (currentPlayer === player1Name) {
                    player1Score++;
                } else {
                    player2Score++;
                }
                // Return true to indicate a win
                return true;
            }
        }

        return false;
    }
    //   Reset the board / game
    function resetBoard() {
        cellSet.forEach((cell) => {
            cell.textContent = "";
        });

        cellSet.forEach((cell) => {
            cell.classList.remove("pink", "yellow");
        });

        currentPlayer = player1Name;
        numberOfMoves = 0;
    }


    // Add event listeners to buttons
    document.getElementById("goButton_1").addEventListener("click", handleStartButtonClick);
    document.getElementById("restartButton").addEventListener("click", handleRestartButtonClick);
    document.getElementById("quitButton").addEventListener("click", handleQuitButtonClick);
    document.getElementById("goButton_2").addEventListener("click", handleGoButtonClick);
}

//DOM 
document.addEventListener("DOMContentLoaded", loadDOM);