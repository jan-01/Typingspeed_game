import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const inputRef = useRef(null);

  const sentences = [
    'the quick brown fox jumps over the lazy dog',
    'pack my box with five dozen liquor jugs',
    'sphinx of black quartz judge my vow',
    'how vexingly quick daft zebras jump',
    'bright vixens jump dozy fowl quack',
  ];

  const getRandomSentence = () =>
    sentences[Math.floor(Math.random() * sentences.length)];

  const [sentence, setSentence] = useState(getRandomSentence);
  const [userInput, setUserInput] = useState('');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [name, setName] = useState('');
  const [scores, setScores] = useState([]);
  const [wpm, setWpm] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    fetch('http://localhost:3001/scores')
      .then((res) => res.json())
      .then(setScores)
      .catch(console.error);
  }, [isFinished]);

  useEffect(() => {
    if (gameStarted) {
      inputRef.current?.focus();
    }
  }, [gameStarted]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    if (!isRunning && value.length === 1) {
      setIsRunning(true);
    }

    if (value === sentence) {
      setIsRunning(false);
      setIsFinished(true);

      const wordCount = sentence.trim().split(/\s+/).length;
      const minutes = time / 60;
      const calculatedWPM = Math.round(wordCount / minutes || 0);
      setWpm(calculatedWPM);
    }
  };

  const handleRestart = () => {
    setSentence(getRandomSentence());
    setUserInput('');
    setTime(0);
    setIsRunning(false);
    setIsFinished(false);
    setName('');
    setWpm(0);
    setGameStarted(false);
  };

  const handleSubmitScore = async () => {
    if (!name) return alert('Enter your name first');
    try {
      await fetch('http://localhost:3001/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, time, wpm }),
      });
      const updated = await fetch('http://localhost:3001/scores').then((r) =>
        r.json()
      );
      setScores(updated);
    } catch (err) {
      console.error('Failed to submit score', err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>
        {!gameStarted
          ? 'Geschwindigkeit by Jaan'
          : isFinished
          ? `🏁 WPM: ${wpm}`
          : '⌨️ Typing...'}
      </h1>

      {gameStarted && <p>⏱️ Time: {time}s</p>}

      {!gameStarted && (
        <button
          onClick={() => {
            setGameStarted(true);
            setIsRunning(false);
            setTime(0);
            setUserInput('');
            setIsFinished(false);
            setName('');
            setWpm(0);
          }}
          style={{
            padding: '0.8rem 1.2rem',
            fontSize: '1rem',
            marginBottom: '1rem',
          }}
        >
          🚀 Start Game
        </button>
      )}

      <blockquote style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
        {sentence.split('').map((char, index) => {
          const typedChar = userInput[index];
          let className = '';
          if (typedChar != null) {
            className = typedChar === char ? 'glow-correct' : 'glow-wrong';
          }
          return (
            <span key={index} className={className} style={{ whiteSpace: 'pre' }}>
              {char}
            </span>
          );
        })}
      </blockquote>

      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        disabled={!gameStarted || isFinished}
        placeholder="Start typing..."
        style={{
          width: '100%',
          padding: '0.8rem',
          fontSize: '1rem',
          marginBottom: '1rem',
        }}
      />

      {isFinished && (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={{
                padding: '0.5rem',
                fontSize: '1rem',
                marginRight: '1rem',
              }}
            />
            <button onClick={handleSubmitScore}>Submit Score</button>
          </div>
          <button onClick={handleRestart}>🔁 Restart</button>
        </>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h2>🏆 Top Scores</h2>
      <ul>
        {scores.map((score, i) => (
          <li key={i}>
            {score.name} — {score.wpm} WPM — {score.time}s
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
