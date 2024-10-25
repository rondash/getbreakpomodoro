// File: src/components/TimerApp.tsx
"use client"

import { useState, useEffect } from "react"
import { RotateCcw } from "lucide-react"

interface TimerProps {
  defaultDuration?: number
}

const TimerApp: React.FC<TimerProps> = ({ defaultDuration = 25 }) => {
  const [timeLeft, setTimeLeft] = useState(defaultDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(defaultDuration)

  useEffect(() => {
    const audio = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA==')
    return () => audio.remove()
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleTimerComplete()
    }
    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const handleTimerComplete = () => {
    setIsRunning(false)
    const audio = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA==')
    audio.play()
    setTimeLeft(selectedDuration * 60)
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(selectedDuration * 60)
  }

  const setTimePeriod = (minutes: number) => {
    setSelectedDuration(minutes)
    setTimeLeft(minutes * 60)
    setIsRunning(false)
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  const timeOptions = [5, 25, 45]

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8">
        <div className="relative mb-8">
          <div className="text-sm mb-2 text-red-500">
            Work to do
          </div>
          <div className="text-8xl font-bold tracking-wider mb-4">
            {formatTime(timeLeft)}
          </div>
        </div>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={toggleTimer}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg 
            transition-all duration-200 flex items-center justify-center gap-2
            border border-white/30 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
          >
            {isRunning ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 4l15 8-15 8V4z"/>
              </svg>
            )}
            {isRunning ? "PAUSE" : "START"}
          </button>
          
          <button
            onClick={resetTimer}
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200"
          >
            <RotateCcw className="w-5 h-5 text-red-500" />
          </button>
        </div>

        <div className="flex gap-3 justify-center">
          {timeOptions.map((minutes) => (
            <button
              key={minutes}
              onClick={() => setTimePeriod(minutes)}
              className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 
                ${selectedDuration === minutes 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
            >
              {minutes}min
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimerApp