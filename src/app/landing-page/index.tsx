import React from "react";
import Image from "next/image";
import SurveyGenerator from "../survey-generator";
import Link from "next/link";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <>
      <section className="flex flex-col items-center space-y-4 justify-center pt-4 w-full sm:pt-24 bg-hero-pattern">
        <h1 className="text-4xl font-bold text-center tracking-tighter sm:text-5xl md:text-6xl leading-6 text-green-700">
          Create your forms <br /> in seconds not hours
        </h1>
        <p className="max-w-[600px] mt-4 text-center text-gray-500 md:text-xl">
          Generate, publish and share your form right away with AI. Dive into
          insightfull results, charts and analytics
        </p>
        <SurveyGenerator />
        <div className="w-full bg-gradient-to-b from-transparent to-white h-24"></div>
      </section>
      <section
        className="flex flex-col items-center justify-center space-y-4 mt-12 pb-24"
        id="features"
      >
        <h2 className="text-3xl font-bold text-center tracking-tighter sm:text-4xl md:text-5xl text-green-700">
          How It Works
        </h2>

        <ul className="grid gap-4 grid-cols-1 md:gridcols-2 lg:grid-cols-3 w-full max-w-5xl text-center">
          <li className="flex flex-col items-center space-y-4 relative">
            <Image
              src="/img/landing/demo1.png"
              width="250"
              height="250"
              alt="create a form"
              className="bg-white p-4 shadow-sm border rounded-md hover:border-green-500 transition-colors"
            />
            <Image
              src="/arrow.svg"
              width="125"
              height="125"
              alt="arrow"
              className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
            />
            <p className="text-green-700">1. Add a prompt and describe the requirements for your form.</p>
          </li>
          <li className="flex flex-col items-center space-y-4 relative">
            <Image
              src="/img/landing/demo4.png"
              width="250"
              height="250"
              alt="update the form"
              className="bg-white p-4 shadow-sm border rounded-md hover:border-green-500 transition-colors"
            />
            <Image
              src="/arrow.svg"
              width="125"
              height="125"
              alt="arrow"
              className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 scale-x-[-1] rotate-180"
            />
            <p className="text-green-700">2. Generate the form.</p>
          </li>
          <li className="flex flex-col items-center space-y-4 relative">
            <Image
              src="/img/landing/demo4.png"
              width="250"
              height="250"
              alt="check the analytics"
              className="bg-white p-4 shadow-sm border rounded-md hover:border-green-500 transition-colors"
            />
            <p className="text-green-700">3. Check results, analytics and more.</p>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-green-50 border-t border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <h3 className="text-green-700 text-lg font-semibold">FormAI</h3>
              <p className="text-gray-500 text-sm">
                Making form creation easier and faster with AI technology.
              </p>
              <div className="flex space-x-6">
                {/* Social Media Links */}
                <Link href="#" className="text-gray-400 hover:text-green-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                {/* Add more social media links as needed */}
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-green-700 text-sm font-semibold">Solutions</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-green-700 text-sm">
                        Form Generator
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-green-700 text-sm">
                        Analytics
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-green-700 text-sm font-semibold">Support</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-green-700 text-sm">
                        Documentation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-green-700 text-sm">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-green-100 pt-8">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} FormAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
