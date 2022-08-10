let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:

const generateTarget = () => {
    return Math.floor(Math.random() * 10) // generates random number between 0-9(always one more than you want because of floor)
}

const getAbsoluteDistance = (num1, num2) => { // gets difference of two numbers
    return Math.abs(num1 - num2) 
}

const alert = (userGuess) => {
    if (userGuess < 0 || userGuess > 9) { // Not sure where to display
    return 'Alert: number is out of range.'
    }
}

const compareGuesses = (userGuess, computerGuess, secretTarget) => {
    alert(userGuess)
    userGuess = getAbsoluteDistance(userGuess, secretTarget) // gets the difference between user and target
    computerGuess = getAbsoluteDistance(computerGuess, secretTarget) // gets the difference between computer and target
    return userGuess <= computerGuess;
}

const updateScore = (winner) => {
    if (winner === 'human') {
        humanScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }
}

const advanceRound = () => currentRoundNumber++;

secretTarget = generateTarget()
console.log(updateScore(compareGuesses(1, 6,secretTarget)))