import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import churchBackground from '@/assets/church-background.jpg';
import clcLogo from '@/assets/clc-logo.png';

const TreasureHunt = () => {
  const [teamName, setTeamName] = useState('');
  const [code, setCode] = useState(['', '', '', '', '']);
  const [gameState, setGameState] = useState<'input' | 'success' | 'failure'>('input');
  const [activeDigit, setActiveDigit] = useState<string | null>(null);
  const CORRECT_CODE = '01964';

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Show active digit feedback
      if (value) {
        setActiveDigit(value);
        setTimeout(() => setActiveDigit(null), 300);
      }
      
      // Auto-focus next input
      if (value && index < 4) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyboardClick = (digit: string) => {
    // Find the first empty input
    const emptyIndex = code.findIndex(c => c === '');
    if (emptyIndex !== -1) {
      handleCodeChange(emptyIndex, digit);
    }
  };

  const handleSubmit = () => {
    const enteredCode = code.join('');
    if (enteredCode === CORRECT_CODE) {
      setGameState('success');
    } else {
      setGameState('failure');
    }
  };

  const resetGame = () => {
    setGameState('input');
    setCode(['', '', '', '', '']);
    setTeamName('');
  };

  const tryAgain = () => {
    setGameState('input');
    setCode(['', '', '', '', '']);
    setActiveDigit(null);
    setActiveDigit(null);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${churchBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-8 text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img src={clcLogo} alt="CLC Logo" className="w-20 h-20" />
          </div>
          
          {/* Title in Malayalam style */}
          <div>
            <h1 className="text-2xl font-bold text-orange-600 mb-2">പാതാളാവേട്ട</h1>
            <p className="text-gray-600 text-sm">Break the code to find the hidden treasure</p>
            <p className="text-gray-500 text-xs mt-1">Organized by Karuvannur CLC</p>
          </div>

          {/* Flower decoration */}
          <div className="text-2xl">🌺</div>

          {gameState === 'input' && (
            <div className="space-y-6">
              {/* Team Name Input */}
              <div>
                <Input
                  placeholder="Enter your team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="text-center"
                />
              </div>

              {/* Code Input */}
              <div className="space-y-4">
                <div className="flex justify-center space-x-2">
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-lg font-bold border-2"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Enter the 5-digit code to unlock the treasure</p>
              </div>

              {/* Virtual Keyboard */}
              <div className="space-y-3">
                <p className="text-xs text-gray-500">Tap the numbers below:</p>
                <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                    <Button
                      key={digit}
                      variant="outline"
                      onClick={() => handleKeyboardClick(digit.toString())}
                      className={`w-12 h-12 text-lg font-bold transition-all duration-200 ${
                        activeDigit === digit.toString() 
                          ? 'bg-orange-500 text-white border-orange-500 scale-110' 
                          : 'hover:bg-orange-100 hover:border-orange-300'
                      }`}
                      disabled={code.every(c => c !== '')}
                    >
                      {digit}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    const lastFilledIndex = code.map((c, i) => c !== '' ? i : -1).filter(i => i !== -1).pop();
                    if (lastFilledIndex !== undefined) {
                      const newCode = [...code];
                      newCode[lastFilledIndex] = '';
                      setCode(newCode);
                    }
                  }}
                  className="w-20 h-10 text-sm bg-red-50 hover:bg-red-100 border-red-200"
                  disabled={code.every(c => c === '')}
                >
                  ⌫ Clear
                </Button>
              </div>

              {/* Submit Button */}
              <Button 
                onClick={handleSubmit}
                disabled={!teamName || code.some(d => !d)}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3"
              >
                Break the Code 🔐
              </Button>
            </div>
          )}

          {gameState === 'success' && (
            <div className="space-y-6">
              <div className="text-6xl">🏆</div>
              <div>
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  Team {teamName} Won the Treasure Hunt!
                </h2>
                <p className="text-gray-600 mb-4">
                  Congratulations! Team {teamName} discovered the hidden Onam treasure. 
                  May this festival bring you prosperity and joy! 🌺
                </p>
                <div className="flex justify-center space-x-2 text-2xl mb-4">
                  🎊 💰 🌸 🎉 ✨
                </div>
              </div>
              <Button 
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3"
              >
                Play Again 🔄
              </Button>
            </div>
          )}

          {gameState === 'failure' && (
            <div className="space-y-6">
              <div className="text-6xl">💫</div>
              <div>
                <h2 className="text-2xl font-bold text-red-600 mb-4">You Lost This Round</h2>
                <p className="text-gray-600 mb-4">
                  The treasure remains hidden. Don't give up! Try again and unlock the Onam festivities.
                </p>
                <div className="flex justify-center space-x-2 text-2xl mb-4">
                  🌺 😔 🌺
                </div>
              </div>
              <Button 
                onClick={tryAgain}
                className="w-full bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white font-semibold py-3"
              >
                Try Again 🔍
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              ✨ Happy Onam! May the harvest festival bring you abundance ✨
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreasureHunt;