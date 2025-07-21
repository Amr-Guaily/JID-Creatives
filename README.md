# JID-Creatives Movie Search App 🎬

A modern, responsive movie search application built with Next.js 15, TypeScript, and TailwindCSS. Search through thousands of movies and TV shows using the OMDb API.

> **Note**: This project was created as a technical assessment for a Frontend Developer position at JID-Creatives.

## Features

- **Movie Search**: Search for movies and TV shows by title
- **Persistent Search**: Search queries persist in URL for sharing and page refreshes
- **URL-based Navigation**: Share specific search results or movie details via URL
- **Detailed Information**: View comprehensive movie details including cast, ratings, plot, and more
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Image Handling**: Robust external image loading with fallback placeholders
- **Error Handling**: Graceful error handling with user-friendly messages
- **TypeScript**: Full type safety throughout the application

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **OMDb API** - Movie database API
- **React Hooks** - Modern React patterns

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Amr-Guaily/JID-Creatives.git
cd JID-Creatives
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Add your OMDb API key to `.env.local`:

```
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_OMDB_BASE_URL=http://www.omdbapi.com/
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Configuration

The app uses the OMDb API to fetch movie data. You'll need to:

1. Get a free API key from [OMDb API](http://www.omdbapi.com/apikey.aspx)
2. Add it to your `.env.local` file

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ErrorMessage.tsx   # Error display component
│   ├── LoadingSpinner.tsx # Loading indicator
│   ├── MovieCard.tsx      # Movie card component
│   ├── MovieDetails.tsx   # Movie details view
│   ├── MovieImage.tsx     # Optimized image component
│   └── SearchInput.tsx    # Search input with debouncing
├── lib/                   # Utility functions
│   └── movieService.ts    # API service layer
├── types/                 # TypeScript type definitions
│   └── movie.ts           # Movie-related types
└── public/                # Static assets
    └── placeholder-movie.svg # Fallback movie poster
```

## Features in Detail

### Persistent Search Functionality

- **URL-based State**: Search queries and movie selections are stored in the URL
- **Page Refresh Persistence**: Users can refresh the page and their search will be re-executed with fresh data
- **Shareable URLs**: Users can share direct links to specific search results or movie details
- **Fresh Data**: Always fetches fresh data from the API when restoring state
- **Navigation History**: Browser back/forward buttons work correctly with search state

### Search Functionality

- Debounced search input (500ms delay)
- Minimum 3 characters required
- Real-time search results
- Error handling for API failures

### Image Handling

- Optimized external image loading
- Automatic fallback to placeholder for broken images
- Configured domains for OMDb API image sources
- Responsive image sizing

### Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interface
- Smooth animations and transitions

### Error Handling

- Network error handling
- API rate limiting handling
- User-friendly error messages
- Retry functionality
