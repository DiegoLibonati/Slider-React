# Quoteflo

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**Quoteflo** is a reviews carousel component built with React 19 and TypeScript. It displays a collection of user testimonials in a visually engaging slider, where each card shows a profile photo, the reviewer's name, their role or title, and a personal quote.

The carousel supports two navigation modes that work together seamlessly. In automatic mode, the slider advances to the next review every 3 seconds without any user interaction, making it ideal for displaying testimonials on landing pages or portfolio sections where the content should speak for itself. In manual mode, the user can click the previous or next arrow buttons at any time to move freely through the reviews at their own pace. Both modes coexist: clicking a button resets the auto-advance timer, so the automatic navigation always resumes from wherever the user left off.

Navigation is circular — moving past the last review wraps back to the first, and going before the first wraps to the last, so the carousel loops indefinitely without dead ends.

Each review card is animated using CSS classes that track whether the card is the currently active slide, the one that just left (last slide), or one waiting ahead (next slide). This gives the transition a sense of direction and depth without relying on any animation library.

The component is fully accessible: the carousel region has the appropriate ARIA role and description, each review card exposes its visibility state via `aria-hidden`, and all interactive controls have descriptive `aria-label` attributes so screen readers can navigate the component meaningfully.

## Technologies used

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3

## Libraries used

#### Dependencies

```
"react": "^19.2.4"
"react-dom": "^19.2.4"
"react-icons": "^4.4.0"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/quoteflo`](https://www.diegolibonati.com.ar/#/project/quoteflo)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.
