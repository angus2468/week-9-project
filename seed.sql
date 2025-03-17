CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY GENERATED ALWAYS AS identity,
  username VARCHAR(255),
  bio TEXT,
  clerk_id TEXT
)

CREATE TABLE IF NOT EXISTS posts (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INT references users(id),
  title TEXT,
  description TEXT
)