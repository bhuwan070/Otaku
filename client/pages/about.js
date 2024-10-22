import Image from 'next/image';
import React from 'react';
import Head from 'next/head';

const About = () => {
  return (
    <>
      <Head>
        <title>About Us | Learn more about Otaku Festival </title>
        <meta
          property="og:description"
          content="Welcome to Itahari's ultimate celebration of anime, manga, and all things Japanese pop culture – Otaku Festival! Taking place in October, this vibrant event promises to be a haven for passionate Otakus and anime enthusiasts from all around. Immerse yourself in a world of colorful cosplayers parading their favorite characters, bringing beloved anime and manga to life with impressive attention to detail. From classic icons to the latest trends, you'll be amazed by the creativity and dedication on display."
        />
        <meta property="og:type" content="article" />
      </Head>
      <section
        className="flex flex-col w-full h-fit text-center justify-around items-center pt-[7rem] pb-7"
        id="events"
      >
        <div className=" text-center">
          <h3
            className={`font-extrabold text-[40px]  text-center text-[black] border-[#B7002B] border-b-2 mb-8 mx-auto`}
          >
            About <span className="text-[#B7002B]">Otaku Festival</span>
          </h3>
        </div>
        <div
          className={`xl:w-[70%] lg:w-[80%] w-[90%] md:p-6 p-1 text-xl  text-left rounded-lg h-max `}
        >
          <div className="flex xl:flex-row flex-col-reverse gap-4 min-h-[24rem] xl:gap-7">
            <div className="flex flex-col items-center xl:text-lg text-sm md:text-base text-justify xl:w-[70%] justify-between">
              {/* <p className="w-full mb-3">
                Welcome to Itahari&apos;s ultimate celebration of anime, manga,
                and all things Japanese pop culture –{" "}
                <span className="text-[#B7002B] font-semibold">OtakuFest!</span>{" "}
                Taking place in October, this vibrant event promises to be a
                haven for passionate Otakus and anime enthusiasts from all
                around. Immerse yourself in a world of{" "}
                <span className="text-[#B7002B]">colorful cosplayers </span>
                parading their favorite characters, bringing beloved anime and
                manga to life with impressive attention to detail. From classic
                icons to the latest trends, you&apos;ll be amazed by the
                creativity and dedication on display.
              </p>

              <p>
                Our festival, which was started with the intention of uniting
                Otaku fans from all over the world, has developed into a{" "}
                <span className="text-[#B7002B]">cultural phenomenon</span>. We
                are committed to highlighting the unique hobbies and interests
                that characterize Otaku culture, ranging from anime and manga to
                gaming, cosplay, and more.
              </p> */}
              <div>
                <span className="text-left text-[1.2rem] lg:text-[1.5rem] ${poppins.className} font-extrabold w-[100%] text-start mt-4 ">
                  Welcome to Otaku Festival Itahari!
                </span>
                <p className="text-base md:text-md lg:text-xl ${poppins.className} mb-4 mt-2 ">
                  <span>
                    At Otaku festival Itahari, we are passionate about the mix
                    between art and culture. Since 2021, we have been dedicated
                    to curate an event that provides an ambiance for all things
                    art and culture to our event attendees.
                  </span>
                </p>
                <p className="text-base md:text-md lg:text-xl ${poppins.className} mb-4 ">
                  <span>
                    Our team is comprised of planners and doers, who bring in
                    experience and expertise to our organization. We are
                    committed to delivering quality, innovation, and a fun
                    experience for everyone. Itahari is the perfect place for
                    our festival. The city&apos;s warm and welcoming atmosphere
                    sets the stage for an amazing Otaku escapade.
                  </span>
                </p>
                {/* <p className="text-base md:text-md lg:text-xl ${poppins.className} mb-4 ">
                  <span className="font-bold text-green-600 ">Get ready</span>{' '}
                  for an extraordinary journey into the vibrant world of anime,
                  manga, and Japanese pop culture! Welcome to{' '}
                  <span className="font-semibold text-red-600 ">
                    Otaku Festival Itahari
                  </span>
                  , where our passion for these art forms comes to life in the
                  heart of this enchanting city{' '}
                  <span className="font-semibold text-green-600 ">
                    every October
                  </span>
                  . At Otaku Festival Itahari, we believe that the power of
                  these beloved forms of entertainment transcends borders and
                  brings people together like never before.
                  <span className="font-semibold text-green-600 ">
                    {' '}
                    Join us
                  </span>{' '}
                  as we transform Itahari into a heaven for all Otaku
                  enthusiasts, and embark on an{' '}
                  <span className="font-semibold text-blue-600 ">
                    unforgettable adventure
                  </span>{' '}
                  where creativity knows no bounds, and the spirit of fandom
                  knows no limits.
                </p> */}
              </div>

              {/* <div>
                <span className="text-left text-[1.2rem] lg:text-[1.5rem] ${poppins.className} font-extrabold w-[100%] text-start  ">
                  A Glimpse of Itahari
                </span>
                <p className="text-base md:text-md lg:text-xl ${poppins.className} mt-2 ">
                  <span className="font-semibold text-green-600 ">Itahari</span>
                  , a beautiful city in Nepal, is the perfect place for our
                  festival. It&apos;s surrounded by stunning landscapes and has
                  a{' '}
                  <span className="font-semibold text-blue-600 ">
                    rich cultural history
                  </span>
                  . The city&apos;s warm and welcoming atmosphere sets the stage
                  for an{' '}
                  <span className="font-semibold text-red-600 ">
                    amazing Otaku adventure
                  </span>{' '}
                  .
                </p>
              </div> */}
              {/* <div>
                <span className="text-left text-[1.2rem] lg:text-[1.5rem] ${poppins.className} font-extrabold w-[100%] text-start  ">
                  A Glimpse of Itahari
                </span>
                <p className="text-base md:text-md lg:text-xl ${poppins.className} mt-2 ">
                  <span className="font-semibold text-green-600 ">Itahari</span>
                  , a beautiful city in Nepal, is the perfect place for our
                  festival. It&apos;s surrounded by stunning landscapes and has
                  a{' '}
                  <span className="font-semibold text-blue-600 ">
                    rich cultural history
                  </span>
                  . The city&apos;s warm and welcoming atmosphere sets the stage
                  for an{' '}
                  <span className="font-semibold text-red-600 ">
                    amazing Otaku adventure
                  </span>{' '}
                  .
                </p>
              </div> */}
            </div>
            <div className="lg:w-[200%] max-w-[400px] max-h-[400px] mx-auto  w-full items-center ">
              <Image
                src="/assets/about/Otaku2022.webp"
                alt="Otaku Festival 2022 photo"
                height={20}
                width={200}
                className="w-full object-cover rounded-lg border-2 "
                unoptimized
                priority
              />
            </div>
          </div>
          <br />
          <div className="flex xl:flex-row flex-col gap-4 min-h-[24rem] xl:gap-7">
            <div className="xl:w-[100%] max-w-[400px] max-h-[400px] items-center justify-center mx-auto">
              <Image
                src="/assets/about/OtakuFest2022.webp"
                alt="Otaku Festival Photo"
                height={20}
                width={200}
                className="w-full object-cover rounded-lg"
                unoptimized
                priority
              />
            </div>
            <div className="flex flex-col items-center xl:text-lg text-sm md:text-md text-justify xl:w-[70%]">
              {/* <p className="w-[100%]">
                Explore a bustling artist alley where talented illustrators,
                craftsmen, and creators showcase their original works and{" "}
                <span className="text-[#B7002B]">fan art.</span> It&apos;s the
                perfect opportunity to collect unique memorabilia, handcrafted
                accessories, and personalized commissions that will make your
                Otaku heart leap with joy.
              </p>
              <br />
              <p>
                Join engaging panels and workshops hosted by{" "}
                <span className="text-[green]">industry professionals</span> and{" "}
                <span className="text-[blue]">experienced enthusiasts</span>,
                where you can delve deeper into the behind-the-scenes of anime
                production, learn about the history of manga, and sharpen your
                own creative skills.
              </p> */}
              <div>
                <span className="text-left text-[1.2rem] lg:text-[1.5rem] ${poppins.className} font-extrabold w-[100%] text-start  ">
                  Our Story
                </span>
                {/* <p className="text-base md:text-md lg:text-xl ${poppins.className} mt-2">
                  Otaku Festival Itahari is more than just an event; it&apos;s a
                  passion project fueled by a love for anime and a desire to
                  create a{' '}
                  <span className="font-semibold text-red-600 ">
                    vibrant community
                  </span>{' '}
                  vibrant community of like-minded fans. Our journey began with
                  a dream to connect enthusiasts from across the region and
                  provide them with an{' '}
                  <span className="font-semibold text-blue-600 ">
                    unforgettable experience
                  </span>{' '}
                  .
                </p> */}
                <p className="text-base md:text-md lg:text-xl ${poppins.className} mt-2">
                  Otaku Festival Itahari is more than just an event, it&apos;s a
                  passion project fueled by a love for anime and a desire to
                  create a vibrant community of like-minded fans. Our journey
                  began with a dream to connect enthusiasts from across the
                  region and provide them with an amusing experience.
                </p>
              </div>
              {/* <div className="mt-6">
                <span className="text-left text-[1.2rem] lg:text-[1.5rem] ${poppins.className} font-extrabold w-[100%] text-start ">
                  Join the Otaku Revolution
                </span>
                <p className="text-base md:text-md lg:text-xl ${poppins.className} mt-2 ">
                  <span className="font-semibold text-red-600 ">
                    Otaku Festival Itahari
                  </span>{' '}
                  is more than just an event; it&apos;s a community. We invite
                  you to become a part of this exciting journey, share your
                  passion, and{' '}
                  <span className="font-semibold text-blue-600 ">
                    {' '}
                    make memories{' '}
                  </span>{' '}
                  that will last a lifetime.
                </p>
              </div> */}
            </div>
          </div>

          <br />
          <div className="flex xl:flex-row flex-col-reverse gap-4 mb-8 xl:gap-7">
            <div className=" w-[100%] xl:ml-auto xl:text-lg text-sm md:text-md mx-auto items-center text-justify ">
              {/* <p className="w-[100%]">
                Indulge your{" "}
                <span className="text-[#B7002B]">gaming desires </span>in the
                gaming zone, featuring cutting-edge consoles and classic arcade
                machines. Challenge fellow gamers to friendly matches or simply
                lose yourself in the captivating worlds of Japanese video games.
              </p>
              <br />
              <p className="w-[100%]">
                Of course, no OtakuFest would be complete without exciting
                competitions and activities. Participate in{" "}
                <span className="text-[green]">cosplay contests </span>to
                showcase your{" "}
                <span className="text-[brown]">costume craftsmanship</span> and
                acting skills, or test your knowledge in{" "}
                <span className="text-[blue]">trivia challenges </span>to win
                fantastic prizes. Of course, no OtakuFest would be complete
                without exciting competitions and activities. Participate in
                cosplay contests to showcase your costume craftsmanship and
                acting skills, or test your knowledge in trivia challenges to
                win fantastic prizes.
              </p> */}
              <span className="text-left text-[1.2rem] lg:text-[1.5rem] ${poppins.className} font-extrabold w-[100%] text-start mt-4 ">
                What to Expect
              </span>
              <p className="mt-2 text-base md:text-md lg:text-xl">
                With every event of ours, Itahari comes alive with the spirit of
                Otaku culture. Our festival is a fusion of creativity, artistry,
                and pure fandom. Here&apos;s what you can look forward to:
              </p>
              <div className="text-base md:text-md lg:text-xl ">
                <li className="mt-2 ">
                  <span className="font-semibold ">Physical Gathering:</span>{' '}
                  Immerse yourself in a world where cosplay comes to life, and
                  fans unite in the spirit of their favorite characters. Come
                  join us and connect with fellow Otaku enthusiasts
                </li>
                <li className="mt-2">
                  <span className="font-semibold ">Online Ticketing:</span> We
                  understand the importance of convenience, that&apos;s why we
                  offer hassle-free online ticketing. Secure your spot from the
                  comfort of your home.
                </li>
                <li className="mt-2">
                  <span className="font-semibold ">A Diverse Experience:</span>{' '}
                  From cosplay contests and live performances to exclusive
                  merchandise, our festival has something for every fan.
                </li>
              </div>
            </div>
            {/* <div className="max-w-[400px] max-h-[400px] mx-auto">
              <Image
                src="/assets/about/3.png"
                alt="about"
                height={20}
                width={20}
                className="w-full object-cover rounded-lg "
                unoptimized
                priority
              />
            </div> */}
          </div>
          <div className="flex xl:flex-row flex-col-reverse gap-4 mb-8 xl:gap-7">
            <div className=" w-[100%] xl:ml-auto xl:text-lg text-sm md:text-md mx-auto items-center text-justify ">
              <span className="text-left text-[1.2rem] lg:text-[1.5rem] ${poppins.className} font-extrabold w-[100%] text-start mt-4 ">
                Contact Us
              </span>
              <p className="mt-2 text-base md:text-md lg:text-xl">
                If you have any questions or need assistance, don&apos;t
                hesitate to reach out to our dedicated team. We&apos;re here to
                make your Otaku experience enjoyable.
              </p>
            </div>
          </div>
          <div className="flex xl:flex-row flex-col-reverse gap-4  xl:gap-7">
            <div className=" w-[100%] xl:ml-auto xl:text-lg text-sm md:text-md mx-auto items-center text-justify ">
              <span className="text-left text-[1.15rem] lg:text-[1.5rem] ${poppins.className} font-extrabold w-[100%] text-start mt-4 ">
                Get Ready for the Ultimate Otaku Adventure!
              </span>
              <p className="mt-2 text-base md:text-md lg:text-xl">
                Join us in the heart of eastern Nepal as we celebrate the
                vibrant world of anime and everything Otaku. Grab your tickets
                online.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
