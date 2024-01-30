'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import Color from 'color';

import ColorPicker from './components/componentColorPicker';

export default function Home() {
  const [brushes, setBrushes] = useState<{ id: string; name: string }[]>([]);
  const [selectedBrush, setSelectedBrush] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<Color>(
    Color.hsv(253, 100, 100, 1)
  );

  useEffect(() => {
    axios.get('/api').then((res) => {
      const newBrushes: { id: string; name: string }[] = [];
      res.data.forEach(
        (brush: {
          LayerId: string;
          LayerName: string;
          ProfileName: string;
        }) => {
          newBrushes.push({
            id: brush.LayerId,
            name: brush.ProfileName + ' - ' + brush.LayerName,
          });
        }
      );

      if (newBrushes.length > 0) {
        setBrushes(newBrushes);
        setSelectedBrush(newBrushes[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedBrush) return;
    axios.post('/api', { brushId: selectedBrush, color: selectedColor.hex() });
  }, [selectedColor, selectedBrush]);

  return (
    <>
      <header className="flex justify-between align-middle panel-border border-b-4">
        <h1>Artemis Web UI</h1>
      </header>
      <main>
        <section className="m-4 panel flex flex-col">
          <select
            name="brush"
            id="brush"
            className=" flex-grow-1"
            value={selectedBrush}
            onChange={(e) => setSelectedBrush(e.target.value)}
            disabled={brushes.length < 1}
          >
            {brushes.map((brush) => {
              return (
                <option value={brush.id} key={brush.id}>
                  {brush.name}
                </option>
              );
            })}
          </select>
          <ColorPicker color={selectedColor} onChange={setSelectedColor} />
        </section>
      </main>
    </>
  );
}
