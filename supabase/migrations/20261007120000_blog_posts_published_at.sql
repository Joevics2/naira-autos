alter table blog_posts add column if not exists published_at timestamptz;
update blog_posts set published_at = created_at where published = true and published_at is null;
create index if not exists blog_posts_draft_queue_idx on blog_posts (language, created_at) where published = false;
create index if not exists blog_posts_published_at_idx on blog_posts (published_at) where published = true;
