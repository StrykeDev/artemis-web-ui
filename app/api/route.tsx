import axios from 'axios';

const ip = 'localhost';
const port = 9696;
const baseUrl = `http://${ip}:${port}/remote-control-brushes/`;

export async function GET() {
  try {
    const res = await axios.get(baseUrl);
    return Response.json(res.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function POST(request: Request) {
  const { brushId, color } = await request.json();

  try {
    const res1 = await axios.get(baseUrl + brushId);
    const leds: { LedId: string; Color: string }[] = [];
    res1.data.LedColors.forEach((led: { LedId: string }) => {
      leds.push({ LedId: led.LedId, Color: color });
    });

    const res2 = await axios.post(
      baseUrl + '/' + brushId + '/update-colors',
      leds
    );

    return Response.json(res1.data);
  } catch (error) {
    console.error('Error:', error);
  }
}
