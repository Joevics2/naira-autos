import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import BlogDetailClient from './BlogDetailClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (!post) {
    return {
      title: 'Article Not Found | Naira Autos',
    };
  }

  const imageUrl = post.featured_image || 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200';

  return {
    title: `${post.title} | Naira Autos Blog`,
    description: post.excerpt || `Read about ${post.title} on Naira Autos' expert blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read about ${post.title} on Naira Autos' expert blog`,
      type: 'article',
      publishedTime: post.created_at,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Read about ${post.title} on Naira Autos' expert blog`,
      images: [imageUrl],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  
  return <BlogDetailClient slug={slug} />;
}
