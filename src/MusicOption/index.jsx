import React, { useState } from "react";

const MusicOption = ({artistName, musicName, musicObject, setLoadMusic}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a
            className="load-button"
            onClick={() => setLoadMusic(musicObject)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                className="fire-hover-left"
                src="/purplefire.gif"
                style={{
                    display: isHovered ? "block" : "none",
                }}
            />
            {artistName}{" "}
            <span
                style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                }}
            >
                -
            </span>{" "}
            {musicName}
            <img
                className="fire-hover-right"
                src="/purplefire.gif"
                style={{
                    display: isHovered ? "block" : "none",
                }}
            />
        </a>
    );
};

export default MusicOption;
