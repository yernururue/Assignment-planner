-- ============================================
-- AssignMind — Full Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- ASSIGNMENTS TABLE
create table assignments (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users(id) on delete cascade not null,
  title            text not null,
  description      text,
  deadline         date not null,
  difficulty_score integer,
  estimated_hours  float,
  created_at       timestamptz default now()
);

-- TASKS TABLE
create table tasks (
  id               uuid primary key default gen_random_uuid(),
  assignment_id    uuid references assignments(id) on delete cascade not null,
  title            text not null,
  due_date         date,
  status           text default 'pending' check (status in ('pending', 'done')),
  estimated_hours  float,
  order_index      integer default 0
);

-- WORKLOAD CACHE TABLE
create table workload_cache (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete cascade not null,
  week_start   date not null,
  total_hours  float,
  burnout_risk boolean default false,
  unique(user_id, week_start)
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

alter table assignments   enable row level security;
alter table tasks         enable row level security;
alter table workload_cache enable row level security;

-- ASSIGNMENTS policies
create policy "users can view own assignments"
  on assignments for select
  using (auth.uid() = user_id);

create policy "users can insert own assignments"
  on assignments for insert
  with check (auth.uid() = user_id);

create policy "users can update own assignments"
  on assignments for update
  using (auth.uid() = user_id);

create policy "users can delete own assignments"
  on assignments for delete
  using (auth.uid() = user_id);

-- TASKS policies (access through parent assignment)
create policy "users can view own tasks"
  on tasks for select
  using (
    exists (
      select 1 from assignments
      where assignments.id = tasks.assignment_id
      and assignments.user_id = auth.uid()
    )
  );

create policy "users can insert own tasks"
  on tasks for insert
  with check (
    exists (
      select 1 from assignments
      where assignments.id = tasks.assignment_id
      and assignments.user_id = auth.uid()
    )
  );

create policy "users can update own tasks"
  on tasks for update
  using (
    exists (
      select 1 from assignments
      where assignments.id = tasks.assignment_id
      and assignments.user_id = auth.uid()
    )
  );

create policy "users can delete own tasks"
  on tasks for delete
  using (
    exists (
      select 1 from assignments
      where assignments.id = tasks.assignment_id
      and assignments.user_id = auth.uid()
    )
  );

-- WORKLOAD CACHE policies
create policy "users can manage own workload cache"
  on workload_cache for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);