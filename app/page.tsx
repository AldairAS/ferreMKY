import { Button } from '@components/ui/button';
import LandingLayout from '@components/ui/shared/landing-layout';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

export default function LnadingView() {
  return (
    <LandingLayout>
      <div className='mx-auto max-w-2xl'>
        <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
          <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
            Anunciando el despliegue exitosos de la version 1.0.0
            <Link href='#' className='font-semibold text-indigo-600'>
              <span className='absolute inset-0' aria-hidden='true' /> Ver más{' '}
              <span aria-hidden='true'>&rarr;</span>
            </Link>
          </div>
        </div>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Software para el manejo de tu PYME
          </h1>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            MKY Corp es un sistema semi ERP para control de gestion de tiendas,
            con el cual podras llevar un control de tus productos, ventas,
            compras, inventario y mucho mas.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link href='/login'>
              <Button size='lg'>Empezar</Button>
            </Link>
            <Link href='/dashboard' className='group'>
              <Button variant='outline' size='lg'>
                Probar Demo
                <MoveRight className='h-4 w-4 ml-1.5 group-hover:translate-x-2 duration-300 ease-in-out' />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
