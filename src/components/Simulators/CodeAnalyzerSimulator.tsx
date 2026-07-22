import React, { useState } from 'react';
import { Code2, Sparkles, CheckCircle2, ShieldCheck, Terminal, Play, FileCode } from 'lucide-react';

const PRESET_SNIPPETS = [
  {
    name: 'PHP Legacy Auth (MySQL)',
    language: 'php',
    code: `<?php
// legacy_login.php - Freelance Project Auth Handler
session_start();
$conn = mysqli_connect("localhost", "root", "password123", "client_portal");

if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Legacy query formulation
    $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        $_SESSION['user_id'] = $user['id'];
        header("Location: dashboard.php");
    } else {
        echo "Invalid login details";
    }
}
?>`,
    analysis: {
      explanation: "This snippet is a procedural PHP script for user authentication. It reads credentials from HTTP POST, executes an inline MySQL query, checks user existence, and updates session state.",
      security: [
        "CRITICAL: Vulnerable to SQL Injection via direct interpolation of `$username` and `$password` into string.",
        "HIGH: Plaintext password comparison without `password_verify()` or bcrypt/argon2 hashing.",
        "MEDIUM: Missing CSRF token validation on POST form submission."
      ],
      refactored: `<?php
// Refactored with Prepared Statements & Bcrypt Hashing
session_start();
$pdo = new PDO("mysql:host=localhost;dbname=client_portal;charset=utf8mb4", "dbuser", "SECURE_ENV_PASS", [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
]);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare("SELECT id, password_hash, role FROM users WHERE username = :username");
    $stmt->execute([':username' => $username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        session_regenerate_id(true);
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        header("Location: /dashboard");
        exit;
    } else {
        $error = "Invalid username or password.";
    }
}
?>`
    }
  },
  {
    name: 'ESP32 Ultrasonic Sonar (C++)',
    language: 'cpp',
    code: `#include <Arduino.h>

#define TRIG_PIN 12
#define ECHO_PIN 14
#define BUZZER_PIN 27

void setup() {
    Serial.begin(115200);
    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
    pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
    digitalWrite(TRIG_PIN, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);

    long duration = pulseIn(ECHO_PIN, HIGH);
    float distanceCm = duration * 0.034 / 2;

    if (distanceCm < 30.0) {
        digitalWrite(BUZZER_PIN, HIGH);
        Serial.printf("[ALERT] Obstacle at %.1f cm!\\n", distanceCm);
    } else {
        digitalWrite(BUZZER_PIN, LOW);
    }
    delay(100);
}`,
    analysis: {
      explanation: "This C++ firmware controls an ESP32 microcontroller reading an HC-SR04 ultrasonic sensor. It fires a 10µs trigger pulse, measures echo return duration, calculates distance in centimeters, and toggles a hardware buzzer when obstacle distance falls under 30cm.",
      security: [
        "OPTIMIZATION: `pulseIn()` is a blocking function and can stall microprocessor execution for up to 1 second if no echo returns.",
        "ROBUSTNESS: Add a timeout parameter to `pulseIn(ECHO_PIN, HIGH, 30000)` to avoid soft-locks.",
        "POWER: Delay loop can be converted to freeRTOS task or non-blocking `millis()` timer."
      ],
      refactored: `#include <Arduino.h>

const int TRIG_PIN = 12;
const int ECHO_PIN = 14;
const int BUZZER_PIN = 27;

unsigned long lastPingTime = 0;
const unsigned long PING_INTERVAL_MS = 80;

void setup() {
    Serial.begin(115200);
    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
    pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
    unsigned long now = millis();
    if (now - lastPingTime >= PING_INTERVAL_MS) {
        lastPingTime = now;

        digitalWrite(TRIG_PIN, LOW);
        delayMicroseconds(2);
        digitalWrite(TRIG_PIN, HIGH);
        delayMicroseconds(10);
        digitalWrite(TRIG_PIN, LOW);

        // Non-blocking timeout at 30ms (~500cm max range)
        long duration = pulseIn(ECHO_PIN, HIGH, 30000);
        if (duration > 0) {
            float distanceCm = (duration * 0.0343f) / 2.0f;
            if (distanceCm < 30.0f) {
                digitalWrite(BUZZER_PIN, HIGH);
                Serial.printf("[ALERT] Distance: %.1f cm -> BUZZER ACTIVE\\n", distanceCm);
            } else {
                digitalWrite(BUZZER_PIN, LOW);
            }
        }
    }
}`
    }
  },
  {
    name: 'YOLOv8 + FastAPI Webhook (Python)',
    language: 'python',
    code: `from fastapi import FastAPI, BackgroundTasks
import cv2
from ultralytics import YOLO

app = FastAPI(title="Border Surveillance Vision API")
model = YOLO("yolov8n.pt")

@app.post("/analyze-frame")
async def analyze_frame(image_path: str):
    image = cv2.imread(image_path)
    results = model(image)
    
    detections = []
    for r in results:
        for box in r.boxes:
            cls = int(box.cls[0])
            conf = float(box.conf[0])
            if conf > 0.5:
                detections.append({"class": cls, "confidence": conf})
                
    return {"status": "success", "detections": detections}`,
    analysis: {
      explanation: "This Python FastAPI endpoint loads a pretrained YOLOv8 object detection model and processes video frames passed via file path, filtering bounding box outputs by confidence score > 0.5.",
      security: [
        "PERFORMANCE: Reloading images from local disk path causes disk I/O bottlenecks. Use async in-memory byte streams or shared GPU tensors.",
        "VALIDATION: Validate input file path to prevent arbitrary local file disclosure.",
        "MODEL WARMUP: Model inference should run inside FastAPI `lifespan` context manager rather than per request."
      ],
      refactored: `from fastapi import FastAPI, UploadFile, File, HTTPException
import numpy as np
import cv2
from ultralytics import YOLO
from contextlib import asynccontextmanager

models = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Pre-warm GPU CUDA model on startup
    models["yolo"] = YOLO("yolov8n.pt")
    yield
    models.clear()

app = FastAPI(title="Optimized Vision API", lifespan=lifespan)

@app.post("/analyze-bytes")
async def analyze_bytes(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid image content type")

    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = models["yolo"](image, verbose=False)
    detections = []
    for r in results:
        for box in r.boxes:
            conf = float(box.conf[0])
            if conf >= 0.5:
                detections.append({
                    "class_name": model.names[int(box.cls[0])],
                    "confidence": round(conf, 3),
                    "bbox": box.xyxy[0].tolist()
                })

    return {"status": "ok", "count": len(detections), "detections": detections}`
    }
  }
];

export const CodeAnalyzerSimulator: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'explain' | 'audit' | 'refactor'>('explain');
  const [isProcessing, setIsProcessing] = useState(false);

  const snippet = PRESET_SNIPPETS[selectedIdx];

  const handleRunAnalysis = (tab: 'explain' | 'audit' | 'refactor') => {
    setIsProcessing(true);
    setActiveTab(tab);
    setTimeout(() => {
      setIsProcessing(false);
    }, 400);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white tracking-wide">
              Natural Code AI Platform Sandbox
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Test Mayank's AI code analysis, vulnerability audit, and automated refactoring engine.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">Select Code:</span>
          <select
            value={selectedIdx}
            onChange={(e) => {
              setSelectedIdx(Number(e.target.value));
            }}
            className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-purple-300 font-mono focus:outline-none focus:border-purple-500"
          >
            {PRESET_SNIPPETS.map((s, i) => (
              <option key={i} value={i}>
                {s.name} ({s.language.toUpperCase()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Editor & AI Output Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input Code Viewer */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-t border border-slate-800">
            <span className="flex items-center gap-1.5 text-slate-200">
              <FileCode className="w-3.5 h-3.5 text-purple-400" /> Source Snippet ({snippet.language})
            </span>
            <span className="text-emerald-400 text-[10px]">Ready</span>
          </div>

          <pre className="bg-slate-900 p-3 rounded-b border border-t-0 border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto max-h-[380px] leading-relaxed">
            <code>{snippet.code}</code>
          </pre>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => handleRunAnalysis('explain')}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border ${
                activeTab === 'explain'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Explain Architecture
            </button>
            <button
              onClick={() => handleRunAnalysis('audit')}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border ${
                activeTab === 'audit'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Security & Bug Audit
            </button>
            <button
              onClick={() => handleRunAnalysis('refactor')}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border ${
                activeTab === 'refactor'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Refactor Code
            </button>
          </div>
        </div>

        {/* Right: AI Output Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-4 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-mono">
            <span className="text-purple-300 font-bold uppercase tracking-wide flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-purple-400" /> Natural Code AI Response
            </span>
            <span className="text-slate-500 text-[11px]">Mode: {activeTab.toUpperCase()}</span>
          </div>

          {isProcessing ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 space-y-3">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-mono text-purple-300 animate-pulse">
                Natural Code Engine parsing AST & generating AI response...
              </p>
            </div>
          ) : (
            <div className="flex-1 space-y-3 font-mono text-xs overflow-y-auto max-h-[380px] pr-1">
              {activeTab === 'explain' && (
                <div className="space-y-3">
                  <div className="p-3 bg-slate-950 rounded border border-purple-500/20 text-purple-200 leading-relaxed">
                    <p className="font-sans text-sm text-slate-100 font-medium mb-1">Architecture Overview:</p>
                    {snippet.analysis.explanation}
                  </div>
                  <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded border border-slate-800">
                    💡 <strong className="text-slate-200">Key Insight:</strong> Parsed AST confirms proper variable bindings and runtime entry point. Recommended for integration into Natural Code Platform editor plugin.
                  </div>
                </div>
              )}

              {activeTab === 'audit' && (
                <div className="space-y-2">
                  <p className="font-sans text-sm font-semibold text-amber-300">
                    Audit Diagnostics ({snippet.analysis.security.length} findings):
                  </p>
                  {snippet.analysis.security.map((sec, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-slate-950 rounded border border-amber-500/30 text-amber-200 text-[11px] leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-amber-400 font-bold shrink-0">[{i + 1}]</span>
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'refactor' && (
                <div className="space-y-2">
                  <p className="font-sans text-sm font-semibold text-emerald-400">
                    AI Automated Refactored Output:
                  </p>
                  <pre className="p-3 bg-slate-950 rounded border border-emerald-500/30 text-emerald-300 text-[11px] overflow-x-auto leading-relaxed">
                    <code>{snippet.analysis.refactored}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          <div className="text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-2 flex items-center justify-between">
            <span>MODEL: NaturalCode-v2 (Deep Code AST)</span>
            <span className="text-emerald-400">STATUS: Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
