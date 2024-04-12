import LandingLayout from '@components/ui/shared/landing-layout';
import { CloudUploadIcon, Fingerprint, Lock, RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import FeaturesHero from '@assets/images/features-hero.png';

const features = [
  {
    name: 'Todo en la Nube',
    description:
      'Accede a tu sistema desde cualquier lugar y dispositivo, solo necesitas una conexión a internet, todos los datos de tu negocio estan seguros en la nube.',
    icon: CloudUploadIcon
  },
  {
    name: 'Actualizaciones Periódicas',
    description:
      'Actualizaciones periodicas para brindarte las mejores funcionalidades y mejoras en la seguridad, con las features que el equipo de desarrollo implementa.',
    icon: Lock
  },
  {
    name: 'Consultas en tiempo real',
    description:
      'Con nuestro sistema podras obtener informacion en tiempo real de tus ventas, compras, inventario y mucho mas.',
    icon: RefreshCcw
  },
  {
    name: 'Seguridad de datos',
    description:
      'Los datos de tu negocio estan seguros con nosotros, garantizamos la confidencialidad de la informacion.',
    icon: Fingerprint
  }
];

export default function featuresPage() {
  return (
    <LandingLayout>
      <div className='mx-auto px-6 lg:px-8 '>
        <div className='mx-auto max-w-2xl lg:text-center'>
          <h2 className='text-base font-semibold leading-7 text-indigo-600'>
            Gestiona tu negocio
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Todo lo que necesitas en un solo lugar
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Las funcionalidades a medida del sistema te permiten llevar un
            control de tus productos, ventas, compras, inventario y mucho más.
          </p>
        </div>
        <div className='flex justify-center my-10'>
          <Image
            src={FeaturesHero}
            alt='Product screenshot'
            className=' items-center text-center flex justify-center  rounded-xl shadow-2xl ring-1 ring-gray-400/20 sm:w-[57rem] md:-ml-4 lg:-ml-0'
            width={2432}
            height={1442}
          />
        </div>
        <div className='mx-auto  mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-5xl'>
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
            {features.map((feature) => (
              <div key={feature.name} className='relative pl-16'>
                <dt className='text-base font-semibold leading-7 text-gray-900'>
                  <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600'>
                    <feature.icon
                      className='h-6 w-6 text-white'
                      aria-hidden='true'
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className='mt-2 text-base leading-7 text-gray-600'>
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </LandingLayout>
  );
}
