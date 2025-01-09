export async function GET() {
  const url = process.env.NEXT_PUBLIC_API_SYMFONY_URL;
  const games = await fetch(url).then((res) => res.json());
  console.log(games);
  return new Response(JSON.stringify(games), { status: 200 });
}
