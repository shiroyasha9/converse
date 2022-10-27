import { useUpdateAtom } from 'jotai/utils';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import Input from '../components/Input';
import { usernameAtom } from '../stores/user';

export default function Home() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const setUsername = useUpdateAtom(usernameAtom);
  const router = useRouter();

  const handleUsernameSubmit = () => {
    setUsername(usernameRef.current.value);
    router.push('/chat');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUsernameSubmit();
    }
  };

  return (
    <div className="screen">
      <main className="main">
        <h2 className="mb-2 text-3xl font-bold text-white">
          Welcome to <span className="text-[#F2FF49]">Converse</span> 👋
        </h2>
        <h3 className="text-xl text-white">What would be your username?</h3>
        <div className="flex flex-row items-center justify-between space-x-2">
          <Input
            type="text"
            placeholder="Rick"
            htmlRef={usernameRef}
            keyPressHandler={handleKeyPress}
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
