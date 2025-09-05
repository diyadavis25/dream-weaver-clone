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
  const CORRECT_CODE = '01964';

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus next input
      if (value && index < 4) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
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