import "./App.css";
import { useState, useEffect } from "react";
import ThreeBackground from "./ThreeBackground";

const App = () => {
    const [loadMusic, setLoadMusic] = useState(null);

    const [firstHover, setFirstHover] = useState(false);
    const [secondHover, setSecondHover] = useState(false);

    useEffect(()=>{
        if (loadMusic) {
            setFirstHover(false);
            setSecondHover(false);
        }
    }, [loadMusic])

    const shenghuoObject = {
        musicSrc: "/music/freestyle.wav",
        visualColor: 0xffffff,
        coverImg: "/albums/shenghuo.jpg",
        isWireframe: false,
    }

    const suiObject = {
        musicSrc: "/music/sui.wav",
        visualColor: 0xA020F0,
        coverImg: "/albums/sui.png",
        isWireframe: true,
    }

    return (
        <div className="app-container">
            {loadMusic ? (
                <ThreeBackground
                    musicSrc={loadMusic.musicSrc}
                    visualColor={loadMusic.visualColor}
                    coverImg={loadMusic.coverImg}
                    isWireframe={loadMusic.isWireframe}
                    setLoadMusic={setLoadMusic}
                />
            ) : (
                <div style={{ height: "100%", width: "100%" }}>
                    <div
                        className="app-header"
                        style={{
                            position: "absolute",
                            top: "10%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            whiteSpace: "pre",
                        }}
                    >
                        <div
                            className="glitch layers animation-layer"
                            data-text="野生傳播"
                        >
                            <span className="app-header-text">野生傳播</span>
                        </div>
                    </div>
                    <div className="menu-container">
                        <p className="menu-header">FEATURING</p>
                        <a
                            className="load-button"
                            onClick={() => setLoadMusic(shenghuoObject)}
                            onMouseEnter={()=>setFirstHover(true)}
                            onMouseLeave={()=>setFirstHover(false)}
                        >
                            <img className="fire-hover-left" src="/purplefire.gif" style={{display: firstHover ? 'block' : 'none'}}/>
                            GhosTMG <span style={{marginLeft: '10px', marginRight: '10px'}}>-</span> 生活Freestyle
                            <img className="fire-hover-right" src="/purplefire.gif" style={{display: firstHover ? 'block' : 'none'}}/>
                        </a>
                        <a
                            className="load-button"
                            onClick={() => setLoadMusic(suiObject)}
                            onMouseEnter={()=>setSecondHover(true)}
                            onMouseLeave={()=>setSecondHover(false)}
                        >
                            <img className="fire-hover-left" src="/purplefire.gif" style={{display: secondHover ? 'block' : 'none'}}/>
                            GhosTMG <span style={{marginLeft: '10px', marginRight: '10px'}}>-</span> 碎(SUI)
                            <img className="fire-hover-right" src="/purplefire.gif" style={{display: secondHover ? 'block' : 'none'}}/>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
