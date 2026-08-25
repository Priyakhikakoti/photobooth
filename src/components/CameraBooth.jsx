import React, { useEffect, useRef, useState } from 'react';
import FilterSelector from './FilterSelector';
import CountdownOverlay from './CountdownOverlay';
import { getFilterById } from '../utils/filters';
import { playBeep, playShutterSound } from '../utils/audio';
import { Camera, RefreshCw, AlertCircle, Sparkles, VideoOff, Volume2, VolumeX } from 'lucide-react';

export default function CameraBooth({
  selectedFilter,
  onSelectFilter,
  onPhotosCaptured,
  onCancel
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [hasPermission, setHasPermission] = useState(null); // null = pending, true = granted, false = denied
  const [errorMessage, setErrorMessage] = useState('');
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdownNum, setCountdownNum] = useState(3);
  const [currentShotIndex, setCurrentShotIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Initialize camera stream on mount
  useEffect(() => {
    let isMounted = true;

    async function startCamera() {
      try {
        setHasPermission(null);
        setErrorMessage('');

        const constraints = {
          video: {
            width: { ideal: 1280 },
            height: { ideal: 960 },
            facingMode: 'user'
          },
          audio: false
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (!isMounted) {
          // If unmounted while waiting for permission, stop tracks immediately
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Camera access error:", err);
        if (isMounted) {
          setHasPermission(false);
          if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            setErrorMessage('Camera access was denied. Please allow camera permissions in your browser settings to continue.');
          } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
            setErrorMessage('No camera device found on your system. Please connect a webcam.');
          } else {
            setErrorMessage(`Could not access camera: ${err.message || 'Unknown error'}`);
          }
        }
      }
    }

    startCamera();

    return () => {
      isMounted = false;
      stopCameraStream();
    };
  }, []);

  function stopCameraStream() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }

  // Capture current video frame into a data URL with filter applied
  function captureFrame() {
    const video = videoRef.current;
    if (!video) return null;

    const canvas = document.createElement('canvas');
    // Maintain native video resolution or fallback to default
    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    
    // Mirror horizontally for natural selfie perspective
    ctx.translate(width, 0);
    ctx.scale(-1, 1);

    // Apply active filter to canvas context
    const currentFilter = getFilterById(selectedFilter);
    if (currentFilter && currentFilter.cssFilter !== 'none') {
      ctx.filter = currentFilter.cssFilter;
    }

    ctx.drawImage(video, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg', 0.95);
  }

  // Trigger 3-photo countdown loop
  const startPhotoSequence = () => {
    if (isCountingDown) return;
    setIsCountingDown(true);
    setCurrentShotIndex(0);

    const capturedPhotos = [];

    const runSingleShot = (shotIndex) => {
      setCurrentShotIndex(shotIndex);
      let timer = 3;
      setCountdownNum(timer);
      if (soundEnabled) playBeep(false);

      const interval = setInterval(() => {
        timer -= 1;
        setCountdownNum(timer);

        if (timer > 0) {
          if (soundEnabled) playBeep(false);
        } else {
          // Timer reached 0: Capture shot!
          clearInterval(interval);
          if (soundEnabled) playShutterSound();
          if (soundEnabled) playBeep(true);

          // Flash screen
          setIsFlashing(true);
          setTimeout(() => setIsFlashing(false), 220);

          // Snapshot frame
          const photoUrl = captureFrame();
          if (photoUrl) {
            capturedPhotos.push(photoUrl);
          }

          // Check if more shots remain
          if (shotIndex + 1 < 3) {
            // Short delay before starting next shot countdown
            setTimeout(() => {
              runSingleShot(shotIndex + 1);
            }, 800);
          } else {
            // Sequence complete! Finish up
            setTimeout(() => {
              setIsCountingDown(false);
              stopCameraStream();
              onPhotosCaptured(capturedPhotos);
            }, 600);
          }
        }
      }, 1000);
    };

    runSingleShot(0);
  };

  const activeFilterPreset = getFilterById(selectedFilter);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 flex flex-col items-center">
      {/* Top Controls Bar */}
      <div className="w-full flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-stone-600">Webcam Live</span>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 border border-peach-200 text-xs text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-peach-500" />
              <span>Sound On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              <span>Muted</span>
            </>
          )}
        </button>
      </div>

      {/* Main Video Preview Container */}
      <div className="relative w-full aspect-[4/3] bg-stone-900 rounded-3xl overflow-hidden border-4 border-white shadow-xl mb-6 flex items-center justify-center">
        {/* Permission Request Loading State */}
        {hasPermission === null && (
          <div className="flex flex-col items-center justify-center text-white p-6 text-center">
            <RefreshCw className="w-8 h-8 text-peach-400 animate-spin mb-3" />
            <p className="font-medium text-sm">Requesting camera access...</p>
            <p className="text-xs text-stone-400 mt-1">Please allow camera permissions in your browser popup.</p>
          </div>
        )}

        {/* Permission Denied Error View */}
        {hasPermission === false && (
          <div className="flex flex-col items-center justify-center text-white p-6 text-center max-w-md">
            <AlertCircle className="w-10 h-10 text-rose-400 mb-3" />
            <h3 className="font-bold text-lg mb-1">Camera Permission Required</h3>
            <p className="text-xs text-stone-300 mb-4">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary text-xs px-4 py-2"
            >
              Reload Page & Grant Access
            </button>
          </div>
        )}

        {/* Live Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            filter: activeFilterPreset ? activeFilterPreset.cssFilter : 'none',
            transform: 'scaleX(-1)' // Mirror preview for natural feedback
          }}
          className={`w-full h-full object-cover transition-all duration-300 ${
            hasPermission ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Subtle Vintage Grain Overlay on Preview */}
        <div className="grain-overlay" />

        {/* Countdown & Flash Overlay */}
        {isCountingDown && (
          <CountdownOverlay
            count={countdownNum}
            currentShotIndex={currentShotIndex}
            totalShots={3}
            isFlashing={isFlashing}
          />
        )}
      </div>

      {/* Filter Selector Pills */}
      <div className="w-full mb-6">
        <FilterSelector
          selectedFilter={selectedFilter}
          onSelectFilter={onSelectFilter}
          disabled={isCountingDown || !hasPermission}
        />
      </div>

      {/* Main Action Buttons */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <button
          onClick={onCancel}
          disabled={isCountingDown}
          className="btn-secondary flex-1 text-sm py-3 font-medium cursor-pointer"
        >
          <VideoOff className="w-4 h-4 text-stone-500" />
          <span>Stop Camera</span>
        </button>

        <button
          onClick={startPhotoSequence}
          disabled={!hasPermission || isCountingDown}
          className="btn-primary flex-2 text-base sm:text-lg py-3 font-bold cursor-pointer"
        >
          <Camera className="w-5 h-5 stroke-[2.5]" />
          <span>{isCountingDown ? 'Taking photos...' : 'Take 3 photos'}</span>
        </button>
      </div>
    </div>
  );
}
