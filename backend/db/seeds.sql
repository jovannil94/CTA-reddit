\c cta_reddit_db;


INSERT INTO users
      (id, user_name, email, password)
VALUES(1, 'jiggaflasks', 'jiggaflasks.com', 'password'),
      (2, 'glivercringe', 'glivercringe.com', 'password');

INSERT INTO subreddits
      (user_id, subname)
VALUES(1, 'PublicFreakout'),
      (2, 'Pics');

INSERT INTO posts
      (user_id, posts_id, title, body, image)
VALUES(1, 1, 'check this out!', 'testing will upload a video here if possible', null),
      (2, 2, 'thought this was interesting to share', 'upvote please', null),
      (2, 1, 'more testing', 'test test', null),
      (1, 2, 'I just want upvotes tbh', 'send me gold', null);

INSERT INTO votes
      (user_id, post_id, count)
VALUES(1, 1, 15 ) ,
      (2, 1, -10);