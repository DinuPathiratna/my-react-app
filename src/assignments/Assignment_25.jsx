import { useEffect, useState } from "react";

function Assignment_25() {
    const [enabled, setEnabled] = useState(true);
    const [voices, setVoices] = useState([]);
    const [voiceType, setVoiceType] = useState("female");

    useEffect(() => {
        function loadVoices() {
            setVoices(window.speechSynthesis.getVoices());
        }
        loadVoices();

        window.speechSynthesis.onvoiceschanged = loadVoices;

        function handleClick(event) {
            if (!enabled) return;


            if (event.target.classList.contains("speech")) {
                window.speechSynthesis.cancel();

                const speech = new SpeechSynthesisUtterance(
                    event.target.innerText
                );

                let selectedVoice;

                if (voiceType === "male") {
                    selectedVoice = voices.find((voice) => /david|mark|guy|male/i.test(voice.name)) || voices[0];
                } else {
                    selectedVoice = voices.find((voice) => /zira|hazel|susan|female/i.test(voice.name)) || voices[1] || voices[0];
                }

                if (selectedVoice) {
                    speech.voice = selectedVoice;
                }

                window.speechSynthesis.speak(speech);
            }
        }

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [enabled, voices, voiceType]);

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <label>
                    <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />{" "}Enable Speech
                </label>
            </div>

            <div style={{ marginBottom: "30px" }}>
                <label>Voice :
                    <select value={voiceType} onChange={(e) => setVoiceType(e.target.value)} style={{ marginLeft: "10px" }}>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </label>
            </div>

            <div className="speech"
                style={{
                    padding: "15px",
                    background: "#000000",
                    color: "white",
                    cursor: "pointer",
                }} >

                Hello world
            </div>
        </div>
    );
}

export default Assignment_25;