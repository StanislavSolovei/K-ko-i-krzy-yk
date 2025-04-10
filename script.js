const board = document.querySelector("#board"); // Pobieranie elementu planszy
let currentPlayer = "X"; // Gracz rozpoczynający (X)

let gameBoard = ["","","","","","","","",""]; // Tablica gry przechowująca stany pól
let winningCombo = [0,0,0]; // Tablica do przechowywania kombinacji zwycięskiej
let numberOfPlayers = 2; // Zmienna do przechowywania liczby graczy

// Funkcja do pytania o liczbę graczy
function askNumberOfPlayers() {
    const players = prompt("Ile graczy? Wpisz 1 lub 2:");
    if (players === "1") {
        numberOfPlayers = 1;
    } else if (players === "2") {
        numberOfPlayers = 2;
    } else {
        alert("Proszę wpisać 1 lub 2");
        askNumberOfPlayers();
    }
}

// Funkcja do tworzenia planszy
function createBoard() {    
    for(let i = 0; i < 9; i++){ // Tworzenie 9 komórek planszy
        const cell = document.createElement('div');
        cell.classList.add('cell'); // Dodanie klasy 'cell' do każdej komórki
        cell.dataset.index = i; // Dodanie indexu komórki w dataset
        cell.addEventListener('click', handleCellClick); // Dodanie nasłuchiwacza kliknięć
        board.appendChild(cell); // Dodanie komórki do planszy
    }
}

// Funkcja obsługująca kliknięcie w komórkę
function handleCellClick(event) {
    const messageTur = document.querySelector("#message"); // Pobieranie elementu z komunikatem
    console.log('Cell clicked:', event.target.dataset.index); // Wyświetlenie w konsoli klikniętego indeksu
    event.target.textContent = currentPlayer; // Zapisanie aktualnego gracza w komórce
    gameBoard[event.target.dataset.index] = currentPlayer; // Zaktualizowanie tablicy gry
    console.log(checkWin()); // Sprawdzenie czy ktoś wygrał

    if(checkWin()) { // Jeśli ktoś wygrał
        messageTur.textContent= `${currentPlayer} wygrał!`; // Wyświetlenie komunikatu o zwycięstwie
        console.log(`${currentPlayer} wygrał!`); // Wyświetlenie w konsoli komunikatu o zwycięstwie
        drawWinningLine(); // Rysowanie linii zwycięstwa
    } else {
        if(currentPlayer === "X") { // Jeśli gracz X, to zmiana na gracza O
            currentPlayer = "O";
            messageTur.textContent = "Tura: O";
        }
        else { // Jeśli gracz O, to zmiana na gracza X
            currentPlayer = "X";
            messageTur.textContent = "Tura: X";
        }
        
        event.target.removeEventListener("click", handleCellClick); // Usunięcie nasłuchiwacza po kliknięciu
    }
}

createBoard(); // Wywołanie funkcji tworzącej planszę

// Funkcja sprawdzająca, czy ktoś wygrał
function checkWin() {
    const winConditions = [ // Warunki zwycięstwa
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    // Sprawdzanie wszystkich warunków zwycięstwa
    for (const condition of winConditions){
        const [a,b,c] = condition; // Destrukturyzacja warunków
        if (
            gameBoard[a] &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            winningCombo = condition; // Przypisanie kombinacji zwycięskiej
            return true; // Zwrócenie wartości true, jeśli znaleziono zwycięstwo
        }
    }
    
    return false; // Jeśli brak zwycięzcy
}


const resetBtn = document.querySelector("#resetBtn"); // Pobieranie przycisku resetu
resetBtn.addEventListener("click", resetGame); // Nasłuchiwanie na kliknięcie resetu

// Funkcja resetująca grę
function resetGame() {
    gameBoard = ["","","","","","","","",""]; // Resetowanie tablicy gry
    currentPlayer = "X"; // Ustawienie gracza X jako rozpoczynającego
    const cells = document.querySelectorAll(".cell"); // Pobieranie wszystkich komórek
    cells.forEach((cell) => { // Dla każdej komórki
        cell.textContent = ""; // Usunięcie tekstu z komórki
        cell.addEventListener("click", handleCellClick); // Dodanie nasłuchiwacza kliknięcia

        const jestLine = document.querySelector(".line"); // Sprawdzanie, czy istnieje linia zwycięstwa
        if (jestLine) {
            jestLine.remove(); // Usunięcie linii, jeśli jest
        }
    });
    document.getElementById("message").textContent = "Tura: X"; // Resetowanie komunikatu
    askNumberOfPlayers(); // Pytanie o liczbę graczy
}

resetGame(); // Wywołanie funkcji resetującej grę

// Funkcja rysująca linię zwycięstwa
// Funkcja rysująca linię zwycięstwa
// Funkcja rysująca linię zwycięstwa
// Funkcja rysująca linię zwycięstwa
function drawWinningLine() {
    const line = document.createElement("div");
    line.classList.add("line");
    board.appendChild(line);

    const start = winningCombo[0];
    const end = winningCombo[2];

    const cellSize = 120;
    const gap = 5;

    const offset = (cellSize + gap);
    const halfCell = cellSize / 2;

    // Poziomo
    if (start === 0 && end === 2) {
        line.style.top = `${offset * 0 + halfCell - 2.5}px`;
        line.style.left = "0";
    } else if (start === 3 && end === 5) {
        line.style.top = `${offset * 1 + halfCell - 2.5}px`;
        line.style.left = "0";
    } else if (start === 6 && end === 8) {
        line.style.top = `${offset * 2 + halfCell - 2.5}px`;
        line.style.left = "0";
    }

    // Pionowe
    else if (start === 0 && end === 6) {
        line.classList.add("vertical");
        line.style.top = "0";
        line.style.left = `${offset * 0 + halfCell - 2.5}px`;
    } else if (start === 1 && end === 7) {
        line.classList.add("vertical");
        line.style.top = "0";
        line.style.left = `${offset * 1 + halfCell - 2.5}px`;
    } else if (start === 2 && end === 8) {
        line.classList.add("vertical");
        line.style.top = "0";
        line.style.left = `${offset * 2 + halfCell - 2.5}px`;
    }

    // Diagonale
    else if (start === 0 && end === 8) {
        line.classList.add("diagonal1");
        line.style.top = "0";
        line.style.left = "0";
    } else if (start === 2 && end === 6) {
        line.classList.add("diagonal2");
        line.style.top = "0";
        line.style.left = "0";
    }

    line.classList.add("show");
}



