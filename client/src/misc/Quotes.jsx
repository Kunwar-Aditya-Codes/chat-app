const Quotes = [
  {
    id: 1,
    quote:
      'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: 'Nelson Mandela',
  },
  {
    id: 2,
    quote: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney',
  },
  {
    id: 3,
    quote:
      'If life were predictable it would cease to be life, and be without flavor. ',
    author: 'Eleanor Roosevelt',
  },
  {
    id: 4,
    quote: 'Life is what happens when you are busy making other plans. ',
    author: 'John Lennon',
  },
  {
    id: 5,
    quote:
      'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
    author: 'Mother Teresa',
  },
  {
    id: 6,
    quote:
      'When you reach the end of your rope, tie a knot in it and hang on. ',
    author: 'Franklin D. Roosevelt',
  },
];

export const randomQuotes = () => {
  const randomNum = Math.floor(Math.random() * Quotes.length);

  return Quotes[randomNum];
};
