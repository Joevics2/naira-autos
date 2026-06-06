/**
 * Fallback image pool for blog posts that don't have a featured_image set.
 *
 * All images are from Pexels (free, no attribution required under Pexels licence).
 * The pool covers a variety of automotive subjects: SUVs, sedans, interiors,
 * engine bays, traffic, roads, workshops, and dashboards — suitable for a
 * Nigerian automotive editorial context.
 *
 * Images are assigned deterministically from the post slug so the same post
 * always gets the same image, and different posts get different images.
 */

const FALLBACK_IMAGES = [
  // Exterior / on-road
  'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200',   // classic silver sedan on road
  'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1200', // white SUV front angle
  'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1200',   // red car driving
  'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200',   // black car on wet road
  'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1200',   // car headlight close-up
  'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1200',   // white SUV parked dust road
  'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200',   // grey sedan side profile
  'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1200', // car driving sunset highway

  // Interior / dashboard
  'https://images.pexels.com/photos/1082655/pexels-photo-1082655.jpeg?auto=compress&cs=tinysrgb&w=1200', // steering wheel close-up
  'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1200', // modern car interior dashboard
  'https://images.pexels.com/photos/1009871/pexels-photo-1009871.jpeg?auto=compress&cs=tinysrgb&w=1200', // gear shift interior
  'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200', // driver POV dashboard

  // Engine / mechanical
  'https://images.pexels.com/photos/4489730/pexels-photo-4489730.jpeg?auto=compress&cs=tinysrgb&w=1200', // mechanic working under hood
  'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=1200', // engine bay close-up
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200', // mechanic hands on engine

  // Traffic / urban
  'https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=1200', // busy city traffic
  'https://images.pexels.com/photos/2526935/pexels-photo-2526935.jpeg?auto=compress&cs=tinysrgb&w=1200', // cars queued at traffic light
  'https://images.pexels.com/photos/1008590/pexels-photo-1008590.jpeg?auto=compress&cs=tinysrgb&w=1200', // night city traffic light trails

  // Keys / buying
  'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200',   // car keys on table
  'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1200', // handshake car sale dealership
];

/**
 * Returns a fallback image URL for a given post slug.
 * The same slug always resolves to the same image (deterministic),
 * but different slugs will typically resolve to different images.
 */
function slugToIndex(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0; // unsigned 32-bit
  }
  return hash % FALLBACK_IMAGES.length;
}

export function getBlogFallbackImage(slug: string): string {
  return FALLBACK_IMAGES[slugToIndex(slug)];
  }
  
