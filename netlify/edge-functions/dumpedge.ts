export default async () => new Response(JSON.stringify(Deno.env.toObject()), { headers: { 'content-type': 'application/json' } });
export const config = { path: '/dumpedge' };
