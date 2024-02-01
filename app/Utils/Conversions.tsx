/**
 * Convert Artemis HEXA color to standard HEXA color
 *
 * @example #AARRGGBB -> #RRGGBBAA
 *
 * @param ArtemisHexa Artemis HEXA color
 * @returns HEXA color
 */
export const convertToHexa = (ArtemisHexa: string): string => {
  // Return the original value if there is no alpha channel
  if (ArtemisHexa.length < 7) {
    return ArtemisHexa;
  }

  // Extract channels
  var alpha = ArtemisHexa.substring(1, 3);
  var red = ArtemisHexa.substring(3, 5);
  var green = ArtemisHexa.substring(5, 7);
  var blue = ArtemisHexa.substring(7, 9);

  // Rearrange and create the new format
  var hexa = '#' + red + green + blue + alpha;

  return hexa;
};

/**
 * Convert standard HEXA color to Artemis HEXA color
 *
 * @example #RRGGBBAA -> #AARRGGBB
 *
 * @param Hexa HEXA color
 * @returns Artemis HEXA color
 */
export const convertToArtemisHexa = (Hexa: string): string => {
  // Return the original value if there is no alpha channel
  if (Hexa.length < 7) {
    return Hexa;
  }

  // Extract channels
  var red = Hexa.substring(1, 3);
  var green = Hexa.substring(3, 5);
  var blue = Hexa.substring(5, 7);
  var alpha = Hexa.substring(7, 9);

  // Rearrange and create the new format
  var ArtemisHex = '#' + alpha + red + green + blue;

  return ArtemisHex;
};

/**
 * Convert LED ID to human readable name
 *
 * @param LedId LED ID
 * @returns LED name
 *
 * @todo Provide a default value for missing aliases
 */
export const convertToLedName = (LedId: string): string => {
  // Aliases dictionary
  const alias: { [key: string]: string } = {
    Mainboard: 'MB',
    GraphicsCard: 'GPU',
    Mouse: 'M',
    Mousepad: 'MP',
    Keyboard: 'KB',
  };

  // Matches words separated by an optional underscore then a world or a number
  const regex = /^([A-Za-z]+)_?([A-Z]([a-z]|\d){1,4}|[A-Z]|\d+)/;
  const match = LedId.match(regex);

  // If matched successfully and found an alias, return the aliased name; else return '?'
  if (match && alias[match[1]]) {
    return alias[match[1]] + '\n' + match[2];
  } else {
    console.warn('Failed to match LedId ' + LedId);
    return '?';
  }
};
