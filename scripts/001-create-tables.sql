-- GridFit - Driver Performance Database Schema

-- Profiles table for pilot information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  category TEXT, -- ex: Kart Indoor, Rotax, Formula
  weight DECIMAL(5,2),
  height DECIMAL(5,2),
  weekly_goal INTEGER DEFAULT 4, -- target workouts per week
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can delete their own profile" ON profiles FOR DELETE USING (auth.uid() = id);

-- Exercise categories
CREATE TABLE IF NOT EXISTS exercise_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_pt TEXT NOT NULL, -- Portuguese name
  icon TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exercises table (pre-seeded with motorsport-specific exercises)
CREATE TABLE IF NOT EXISTS exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES exercise_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_pt TEXT NOT NULL, -- Portuguese name
  description TEXT NOT NULL,
  description_pt TEXT NOT NULL, -- Portuguese description
  sets INTEGER DEFAULT 3,
  reps TEXT, -- Can be "12" or "15s" or "30m"
  duration_seconds INTEGER, -- For timer-based exercises
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workouts (pre-built training sessions)
CREATE TABLE IF NOT EXISTS workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_pt TEXT NOT NULL,
  description TEXT,
  description_pt TEXT,
  difficulty TEXT DEFAULT 'intermediate', -- beginner, intermediate, advanced
  estimated_duration INTEGER, -- in minutes
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workout exercises junction table
CREATE TABLE IF NOT EXISTS workout_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  sets_override INTEGER,
  reps_override TEXT
);

-- Completed workouts (user progress tracking)
CREATE TABLE IF NOT EXISTS completed_workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workout_id UUID REFERENCES workouts(id) ON DELETE SET NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  duration_seconds INTEGER,
  notes TEXT
);

-- Enable RLS on completed_workouts
ALTER TABLE completed_workouts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for completed_workouts
CREATE POLICY "Users can view their own completed workouts" ON completed_workouts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own completed workouts" ON completed_workouts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own completed workouts" ON completed_workouts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own completed workouts" ON completed_workouts FOR DELETE USING (auth.uid() = user_id);

-- Completed exercises within a workout session
CREATE TABLE IF NOT EXISTS completed_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  completed_workout_id UUID REFERENCES completed_workouts(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES exercises(id) ON DELETE SET NULL,
  sets_completed INTEGER,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on completed_exercises
ALTER TABLE completed_exercises ENABLE ROW LEVEL SECURITY;

-- RLS Policy for completed_exercises (through completed_workouts)
CREATE POLICY "Users can view their completed exercises" ON completed_exercises 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM completed_workouts cw 
    WHERE cw.id = completed_workout_id AND cw.user_id = auth.uid()
  )
);
CREATE POLICY "Users can insert their completed exercises" ON completed_exercises 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM completed_workouts cw 
    WHERE cw.id = completed_workout_id AND cw.user_id = auth.uid()
  )
);
