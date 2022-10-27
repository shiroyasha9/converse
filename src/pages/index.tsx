import { useUpdateAtom } from 'jotai/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { usernameAtom } from '../stores/user';

export default function Home() {
  const [enteredUsername, setEnteredUsername] = useState('');
  const setUsername = useUpdateAtom(usernameAtom);
  const router = useRouter();

  const handleUsernameSubmit = () => {
    setUsername(enteredUsername);
    router.push('/chat');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUsernameSubmit();
    }
  };

  return (
    <div className="mx-auto flex min-h-screen items-center justify-center bg-purple-500 p-4">
      <main className="flex h-full w-full flex-col items-center justify-center gap-4">
        <h2 className="mb-2 text-3xl font-bold text-white">
          Welcome to <span className="text-[#F2FF49]">Converse</span> 👋
        </h2>
        <h3 className="text-xl text-white">What would be your username?</h3>
        <div className="flex flex-row items-center justify-between space-x-2">
          <input
            type="text"
            placeholder="Rick"
            value={enteredUsername}
            className="rounded-md py-3 px-6 outline-none"
            onChange={(e) => setEnteredUsername(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <button
            onClick={handleUsernameSubmit}
            className="text-md rounded-md bg-[#F2FF49] px-6 py-3 font-semibold"
          >
            Let's start conversing!
          </button>
        </div>
      </main>
    </div>
  );
}
