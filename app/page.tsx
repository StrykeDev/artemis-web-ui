'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Color from 'color';

import ColorPicker from './components/componentColorPicker';

import { LedInterface, ProfileInterface } from './api/route';
import { convertToLedName } from './utils/conversions';

/**
 * Home page
 */
export default function Home() {
  const [profiles, setProfiles] = useState<ProfileInterface[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<{
    LayerId: string;
    LedColors: LedInterface[];
  }>();
  const [selectedColor, setSelectedColor] = useState<Color>(
    Color.hsv(359.99999, 100, 100, 1)
  );

  useEffect(() => {
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
              Select a layer brush
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
            value={selectedColor}
            onChange={handleColorChange}
            disabled={selectedLayer === undefined}
          />
        </section>
        <section className="m-4 panel flex flex-row flex-wrap">
          {selectedLayer?.LedColors.map((led) => {
            return (
              <div
                key={led.LedId}
                className="m-1 p-1 h-10 w-12 flex-grow flex items-center justify-center text-center rounded text-xs whitespace-pre-line"
                style={{
                  background: selectedColor.hexa(),
                  color:
                    selectedColor.value() > 50 && selectedColor.alpha() > 0.5
                      ? 'black'
                      : 'white',
                }}
              >
                {convertToLedName(led.LedId)}
              </div>
            );
          })}
        </section>
        <section
          className="m-4 panel flex flex-col flex-wrap"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <h5>How to use:</h5>
          <p>
            You can access the web UI from any browser on your{' '}
            <strong>local network</strong> via the local IP of the PC which is
            running Artemis.
          </p>
          <p>
            You can find your local IP by opening a terminal (CMD) then typing{' '}
            <code>ipconfig</code>.
            <br />
            The local IP would be listed next to IPv4 Address.
          </p>
          <p>
            Go to your browser (on any device) and type in the URL the IP with
            port 3000.
            <br />
            Like this: <code>http://192.168.1.69:3000</code>
          </p>
          <p>
            If you did everything correctly you should be able to see this UI!
            <br /> Which makes this guide kinda pointless since you would not be
            able to read this...
          </p>
          <hr />
          <p>
            To use this app you need to have at least 1 active{' '}
            <strong>remote control layer</strong>.
            <br />
            Or just download the pre-made web UI profile.
          </p>
          <a
            href="https://workshop.artemis-rgb.com/entries/155/artemis-web-ui"
            className="button"
          >
            Download the Web UI Profile
          </a>
        </section>
      </main>
    </>
  );
}
