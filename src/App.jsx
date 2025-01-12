import React, { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%&*~"

    for (let i = 0; i < length; i++) {
      let char = Math.floor((Math.random() * str.length) + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4">
      <div className="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-white">Random Password Generator</h1>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={password}
              className="flex-grow px-3 py-2 text-gray-800 bg-white bg-opacity-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={copyPasswordToClipboard}
            >
              Copy
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="length" className="text-sm font-medium text-white">Length: {length}</label>
              <input
                type="range"
                id="length"
                min={6}
                max={100}
                value={length}
                className="w-2/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                onChange={(e) => setLength(parseInt(e.target.value))}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="numberInput" className="text-sm font-medium text-white">Include Numbers</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={() => setCharAllowed((prev) => !prev)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="charInput" className="text-sm font-medium text-white">Include Special Characters</label>
            </div>
          </div>
        </div>
        <button
          onClick={passwordGenerator}
          className="w-full px-4 py-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Generate New Password
        </button>
      </div>
    </div>
  )
}

export default App

