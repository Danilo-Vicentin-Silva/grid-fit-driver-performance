-- Seed Exercise Categories
INSERT INTO exercise_categories (id, name, name_pt, icon, color) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Neck', 'Pescoço', 'activity', 'orange'),
  ('22222222-2222-2222-2222-222222222222', 'Core & Stability', 'Core & Estabilidade', 'target', 'green'),
  ('33333333-3333-3333-3333-333333333333', 'Forearm & Grip', 'Antebraço & Grip', 'grip-vertical', 'blue'),
  ('44444444-4444-4444-4444-444444444444', 'Reflexes & Cardio', 'Reflexos & Cardio', 'zap', 'red');

-- Seed Exercises (Motorsport-specific)
INSERT INTO exercises (id, category_id, name, name_pt, description, description_pt, sets, reps, duration_seconds) VALUES
  -- Neck exercises
  (
    'a1111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    'Isometric Neck with Resistance Band (4 directions)',
    'Isometria de Pescoço com Faixa Elástica (4 direções)',
    'Hold tension simulating G-force in turns. 3 sets of 15 seconds each direction.',
    'Segurar a tensão simulando força G em curvas. 3 séries de 15s.',
    3,
    '15s',
    15
  ),
  (
    'a2222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    'Lying Neck Curls',
    'Flexão de Pescoço Deitado (Neck Curls)',
    'Lying on a bench, controlled neck movement. 3 sets of 12 reps.',
    'Deitado no banco, movimento controlado do pescoço. 3 séries de 12 reps.',
    3,
    '12 reps',
    NULL
  ),
  -- Core & Stability exercises
  (
    'b1111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    'Pallof Press',
    'Pallof Press',
    'Anti-rotation vital for holding your body in the seat. 3 sets of 12 reps per side.',
    'Anti-rotação vital para segurar o corpo no banco. 3 séries de 12 reps/lado.',
    3,
    '12 reps/side',
    NULL
  ),
  (
    'b2222222-2222-2222-2222-222222222222',
    '22222222-2222-2222-2222-222222222222',
    'Plank with Shoulder Tap',
    'Prancha com Toque no Ombro',
    'Dynamic stability. 3 sets of 45 seconds.',
    'Estabilidade dinâmica. 3 séries de 45s.',
    3,
    '45s',
    45
  ),
  -- Forearm & Grip exercises
  (
    'c1111111-1111-1111-1111-111111111111',
    '33333333-3333-3333-3333-333333333333',
    'Farmer''s Walk',
    'Farmer''s Walk (Caminhada do Fazendeiro)',
    'Grip endurance for heavy steering wheels. 3 rounds of 30 meters.',
    'Resistência de pegada para volantes pesados. 3 voltas de 30m.',
    3,
    '30m',
    NULL
  ),
  (
    'c2222222-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333',
    'Wrist Roller',
    'Wrist Roller (Rolinho de Punho)',
    'Strengthening extensors and flexors. 3 sets to failure.',
    'Fortalecimento de extensores e flexores. 3 séries até a falha.',
    3,
    'to failure',
    NULL
  ),
  -- Reflexes & Cardio exercises
  (
    'd1111111-1111-1111-1111-111111111111',
    '44444444-4444-4444-4444-444444444444',
    'Reaction Ball',
    'Reaction Ball (Bola de Reação)',
    'Throw against the wall and catch on random bounces. 5 minutes.',
    'Jogar contra a parede e pegar no rebote aleatório. 5 minutos.',
    1,
    '5 min',
    300
  ),
  (
    'd2222222-2222-2222-2222-222222222222',
    '44444444-4444-4444-4444-444444444444',
    'HIIT Bike (Tabata Protocol)',
    'HIIT na Bike (Protocolo Tabata)',
    'Simulate race stints. 20s explosion / 10s rest.',
    'Simular stints de corrida. 20s explosão / 10s descanso.',
    8,
    '20s/10s',
    240
  );

-- Fixed workout UUIDs - replaced 'w' prefix with 'e' (valid hex)
-- Seed Pre-built Workouts
INSERT INTO workouts (id, name, name_pt, description, description_pt, difficulty, estimated_duration) VALUES
  (
    'e1111111-1111-1111-1111-111111111111',
    'G-Force Neck Training',
    'Treino Força G - Pescoço',
    'Strengthen your neck to handle lateral G-forces during high-speed cornering.',
    'Fortaleça seu pescoço para suportar forças G laterais em curvas de alta velocidade.',
    'intermediate',
    20
  ),
  (
    'e2222222-2222-2222-2222-222222222222',
    'Grip Endurance',
    'Resistência de Grip',
    'Build forearm and grip strength for long stints at the wheel.',
    'Desenvolva força de antebraço e pegada para longos stints no volante.',
    'intermediate',
    25
  ),
  (
    'e3333333-3333-3333-3333-333333333333',
    'Pre-Season Cardio',
    'Cardio Pré-Temporada',
    'High-intensity cardio to prepare your cardiovascular system for race conditions.',
    'Cardio de alta intensidade para preparar seu sistema cardiovascular para condições de corrida.',
    'advanced',
    30
  ),
  (
    'e4444444-4444-4444-4444-444444444444',
    'Core Stability Circuit',
    'Circuito de Estabilidade Core',
    'Essential core work for maintaining body position under braking and acceleration.',
    'Trabalho essencial de core para manter posição corporal sob frenagem e aceleração.',
    'beginner',
    15
  ),
  (
    'e5555555-5555-5555-5555-555555555555',
    'Complete Driver Workout',
    'Treino Completo do Piloto',
    'Full body workout covering all aspects of driver fitness.',
    'Treino de corpo inteiro cobrindo todos os aspectos do condicionamento do piloto.',
    'advanced',
    45
  );

-- Updated workout references to use fixed UUIDs
-- Link exercises to workouts
INSERT INTO workout_exercises (workout_id, exercise_id, order_index) VALUES
  -- G-Force Neck Training
  ('e1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 1),
  ('e1111111-1111-1111-1111-111111111111', 'a2222222-2222-2222-2222-222222222222', 2),
  -- Grip Endurance
  ('e2222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', 1),
  ('e2222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', 2),
  -- Pre-Season Cardio
  ('e3333333-3333-3333-3333-333333333333', 'd2222222-2222-2222-2222-222222222222', 1),
  ('e3333333-3333-3333-3333-333333333333', 'd1111111-1111-1111-1111-111111111111', 2),
  -- Core Stability Circuit
  ('e4444444-4444-4444-4444-444444444444', 'b1111111-1111-1111-1111-111111111111', 1),
  ('e4444444-4444-4444-4444-444444444444', 'b2222222-2222-2222-2222-222222222222', 2),
  -- Complete Driver Workout
  ('e5555555-5555-5555-5555-555555555555', 'a1111111-1111-1111-1111-111111111111', 1),
  ('e5555555-5555-5555-5555-555555555555', 'b1111111-1111-1111-1111-111111111111', 2),
  ('e5555555-5555-5555-5555-555555555555', 'b2222222-2222-2222-2222-222222222222', 3),
  ('e5555555-5555-5555-5555-555555555555', 'c1111111-1111-1111-1111-111111111111', 4),
  ('e5555555-5555-5555-5555-555555555555', 'd2222222-2222-2222-2222-222222222222', 5);
