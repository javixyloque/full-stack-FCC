const { useState } = React; // Elimina useEffect

export function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [acabado, setAcabado] = useState(false);
    const [message, setMessage] = useState("");
    
    // Función para calcular ganador (afuera del componente o dentro)
    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    function handleClick(i) {
        if (squares[i] || acabado) {
            return;
        }
        
        const newSquares = squares.slice();
        newSquares[i] = xIsNext ? "X" : "O";
        
        // Calcular si hay ganador DESPUÉS de la jugada actual
        const winner = calculateWinner(newSquares);
        const isDraw = !newSquares.includes(null);
        
        setSquares(newSquares);
        setXIsNext(!xIsNext);
        
        // Establecer message y estado de fin de juego
        if (winner) {
            setMessage(`Winner: ${winner}!`);
            setAcabado(true);
        } else if (isDraw) {
            setMessage("Draw!");
            setAcabado(true);
        }
    }

    // RESET
    function handleReset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setAcabado(false);
        setMessage("");
    }

    return (
        <>
            <div className="board">
                {squares.map((square, index) => (
                    <button 
                        key={index}
                        className="square" 
                        onClick={() => handleClick(index)}
                    >
                        {square}
                    </button>
                ))}
            </div>
            
            <button className="reset-button" id="reset" onClick={handleReset}>
                Reset
            </button>
            
            {/* Mostrar message SIEMPRE que haya message */}
            {message && (
                    <p>{message}</p>
                    
            )}
        </>
    );
}