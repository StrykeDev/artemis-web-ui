'use client';

import { useEffect, useState } from 'react';

// Libs
import axios from 'axios';
import Color from 'color';

// Components
import ColorPicker from './components/componentColorPicker';

// Interfaces
import { LedInterface, ProfileInterface } from './api/route';

const defaultColor = Color.hsv(359.9999, 100, 100, 1);

export default function Home() {
  const [profiles, setProfiles] = useState<ProfileInterface[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<{
    LayerId: string;
    LedColors: LedInterface;
  }>();
  const [selectedColor, setSelectedColor] = useState<Color>(defaultColor);

  useEffect(() => {
    // Load profiles
    axios.get('/api').then((res) => {
      setProfiles(res.data);
    });
  }, []);

  const handleLayerChange = (newLayerId: string) => {
    if (
      newLayerId &&
      (selectedLayer === undefined || newLayerId !== selectedLayer.LayerId)
    ) {
      axios.get('/api', { params: { LayerId: newLayerId } }).then((res) => {
        setSelectedLayer({
          LayerId: newLayerId,
          LedColors: res.data,
        });

        if (res.data) {
          setSelectedColor(selectedColor.hexa(res.data[0].Color));
        }
      });
    }
  };

  const handleColorChange = (newColor: Color) => {
    setSelectedColor(newColor);

    if (selectedLayer && selectedLayer.LedColors) {
      axios.post('/api', {
        LayerId: selectedLayer.LayerId,
        LedColors: selectedLayer.LedColors,
        Color: newColor.hex(),
      });
    }
  };

  return (
    <>
      <main>
        <section className="m-4 panel flex flex-col">
          <select
            name="brush"
            id="brush"
            className=" flex-grow-1"
            value={selectedLayer ? selectedLayer.LayerId : ''}
            onChange={(e) => handleLayerChange(e.target.value)}
            disabled={profiles.length < 1}
          >
            <option value="" disabled hidden>
              Select a layer
            </option>
            {profiles.map((profile) => {
              return (
                <option value={profile.LayerId} key={profile.LayerId}>
                  {profile.ProfileName + '\\' + profile.LayerName}
                </option>
              );
            })}
          </select>
          <ColorPicker
            color={selectedColor}
            onChange={handleColorChange}
            disabled={selectedLayer === undefined}
          />
        </section>
      </main>
    </>
  );
}
