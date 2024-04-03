## Pasos trabajar con las incidencias; para crear la rama, bajar y ubicarse en la nueva rama, subir cambios a la rama y realizar el pull request

 1. Crear la rama en base a la incidencia seleccionada.
    Dirigirse al Issue y crear la nueva rama en el apartado de Development (La rama debe crearse en base a la rama dev)
 3. Bajar la rama al repositorio local y ubicarse en ella.
    Al crear la rama se mostraran los comandos que deben ejecutarse en tu terminal para poder trabajar en ella
 5. Subir los cambios a la rama.
    Para subir los cambios a tu rama remota se debe hacer lo siguiente:
    - git add .
    - git commit -m "Comentario de la rama"
    - git push origin NOMBRE-DE-LA-RAMA-CREADA
 7. Realizar el pull request.
    - Dirigirse al apartado de pull request y crear un nuevo pull request
    - Seleccionar como rama base a "dev" y como rama compara a "NOMBRE-DE-LA-RAMA-CREADA", dar un comentario sobre el pull request y esperar a la confirmación para el merging a la rama dev.
    

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
