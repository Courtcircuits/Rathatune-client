import { Link } from 'react-router-dom';
import Button, { IconButton } from '../components/Button';
import logo from './../assets/logo.png'
import LinkIcon from '../assets/icon/link';
import Debt from '../components/Debt';
import Transaction from '../components/Transaction';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Home() {
  const [name, setName] = useState<string[]>([
    "Tes potes",
    "Tes collègues",
    "Ta famille",
    "Tes colocataires",
  ]);

  document.title = "Ratathune - Home";

  const animation_duration = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setName((name) => {
        const newName = [...name];
        newName.push(newName.shift() as string);
        return newName;
      });
    }, animation_duration * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className='flex flex-row justify-between items-center px-14 py-4'>
        <div className='w-44'></div>
        <div className='flex flex-col items-center justify-center'>
          <img width={80} src={logo} alt="Logo" />
          <p>Ratathune</p>
        </div>
        <Link to='/login' className='w-44'>
          <Button type='secondary'>Se connecter</Button>
        </Link>
      </header>

      <section>
        <div className='flex flex-col items-center'>
          <h1 className='text-7xl py-20 font-extrabold text-center'><motion.div animate={{
            opacity: [0, 1,1,0],
          }}
            transition={{
              duration: animation_duration,
              times: [0,0.05,0.95,1],
              repeat: Infinity,
            }}
          >{name[0]}</motion.div> sont des<br /> <em className='not-italic text-warn'>rats</em></h1>
          <p className='text-2xl text-center'>Avec ratathune gère tes dettes banal.<br />
            Plus d’arnaques, ni d’oublis. Rien que ça dératise par ici.</p>
          <Link to='/register' className='py-20 w-72'>
            <IconButton icon={<LinkIcon width={20} height={20} />} type={'secondary'} text='Rejoindre Ratathune' invert />
          </Link>
        </div>
      </section>
      <h2 className='text-center px-48 text-4xl font-bold py-20'>Pas convaincu ??? 🐀🤬😾</h2>
      <section className='flex flex-row items-center justify-center px-48 py-14'>
        <aside className='w-1/6'>
          <h3 className='font-bold text-4xl mr-16'>Tema la taille du rat !</h3>
        </aside>
        <main className='w-5/6'>
          <div>
            <Debt amplitude={1000} amount={500} name='Jean' index='1' />
            <Debt amplitude={1000} amount={-500} name='Rat' index='2' />
          </div>
          <p className='font-fun'>
            Ton pote le rat
          </p>
        </main>
      </section>
      <section className='flex flex-col items-center justify-center px-48 py-24'>
        <h2 className='text-center px-48 text-4xl font-bold py-2'>Suit chacune de tes<br /> transactions de près</h2>
        <Transaction transaction={{ sender: 'Jean', receiver: 'Rat', amount: 30, date: new Date(), title: 'Cadeau d\'anniversaire' }} />
        <Transaction transaction={{ sender: 'Jane', receiver: 'Rat', amount: 210, date: new Date(), title: 'Location de ski' }} />
      </section>
      <footer className='flex flex-row w-full justify-between'>
        <section className='px-48 py-24 flex-col'>
          <p className='font-bold'>Made with ♡ by <a href='https://www.threads.net/@courtcircuits' className='text-warn font-bold hover:underline'>@courtcircuits</a></p>
          <p>
            <Link to='/login' className='text-tint500 hover:underline'>Terms of services</Link>
          </p>
          <Link to='/login' className='text-tint500 hover:underline'>Privacy policy</Link>
        </section>
        <section className='px-48 py-24 flex-col text-right'>
          <p className='font-bold'>Alternatives</p>
          <a href="" className='text-tint500 hover:underline'>tricount.com</a><br />
          <a href="" className='text-tint500 hover:underline'>split.fr</a><br />
          <a href="" className='text-tint500 hover:underline'>wesplit.fr</a><br />
          <a href="" className='text-tint500 hover:underline'>polybank.fr</a><br />
        </section>
      </footer>
    </>
  );
}

export default Home;
