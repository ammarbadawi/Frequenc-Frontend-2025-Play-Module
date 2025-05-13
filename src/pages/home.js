import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Home = () => {
  return (
    <div>
      <section class="homebanner">
        <div class="container">
          <div class="col-md12">
            <div class="maxwidths">
              <h1>Find where and with whom to play.</h1>
              <p>
                FrequenC Play is your gateway to growth in the sports world.
                Whether you're an academy.
              </p>
            </div>
            <div class="btndemo">
              <a href="/marketplace2" class="btn btnbook">
                Book a Court
              </a>
              <a href="#" class="btn bntgame">
                Join a game
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="hp_why">
        <div class="container">
          <div class="sitetitle">How It work</div>
          <div class="ct">
            <div class="row">
              <div class="col-md-4">
                <div class="dv">
                  <img src="images/register.svg" />
                  <div class="tx1">Register</div>
                  <div class="tx2">
                    Showcase your coaching—no tech skills needed, just passion
                    and expertise.
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="dv">
                  <img src="images/book.svg" />
                  <div class="tx1">Book or Join</div>
                  <div class="tx2">
                    Expand your reach—connect with passionate players across
                    India.
                  </div>
                  <div class="linkbtns">
                    <a href="#">Book</a>
                    <a href="#">Create</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="dv">
                  <img src="images/play.svg" />
                  <div class="tx1">Play</div>
                  <div class="tx2">
                    Turn leads into opportunities— monetize your coaching
                    nationwide.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="hp_box">
        <div class="container">
          <div class="containerr position-realtive">
            <div class="imgty">
              <img src="images/Background.png" />
            </div>
            <div class="coimg">
              <h3>
                Lorem ipsum dolor sit amet, Lorem lorem aliquam sed lacinia
                quis.{" "}
              </h3>

              <div class="buttoniner">
                <a href="#" class="btn btnbook">
                  Book a Court
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="openmatch">
        <div class="container">
          <div class="sitetitle">Open Matches</div>

          <div class="row">
            <div class="col-md-4">
              <div class="matchsec">
                <h3>September 02 l 02:00 pm</h3>
                <ul class="Listmatch">
                  <li>Advance </li>

                  <li>Grass </li>

                  <li>Doubles</li>
                </ul>

                <div class="slotbox">
                  <div class="slot1">
                    <div class="slotuser1">
                      <div class="slotimg">
                        <img src="images/image%20(2).png" />
                      </div>
                      <h4 class="usert">Aadil</h4>
                    </div>
                    <div class="slotuser2">
                      <div class="nouser">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.49069 14.052L6.49069 7.85078L0.374821 7.85078L0.374821 6.08713L6.49069 6.08713L6.49069 0.0281541H8.31123L8.31123 6.08713H14.4271V7.85078H8.31123L8.31123 14.052H6.49069Z"
                            fill="#7930D8"
                          />
                        </svg>
                      </div>
                      <div class="nousert">Available</div>
                    </div>
                  </div>
                  <div class="slot1">
                    <div class="slotuser1">
                      <div class="nouser">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.49069 14.052L6.49069 7.85078L0.374821 7.85078L0.374821 6.08713L6.49069 6.08713L6.49069 0.0281541H8.31123L8.31123 6.08713H14.4271V7.85078H8.31123L8.31123 14.052H6.49069Z"
                            fill="#7930D8"
                          />
                        </svg>
                      </div>
                      <div class="nousert">Available</div>
                    </div>
                    <div class="slotuser2">
                      <div class="nouser">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.49069 14.052L6.49069 7.85078L0.374821 7.85078L0.374821 6.08713L6.49069 6.08713L6.49069 0.0281541H8.31123L8.31123 6.08713H14.4271V7.85078H8.31123L8.31123 14.052H6.49069Z"
                            fill="#7930D8"
                          />
                        </svg>
                      </div>
                      <div class="nousert">Available</div>
                    </div>
                  </div>
                </div>
                <div class="otherinfo">
                  <div class="info1">
                    <div class="venuname">Venue Name</div>
                    <div class="venunamel">New Delhi</div>
                  </div>
                  <div class="info1">
                    <div class="venuname">$6.20</div>
                    <div class="venunamel">90 min</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="matchsec">
                <h3>September 02 l 02:00 pm</h3>
                <ul class="Listmatch">
                  <li>Advance </li>

                  <li>Grass </li>

                  <li>Doubles</li>
                </ul>

                <div class="slotbox">
                  <div class="slot1">
                    <div class="slotuser1">
                      <div class="slotimg">
                        <img src="images/image%20(1).png" />
                      </div>
                      <h4 class="usert">Aadil</h4>
                    </div>
                    <div class="slotuser2">
                      <div class="nouser">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.49069 14.052L6.49069 7.85078L0.374821 7.85078L0.374821 6.08713L6.49069 6.08713L6.49069 0.0281541H8.31123L8.31123 6.08713H14.4271V7.85078H8.31123L8.31123 14.052H6.49069Z"
                            fill="#7930D8"
                          />
                        </svg>
                      </div>
                      <div class="nousert">Available</div>
                    </div>
                  </div>
                  <div class="slot1">
                    <div class="slotuser1">
                      <div class="nouser">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.49069 14.052L6.49069 7.85078L0.374821 7.85078L0.374821 6.08713L6.49069 6.08713L6.49069 0.0281541H8.31123L8.31123 6.08713H14.4271V7.85078H8.31123L8.31123 14.052H6.49069Z"
                            fill="#7930D8"
                          />
                        </svg>
                      </div>
                      <div class="nousert">Available</div>
                    </div>
                    <div class="slotuser2">
                      <div class="nouser">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.49069 14.052L6.49069 7.85078L0.374821 7.85078L0.374821 6.08713L6.49069 6.08713L6.49069 0.0281541H8.31123L8.31123 6.08713H14.4271V7.85078H8.31123L8.31123 14.052H6.49069Z"
                            fill="#7930D8"
                          />
                        </svg>
                      </div>
                      <div class="nousert">Available</div>
                    </div>
                  </div>
                </div>
                <div class="otherinfo">
                  <div class="info1">
                    <div class="venuname">Venue Name</div>
                    <div class="venunamel">New Delhi</div>
                  </div>
                  <div class="info1">
                    <div class="venuname">$6.20</div>
                    <div class="venunamel">90 min</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="matchsec">
                <h3>September 02 l 02:00 pm</h3>
                <ul class="Listmatch">
                  <li>Advance </li>

                  <li>Grass </li>

                  <li>Doubles</li>
                </ul>

                <div class="slotbox">
                  <div class="slot1">
                    <div class="slotuser1">
                      <div class="slotimg">
                        <img src="images/image.png" />
                      </div>
                      <h4 class="usert">Aadil</h4>
                    </div>
                    <div class="slotuser2">
                      <div class="nouser">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.49069 14.052L6.49069 7.85078L0.374821 7.85078L0.374821 6.08713L6.49069 6.08713L6.49069 0.0281541H8.31123L8.31123 6.08713H14.4271V7.85078H8.31123L8.31123 14.052H6.49069Z"
                            fill="#7930D8"
                          />
                        </svg>
                      </div>
                      <div class="nousert">Available</div>
                    </div>
                  </div>
                  <div class="slot1">
                    <div class="slotuser1">
                      <div class="nouser">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.49069 14.052L6.49069 7.85078L0.374821 7.85078L0.374821 6.08713L6.49069 6.08713L6.49069 0.0281541H8.31123L8.31123 6.08713H14.4271V7.85078H8.31123L8.31123 14.052H6.49069Z"
                            fill="#7930D8"
                          />
                        </svg>
                      </div>
                      <div class="nousert">Available</div>
                    </div>
                    <div class="slotuser2">
                      <div class="nouser">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.49069 14.052L6.49069 7.85078L0.374821 7.85078L0.374821 6.08713L6.49069 6.08713L6.49069 0.0281541H8.31123L8.31123 6.08713H14.4271V7.85078H8.31123L8.31123 14.052H6.49069Z"
                            fill="#7930D8"
                          />
                        </svg>
                      </div>
                      <div class="nousert">Available</div>
                    </div>
                  </div>
                </div>
                <div class="otherinfo">
                  <div class="info1">
                    <div class="venuname">Venue Name</div>
                    <div class="venunamel">New Delhi</div>
                  </div>
                  <div class="info1">
                    <div class="venuname">$6.20</div>
                    <div class="venunamel">90 min</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="about-area p-100">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-12">
              <div
                class="about-content"
                data-aos="fade-right"
                data-aos-easing="linear"
                data-aos-duration="800"
              >
                <div class="site-title max-5">
                  <h2>What is FrequenC Play?</h2>
                </div>
                <p>
                  FrequenC Play is your gateway to growth in the sports world.
                  Whether you're an academy, player or related to sports our
                  platform connects you with opportunities to showcase your
                  skills and expand your reach. We make it easy to create and
                  manage your profile, helping you discover talent, service,
                  develop skills, and grow professionally. Join us to bridge the
                  gap between athletes, mentors, products & services and unlock
                  your full potential.
                </p>
              </div>
            </div>
            <div class="col-lg-6 col-md-12">
              <div class="about-image">
                <img src="images/green.png" class="shadow" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="sectioncoures">
        <div class="container">
          <div class="containerTd">
            <div class="sitetitle">Degree Programs</div>
            <Swiper
              modules={[Navigation]}
              spaceBetween={40}
              slidesPerView={5}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },

                480: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },

                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },

                1024: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },

                1200: {
                  slidesPerView: 5,
                  spaceBetween: 40,
                },
              }}
            >
              <SwiperSlide>
                {" "}
                <div class="tradebox">
                  <div class="tradeImage">
                    <img src="images/select-sport-img-1.png.png" />
                  </div>
                  <h4>Cricket</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div class="tradebox">
                  <div class="tradeImage">
                    <img src="images/select-sport-img-2.png.png" />
                  </div>
                  <h4>Football</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div class="tradebox">
                  <div class="tradeImage">
                    <img src="images/select-sport-img-3.png.png" />
                  </div>
                  <h4>Volleyball</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div class="tradebox">
                  <div class="tradeImage">
                    <img src="images/select-sport-img-4.png.png" />
                  </div>
                  <h4>Badminton</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div class="tradebox">
                  <div class="tradeImage">
                    <img src="images/select-sport-img-5.png.png" />
                  </div>
                  <h4>Basketball</h4>
                </div>
              </SwiperSlide>{" "}
              <SwiperSlide>
                {" "}
                <div class="tradebox">
                  <div class="tradeImage">
                    <img src="images/select-sport-img-2.png.png" />
                  </div>
                  <h4>Football</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div class="tradebox">
                  <div class="tradeImage">
                    <img src="images/select-sport-img-3.png.png" />
                  </div>
                  <h4>Volleyball</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div class="tradebox">
                  <div class="tradeImage">
                    <img src="images/select-sport-img-4.png.png" />
                  </div>
                  <h4>Badminton</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div class="tradebox">
                  <div class="tradeImage">
                    <img src="images/select-sport-img-5.png.png" />
                  </div>
                  <h4>Basketball</h4>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
      <section class="hp_box">
        <div class="container">
          <div class="containerr position-realtive">
            <div class="imgty">
              <img src="images/Background.png" />
            </div>
            <div class="coimg">
              <h3>
                Lorem ipsum dolor sit amet, Lorem lorem aliquam sed lacinia
                quis.{" "}
              </h3>

              <div class="buttoniner">
                <a href="#" class="btn btnbook">
                  Book a Court
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="top-services">
        <div class="container">
          <div class="containerf">
            <div class=" row find-service">
              <div class="col-md-3 col-6">
                <div class="Main_serivces">
                  <div class="imgt">
                    <img src="images/image%20157.svg" />
                  </div>
                  <div class="service-txt">18000+</div>
                  <div class="service-txt2">Players</div>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="Main_serivces">
                  <div class="imgt">
                    <img src="images/image%20158.svg" />
                  </div>
                  <div class="service-txt">400+</div>
                  <div class="service-txt2">Stadium</div>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="Main_serivces">
                  <div class="imgt">
                    <img src="images/image%20159.svg" />
                  </div>
                  <div class="service-txt">20+</div>
                  <div class="service-txt2">Games</div>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="Main_serivces">
                  <div class="imgt">
                    <img src="images/image%20160.svg" />
                  </div>
                  <div class="service-txt">3800+</div>
                  <div class="service-txt2">Teams</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="hp_boxwe">
        <div class="container">
          <div class="cofr">
            <div class="coimg3">
              <h3>We Plan Event you can participate </h3>
              <p>
                FrequenC Play is your gateway to growth in the sports world.
                Whether you're an academy
              </p>
            </div>
            <div class="buttoninere">
              <a href="#" class="btn bntgame">
                Find a Game
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="hp_boxwe2">
        <div class="container">
          <div class="cofrnew">
            <div class="cofrnewf">
              <div class="coinew">
                <h3>Join FrequenC Play Now </h3>
                <p>
                  Join Us now if you are a player and need a boost in your
                  career
                </p>
              </div>
              <div class="socialsubs">
                <div class="subsform">
                  <input
                    type="text"
                    placeholder="Enter Your email address"
                    class="form-control"
                  />
                  <button class="btn btn-submit">Send Invite</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
