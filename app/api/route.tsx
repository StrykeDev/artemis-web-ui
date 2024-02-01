import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

import { convertToArtemisHexa, convertToHexa } from '../utils/conversions';

// TODO: Move to environment variables.
const ip = 'localhost';
const port = 9696;
const baseUrl = `http://${ip}:${port}/remote-control-brushes/`;

let lastColor = '';
let lastLayerId = '';

export interface ProfileInterface {
  ProfileId: string;
  ProfileName: string;
  LayerId: string;
  LayerName: string;
}

export interface LedInterface {
  LedId: string;
  Color: string;
}

export async function GET(request: NextRequest) {
  try {
    // Attempt to get layer id from the request params
    const LayerId = request.nextUrl.searchParams.get('LayerId');

    if (LayerId) {
      // If there is a layer id attempt to fetch the layer data
      console.info('Fetching layer data: ' + LayerId);

      const res = await axios.get(baseUrl + LayerId);
      const color = res.data.LedColors
        ? convertToHexa(res.data.LedColors[0].Color)
        : '#00000000';

      const data = {
        LayerId: res.data.LayerId,
        Color: color,
        LedColors: res.data.LedColors,
      };

      console.info('Data received:');
      console.info(data);

      return NextResponse.json(data);
    } else {
      // Fetch profiles data
      console.info('Fetching profiles data');

      const res = await axios.get(baseUrl);

      console.info('Data received:');
      console.info(res.data);

      return NextResponse.json(res.data);
    }
  } catch (error) {
    console.error('Error:', error);
    NextResponse.json({ status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { LayerId, Color, LedColors } = await request.json();

    // Skip if the desired led color is already set
    if (Color === lastColor && LayerId === lastLayerId) {
      return NextResponse.json({ status: 200 });
    } else {
      lastColor = Color;
      lastLayerId = LayerId;
    }

    // Creating and POST the payload
    const artemisHexa = convertToArtemisHexa(Color);
    const payload: LedInterface[] = [];

    LedColors.forEach((led: LedInterface) => {
      payload.push({ LedId: led.LedId, Color: artemisHexa });
    });

    console.info(
      `Updating layer ${LayerId} color to ${Color} for ${LedColors.length} LEDs`
    );

    const res = await axios.post(baseUrl + LayerId + '/update-colors', payload);

    return Response.json(res.data);
  } catch (error) {
    console.error('Error:', error);
    NextResponse.json({ status: 500 });
  }
}
