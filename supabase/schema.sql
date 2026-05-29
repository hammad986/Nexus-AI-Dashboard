create extension if not exists pgcrypto;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  slug text not null unique,
  plan text not null default 'Pro',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'member', 'viewer')),
  created_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

create table if not exists public.analytics_snapshots (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  metric_key text not null,
  metric_value numeric not null,
  metric_delta numeric,
  period_label text,
  source text not null default 'ingestion',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_reports (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  title text not null,
  summary text not null,
  priority text not null check (priority in ('Critical', 'High', 'Medium', 'Low')),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table if not exists public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  title text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('alert', 'opportunity', 'warning', 'info')),
  severity text not null default 'medium' check (severity in ('low', 'medium', 'high', 'critical')),
  title text not null,
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.saved_insights (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  title text not null,
  description text not null,
  priority text not null check (priority in ('Critical', 'High', 'Medium', 'Low')),
  tags jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.executive_summaries (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  report_id uuid references public.ai_reports(id) on delete set null,
  title text not null,
  summary text not null,
  file_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_workspace_members_workspace_user on public.workspace_members(workspace_id, user_id);
create index if not exists idx_analytics_snapshots_workspace_created on public.analytics_snapshots(workspace_id, created_at desc);
create index if not exists idx_ai_reports_workspace_created on public.ai_reports(workspace_id, created_at desc);
create index if not exists idx_ai_conversations_workspace_created on public.ai_conversations(workspace_id, created_at desc);
create index if not exists idx_notifications_workspace_user_created on public.notifications(workspace_id, user_id, created_at desc);
create index if not exists idx_saved_insights_workspace_created on public.saved_insights(workspace_id, created_at desc);
create index if not exists idx_activity_logs_workspace_created on public.activity_logs(workspace_id, created_at desc);

alter table public.organizations enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.analytics_snapshots enable row level security;
alter table public.ai_reports enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.ai_messages enable row level security;
alter table public.notifications enable row level security;
alter table public.saved_insights enable row level security;
alter table public.executive_summaries enable row level security;
alter table public.activity_logs enable row level security;

create or replace function public.is_workspace_member(target_workspace_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = target_workspace_id
      and wm.user_id = auth.uid()
  );
$$;

create or replace function public.is_workspace_owner(target_workspace_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.workspaces w
    join public.workspace_members wm on wm.workspace_id = w.id
    where w.id = target_workspace_id
      and wm.user_id = auth.uid()
      and wm.role in ('owner', 'admin')
  );
$$;

create policy "Organizations are visible to members" on public.organizations
  for select using (
    exists (
      select 1
      from public.workspaces w
      join public.workspace_members wm on wm.workspace_id = w.id
      where w.organization_id = organizations.id
        and wm.user_id = auth.uid()
    )
    or owner_id = auth.uid()
  );

create policy "Organizations can be created by signed in users" on public.organizations
  for insert with check (owner_id = auth.uid());

create policy "Workspace members can read their workspaces" on public.workspaces
  for select using (public.is_workspace_member(id));

create policy "Workspace owners can manage workspaces" on public.workspaces
  for all using (public.is_workspace_owner(id)) with check (public.is_workspace_owner(id));

create policy "Members can read workspace memberships" on public.workspace_members
  for select using (public.is_workspace_member(workspace_id));

create policy "Members can read analytics snapshots" on public.analytics_snapshots
  for select using (public.is_workspace_member(workspace_id));

create policy "Members can insert analytics snapshots" on public.analytics_snapshots
  for insert with check (public.is_workspace_owner(workspace_id));

create policy "Members can read reports" on public.ai_reports
  for select using (public.is_workspace_member(workspace_id));

create policy "Owners can manage reports" on public.ai_reports
  for all using (public.is_workspace_owner(workspace_id)) with check (public.is_workspace_owner(workspace_id));

create policy "Members can read conversations" on public.ai_conversations
  for select using (public.is_workspace_member(workspace_id));

create policy "Members can manage conversations" on public.ai_conversations
  for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));

create policy "Members can read messages" on public.ai_messages
  for select using (
    exists (
      select 1 from public.ai_conversations c
      where c.id = ai_messages.conversation_id and public.is_workspace_member(c.workspace_id)
    )
  );

create policy "Members can manage messages" on public.ai_messages
  for all using (
    exists (
      select 1 from public.ai_conversations c
      where c.id = ai_messages.conversation_id and public.is_workspace_member(c.workspace_id)
    )
  ) with check (
    exists (
      select 1 from public.ai_conversations c
      where c.id = ai_messages.conversation_id and public.is_workspace_member(c.workspace_id)
    )
  );

create policy "Users can read their notifications" on public.notifications
  for select using (user_id = auth.uid() and public.is_workspace_member(workspace_id));

create policy "Users can update their notifications" on public.notifications
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Members can read saved insights" on public.saved_insights
  for select using (public.is_workspace_member(workspace_id));

create policy "Members can manage saved insights" on public.saved_insights
  for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));

create policy "Members can read executive summaries" on public.executive_summaries
  for select using (public.is_workspace_member(workspace_id));

create policy "Members can manage activity logs" on public.activity_logs
  for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
