import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div>
    <div className="w-full px-1 text-white antialiased">
      {props.meta}

      <div className="mx-auto max-w-screen-md">
        <div className="border-b border-white">
          <div className="pt-16 pb-8">
            <div className="text-3xl font-bold text-white">
              {AppConfig.title}
            </div>
            <div className="text-2xl font-bold">{AppConfig.description}</div>
          </div>
        </div>

        <div className="content py-5 text-xl">{props.children}</div>

        <div className="border-t border-white py-8 text-center text-sm">
          © Copyright {new Date().getFullYear()} {AppConfig.site_name}.
        </div>
      </div>
    </div>
  </div>
);

export { Main };
