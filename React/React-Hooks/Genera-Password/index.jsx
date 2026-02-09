const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
    // ESTADOS: Lo que el usuario VE
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // REF: Lo que yo (el código) necesito recordar (el ID del reloj)
    const intervalRef = useRef(null);

    const generateOTP = () => {
        // Generar número de 6 dígitos
        const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
        setOtp(newOTP);
        setTimer(5); // Empezamos en 5 segundos
        setIsActive(true);
    };

    useEffect(() => {
        // Si el tiempo llega a 0, paramos el reloj
        if (timer === 0 && isActive) {
            setIsActive(false);
            clearInterval(intervalRef.current);
        }

        // Si el temporizador está activo y hay tiempo, creamos el intervalo
        if (isActive && timer > 0) {
            intervalRef.current = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        // LIMPIEZA: Muy importante para que no haya fugas de memoria
        return () => clearInterval(intervalRef.current);
    }, [isActive, timer]); // Se ejecuta cuando cambia el estado del juego o el reloj

    return (
        <div className="container">
            <h1 id="otp-title">OTP Generator</h1>
            
            {/* Si no hay OTP, mostramos el mensaje inicial */}
            <h2 id="otp-display">
                {otp === '' ? "Click 'Generate OTP' to get a code" : otp}
            </h2>

            {/* Lógica del mensaje del timer */}
            <p id="otp-timer" aria-live="assertive">
                {isActive && timer > 0 && `Expires in: ${timer} seconds`}
                {!isActive && otp !== '' && timer === 0 && "OTP expired. Click the button to generate a new OTP."}
            </p>

            <button 
                onClick={generateOTP} 
                id="generate-otp-button"
                disabled={isActive} // Desactivado si el timer está corriendo
            >
                Generate OTP
            </button>
        </div>
    );
};