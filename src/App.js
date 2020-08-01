import React from 'react';
import './App.css';
import './tailwind.output.css';

const wait = (ms) => new Promise(resolve => {
  setTimeout(() => {}, ms)
})

const getHeroDetail = async (name) => {
  await wait(1000)
  if (name === 'superman') {
    return {
      id: 1,
      name: 'Superman',
      avatar: 'https://cdn.theatlantic.com/thumbor/xuePShEYRyEQec_THgWcYFhYLnw=/540x0:2340x1800/500x500/media/img/mt/2016/01/superman/original.jpg',
      description: 'Superman is a fictional superhero. The character was created by writer Jerry Siegel and artist Joe Shuster, and first appeared in the comic book Action Comics #1 (cover-dated June 1938 and published April 18, 1938).[1] The character regularly appears in comic books published by DC Comics, and has been adapted to a number of radio serials, movies, and television shows.',
    }
  }
  if (name === 'batman') {
    return {
      id: 2,
      name: 'Batman',
      avatar: 'https://www.1999.co.jp/itbig47/10475358.jpg',
      description: 'Batman is a fictional superhero appearing in American comic books published by DC Comics. The character was created by artist Bob Kane and writer Bill Finger,[2][3] and first appeared in Detective Comics #27 in 1939. Originally named the "Bat-Man," the character is also referred to by such epithets as the Caped Crusader, the Dark Knight, and the World\'s Greatest Detective.'
    }
  }
  throw new Error('404')
}

function App() {
  return (
    <div>
    </div>
  );
}

export default App;
