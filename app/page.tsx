'use client';

import { useEffect, useState } from 'react';

// Libs
import axios from 'axios';
import Color from 'color';

// Components
import ColorPicker from './components/componentColorPicker';

// Interfaces
import { ProfileInterface } from './api/route';

export default function Home() {
  const [profiles, setProfiles] = useState<ProfileInterface[]>([]);
  const [selectedBrush, setSelectedBrush] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<Color>(
    Color.hsv(359.9999, 100, 100, 1)
  );

  useEffect(() => {
    // Load profiles
    axios.get('/api').then((res) => {
      console.log(res.data);

      setProfiles(res.data);

      // Load first brush
      if (res.data.length > 0) {
        setSelectedBrush(res.data[0].brushId);
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
            disabled={profiles.length < 1}
          >
            {profiles.map((profile) => {
              return (
                <option value={profile.brushId} key={profile.brushId}>
                  {profile.profileName + '\\' + profile.layerName}
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
