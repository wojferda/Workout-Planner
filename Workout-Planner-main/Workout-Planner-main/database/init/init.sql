CREATE TABLE IF NOT EXISTS plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS days (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    "planId" INTEGER REFERENCES plans(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exercises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sets INTEGER NOT NULL DEFAULT 3,
    repetitions INTEGER NOT NULL DEFAULT 10,
    notes TEXT,
    "orderIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    "dayId" INTEGER REFERENCES days(id) ON DELETE CASCADE
);

CREATE INDEX idx_plan_id ON days("planId");
CREATE INDEX idx_day_id ON exercises("dayId");
