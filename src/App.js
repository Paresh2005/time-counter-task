import React  , {createContext, useEffect, useState , useRef} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//Layout
import Layout from './componets/Layout'

//componets
import Home from './componets/Home'
import About from './componets/About'

//timer context
const TimerContext = createContext();

function App() {
    const [timer, setTimer] = useState({ h: 0, m: 0, s: 0 });
    const countdown = useRef(null);

    useEffect(() => {
        const savedTimer = JSON.parse(localStorage.getItem('timer'));
        if (savedTimer != null && (savedTimer.h !== 0 || savedTimer.m !== 0 || savedTimer.s !== 0)) {
            setTimer(savedTimer);
            startTimer();
        }

        // Cleanup function to clear the interval
        return () => {
            clearInterval(countdown.current);
        };
    }, []);

    // Save timer to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('timer', JSON.stringify(timer));
    }, [timer]);

    // Start timer
    function startTimer() {
        countdown.current = setInterval(() => {
            setTimer((prevTimer) => {
                let { h, m, s } = prevTimer;

                let totalSeconds = h * 3600 + m * 60 + s;
                totalSeconds--;

                if (totalSeconds < 0) {
                    clearInterval(countdown.current); // Clear interval if time is up
                    return { h: 0, m: 0, s: 0 }; // Reset timer when it reaches zero
                }

                h = Math.floor(totalSeconds / 3600);
                m = Math.floor((totalSeconds / 60) % 60);
                s = totalSeconds % 60;

                return { h, m, s };
            });
        }, 1000);
    }

    // Clear timer
    function clearTimer() {
        clearInterval(countdown.current); // Clear the interval
        setTimer({ h: 0, m: 0, s: 0 }); // Reset timer state
        localStorage.clear(); // Clear local storage
    }

    return (
        <TimerContext.Provider value={{ timer, setTimer, startTimer, clearTimer }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='' element={<Home />} />
                        <Route path='about' element={<About />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </TimerContext.Provider>
    );
}

export { App, TimerContext };
