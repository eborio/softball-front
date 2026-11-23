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
LARAVEL_API_URL=http://softball.test/api
PUBLIC_API_BASE_URL=http://softball.test/api
```

- `LARAVEL_API_URL` se usa **solo en el servidor** (`$app/env/private`) y activa
  la carga desde la API en `src/lib/server/repository.ts`.
- `PUBLIC_API_BASE_URL` queda disponible en el navegador (`$app/env/public`) para
  llamadas interactivas a través de `src/lib/api/client.ts`.

Sin `LARAVEL_API_URL` el portal sigue funcionando con los placeholders.

El contrato OpenAPI se genera en el repo `softball` con `composer openapi`
(`docs/openapi.json`) y se puede navegar en `/docs/api`. Los DTO del front viven
en `src/lib/api/contract.ts`.

| Recurso       | Endpoint                     | Auth |
| ------------- | ---------------------------- | ---- |
| Deportes      | `GET /v1/sports`             | No   |
| Estados       | `GET /v1/states`             | No   |
| Ligas         | `GET /v1/leagues?sport=slug` | No   |
| Torneos       | `GET /v1/tournaments`        | No   |
| Juegos        | `GET /v1/games`              | No   |
| Juego         | `GET /v1/games/{id}`         | No   |
| Posiciones    | `GET /v1/standings`          | No   |
| Estadios      | `GET /v1/stadiums`           | No   |
| Token         | `POST /v1/auth/token`        | No   |
| Revocar token | `DELETE /v1/auth/token`      | Sí   |
| Marcador      | `PATCH /v1/games/{id}/score` | Sí   |
| Jugada        | `POST /v1/games/{id}/plays`  | Sí   |

Las escrituras usan `Authorization: Bearer <token>` (Sanctum). Obtén el token con
`POST /v1/auth/token` enviando `username`, `password` y opcionalmente
`device_name`.

Los deportes de `GET /v1/sports` incluyen `emoji` y `order`; el front respeta el
orden definido en el admin. `GET /v1/states` devuelve solo los estados activos; el
admin los activa desde la tabla de Estados. Los estadios llegan con su municipio y
estado resueltos desde la relación estado → municipio → estadio, y con `status`
como objeto `{ name, color }`; los estados son fijos (seeders) y se asignan desde el
formulario de **Stadiums**, no tienen CRUD propio.

El selector de deporte y estado actualiza la URL (`?sport=slug&state=VE-K`) y
vuelve a consultar la API con esos filtros en `/v1/games`, `/v1/standings` y
`/v1/stadiums`.

## Estructura

```
src/
├─ env.ts                      # variables de entorno tipadas
├─ app.css                     # Tailwind + temas visuales
├─ lib/
│  ├─ api/client.ts            # fetch para el navegador
│  ├─ api/contract.ts          # DTO del contrato OpenAPI
│  ├─ server/api.ts            # fetch server-side hacia Laravel
│  ├─ server/repository.ts     # selector API / placeholders y mapeo
│  ├─ data/placeholders.ts     # datos de ejemplo
│  ├─ data/sports.ts           # deportes fallback y emojis
│  ├─ data/states.ts           # estados fallback
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
