import Link from "next/link";
import Image from "next/image";
import { examplesArray } from "@/app/examples/examples";

export default function ExamplesPage() {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Examples
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Real-world implementations of dashed borders
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {examplesArray.map((example) => (
            <Link
              key={example.slug}
              href={`/examples/${example.slug}`}
              className="flex items-start gap-4 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              {example.logo && (
                <Image
                  src={example.logo}
                  alt={example.name}
                  width={48}
                  height={48}
                  className="rounded-lg shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  {example.name}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {example.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

