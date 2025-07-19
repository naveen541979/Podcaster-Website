import React from 'react';

const Home = () => {
  return (
    <div className="bg-green-100 px-6 md:px-12 h-screen lg:h-[100vh] flex flex-col items-center justify-center -translate-y-8">
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-6">
        <div className="w-full lg:w-5/6 text-center lg:text-left">
          <h1 className="sm:text-4xl md:text-6xl lg:text-8xl font-bold">
            Create & listen to the <br />
            <span className="flex justify-center lg:justify-start items-end">
              p
              <span>
                <img 
                  src="https://cdn-icons-png.flaticon.com/128/2113/2113324.png"
                  alt="headphone"
                  className="h-10 md:h-12 lg:h-20 mx-2"
                />
              </span>
              dcast
            </span>
          </h1>
        </div>
        <div className="hidden lg:block w-1/6">
          <div className="w-36 py-4 px-0.5 border border-black font-semibold rounded-full text-center -rotate-90">
            Scroll Down
          </div>
        </div>
      </div>
      <div className="mt-12 w-full flex flex-col lg:flex-row items-center lg:items-end justify-between text-center lg:text-left">
        <div className="flex flex-col items-center lg:items-start justify-center">
          <p className="text-xl font-semibold">
            Listen to the most popular podcasts on just one platform - <b>PODCASTER</b>
          </p>
          <button className="px-6 py-4 bg-green-900 text-white font-semibold rounded-full mt-6 lg:mt-8">
            Login to listen
          </button>
        </div>
        <div className="mt-6 lg:mt-0">
          <p className="text-zinc-600 font-bold">
            Our app contains more than 2000 podcasts for you
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
