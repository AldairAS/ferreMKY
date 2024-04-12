import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import LandingLayout from '@/components/ui/shared/landing-layout';
import Image from 'next/image';
import Link from 'next/link';
import UNCPLogo from '@/assets/logos/uncp.webp';
import TEKTONLogo from '@/assets/logos/tekton.webp';
import ISOLogo from '@/assets/logos/iso.webp';
import FISLogo from '@/assets/logos/fis.webp';
import WORLDVIisionLogo from '@/assets/logos/worldvision.webp';
const people = [
  // FIXME: Add real profile images and url links

  {
    name: 'Aldair Alvites',
    url: 'https://www.linkedin.com/in/aldair-alvites/',
    fallback: 'AA',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Brath Barboza',
    url: 'https://www.linkedin.com/in/brath-barboza-agustin/',
    fallback: 'BB',
    role: 'CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Frank Caysahuana',
    url: 'https://www.linkedin.com/in/frank-caysahuana-delao-720315254/',
    fallback: 'FC',
    role: 'Marketing Manager',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Alvaro Mendoza',
    url: 'https://www.linkedin.com/in/alvaro-mateo-mendoza-capcha-27907a248/',
    fallback: 'AM',
    role: 'Software Engineer',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Brayan Paucar',
    url: 'https://www.linkedin.com/in/brayanpaucar/',
    fallback: 'BP',
    role: 'Software Architect',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Fernando Perez',
    url: 'https://www.linkedin.com/in/fernando-perez/',
    fallback: 'FP',

    role: 'QA Engineer',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Brayan Sanchez',
    url: 'https://www.linkedin.com/in/brayan-sanchez/',
    fallback: 'BS',
    role: 'Software Engineer',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Luigi Santana',
    url: 'https://www.linkedin.com/in/luigi-christopher-santana-esteban-52b3a529b',
    fallback: 'LS',
    role: 'Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Miguel Requena',
    url: 'https://www.linkedin.com/in/miguel-requena/',
    fallback: 'MR',
    role: 'Frontend Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Joan Roca',
    url: 'https://www.linkedin.com/in/jochizan/',
    fallback: 'JR',
    role: 'Software Engineer',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export default function developersPage() {
  return (
    <LandingLayout>
      <div className='mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-4'>
        <div className='max-w-2xl col-span-2'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Conoce a nuestro equipo
          </h2>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Somos un staff de profesionales con experiencia en el desarrollo de
            software, diseño y marketing digital. Nuestro objetivo es brindar
            soluciones tecnológicas a la medida de nuestros clientes.
          </p>
        </div>
        <ul
          role='list'
          className='grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2'
        >
          {people.slice(0, 4).map((person) => (
            <li key={person.name}>
              <div className='flex items-center gap-x-6'>
                <Avatar className='w-16 h-16'>
                  <AvatarImage
                    sizes='4xl'
                    width={64}
                    height={64}
                    src=''
                    alt='profile'
                  />
                  <AvatarFallback>{person.fallback}</AvatarFallback>
                </Avatar>

                <div>
                  <Link target='_blank' href={person.url || ''}>
                    <Button
                      variant='link'
                      className='text-base font-semibold leading-7 tracking-tight text-gray-900  duration-200 ease-in-out p-0 hover:opacity-80 '
                    >
                      {person.name}
                    </Button>
                  </Link>
                  <p className='text-sm font-semibold leading-6 text-indigo-600'>
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <ul
          role='list'
          className='grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2'
        >
          {people.slice(4, 8).map((person) => (
            <li key={person.name}>
              <div className='flex items-center gap-x-6'>
                <Avatar className='w-16 h-16'>
                  <AvatarImage
                    sizes='4xl'
                    width={64}
                    height={64}
                    src=''
                    alt='profile'
                  />
                  <AvatarFallback>{person.fallback}</AvatarFallback>
                </Avatar>

                <div>
                  <Link target='_blank' href={person.url || ''}>
                    <Button
                      variant='link'
                      className='text-base font-semibold leading-7 tracking-tight text-gray-900  duration-200 ease-in-out p-0 hover:opacity-80 '
                    >
                      {person.name}
                    </Button>
                  </Link>
                  <p className='text-sm font-semibold leading-6 text-indigo-600'>
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>{' '}
        <ul
          role='list'
          className='grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2'
        >
          {people.slice(8, 10).map((person) => (
            <li key={person.name}>
              <div className='flex items-center gap-x-6'>
                <Avatar className='w-16 h-16'>
                  <AvatarImage
                    sizes='4xl'
                    width={64}
                    height={64}
                    src=''
                    alt='profile'
                  />
                  <AvatarFallback>{person.fallback}</AvatarFallback>
                </Avatar>

                <div>
                  <Link target='_blank' href={person.url || ''}>
                    <Button
                      variant='link'
                      className='text-base font-semibold leading-7 tracking-tight text-gray-900  duration-200 ease-in-out p-0 hover:opacity-80 '
                    >
                      {person.name}
                    </Button>
                  </Link>
                  <p className='text-sm font-semibold leading-6 text-indigo-600'>
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </LandingLayout>
  );
}

const logosCompanies = [
  {
    name: 'UNCP',
    imageUrl: UNCPLogo
  },
  {
    name: 'Tekton',
    imageUrl: TEKTONLogo
  },
  {
    name: 'ISO',
    imageUrl: ISOLogo
  },
  {
    name: 'FIS',
    imageUrl: FISLogo
  },
  {
    name: 'World Vision',
    imageUrl: WORLDVIisionLogo
  }
];

function Footer() {
  return (
    <div className='bg-white mt-20 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <h2 className='text-center text-lg font-semibold leading-8 text-gray-900'>
          La experiencia de nuestro equipo es comprobada por la labor realizada
        </h2>
        <div className='mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
          {logosCompanies.map((company, index) => (
            <Image
              key={index}
              className='col-span-2 max-h-12 w-full object-contain lg:col-span-1 grayscale hover:grayscale-0 transition-all duration-300 ease-in-out'
              src={company.imageUrl}
              alt={company.name}
              width={158}
              height={48}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
