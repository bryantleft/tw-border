import { Github as GitHub } from "lucide-react";

export default function InstallPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
            Installation
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Get started with tw-border in your Tailwind CSS v4 project.
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Install</h2>
            <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-4 border border-neutral-800 dark:border-neutral-800">
              <pre className="text-sm text-neutral-100 font-mono">
                <code>npm install -D tw-border@beta</code>
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Setup</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Add to your global stylesheet (e.g., <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">app/globals.css</code>):
            </p>
            <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-4 border border-neutral-800 dark:border-neutral-800">
              <pre className="text-sm text-neutral-100 font-mono">
                <code>{`@import "tailwindcss";
@import "tw-border";`}</code>
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Usage</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Create a container with <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">border-dashed</code> and add the SVG inside:
            </p>
            <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-4 border border-neutral-800 dark:border-neutral-800">
              <pre className="text-sm text-neutral-100 font-mono">
                <code>{`<div className="border-dashed border-2 border-neutral-900 dash-6 dash-round rounded-xl">
  <svg className="border-svg">
    <rect />
  </svg>
</div>`}</code>
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Available Classes</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Border Width</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">border</code>,{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">border-2</code>,{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">border-3</code>,{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">border-4</code>, or{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">border-[5px]</code>
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Border Color</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  Standard Tailwind color classes: <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">border-neutral-900</code>,{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">border-blue-500</code>, etc.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Dash Size</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">dash-2</code>,{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">dash-4</code>,{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">dash-6</code>,{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">dash-8</code>,{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">dash-12</code>,{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">dash-24</code>, or{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">dash-[16px]</code>
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Dash Style</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">dash-round</code>,{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">dash-butt</code>,{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">dash-square</code>
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Border Radius</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  Standard Tailwind radius classes: <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">rounded-sm</code>,{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">rounded-xl</code>,{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">rounded-full</code>, etc.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Animation</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">border-animate</code> or{" "}
                  <code className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded">hover:border-animate</code>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Browser Support</h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Compatible with Chromium, WebKit, and Gecko engines.
            </p>
          </section>

          <section className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <a
              href="https://github.com/bryantleft/tw-border"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <GitHub size={20} />
              <span className="font-medium">View on GitHub</span>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}

