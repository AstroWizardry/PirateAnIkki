# PirateAnIkki - Manga Reader Boilerplate

A modern, responsive manga reader web application built with Astro, React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Features
- **Homepage** - Featured manga, recent updates, and popular titles
- **Browse Page** - Search and filter manga by genres, status, and more
- **Manga Detail Page** - Comprehensive manga information and chapter list
- **Manga Reader** - Full-featured reader with keyboard navigation
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Mode Support** - Built-in dark/light theme toggle

### Manga Reader Features
- **Keyboard Navigation** - Arrow keys, spacebar, and escape
- **Fullscreen Mode** - Immersive reading experience
- **Page Navigation** - Previous/next, jump 10 pages
- **Loading States** - Smooth loading animations
- **Error Handling** - Graceful fallbacks for missing images

### UI/UX Features
- **Modern Design** - Clean, intuitive interface
- **Search Functionality** - Real-time search across titles and authors
- **Filtering System** - Filter by genres, status, and sort options
- **Rating System** - Star-based ratings with visual feedback
- **Responsive Grid** - Adaptive layout for different screen sizes

## 🛠️ Tech Stack

- **Framework**: Astro 5.x
- **UI Library**: React 19.x
- **Styling**: Tailwind CSS 4.x
- **Language**: TypeScript
- **Backend**: Convex (ready for integration)
- **Package Manager**: Bun

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation and search
│   ├── MangaCard.tsx   # Individual manga display
│   ├── MangaGrid.tsx   # Grid layout for manga
│   ├── MangaReader.tsx # Full-screen reader
│   ├── Sidebar.tsx     # Filter sidebar
│   ├── HomePage.tsx    # Homepage component
│   ├── BrowsePage.tsx  # Browse/search page
│   └── MangaDetailPage.tsx # Manga detail view
├── pages/              # Astro pages
│   ├── index.astro     # Homepage
│   ├── browse.astro    # Browse page
│   └── manga/[id].astro # Dynamic manga pages
├── layouts/            # Page layouts
│   └── Layout.astro    # Main layout
└── styles/             # Global styles
    └── global.css      # Tailwind and custom styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PirateAnIkki
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321`

## 📖 Usage

### Navigation
- **Home** (`/`) - Browse featured and popular manga
- **Browse** (`/browse`) - Search and filter manga
- **Manga Detail** (`/manga/[id]`) - View manga information and chapters

### Manga Reader Controls
- **Arrow Keys** - Navigate between pages
- **Spacebar** - Next page
- **Escape** - Close reader
- **F** - Toggle fullscreen
- **Mouse** - Click navigation buttons

### Search and Filters
- **Search Bar** - Search by title, author, or description
- **Genre Filters** - Filter by multiple genres
- **Status Filters** - Ongoing, completed, or hiatus
- **Sort Options** - Sort by latest, title, rating, etc.

## 🎨 Customization

### Adding New Manga
1. Update the mock data in the respective components
2. Add cover images (use placeholder URLs for testing)
3. Update the manga interface if needed

### Styling
- Modify `src/styles/global.css` for custom styles
- Update Tailwind classes in components
- Customize the color scheme in the theme configuration

### Backend Integration
The project is set up with Convex for backend functionality:
- Database schema in `convex/schema.ts`
- API functions in `convex/` directory
- Ready for real data integration

## 🔧 Development

### Available Scripts
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run format` - Format code with Prettier

### Code Structure
- **Components** are React-based with TypeScript
- **Pages** use Astro for static generation
- **Styling** uses Tailwind CSS utility classes
- **State Management** uses React hooks (ready for global state)

## 🚀 Deployment

### Build for Production
```bash
bun run build
```

### Deploy Options
- **Vercel** - Zero-config deployment
- **Netlify** - Static site hosting
- **GitHub Pages** - Free hosting for open source
- **Any static hosting** - The build output is static files

## 📱 Mobile Support

The application is fully responsive with:
- Mobile-first design approach
- Touch-friendly navigation
- Optimized layouts for small screens
- Collapsible sidebar for mobile

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Reading progress tracking
- [ ] Favorites and reading lists
- [ ] Comments and reviews
- [ ] Advanced search filters
- [ ] Offline reading support
- [ ] Multiple language support
- [ ] Social features (sharing, recommendations)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Placeholder images from [Placeholder.com](https://placeholder.com/)

---

**Happy Reading! 📚** 