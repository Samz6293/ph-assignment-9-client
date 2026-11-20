# PizzaHub — Client

PizzaHub is a pizza ordering platform for local pizzerias. Customers find pizzas near them, order for the day they want and follow the order from their dashboard. Vendors (restaurants) publish menu items and accept or reject orders. Admins review menu items, manage users and see every payment. Vendors can pay for **Premium** through Stripe to get unlimited menu items, a Premium badge and a featured spot on the home page.

This repository is the **Next.js front end**. The Express API lives in its own repository.

## Links

| | |
|---|---|
| Live site | https://ph-assignment-9-smz.vercel.app |
| Live API | https://ph-assignment-9-server-smz.vercel.app |
| Client repository | https://github.com/Samz6293/ph-assignment-9-client |
| Server repository | https://github.com/Samz6293/ph-assignment-9-server |

## Features

**Everyone**
- Home page: banner, Featured Menu Items (Premium vendors first), Pizza Categories, Why Choose PizzaHub?, How PizzaHub Works, with Motion fade-up animations
- Browse Menu: search by name or category, filter by category and area, sort by price; all filters live in the URL, so a filtered page can be shared or reloaded
- Item Details with an image gallery and the vendor's info
- Light and dark mode
- Custom 404 page, error pages, loading skeletons and empty states

**Customers**
- Order form: delivery date (no past dates), address and an optional message
- My Orders: every order with its status, a details dialog with a status timeline (placed → shop's answer → delivery day), and cancel while still pending
- Overview: order counts and a chart of orders by status

**Vendors**
- Add Menu Item with photo upload to ImgBB; new and edited items wait for admin approval
- My Menu Items: edit, delete, and switch items on or off the menu
- Customer Orders: filter by status, see the customer's details, accept or reject a pending order once
- Subscription: Free (3 active items) or Premium ($12.99 / month) through Stripe Checkout, with Payment Success and Payment Cancel pages; cancel or keep Premium later
- Overview: items, orders and current plan, with charts

**Admins**
- Manage Users: search by name or email, filter by role, block and unblock
- Manage Menu Items: search, filter by status, approve, reject or delete
- Transactions: every Premium payment (read-only)
- Overview: users, items and transactions, with charts

**Accounts**
- Sign up as a customer or a vendor (with business name), with an optional profile photo
- Sign in with email and password, or with Google
- Profile Settings to change name, photo and business name

## Tech stack

| Area | Packages |
|---|---|
| Framework | `next` 16 (App Router, Cache Components), `react` 19, TypeScript |
| UI | Tailwind CSS v4, shadcn/ui (`shadcn`, `@base-ui/react`, `class-variance-authority`, `tw-animate-css`), `lucide-react` icons, `sonner` toasts, `next-themes` dark mode |
| Charts | `recharts` (through shadcn's Chart) |
| Animation | `motion` (Framer Motion) |
| Auth | `better-auth` with `@better-auth/mongo-adapter`, `mongodb`, Google OAuth, Better Auth's JWT plugin |
| Hosting | Vercel (`@vercel/functions` for the database connection pool) |
| Images | ImgBB upload API |

## How the challenge parts work

### Sign in, roles and the JWT
1. **Better Auth runs inside this Next.js app** (`lib/auth.ts`). It stores users, sessions and Google accounts in MongoDB, and adds PizzaHub's fields to each user: `role`, `isBlocked`, `businessName`, `subscriptionPlan`, `subscriptionExpiresAt`. Only `role` (customer or vendor) and `businessName` can be set at sign-up, so nobody can sign themselves up as an admin or as Premium.
2. **The JWT plugin** gives the signed-in user a short-lived token (15 minutes). Every call to the Express API sends it as `Authorization: Bearer <token>` (`lib/fetch.ts` on the server side, `lib/auth-client.ts` in the browser).
3. **The Express server checks the token** against Better Auth's public keys (`/api/auth/jwks`), then loads the user from the database to get their real role and blocked status. The browser never decides anyone's role.

### Route protection (`proxy.ts`)
`proxy.ts` runs before dashboard, item details, sign-in, sign-up and blocked pages:
- signed out → Sign In, remembering the page they wanted (`?redirect=`), so they come back after signing in
- blocked → the Blocked page only
- signed in on Sign In / Sign Up → their own dashboard
- another role's dashboard (for example a customer typing `/dashboard/admin`) → their own dashboard

The Express API checks every protected route again, so the proxy only keeps people on the right pages.

### Browse Menu filters (URL query parameters)
The search box and the category, area and sort selects write to the URL, for example `/menu?search=bbq&category=Meat%20Lovers&location=zindabazar&sort=price_asc`. The page reads these `searchParams` on the server and passes them to `GET /menu-items`, which does the filtering and sorting in MongoDB. Because the state lives in the URL, reloading or sharing the page keeps the same results. Admin lists and Customer Orders use the same pattern for their search and status filters.

### Premium with Stripe
1. **Upgrade to Premium** asks the API for a Stripe Checkout page and sends the vendor there.
2. After paying, Stripe sends the vendor to **Payment Success**. This page only reads the plan; it never switches Premium on. If the webhook hasn't arrived yet, it shows "Confirming payment…" and checks again every 2 seconds.
3. Premium is switched on **only by the Stripe webhook on the server**, after Stripe's signature is verified. Leaving checkout leads to **Payment Cancel**, and nothing changes.

## Environment variables

Create a `.env` file in the project root. Names only; never commit the values.

| Name | What it is |
|---|---|
| `BETTER_AUTH_SECRET` | Secret Better Auth signs sessions with (the JWT keys are encrypted with it too) |
| `BETTER_AUTH_URL` | This app's URL, e.g. `http://localhost:3000` |
| `DATABASE_URI` | MongoDB connection string (the same database as the server) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXT_PUBLIC_API_URL` | The Express API's URL, e.g. `http://localhost:8080` |
| `NEXT_PUBLIC_IMGBB_KEY` | ImgBB API key for photo uploads |

Stripe keys are **not** needed here; only the server talks to Stripe.

## Run it locally

You need Node.js 20 or newer and the [server](https://github.com/Samz6293/ph-assignment-9-server) running on port 8080.

```bash
git clone https://github.com/Samz6293/ph-assignment-9-client.git
cd ph-assignment-9-client
npm install
```

Add the `.env` file from the table above, then:

```bash
npm run dev
```

Open http://localhost:3000.

For a production build:

```bash
npm run build
npm start
```

The admin account is not created through sign-up. An existing user is given `role: "admin"` directly in the database.
