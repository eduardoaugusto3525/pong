const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Definir tamanho do canvas
canvas.width = 800;
canvas.height = 400;

// Raquete do jogador
const paddleWidth = 10, paddleHeight = 100;
let playerY = canvas.height / 2 - paddleHeight / 2;
let playerSpeed = 0;

// Raquete do computador
let computerY = canvas.height / 2 - paddleHeight / 2;
let computerSpeed = 4;

// Bola
const ballSize = 10;
let ballX = canvas.width / 2 - ballSize / 2;
let ballY = canvas.height / 2 - ballSize / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

// Pontuação
let playerScore = 0;
let computerScore = 0;

// Função para desenhar a raquete
function drawPaddle(x, y) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Função para desenhar a bola
function drawBall() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

// Função para desenhar a pontuação
function drawScore() {
    ctx.font = "30px Arial";
    ctx.fillText(playerScore, canvas.width / 4, 50);
    ctx.fillText(computerScore, 3 * canvas.width / 4, 50);
}

// Função para mover a bola
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisão com as paredes superior e inferior
    if (ballY <= 0 || ballY + ballSize >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Colisão com a raquete do jogador
    if (ballX <= paddleWidth && ballY + ballSize >= playerY && ballY <= playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Colisão com a raquete do computador
    if (ballX + ballSize >= canvas.width - paddleWidth && ballY + ballSize >= computerY && ballY <= computerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Se a bola passar de uma raquete
    if (ballX <= 0) {
        computerScore++;
        resetBall();
    }
    if (ballX + ballSize >= canvas.width) {
        playerScore++;
        resetBall();
    }
}

// Função para mover as raquetes
function movePaddles() {
    // Movimentação da raquete do jogador
    if (playerY + playerSpeed >= 0 && playerY + playerSpeed + paddleHeight <= canvas.height) {
        playerY += playerSpeed;
    }

    // Movimentação da raquete do computador (simples AI)
    if (ballY < computerY + paddleHeight / 2) {
        computerY -= computerSpeed;
    } else {
        computerY += computerSpeed;
    }
}

// Função para reiniciar a bola
function resetBall() {
    ballX = canvas.width / 2 - ballSize / 2;
    ballY = canvas.height / 2 - ballSize / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 4;
}

// Função para desenhar tudo
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpar o canvas

    drawPaddle(0, playerY); // Desenhar a raquete do jogador
    drawPaddle(canvas.width - paddleWidth, computerY); // Desenhar a raquete do computador
    drawBall(); // Desenhar a bola
    drawScore(); // Desenhar a pontuação

    moveBall(); // Mover a bola
    movePaddles(); // Mover as raquetes

    requestAnimationFrame(gameLoop); // Continuar o loop do jogo
}

// Função para começar o jogo
function startGame() {
    document.addEventListener('keydown', function(e) {
        if (e.key === "ArrowUp") playerSpeed = -8;
        if (e.key === "ArrowDown") playerSpeed = 8;
    });

    document.addEventListener('keyup', function(e) {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") playerSpeed = 0;
    });

    gameLoop(); // Iniciar o loop do jogo
}

// Iniciar o jogo quando pressionar a tecla "Espaço"
document.addEventListener('keydown', function(e) {
    if (e.key === " ") {
        startGame();
        document.querySelector('p').style.display = 'none'; // Remover instruções
    }
});
