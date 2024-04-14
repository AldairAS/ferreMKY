import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div className='flex justify-center flex-col gap-4 h-96 items-center'>
      <h1 className='text-7xl font-bold'>Ferre MYK</h1>
      <div className='flex gap-3'>
        <Link href='/dashboard' className='group'>
          <Button>
            Ir al Dashboard
            <MoveRight className='group-hover:translate-x-2 ml-2 duration-500 ease-out' />
          </Button>
        </Link>
        <Link href='/sign-in' className='group'>
          <Button variant='secondary'>Iniciar Sesión</Button>
        </Link>
      </div>
    </div>
  );
}
