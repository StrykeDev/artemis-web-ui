'use client';

import Color from 'color';

export interface ColorPickerProps {
  value: Color;
  disabled?: boolean;
  onChange: (color: Color) => void;
}

/**
 * Color picker component.
 *
 * @param value Color value
 * @param disabled Should this component be disabled?
 *
 * @callback onChange Called when the color value changed
 */
export default function ColorPickerComponent(props: ColorPickerProps) {
  const {
    value: color = Color.rgb(0, 0, 0),
    disabled = false,
    onChange,
  } = props;

  const handleColorChange = (newColor: Color) => {
    onChange(newColor);
  };

  return (
    <div className="color-picker flex justify-center flex-col flex-grow">
      <input
        type="text"
        name="hex"
        id="hex"
        className="text-center h-24"
        style={{
          background: color.hexa(),
          color: color.value() > 50 && color.alpha() > 0.5 ? 'black' : 'white',
        }}
        value={color.rgb().string().toUpperCase()}
        readOnly
      />
      <input
        type="range"
        name="hue"
        id="hue"
        min={0}
        max={359.99999}
        value={color.hue()}
        style={{
          backgroundImage:
            'linear-gradient(to right , red, yellow, lime, cyan, blue, magenta, red)',
        }}
        onChange={(e) => {
          handleColorChange(color.hue(parseFloat(e.target.value)));
        }}
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={true}
      />
    </div>
  );
}
