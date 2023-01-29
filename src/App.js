import "./App.css";
import { useState, useEffect } from "react";
import ThreeBackground from "./ThreeBackground";
import DoubleCircle from "./DoubleCircle";
import MusicOption from "./MusicOption";

const App = () => {
    const [loadMusic, setLoadMusic] = useState(null);

    const loadVisual = () => {
        switch (loadMusic.type) {
            case "doublecircle":
                return (
                    <DoubleCircle
                        musicSrc={loadMusic.musicSrc}
                        visualColor={loadMusic.visualColor}
                        secondColor={loadMusic.secondColor}
                        coverImg={loadMusic.coverImg}
                        isWireframe={loadMusic.isWireframe}
                        setLoadMusic={setLoadMusic}
                    />
                );
            default:
                return (
                    <ThreeBackground
                        musicSrc={loadMusic.musicSrc}
                        visualColor={loadMusic.visualColor}
                        coverImg={loadMusic.coverImg}
                        isWireframe={loadMusic.isWireframe}
                        setLoadMusic={setLoadMusic}
                    />
                );
        }
    };

    const shenghuoObject = {
        musicSrc: "https://storage.cloud.google.com/yeshengnetwork/music/ghostmg-freestyle.wav",
        visualColor: 0xffffff,
        coverImg: "https://storage.cloud.google.com/yeshengnetwork/cover/ghostmg-shenghuo.jpg",
        isWireframe: false,
    };

    const suiObject = {
        musicSrc: "https://storage.cloud.google.com/yeshengnetwork/music/ghostmg-sui.wav",
        visualColor: 0xa020f0,
        coverImg: "https://storage.cloud.google.com/yeshengnetwork/cover/ghostmg-sui.png",
        isWireframe: true,
    };

    const jaguarBluehundo = {
        musicSrc: "https://storage.cloud.google.com/yeshengnetwork/music/jaguar-bluehundo.mp3",
        visualColor: 0x0024f7,
        coverImg: "https://storage.cloud.google.com/yeshengnetwork/cover/jaguar-bluehundo.jpg",
        isWireframe: true,
    };

    const mongolRacksObject = {
        type: "doublecircle",
        musicSrc: "https://storage.cloud.google.com/yeshengnetwork/music/shanghaiphantom-mongolracks.wav",
        visualColor: 0x7cc0d8,
        secondColor: 0xf7f0dc,
        coverImg: "https://storage.cloud.google.com/yeshengnetwork/cover/shanghaiphantom-mongolracks.jpg",
    };

    return (
        <div className="app-container">
            {loadMusic ? (
                loadVisual()
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
                        <MusicOption artistName={"Shanghai Phantom"} musicName={"Mongol Racks"} musicObject={mongolRacksObject} setLoadMusic={setLoadMusic}/>
                        <MusicOption artistName={"JaguarVVS"} musicName={"Blue Hundo"} musicObject={jaguarBluehundo} setLoadMusic={setLoadMusic}/>
                        <MusicOption artistName={"GhosTMG"} musicName={"生活freestyle"} musicObject={shenghuoObject} setLoadMusic={setLoadMusic}/>
                        <MusicOption artistName={"GhosTMG"} musicName={"SUI"} musicObject={suiObject} setLoadMusic={setLoadMusic}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
