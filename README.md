# Softball Front

Portal del softbol venezolano (PuntoDeportivo / RosterDeportivo): resultados en
vivo, tabla de posiciones, directorio de estadios y un anotador móvil.

Portado desde el prototipo UI/UX a **SvelteKit + Svelte 5 (runes) + Tailwind CSS 4**
y preparado para conectarse a una API **Laravel**.

## Requisitos

- Node.js 20+ (recomendado 22)
- npm

## Desarrollo

```sh
npm install
npm run dev
```

## Conexión con Laravel

Por ahora los módulos usan los datos de ejemplo de
`src/lib/data/placeholders.ts`. Para consultar la API real define las variables
en un archivo `.env`:

```sh
LARAVEL_API_URL=http://localhost:8000/api
PUBLIC_API_BASE_URL=http://localhost:8000/api
```

- `LARAVEL_API_URL` se usa **solo en el servidor** (`$app/env/private`) y activa
  la carga desde la API en `src/lib/server/repository.ts`.
- `PUBLIC_API_BASE_URL` queda disponible en el navegador (`$app/env/public`) para
  llamadas interactivas a través de `src/lib/api/client.ts`.

Sin `LARAVEL_API_URL` el portal sigue funcionando con los placeholders.

El contrato esperado hoy es:

| Recurso    | Endpoint         |
| ---------- | ---------------- |
| Juegos     | `GET /games`     |
| Posiciones | `GET /standings` |
| Estadios   | `GET /stadiums`  |

Ajusta rutas y DTO en `src/lib/server/repository.ts` y los tipos en
`src/lib/types/index.ts` cuando el backend esté definido. El resto de los
componentes no cambia.

## Estructura

```
src/
├─ env.ts                      # variables de entorno tipadas
├─ app.css                     # Tailwind + temas visuales
├─ lib/
│  ├─ api/client.ts            # fetch para el navegador
│  ├─ server/api.ts            # fetch server-side hacia Laravel
│  ├─ server/repository.ts     # selector API / placeholders
│  ├─ data/placeholders.ts     # datos de ejemplo
│  ├─ stores/                  # estado global (marca, tema, toast)
│  ├─ types/index.ts           # modelos del dominio
│  └─ components/              # UI del portal
└─ routes/
   ├─ +page.server.ts          # carga inicial
   └─ +page.svelte             # portal
```

## Scripts

```sh
npm run dev        # servidor de desarrollo
npm run build      # build de producción (adapter-node)
npm run preview    # previsualiza el build
npm run check      # svelte-check / TypeScript
npm run lint       # prettier + eslint
npm run format     # formatea el código
```
