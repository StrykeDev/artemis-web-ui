'use client';

// Libs
import { useEffect, useState } from 'react';
import axios from 'axios';
import Color from 'color';

// Components
import ColorPicker from './components/componentColorPicker';

// Interfaces
import { LedInterface, ProfileInterface } from './api/route';
import { convertToRRGGBBAA } from './Utils/Conversions';

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
          LedColors: res.data.LedColors,
        });

        setSelectedColor(selectedColor.hexa(res.data.Color));
      });
    }
  };

  const handleColorChange = (newColor: Color) => {
    setSelectedColor(newColor);

    if (selectedLayer && selectedLayer.LedColors) {
      axios.post('/api', {
        LayerId: selectedLayer.LayerId,
        Color: newColor.hexa(),
        LedColors: selectedLayer.LedColors,
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
        </section>
        <section className="m-4 panel flex flex-col">
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
