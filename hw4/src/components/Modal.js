/****************************************************************************
  FileName      [ Modal.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Modal component. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Modal.css'
import React, { useEffect, useState } from "react";

export default function Modal({ restartGame, backToHome, win }) {
    const [render, setRender] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setRender(true);
        }, 1000);
    }, []);
    if (!render) return (<div></div>)
    return (
        <div className="modal">
            <div className="modalWrapper"></div>
            <div className="modalContent">
                <div className="modalResult">{win? "You Win":"Game Over"}</div>
                <div className="modalBtnWrapper">
                    <div className="modalBtn" onClick={restartGame}>{win? "Try Again":"New Game"}</div>
                    <div className="modalBtn" onClick={backToHome}>Back to Home</div>
                </div>
            </div>
            <div className="modalWrapper"></div>
        </div>
        // Advanced TODO: Implement the structure of Modal
        // Useful Hint: style = {{opacity: 1 or 0 }}
        // {}
        
    );
}