-- Add more exercises for comprehensive motorsport training

-- Additional Neck exercises
INSERT INTO exercises (id, category_id, name, name_pt, description, description_pt, sets, reps, duration_seconds) VALUES
  (
    'a3333333-3333-3333-3333-333333333333',
    '11111111-1111-1111-1111-111111111111',
    'Neck Bridge',
    'Ponte de Pescoço',
    'Advanced exercise for neck strength. Start on all fours, progress to bridging.',
    'Exercício avançado para força do pescoço. Comece de quatro, progride para ponte.',
    3,
    '30s',
    30
  ),
  (
    'a4444444-4444-4444-4444-444444444444',
    '11111111-1111-1111-1111-111111111111',
    'Towel Neck Pulls',
    'Puxadas de Pescoço com Toalha',
    'Use a towel for resistance training in all directions.',
    'Use uma toalha para treino de resistência em todas as direções.',
    3,
    '10 reps/side',
    NULL
  ),
  (
    'a5555555-5555-5555-5555-555555555555',
    '11111111-1111-1111-1111-111111111111',
    'Weighted Neck Extensions',
    'Extensões de Pescoço com Peso',
    'Lie face down with weight plate on head, extend neck.',
    'Deite de bruços com anilha na cabeça, estenda o pescoço.',
    4,
    '15 reps',
    NULL
  );

-- Additional Core exercises
INSERT INTO exercises (id, category_id, name, name_pt, description, description_pt, sets, reps, duration_seconds) VALUES
  (
    'b3333333-3333-3333-3333-333333333333',
    '22222222-2222-2222-2222-222222222222',
    'Dead Bug',
    'Dead Bug (Inseto Morto)',
    'Core stability with opposite arm/leg movements. Essential for race posture.',
    'Estabilidade de core com movimentos opostos de braço/perna. Essencial para postura na corrida.',
    3,
    '12 reps/side',
    NULL
  ),
  (
    'b4444444-4444-4444-4444-444444444444',
    '22222222-2222-2222-2222-222222222222',
    'Cable Woodchop',
    'Woodchop no Cabo',
    'Rotational strength for steering wheel control.',
    'Força rotacional para controle do volante.',
    3,
    '12 reps/side',
    NULL
  ),
  (
    'b5555555-5555-5555-5555-555555555555',
    '22222222-2222-2222-2222-222222222222',
    'Anti-Extension Rollout',
    'Rollout Anti-Extensão',
    'Ab wheel or barbell rollout for core stability under braking.',
    'Rollout com roda ou barra para estabilidade sob frenagem.',
    3,
    '10 reps',
    NULL
  ),
  (
    'b6666666-6666-6666-6666-666666666666',
    '22222222-2222-2222-2222-222222222222',
    'Side Plank with Hip Dip',
    'Prancha Lateral com Toque no Quadril',
    'Lateral core stability for cornering forces.',
    'Estabilidade lateral de core para forças em curvas.',
    3,
    '12 reps/side',
    NULL
  ),
  (
    'b7777777-7777-7777-7777-777777777777',
    '22222222-2222-2222-2222-222222222222',
    'Bird Dog',
    'Cachorro Pássaro',
    'Balance and core stability fundamental.',
    'Equilíbrio e estabilidade de core fundamental.',
    3,
    '10 reps/side',
    NULL
  );

-- Additional Grip exercises
INSERT INTO exercises (id, category_id, name, name_pt, description, description_pt, sets, reps, duration_seconds) VALUES
  (
    'c3333333-3333-3333-3333-333333333333',
    '33333333-3333-3333-3333-333333333333',
    'Plate Pinch',
    'Pinça de Anilhas',
    'Hold two plates together with fingertips for grip endurance.',
    'Segure duas anilhas juntas com as pontas dos dedos para resistência de pegada.',
    3,
    '30s',
    30
  ),
  (
    'c4444444-4444-4444-4444-444444444444',
    '33333333-3333-3333-3333-333333333333',
    'Dead Hang',
    'Suspensão na Barra',
    'Hang from pull-up bar for forearm endurance.',
    'Suspenda na barra de pull-up para resistência do antebraço.',
    3,
    '45s',
    45
  ),
  (
    'c5555555-5555-5555-5555-555555555555',
    '33333333-3333-3333-3333-333333333333',
    'Finger Curls',
    'Rosca de Dedos',
    'Barbell finger curls for grip strength.',
    'Rosca de dedos com barra para força de pegada.',
    4,
    '15 reps',
    NULL
  ),
  (
    'c6666666-6666-6666-6666-666666666666',
    '33333333-3333-3333-3333-333333333333',
    'Towel Pull-ups',
    'Pull-ups com Toalha',
    'Pull-ups gripping a towel for extreme grip challenge.',
    'Pull-ups segurando uma toalha para desafio extremo de pegada.',
    3,
    '8 reps',
    NULL
  ),
  (
    'c7777777-7777-7777-7777-777777777777',
    '33333333-3333-3333-3333-333333333333',
    'Rice Bucket Training',
    'Treino no Balde de Arroz',
    'Dig and grip through rice bucket for forearm conditioning.',
    'Cave e agarre no balde de arroz para condicionamento do antebraço.',
    3,
    '60s',
    60
  );

-- Additional Cardio/Reflex exercises
INSERT INTO exercises (id, category_id, name, name_pt, description, description_pt, sets, reps, duration_seconds) VALUES
  (
    'd3333333-3333-3333-3333-333333333333',
    '44444444-4444-4444-4444-444444444444',
    'Jump Rope',
    'Pular Corda',
    'Coordination and cardio. Essential for race reflexes.',
    'Coordenação e cardio. Essencial para reflexos de corrida.',
    5,
    '60s',
    60
  ),
  (
    'd4444444-4444-4444-4444-444444444444',
    '44444444-4444-4444-4444-444444444444',
    'Battle Ropes',
    'Cordas de Batalha',
    'Upper body cardio and endurance.',
    'Cardio e resistência de membros superiores.',
    4,
    '30s',
    30
  ),
  (
    'd5555555-5555-5555-5555-555555555555',
    '44444444-4444-4444-4444-444444444444',
    'Box Jumps',
    'Saltos na Caixa',
    'Explosive power for quick pedal transitions.',
    'Potência explosiva para transições rápidas de pedal.',
    4,
    '10 reps',
    NULL
  ),
  (
    'd6666666-6666-6666-6666-666666666666',
    '44444444-4444-4444-4444-444444444444',
    'Burpees',
    'Burpees',
    'Full body conditioning and mental toughness.',
    'Condicionamento de corpo inteiro e resistência mental.',
    3,
    '12 reps',
    NULL
  ),
  (
    'd7777777-7777-7777-7777-777777777777',
    '44444444-4444-4444-4444-444444444444',
    'Rowing Machine',
    'Remo Ergométrico',
    'Full body cardio simulating race effort.',
    'Cardio de corpo inteiro simulando esforço de corrida.',
    1,
    '10 min',
    600
  ),
  (
    'd8888888-8888-8888-8888-888888888888',
    '44444444-4444-4444-4444-444444444444',
    'Ladder Drills',
    'Exercícios na Escada de Agilidade',
    'Footwork and coordination for pedal precision.',
    'Trabalho de pés e coordenação para precisão nos pedais.',
    4,
    '30s',
    30
  );

-- Add more comprehensive workouts
INSERT INTO workouts (id, name, name_pt, description, description_pt, difficulty, estimated_duration) VALUES
  (
    'e6666666-6666-6666-6666-666666666666',
    'Monday - Neck & Core Focus',
    'Segunda - Foco Pescoço & Core',
    'Start the week strengthening your neck and core for race conditions.',
    'Comece a semana fortalecendo pescoço e core para condições de corrida.',
    'intermediate',
    35
  ),
  (
    'e7777777-7777-7777-7777-777777777777',
    'Tuesday - Grip & Forearm Day',
    'Terça - Dia de Grip & Antebraço',
    'Build the forearm endurance needed for long stints.',
    'Construa a resistência de antebraço necessária para longos stints.',
    'intermediate',
    30
  ),
  (
    'e8888888-8888-8888-8888-888888888888',
    'Wednesday - HIIT Cardio',
    'Quarta - Cardio HIIT',
    'High-intensity interval training to simulate race conditions.',
    'Treino intervalado de alta intensidade para simular condições de corrida.',
    'advanced',
    40
  ),
  (
    'e9999999-9999-9999-9999-999999999999',
    'Thursday - Core & Stability',
    'Quinta - Core & Estabilidade',
    'Mid-week core focus for maintaining body position.',
    'Foco em core no meio da semana para manter posição corporal.',
    'beginner',
    25
  ),
  (
    'ea111111-1111-1111-1111-111111111111',
    'Friday - Full Driver Workout',
    'Sexta - Treino Completo do Piloto',
    'Complete workout covering all aspects of driver fitness.',
    'Treino completo cobrindo todos os aspectos do condicionamento do piloto.',
    'advanced',
    50
  ),
  (
    'eb111111-1111-1111-1111-111111111111',
    'Saturday - Active Recovery',
    'Sábado - Recuperação Ativa',
    'Light workout focusing on mobility and light cardio.',
    'Treino leve focando em mobilidade e cardio leve.',
    'beginner',
    20
  ),
  (
    'ec111111-1111-1111-1111-111111111111',
    'Quick Neck Warm-up',
    'Aquecimento Rápido de Pescoço',
    'Pre-race neck preparation routine.',
    'Rotina de preparação de pescoço pré-corrida.',
    'beginner',
    10
  ),
  (
    'ed111111-1111-1111-1111-111111111111',
    'Race Day Activation',
    'Ativação Dia de Corrida',
    'Quick activation routine before getting in the car.',
    'Rotina rápida de ativação antes de entrar no carro.',
    'beginner',
    15
  ),
  (
    'ee111111-1111-1111-1111-111111111111',
    'Endurance Builder',
    'Construtor de Resistência',
    'Long session for building race-length endurance.',
    'Sessão longa para construir resistência para a duração da corrida.',
    'advanced',
    60
  ),
  (
    'ef111111-1111-1111-1111-111111111111',
    'Explosive Power',
    'Potência Explosiva',
    'Focus on explosive movements for quick reactions.',
    'Foco em movimentos explosivos para reações rápidas.',
    'intermediate',
    35
  );

-- Link new exercises to new workouts
INSERT INTO workout_exercises (workout_id, exercise_id, order_index) VALUES
  -- Monday - Neck & Core Focus
  ('e6666666-6666-6666-6666-666666666666', 'a1111111-1111-1111-1111-111111111111', 1),
  ('e6666666-6666-6666-6666-666666666666', 'a2222222-2222-2222-2222-222222222222', 2),
  ('e6666666-6666-6666-6666-666666666666', 'a3333333-3333-3333-3333-333333333333', 3),
  ('e6666666-6666-6666-6666-666666666666', 'b1111111-1111-1111-1111-111111111111', 4),
  ('e6666666-6666-6666-6666-666666666666', 'b3333333-3333-3333-3333-333333333333', 5),
  
  -- Tuesday - Grip & Forearm Day
  ('e7777777-7777-7777-7777-777777777777', 'c1111111-1111-1111-1111-111111111111', 1),
  ('e7777777-7777-7777-7777-777777777777', 'c2222222-2222-2222-2222-222222222222', 2),
  ('e7777777-7777-7777-7777-777777777777', 'c3333333-3333-3333-3333-333333333333', 3),
  ('e7777777-7777-7777-7777-777777777777', 'c4444444-4444-4444-4444-444444444444', 4),
  ('e7777777-7777-7777-7777-777777777777', 'c5555555-5555-5555-5555-555555555555', 5),
  
  -- Wednesday - HIIT Cardio
  ('e8888888-8888-8888-8888-888888888888', 'd2222222-2222-2222-2222-222222222222', 1),
  ('e8888888-8888-8888-8888-888888888888', 'd3333333-3333-3333-3333-333333333333', 2),
  ('e8888888-8888-8888-8888-888888888888', 'd4444444-4444-4444-4444-444444444444', 3),
  ('e8888888-8888-8888-8888-888888888888', 'd5555555-5555-5555-5555-555555555555', 4),
  ('e8888888-8888-8888-8888-888888888888', 'd6666666-6666-6666-6666-666666666666', 5),
  
  -- Thursday - Core & Stability
  ('e9999999-9999-9999-9999-999999999999', 'b1111111-1111-1111-1111-111111111111', 1),
  ('e9999999-9999-9999-9999-999999999999', 'b2222222-2222-2222-2222-222222222222', 2),
  ('e9999999-9999-9999-9999-999999999999', 'b3333333-3333-3333-3333-333333333333', 3),
  ('e9999999-9999-9999-9999-999999999999', 'b7777777-7777-7777-7777-777777777777', 4),
  
  -- Friday - Full Driver Workout
  ('ea111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 1),
  ('ea111111-1111-1111-1111-111111111111', 'a4444444-4444-4444-4444-444444444444', 2),
  ('ea111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 3),
  ('ea111111-1111-1111-1111-111111111111', 'b4444444-4444-4444-4444-444444444444', 4),
  ('ea111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 5),
  ('ea111111-1111-1111-1111-111111111111', 'c3333333-3333-3333-3333-333333333333', 6),
  ('ea111111-1111-1111-1111-111111111111', 'd2222222-2222-2222-2222-222222222222', 7),
  
  -- Saturday - Active Recovery
  ('eb111111-1111-1111-1111-111111111111', 'd3333333-3333-3333-3333-333333333333', 1),
  ('eb111111-1111-1111-1111-111111111111', 'b7777777-7777-7777-7777-777777777777', 2),
  ('eb111111-1111-1111-1111-111111111111', 'b3333333-3333-3333-3333-333333333333', 3),
  
  -- Quick Neck Warm-up
  ('ec111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 1),
  ('ec111111-1111-1111-1111-111111111111', 'a4444444-4444-4444-4444-444444444444', 2),
  
  -- Race Day Activation
  ('ed111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 1),
  ('ed111111-1111-1111-1111-111111111111', 'b7777777-7777-7777-7777-777777777777', 2),
  ('ed111111-1111-1111-1111-111111111111', 'd3333333-3333-3333-3333-333333333333', 3),
  
  -- Endurance Builder
  ('ee111111-1111-1111-1111-111111111111', 'd7777777-7777-7777-7777-777777777777', 1),
  ('ee111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 2),
  ('ee111111-1111-1111-1111-111111111111', 'b2222222-2222-2222-2222-222222222222', 3),
  ('ee111111-1111-1111-1111-111111111111', 'c4444444-4444-4444-4444-444444444444', 4),
  ('ee111111-1111-1111-1111-111111111111', 'd2222222-2222-2222-2222-222222222222', 5),
  ('ee111111-1111-1111-1111-111111111111', 'b5555555-5555-5555-5555-555555555555', 6),
  
  -- Explosive Power
  ('ef111111-1111-1111-1111-111111111111', 'd5555555-5555-5555-5555-555555555555', 1),
  ('ef111111-1111-1111-1111-111111111111', 'd6666666-6666-6666-6666-666666666666', 2),
  ('ef111111-1111-1111-1111-111111111111', 'd8888888-8888-8888-8888-888888888888', 3),
  ('ef111111-1111-1111-1111-111111111111', 'b4444444-4444-4444-4444-444444444444', 4),
  ('ef111111-1111-1111-1111-111111111111', 'c6666666-6666-6666-6666-666666666666', 5);
