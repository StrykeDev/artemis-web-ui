import { NextRequest, NextResponse } from 'next/server';

import axios from 'axios';

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
    const LayerId = request.nextUrl.searchParams.get('LayerId');

    if (LayerId) {
      // Fetch layer data
      console.info('Fetching layer data: ' + LayerId);
      const data = await getLayer(LayerId);
      console.info('Data received:');
      console.info(data);
      return NextResponse.json(data);
    } else {
      // Fetch profiles data
      console.info('Fetching profiles data');
      const data = await getProfiles();
      console.info('Data received:');
      console.info(data);
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { LayerId, LedColors, Color } = await request.json();

    if (Color === lastColor && LayerId === lastLayerId)
      return NextResponse.json({ status: 200 });

    lastColor = Color;
    lastLayerId = LayerId;

    const payload: LedInterface[] = [];
    LedColors.forEach((led: LedInterface) => {
      payload.push({ LedId: led.LedId, Color: Color });
    });

    console.info(
      `Updating layer ${LayerId} color to ${Color} for ${LedColors.length} LEDs`
    );
    const res = await axios.post(baseUrl + LayerId + '/update-colors', payload);

    return Response.json(res.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getLayer(LayerId: string): Promise<LedInterface[]> {
  const res = await axios.get(baseUrl + LayerId);
  return res.data.LedColors;
}

async function getProfiles(): Promise<ProfileInterface[]> {
  const res = await axios.get(baseUrl);
  return res.data;
}
