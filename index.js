const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(cors());

// User routes
app.post('/signup', async (req, res) => {
  const { username, email, first_name, last_name, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        first_name,
        last_name,
        password,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user && user.password === password) {
    res.json(user);
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Item routes
app.get('/items', async (req, res) => {
  const items = await prisma.item.findMany({
    include: {
      reviews: true,
    },
  });
  res.json(items);
});

app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      reviews: true,
    },
  });
  res.json(item);
});

// Review routes
app.post('/reviews', async (req, res) => {
  const { rating, comment, userId, itemId } = req.body;
  try {
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        itemId,
      },
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: 'Review already exists' });
  }
});

app.get('/users/:id/reviews', async (req, res) => {
  const { id } = req.params;
  const reviews = await prisma.review.findMany({
    where: { userId: id },
  });
  res.json(reviews);
});

app.delete('/reviews/:id', async (req, res) => {
  const { id } = req.params;
  const review = await prisma.review.delete({
    where: { id },
  });
  res.json(review);
});

app.put('/reviews/:id', async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const review = await prisma.review.update({
    where: { id },
    data: {
      rating,
      comment,
    },
  });
  res.json(review);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
