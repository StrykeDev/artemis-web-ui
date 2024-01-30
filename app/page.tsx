'use client';

import { useEffect, useState } from 'react';

export function hsvaToHex({
  h,
  s,
  v,
  a,
}: {
  h: number;
  s: number;
  v: number;
  a: number;
}) {
  const c = (v / 100) * (s / 100);
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v / 100 - c;

  let r, g, b;

  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  // Convert RGB to hexadecimal
  const rgbToHex = (value: number) => {
    const hex = Math.round(value * 255)
      .toString(16)
      .padStart(2, '0');
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hex = `#${rgbToHex(r + m)}${rgbToHex(g + m)}${rgbToHex(b + m)}`;

  // Add alpha if not fully opaque
  const alphaHex = Math.round(a * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${alphaHex}`;
}

export default function Home() {
  const [ColorHSVA, setColorHSVA] = useState({
    h: 360.0,
    s: 100.0,
    v: 100.0,
    a: 1.0,
  });
  const [ColorHex, setColorHex] = useState('');

  useEffect(() => {
    const { h, s, v, a } = ColorHSVA;

    setColorHex(hsvaToHex(ColorHSVA));
  }, [ColorHSVA]);

  return (
    <>
      <header className="flex justify-between panel-border border-b-4">
        <h1>Artemis Web UI</h1>
        <select name="brush" id="brush" disabled></select>
      </header>
      <main className="flex flex-row">
        <aside className="panel-border border-r-4 min-w-40">
          <ul>
            <li>Static Color</li>
          </ul>
        </aside>
        <section className="color-picker panel flex justify-center flex-col flex-grow">
          <input
            type="text"
            name="hex"
            id="hex"
            className="text-center"
            style={{
              background:
                'hsla(' +
                ColorHSVA.h +
                ', ' +
                ColorHSVA.s +
                '%, ' +
                ColorHSVA.v / (ColorHSVA.s / 100 + 1) +
                '%, ' +
                ColorHSVA.a +
                ')',
              color:
                ColorHSVA.v / (ColorHSVA.s / 100 + 1) > 60 ? 'black' : 'white',
            }}
            value={ColorHex}
            disabled
          ></input>
          <input
            type="range"
            name="hue"
            id="hue"
            min={0}
            max={360}
            value={ColorHSVA.h}
            style={{
              backgroundImage:
                'linear-gradient(to right in hsl longer hue, red, red)',
            }}
            onChange={(e) => {
              setColorHSVA({
                h: parseFloat(e.target.value),
                s: ColorHSVA.s,
                v: ColorHSVA.v,
                a: ColorHSVA.a,
              });
            }}
          />
          <input
            type="range"
            name="sat"
            id="sat"
            min={0}
            max={100}
            value={ColorHSVA.s}
            style={{
              background:
                'linear-gradient(to right, hsl(' +
                ColorHSVA.h +
                ', 0%, 100%), hsl(' +
                ColorHSVA.h +
                ', 100%, 50%))',
            }}
            onChange={(e) => {
              setColorHSVA({
                h: ColorHSVA.h,
                s: parseFloat(e.target.value),
                v: ColorHSVA.v,
                a: ColorHSVA.a,
              });
            }}
          />
          <input
            type="range"
            name="val"
            id="val"
            min={0}
            max={100}
            value={ColorHSVA.v}
            style={{
              background:
                'linear-gradient(to right, hsl(' +
                ColorHSVA.h +
                ', ' +
                ColorHSVA.s +
                '%, 0%), hsl(' +
                ColorHSVA.h +
                ', ' +
                ColorHSVA.s +
                '%, ' +
                100 / (ColorHSVA.s / 100 + 1) +
                '%))',
            }}
            onChange={(e) => {
              setColorHSVA({
                h: ColorHSVA.h,
                s: ColorHSVA.s,
                v: parseFloat(e.target.value),
                a: ColorHSVA.a,
              });
            }}
          />
          <input
            type="range"
            name="alpha"
            id="alpha"
            min={0}
            max={1}
            step={0.01}
            value={ColorHSVA.a}
            style={{
              backgroundImage:
                'linear-gradient(to right, hsla(' +
                ColorHSVA.h +
                ', ' +
                ColorHSVA.s +
                '%, ' +
                ColorHSVA.v / (ColorHSVA.s / 100 + 1) +
                '%, 0), hsla(' +
                ColorHSVA.h +
                ', ' +
                ColorHSVA.s +
                '%, ' +
                ColorHSVA.v / (ColorHSVA.s / 100 + 1) +
                '%, 1))',
            }}
            onChange={(e) => {
              setColorHSVA({
                h: ColorHSVA.h,
                s: ColorHSVA.s,
                v: ColorHSVA.v,
                a: parseFloat(e.target.value),
              });
            }}
          />
        </section>
      </main>
    </>
  );
}
