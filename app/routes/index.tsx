import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="grid min-h-screen grid-rows-3 items-center bg-gradient-to-br from-blue via-green to-lime text-center">
      <section className="header">
        <h1 className="font-serif text-7xl">Læringshub</h1>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-4">
        <div className="m-8 rounded-2xl bg-white p-8 shadow-xl">
          <div className="m-16 text-center">
            <Link to="/posts" className="text-blue-600 text-xl underline">
              Bloggposter
            </Link>
          </div>
        </div>
        <div className="m-8 rounded-2xl bg-white p-8 shadow-xl">
          <div className="m-16 text-center">
            <Link to="/posts" className="text-blue-600 text-xl underline">
              Kurs
            </Link>
          </div>
        </div>
        <div className="m-8 rounded-2xl bg-white p-8 shadow-xl">
          <div className="m-16 text-center">
            <Link to="/posts" className="text-blue-600 text-xl underline">
              Foredrag
            </Link>
          </div>
        </div>
        <div className="m-8 rounded-2xl bg-white p-8 shadow-xl">
          <div className="m-16 text-center">
            <Link to="/posts" className="text-blue-600 text-xl underline">
              Videoer
            </Link>
          </div>
        </div>
      </section>
      <section className="footer">Footer</section>
    </main>
  );
}
