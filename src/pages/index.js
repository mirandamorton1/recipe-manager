import Link from 'next/link';

const Index = () => (
  <div>
    <h1>Welcome!</h1>
    <Link href="/signup">
      <button>Sign Up</button>
    </Link>
    <Link href="/login">
      <button>Login</button>
    </Link>
  </div>
);

export default Index;
