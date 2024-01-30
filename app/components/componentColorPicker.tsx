'use client';

import Color from 'color';

export interface ColorPickerProps {
  color: Color;
  onChange: (color: Color) => void;
}

export default function ColorPickerComponent(props: ColorPickerProps) {
  const { color = Color.rgb(0, 0, 0), onChange } = props;

  const handleColorChange = (newColor: Color) => {
    if (newColor !== color) {
      onChange(newColor);
    }
  };
  return (
    <div className="color-picker panel flex justify-center flex-col flex-grow">
      <input
        type="text"
        name="hex"
        id="hex"
        className="text-center h-24"
        style={{
          background: color.hexa(),
          color: color.value() > 50 ? 'black' : 'white',
        }}
        value={color.rgb().string().toUpperCase()}
        readOnly
      />
      <input
        type="range"
        name="hue"
        id="hue"
        min={0}
        max={359.9999}
        value={color.hue()}
        style={{
          backgroundImage:
            'linear-gradient(to right , red, yellow, lime, cyan, blue, magenta, red)',
        }}
        onChange={(e) => {
          handleColorChange(color.hue(parseFloat(e.target.value)));
        }}
      />
      <input
        type="range"
        name="sat"
        id="sat"
        min={0}
        max={100}
        value={color.saturationv()}
        style={{
          background:
            'linear-gradient(to right, white, hsl(' +
            color.hue() +
            ', 100%, 50%)',
        }}
        onChange={(e) => {
          handleColorChange(color.saturationv(parseFloat(e.target.value)));
        }}
      />
      <input
        type="range"
        name="val"
        id="val"
        min={0}
        max={100}
        value={color.value()}
        style={{
          background:
            'linear-gradient(to right, black, hsl(' +
            color.hue() +
            ', ' +
            color.saturationv() +
            '%, ' +
            100 / (color.saturationv() / 100 + 1) +
            '%)',
        }}
        onChange={(e) => {
          handleColorChange(color.value(parseFloat(e.target.value)));
        }}
      />
      <input
        type="range"
        name="alpha"
        id="alpha"
        min={0}
        max={1}
        step={0.01}
        value={color.alpha()}
        style={{
          background:
            'linear-gradient(to right, transparent, ' + color.hex() + ')',
        }}
        onChange={(e) => {
          handleColorChange(color.alpha(parseFloat(e.target.value)));
        }}
      />
      <input
        type="text"
        name="hex"
        id="hex"
        className="text-center"
        value={color.hexa()}
        onChange={(e) => {
          handleColorChange(color.hexa(e.target.value));
        }}
        disabled
      />
    </div>
  );
}
