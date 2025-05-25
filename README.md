# Math Snap Solver ✨

Solve math problems by snapping a photo using Next.js, Genkit, and Google Gemini.

## Features

- Image upload and camera capture
- AI-powered OCR with error correction
- Step-by-step math problem solving
- Beautiful UI with Tailwind CSS and ShadCN

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your Google Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```

3. Start the development server:
```bash
npm run dev
```

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS + ShadCN UI
- Genkit + Google Gemini
- React Dropzone
- MediaDevices API
- KaTeX

## Usage

1. Upload an image or take a photo of a math problem
2. Let the AI extract and correct the text
3. Click "Solve Problem" to get a step-by-step solution
4. View the solution rendered with proper mathematical notation

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
