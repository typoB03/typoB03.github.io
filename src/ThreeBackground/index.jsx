import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { createNoise3D } from "simplex-noise";
import './styles.css';

const ThreeBackground = ({ musicSrc, visualColor, coverImg, isWireframe, setLoadMusic }) => {
    const noise = createNoise3D();

    let audioSource;
    let analyser;
    let dataArray;
    let musicCube;

    useEffect(() => {
        //getting audio context
        if (!audioSource) {
            const audio = document.getElementById("music-audio");
            audio.src = musicSrc;
            audio.crossOrigin = "anonymous";
            audio.volume = 0.6;
            audio.load();
            audio.play();
            const context = new AudioContext();
            audioSource = context.createMediaElementSource(audio);
            analyser = context.createAnalyser();
            audioSource.connect(analyser);
            analyser.connect(context.destination);
            analyser.fftSize = 512;
            audioSource.connect(context.destination);
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        camera.position.z = 96;

        const canvas = document.getElementById("three-bg-canvas");

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });

        renderer.setSize(window.innerWidth, window.innerHeight);

        const container = document.getElementById("three-bg-container");

        container.appendChild(renderer.domElement);

        //for loading GLB
        // var loader = new GLTFLoader();

        // loader.load("/glb/sui.glb", function (gltf) {
        //     const albumModal = gltf.scene;
        //     albumModal.scale.set(0.1, 0.1, 0.1);
        //     albumModal.position.set(-20, -24, -18);
        //     scene.add(albumModal);
        // });

        const loader = new THREE.TextureLoader();
        const texture = loader.load(coverImg);

        const albumGeometry = new THREE.BoxGeometry(20, 20, 1); // ensure correct aspect ratio
        const albumMaterial = [
            new THREE.MeshBasicMaterial({
                color: "gray", //left
            }),
            new THREE.MeshBasicMaterial({
                color: "gray", //right
            }),
            new THREE.MeshBasicMaterial({
                color: "gray", // top
            }),
            new THREE.MeshBasicMaterial({
                color: "gray", // bottom
            }),
            new THREE.MeshBasicMaterial({
                map: texture, // front
            }),
            new THREE.MeshBasicMaterial({
                color: "gray", //back
            }),
        ];

        const albumPlane = new THREE.Mesh(albumGeometry, albumMaterial);
        scene.add(albumPlane);

        const musicGeometry = new THREE.TorusKnotGeometry(
            20,
            1.98,
            200,
            13,
            2,
            3
        );

        const musicMaterial = new THREE.MeshLambertMaterial({
            color: visualColor,
            wireframe: isWireframe,
        });

        musicCube = new THREE.Mesh(musicGeometry, musicMaterial);
        musicCube.position.set(0, 0, 0);
        scene.add(musicCube);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        ambientLight.castShadow = true;
        scene.add(ambientLight);

        const controller = new OrbitControls(camera, renderer.domElement);

        const animate = () => {
            if (musicCube) {
                analyser.getByteFrequencyData(dataArray);

                var lowerHalfArray = dataArray.slice(
                    0,
                    dataArray.length / 2 - 1
                );
                var upperHalfArray = dataArray.slice(
                    dataArray.length / 2 - 1,
                    dataArray.length - 1
                );

                var lowerMax = max(lowerHalfArray);
                var upperAvg = avg(upperHalfArray);

                var lowerMaxFr = lowerMax / lowerHalfArray.length;
                var upperAvgFr = upperAvg / upperHalfArray.length;

                const modA = modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 5);
                const modB = modulate(upperAvgFr, 0, 1, 0, 4);

                makeRoughBall(musicCube, modA, modB);
            }

            controller.update();
            renderer.render(scene, camera);
            window.requestAnimationFrame(animate);
        };
        animate();
    }, []);

    const makeRoughBall = (mesh, bassFr, treFr) => {
        let position = mesh.geometry.attributes.position;
        const vertex = new THREE.Vector3();

        for (let i = 0, l = position.count; i < l; i++) {
            vertex.fromBufferAttribute(position, i);
            vertex.applyMatrix4(mesh.matrixWorld);
            var offset = mesh.geometry.parameters.radius;
            var amp = 2;
            var time = window.performance.now();
            vertex.normalize();
            var rf = 0.00001;
            var distance =
                offset +
                bassFr +
                noise(
                    vertex.x + time * rf * 7,
                    vertex.y + time * rf * 8,
                    vertex.z + time * rf * 9
                ) *
                    amp *
                    treFr;
            vertex.multiplyScalar(distance);
            position.setXYZ(i, vertex.x, vertex.y, vertex.z);
            position.needsUpdate = true;
        }

        mesh.rotation.x = treFr * 0.005;
        mesh.rotation.y = treFr * 0.005;

        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.normalsNeedUpdate = true;
        mesh.updateMatrixWorld();
    };

    const fractionate = (val, minVal, maxVal) => {
        return (val - minVal) / (maxVal - minVal);
    };

    const modulate = (val, minVal, maxVal, outMin, outMax) => {
        var fr = fractionate(val, minVal, maxVal);
        var delta = outMax - outMin;
        return outMin + fr * delta;
    };

    const avg = (arr) => {
        var total = arr.reduce(function (sum, b) {
            return sum + b;
        });
        return total / arr.length;
    };

    const max = (arr) => {
        return arr.reduce(function (a, b) {
            return Math.max(a, b);
        });
    };

    return (
        <div id="three-bg-container">
            <a className="back-button" onClick={()=>setLoadMusic(null)}>
                BACK
            </a>
            <canvas id="three-bg-canvas" />
            <audio
                id="music-audio"
                controls
                style={{
                    position: "absolute",
                    bottom: "5px",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            />
        </div>
    );
};

export default ThreeBackground;
