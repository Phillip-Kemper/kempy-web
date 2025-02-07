import Link from 'next/link';
import type react from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: react.ReactNode;
  children: react.ReactNode;
};

const Main = (props: IMainProps) => (
  <div>
    <div className="w-full px-4 text-white antialiased sm:px-6">
      {props.meta}
      <div className="mx-auto max-w-screen-md">
        <div className="group border-b border-white/30">
          <div className="relative pt-16 pb-8">
            <div className="text-3xl font-bold">
              <Link
                href="/"
                className="inline-block text-white transition-all duration-300 hover:text-gray-300"
              >
                {AppConfig.title}
              </Link>
            </div>
            <div className="text-2xl font-bold text-gray-300 transition-all duration-300 group-hover:text-white">
              {AppConfig.description}
            </div>
            <div className="absolute bottom-0 left-0 h-px w-full bg-white/30"></div>
          </div>
        </div>

        <div className="content py-5 text-xl">{props.children}</div>

        <div className="border-t border-white/30 py-8 text-center text-sm">
          <div className="space-x-3">
            <a
              href="https://twitter.com/Kemperino_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-all duration-300 hover:text-gray-300"
            >
              x
            </a>
            <span className="text-white/70">&bull;</span>
            <a
              href="https://github.com/Phillip-Kemper"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-all duration-300 hover:text-gray-300"
            >
              github
            </a>
          </div>
          <div className="mt-2 text-gray-300">
            © Copyright {new Date().getFullYear()} {AppConfig.site_name}.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export { Main };
