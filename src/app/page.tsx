import { use } from 'react';

async function getBlog() {
  return await (await fetch('http://localhost:1337/api/blogs')).json();
}

export default function Home() {
  const blogs = use(getBlog());
  console.log('blogs', blogs);
  return <div>Home</div>;
}
