This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# PWA Icon Selector

A dynamic Progressive Web App (PWA) that allows users to choose between different icon sets for the application. The selected icon set is stored in cookies and dynamically affects all PWA-related icons including the manifest.json and apple-touch-icon.

## Features

- 🎨 **Dynamic Icon Selection**: Choose between two different icon sets (A and B)
- 🍪 **Cookie-Based Persistence**: Your selection is remembered across sessions
- 📱 **Full PWA Support**: Complete Progressive Web App functionality
- 🔄 **Real-time Updates**: Icons update immediately when you change your selection
- 🍎 **Apple Touch Icon**: Dynamic apple-touch-icon generation based on selection
- 📋 **Dynamic Manifest**: PWA manifest.json generated dynamically based on icon choice

## Icon Sets

### Icon Set A
- **Style**: Modern gradient design
- **Description**: Contemporary look with gradient effects

### Icon Set B  
- **Style**: Classic flat design
- **Description**: Clean, minimal flat design

## Technical Implementation

### Key Components

1. **Dynamic Manifest** (`/manifest.json`): 
   - Generated server-side based on cookie value
   - Returns appropriate icon paths for selected set

2. **Dynamic Apple Touch Icon**:
   - Set in layout.tsx metadata generation
   - Changes based on selected iconset cookie

3. **Cookie Management**:
   - Cookie name: `pwa-iconset`
   - Values: `'a'` or `'b'`
   - Default: `'a'` if no cookie is set

4. **Icon Organization**:
   ```
   public/iconsets/
   ├── a/
   │   ├── apple-touch-icon-180x180.png
   │   ├── pwa-64x64.png
   │   ├── pwa-192x192.png
   │   ├── pwa-512x512.png
   │   ├── maskable-icon-512x512.png
   │   └── icon-a.png
   └── b/
       ├── apple-touch-icon-180x180.png
       ├── pwa-64x64.png
       ├── pwa-192x192.png
       ├── pwa-512x512.png
       ├── maskable-icon-512x512.png
       └── icon-b.png
   ```

### Service Worker

The app includes a basic service worker (`/sw.js`) that caches both icon sets and essential resources for offline functionality.

## Getting Started

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Run development server**:
   ```bash
   bun run dev
   ```

3. **Open browser**:
   Navigate to `http://localhost:3000`

4. **Test PWA functionality**:
   - Select different icon sets using the UI
   - Check that `/manifest.json` updates dynamically
   - Install the PWA to see icon changes take effect

## Testing Dynamic Manifest

You can test the dynamic manifest generation via curl:

```bash
# Default (iconset A)
curl http://localhost:3000/manifest.json

# With iconset B
curl -H "Cookie: pwa-iconset=b" http://localhost:3000/manifest.json
```

## Built With

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Bun** - Package manager and runtime

## PWA Features

- ✅ Service Worker registration
- ✅ Web App Manifest
- ✅ Apple Touch Icons
- ✅ Installable
- ✅ Offline support (basic caching)
- ✅ Dynamic icon switching

## Browser Support

Works in all modern browsers that support:
- Service Workers
- Web App Manifest
- CSS Grid & Flexbox
- ES6+ features

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
