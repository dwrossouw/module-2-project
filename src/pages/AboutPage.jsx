import { Bookmark, Heart, LibraryBig, Search } from "lucide-react";
import developerPhoto from "../assets/picDR.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-4">
      <section className="bg-[#1D3151] rounded-xl px-4 py-4 md:py-10 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#EAC77B]">
          About Vault of Tomes
        </h1>
        <p className="text-[#FFF4E4] text-sm md:text-base mt-3">
          Every great story deserves a place on your shelf.
        </p>
      </section>
      <section className="py-8 md:py-12">
        <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
          Vault of Tomes is a personal reading companion for discovering new
          books, keeping track of literary adventures, and building a collection
          of stories worth remembering. Whether you're exploring new worlds or
          revisiting old favourites, your next chapter starts here.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-midnight text-center mb-4">
          Explore the possibilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8DED0] text-center">
            <Search className="mx-auto text-enchanted-teal mb-3" size={30} />
            <h3 className="text-lg font-semibold text-midnight mb-2">
              Discover
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Find your next great read.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8DED0] text-center">
            <LibraryBig
              className="mx-auto text-enchanted-teal mb-3"
              size={30}
            />
            <h3 className="text-lg font-semibold text-midnight mb-2">
              Collect
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Build your personal bookshelf
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8DED0] text-center">
            <Bookmark className="mx-auto text-enchanted-teal mb-3" size={30} />
            <h3 className="text-lg font-semibold text-midnight mb-2">Track</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Follow your reading journey.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8DED0] text-center">
            <Heart className="mx-auto text-enchanted-teal mb-3" size={30} />
            <h3 className="text-lg font-semibold text-midnight mb-2">Review</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Rate books and share your thoughts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <h2 className="text-2xl font-semibold text-midnight text-center mb-4">
          Behind the Vault
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
          <div>
            <img
              src={developerPhoto}
              alt="Pic of the developer"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#EAC77B] shadow-md"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-midnight mb-2">
              Meet the Developer
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Reader, fantasy enthusiast and aspiring web developer.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="https://github.com/dwrossouw"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub
                  className="text-enchanted-teal hover:text-midnight transition-colors"
                  size={26}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/dewaal-rossouw-b24a14301/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin
                  className="text-enchanted-teal hover:text-midnight transition-colors"
                  size={26}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto space-y-4">
          <p>Hi! I'm De Waal, the developer behind Vault of Tomes.</p>
          <p>
            As an avid reader and fantasy enthusiast, I've always loved getting
            lost in fictional worlds. From discovering new stories to keeping
            track of my favourite books, I wanted to create something that
            combined my passion for reading with my growing skills in web
            development.
          </p>
          <p>
            I built Vault of Tomes as part of my Ironhack Web Development
            Bootcamp, using React, external APIs, and a JSON Server backend to
            create an interactive reading companion.
          </p>
          <p>
            This project represents an important step in my journey towards
            becoming a web developer, and I'm excited to keep learning,
            building, and improving along the way.
          </p>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
