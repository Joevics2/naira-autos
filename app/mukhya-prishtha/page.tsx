import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TOOLS_HI } from '@/lib/tools-list-hi';
import { supabase } from '@/lib/supabase';
import { getBlogFallbackImage } from '@/lib/blogImages';
import { alternatesFor } from '@/lib/hreflang';
import LanguagePills from '@/components/ui/LanguagePills';

type LatestPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
};

export const revalidate = 604800;

export const metadata: Metadata = {
  title: 'Naira Autos हिन्दी — आपकी कार के लिए मुफ़्त टूल्स',
  description: 'आपकी कार के लिए हिन्दी में मुफ़्त टूल्स — हमने अभी भारतीय बाज़ार में शुरुआत की है और जल्द ही और टूल्स जोड़ेंगे। साइन अप की ज़रूरत नहीं, पूरी तरह मुफ़्त।',
  keywords: 'मुफ़्त कार टूल्स, Naira Autos हिन्दी, AI मैकेनिक',
  openGraph: {
    title: 'Naira Autos हिन्दी',
    description: 'कार खरीदने, बेचने और रखरखाव के लिए मुफ़्त टूल्स — हिन्दी में, बिना साइन अप के।',
    url: 'https://www.naira.autos/mukhya-prishtha',
    siteName: 'Naira Autos',
    locale: 'hi_IN',
    type: 'website',
  },
  alternates: alternatesFor('/mukhya-prishtha'),
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Naira Autos हिन्दी',
  description: 'आपकी कार के लिए हिन्दी में मुफ़्त टूल्स — जल्द ही और टूल्स आ रहे हैं।',
  url: 'https://www.naira.autos/mukhya-prishtha',
  inLanguage: 'hi',
  publisher: {
    '@type': 'Organization',
    name: 'Naira Autos',
    logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' },
  },
};

export default async function HomeHindiPage() {
  const { data: latestPosts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image')
    .eq('published', true)
    .eq('language', 'hi')
    .order('created_at', { ascending: false })
    .limit(3);

  const posts = (latestPosts ?? []) as LatestPost[];

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <h1 className="sr-only">Naira Autos हिन्दी — आपकी कार के लिए मुफ़्त टूल्स</h1>

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              हिन्दी
            </span>
          </div>
          <LanguagePills path="/mukhya-prishtha" className="mb-5" />
          <p
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            आपकी कार के लिए<br /><span className="text-emerald-400">मुफ़्त टूल्स</span>
          </p>
          <p className="text-white/70 text-base md:text-lg font-medium max-w-2xl leading-relaxed mb-3">
            Naira Autos कार खरीदने, बेचने या उसका रखरखाव करने वाले किसी भी व्यक्ति के लिए मुफ़्त टूल्स प्रदान करता है — AI वर्चुअल मैकेनिक, कैलकुलेटर और व्हीकल डेटा चेकर, बिना साइन अप और पूरी तरह मुफ़्त।
          </p>
          <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
            हमने नाइजीरिया के बाज़ार से शुरुआत की, और अब वही टूल्स कई और देशों और भाषाओं में ला रहे हैं — जिसमें भारत भी शामिल है। यह हिन्दी संस्करण अभी-अभी लॉन्च हुआ है, और हम समय के साथ और टूल्स तथा लेख जोड़ते रहेंगे।
          </p>
        </div>
      </div>

      {/* ── Coming soon (no Hindi tools live yet) ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-black uppercase text-foreground leading-none"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
          >
            जल्द आने वाले टूल्स
          </h2>
          <Link prefetch={false} href="/upkaran" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            सभी देखें <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {TOOLS_HI.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
            <p className="text-sm text-muted-foreground">
              हम हिन्दी में अपना पहला टूल तैयार कर रहे हैं। जल्द ही वापस आएं — या तब तक{' '}
              <Link prefetch={false} href="/tools" className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2">अंग्रेज़ी टूल्स</Link>{' '}आज़माएं।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS_HI.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link prefetch={false}
                  key={tool.href}
                  href={tool.href}
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:border-emerald-500/40 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-bold text-sm text-foreground leading-tight">{tool.label}</p>
                      {tool.badge && (
                        <span className={`flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wider ${tool.badgeColor}`}>
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{tool.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Latest posts (only if Hindi content exists) ── */}
      {posts.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-black uppercase text-foreground leading-none"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
            >
              नवीनतम लेख
            </h2>
            <Link prefetch={false} href="/blog-hindi" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              सभी देखें <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link prefetch={false}
                key={post.id}
                href={`/blog-hindi/${post.slug}`}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-emerald-500/40 hover:shadow-lg transition-all duration-200"
              >
                <div className="aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.featured_image || getBlogFallbackImage(post.slug)}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="font-bold text-sm text-foreground leading-tight line-clamp-2 mb-1">{post.title}</p>
                  {post.excerpt && <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── About Naira Autos ── */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-14">
          <div className="max-w-2xl">
            <h2
              className="font-black uppercase text-foreground leading-none mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
            >
              Naira Autos क्या है?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Naira Autos एक ऐसा प्लेटफ़ॉर्म है जो कार खरीदने, बेचने या उसका रखरखाव करते समय आने वाली वास्तविक समस्याओं को हल करने के लिए मुफ़्त टूल्स प्रदान करता है — बिना खाता बनाए या कोई शुल्क चुकाए।
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              यह हिन्दी संस्करण अभी-अभी लॉन्च हुआ है। फ़िलहाल हिन्दी में कोई अलग टूल उपलब्ध नहीं है, लेकिन हम जल्द से जल्द AI वर्चुअल मैकेनिक और अन्य टूल्स का हिन्दी अनुवाद कर रहे हैं।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
