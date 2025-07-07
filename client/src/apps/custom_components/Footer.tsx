import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-10 border-t bg-muted text-muted-foreground px-4 py-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <BookOpen className="w-5 h-5" />
          <span>Minimal Library System © 2025</span>
        </div>
        <div>
            <p className="text-xs font-light text-center">
         Built by <span className="font-light">Rasel Shikder</span>
      </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <title>GitHub</title>
              <path d="M12 .296a12 12 0 0 0-3.79 23.397c.6.112.793-.26.793-.577v-2.26c-3.226.703-3.907-1.553-3.907-1.553-.547-1.39-1.335-1.76-1.335-1.76-1.092-.747.082-.732.082-.732 1.206.085 1.84 1.24 1.84 1.24 1.073 1.837 2.812 1.306 3.497.998.108-.778.42-1.306.763-1.607-2.572-.292-5.275-1.286-5.275-5.73 0-1.266.464-2.3 1.226-3.11-.123-.293-.53-1.468.116-3.06 0 0 .998-.319 3.272 1.18a11.39 11.39 0 0 1 5.954 0c2.273-1.499 3.27-1.18 3.27-1.18.647 1.592.24 2.767.118 3.06.763.81 1.225 1.844 1.225 3.11 0 4.455-2.706 5.434-5.285 5.72.432.372.816 1.103.816 2.222v3.293c0 .32.192.694.8.576A12.003 12.003 0 0 0 12 .296z"/>
            </svg>
          </a>

          <a
            href="https://linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <title>LinkedIn</title>
              <path d="M20.452 20.452h-3.554v-5.568c0-1.327-.026-3.037-1.849-3.037-1.85 0-2.133 1.445-2.133 2.939v5.666H9.364V9h3.415v1.561h.049c.476-.9 1.635-1.85 3.368-1.85 3.598 0 4.263 2.367 4.263 5.444v6.297zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM6.932 20.452H3.743V9h3.189v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.725v20.547C0 23.23.792 24 1.771 24h20.451c.98 0 1.771-.771 1.771-1.728V1.725C24 .771 23.208 0 22.225 0z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
