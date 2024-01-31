export function convertToRRGGBBAA(aarrggbb: string) {
  // Skip if there is no alpha channel
  if (aarrggbb.length < 7) {
    return aarrggbb;
  }

  // Extract channels
  var aa = aarrggbb.substring(1, 3);
  var rr = aarrggbb.substring(3, 5);
  var gg = aarrggbb.substring(5, 7);
  var bb = aarrggbb.substring(7, 9);

  // Rearrange and create the new format
  var rrggbbaa = '#' + rr + gg + bb + aa;
  return rrggbbaa;
}

export function convertToAARRGGBB(rrggbbaa: string) {
  // Skip if there is no alpha channel
  if (rrggbbaa.length < 7) {
    return rrggbbaa;
  }

  // Extract channels
  var rr = rrggbbaa.substring(1, 3);
  var gg = rrggbbaa.substring(3, 5);
  var bb = rrggbbaa.substring(5, 7);
  var aa = rrggbbaa.substring(7, 9);

  // Rearrange and create the new format
  var aarrggbb = '#' + aa + rr + gg + bb;
  return aarrggbb;
}

export function ledIdToName(LedId: string) {
  const regex = /^([A-Za-z]+)_?([A-Z]([a-z]|\d){1,4}|[A-Z]?\d?)/;
  const match = LedId.match(regex);

  const alias: { [key: string]: string } = {
    Mainboard: 'MB',
    GraphicsCard: 'GPU',
    Mouse: 'M',
    Mousepad: 'MP',
    Keyboard: 'KB',
  };

  if (match && alias[match[1]]) {
    return alias[match[1]] + '\n' + match[2];
  } else {
    console.warn('Failed to match LedId ' + LedId);
    return '?';
  }
}
