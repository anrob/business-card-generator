# Business Card Generator

A digital business card generator built with Next.js and React.

## Features
- Digital business card creation and editing
- vCard generation for easy contact sharing
- QR code generation (coming soon)
- Email signature generation (coming soon)
- Airtable integration for data storage

## Tech Stack
- Next.js
- React
- TailwindCSS
- shadcn/ui
- Airtable (for backend)

## Setup
1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/business-card-generator.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env.local file:
```bash
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id
```

4. Run the development server:
```bash
npm run dev
```

## Environment Variables
- `AIRTABLE_API_KEY`: Your Airtable API key
- `AIRTABLE_BASE_ID`: Your Airtable base ID

## Project Structure
- `/components`: React components
- `/pages`: Next.js pages
- `/styles`: CSS styles
- `/lib`: Utility functions
- `/public`: Static assets

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
