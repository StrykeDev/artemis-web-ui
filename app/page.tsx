'use client';

import { useState } from 'react';

import Color from 'color';

import ColorPicker from './components/componentColorPicker';

export default function Home() {
  const [selectedColor, setSelectedColor] = useState<Color>(
    Color.hsv(360, 0, 100, 1)
  );

  const handleColorChange = (newColor: Color) => {
    if (selectedColor != newColor) {
      setSelectedColor(newColor);
    }
  };

  return (
    <>
      <header className="flex justify-between panel-border border-b-4">
        <h1>Artemis Web UI</h1>
        <select name="brush" id="brush" disabled></select>
      </header>
      <main className="p-4">
        <ColorPicker color={selectedColor} onChange={handleColorChange} />
      </main>
    </>
  );
}
