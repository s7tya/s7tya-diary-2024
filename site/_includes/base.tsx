import { Head } from "../_components/Head.tsx";
import { Header } from "../_components/Header.tsx";

export default (
  { title, children, site }: Lume.Data,
  helpers: Lume.Helpers,
) => {
  return (
    <html>
      <Head title={title!} />
      <body>
        <div className="root">
          <Header title={site.title} />
          {children}
        </div>
        <script src="/main.js" />
      </body>
    </html>
  );
};
