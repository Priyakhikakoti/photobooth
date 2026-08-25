import React, { useState } from 'react';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import CameraBooth from './components/CameraBooth';
import ResultScreen from './components/ResultScreen';
import { Heart } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState('welcome'); // 'welcome' | 'camera' | 'result'
  const [selectedFilter, setSelectedFilter] = useState('original');
  const [photos, setPhotos] = useState([]);

  const handleStart = () => {
    setPhotos([]);
    setScreen('camera');
  };

  const handlePhotosCaptured = (capturedPhotos) => {
    setPhotos(capturedPhotos);
    setScreen('result');
  };

  const handleReset = () => {
    setPhotos([]);
    setScreen('welcome');
  };

  const handleRetake = () => {
    setPhotos([]);
    setScreen('camera');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-peach-200">
      <div>
        <Header screen={screen} onReset={handleReset} />

        <main className="transition-all duration-300">
          {screen === 'welcome' && (
            <WelcomeScreen onStart={handleStart} />
          )}

          {screen === 'camera' && (
            <CameraBooth
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
              onPhotosCaptured={handlePhotosCaptured}
              onCancel={handleReset}
            />
          )}

          {screen === 'result' && (
            <ResultScreen
              photos={photos}
              filterId={selectedFilter}
              onRetake={handleRetake}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-xs text-stone-400 border-t border-peach-100 mt-12">
        <p className="flex items-center justify-center gap-1">
          <span>Peachy Booth</span>
          <span>✦</span>
          <span>Local-Only Vintage Photobooth</span>
          <span>✦</span>
          <Heart className="w-3 h-3 text-peach-400 fill-peach-300 inline" />
        </p>
      </footer>
    </div>
  );
}
