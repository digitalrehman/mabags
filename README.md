# MA Bags - E-Commerce Website

Premium luggage and bags website with custom Hajj and Umrah bags. Built with Next.js 16, TypeScript, and MongoDB.

## Features

- 🛍️ Product catalog with filtering and search
- 📝 Blog/Articles section
- 📧 Contact form with EmailJS integration
- 🖼️ Image upload with Cloudinary
- 🌓 Dark/Light theme support
- 📱 Fully responsive design
- ⚡ Fast performance with Next.js

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd "Ma Bags"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
copy .env.example .env.local
```

Then edit `.env.local` and add your actual values:

#### **MongoDB Configuration**
- Go to [MongoDB Atlas](https://cloud.mongodb.com)
- Create a cluster (free tier available)
- Click "Connect" → "Connect your application"
- Copy the connection string and paste in `.env.local`
- Replace `<password>` with your database password
- Replace `<database>` with `mabags` or your preferred database name

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mabags?retryWrites=true&w=majority
```

#### **EmailJS Configuration** (for contact form)
- Go to [EmailJS](https://www.emailjs.com)
- Create a free account
- Create an email service
- Create an email template
- Get your Service ID, Template ID, and Public Key
- Add them to `.env.local`

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

#### **Cloudinary Configuration** (for image uploads)
- Go to [Cloudinary](https://cloudinary.com)
- Create a free account
- Go to Settings → Upload
- Create an unsigned upload preset
- Get your Cloud Name and Upload Preset
- Add them to `.env.local`

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset_name
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
Ma Bags/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── articles/      # Articles API
│   │   └── products/      # Products API
│   ├── about/             # About page
│   ├── articles/          # Articles page
│   ├── collections/       # Products page
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── src/
│   ├── components/        # React components
│   │   ├── about/
│   │   ├── articles/
│   │   ├── collections/
│   │   ├── contact/
│   │   ├── home/
│   │   ├── layout/
│   │   └── ui/
│   ├── config/
│   │   └── global.ts      # Site configuration
│   ├── context/
│   │   └── theme-context.tsx
│   └── lib/
│       ├── mongodb.ts     # MongoDB connection
│       ├── types.ts       # TypeScript types
│       └── utils.ts       # Utility functions
└── public/                # Static assets

```

## Configuration

All site content can be customized from `src/config/global.ts`:
- Brand name and colors
- Hero section content
- Services/Categories
- Contact information
- Navigation links
- SEO settings

## Environment Variables Summary

| Variable | Required | Description | Where to paste |
|----------|----------|-------------|----------------|
| `MONGODB_URI` | ✅ Yes | MongoDB connection string | `.env.local` file |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | ✅ Yes | EmailJS service ID | `.env.local` file |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | ✅ Yes | EmailJS template ID | `.env.local` file |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | ✅ Yes | EmailJS public key | `.env.local` file |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✅ Yes | Cloudinary cloud name | `.env.local` file |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | ✅ Yes | Cloudinary upload preset | `.env.local` file |
| `NEXT_PUBLIC_BASE_URL` | Optional | Base URL for API calls | `.env.local` file |

## Important Notes

⚠️ **Security Warning:**
- **NEVER** commit `.env.local` to GitHub
- The `.env.local` file is already in `.gitignore`
- Only commit `.env.example` with placeholder values
- Keep your MongoDB, EmailJS, and Cloudinary credentials private

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB
- **Email:** EmailJS
- **Images:** Cloudinary
- **UI Components:** Radix UI
- **Animations:** Framer Motion

## License

© 2025 MA Bags — All Rights Reserved.
