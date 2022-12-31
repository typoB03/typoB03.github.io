import "./App.css";
import { useState } from "react";
import ThreeBackground from "./ThreeBackground";

const App = () => {
    const [loadMusic, setLoadMusic] = useState(false);

    return (
        <div className="app-container">
            {loadMusic ? (
                <ThreeBackground />
            ) : (
                <div className="load-button-container">
                    <a className="load-button" onClick={() => setLoadMusic(!loadMusic)}>
                        LOAD
                    </a>
                </div>
            )}
        </div>
    );
};

export default App;
