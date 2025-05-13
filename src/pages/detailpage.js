import React, { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../styles/popUp.scss";
import PopUp from "../components/popUp";
const DetailPage = () => {
  // pop Up related data and functionality
  const [popUpState, setPopUpState] = useState(0);
  const popUpData = [
    {
      heading: "Do you Play Singles or Double?",
      content: "Please select if you want to book a single or double slot",
      btn1: "Singles",
      btn2: "Doubles",
      btn1Redirect: "/payment",
      btn2Redirect: "/payment",
    },
  ];

  return (
    <>
      <div>
        <section class="detailpage">
          <div class="container">
            <div class="rownamerow">
              <div class="rowname">
                <h1>Venue Name</h1>
                <div class="ratingpage">
                  <div class="ratingstar">
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star"></i>
                  </div>
                  <span class="ratingno">4.2</span>
                  <span class="ratingreview">(99 reviews)</span>
                </div>
              </div>

              <div class="buttonsdets">
                <a href="#" class="btn wishlist">
                  {" "}
                  <i class="fa fa-heart"></i> Wishlist
                </a>
                <a href="#" class="btn Share">
                  {" "}
                  <i class="fa fa-share-alt mr-2" aria-hidden="true"></i> Share
                </a>
              </div>
            </div>

            <div class="imagerow">
              <div class="col1">
                <img src="images/imgd1.png" />
              </div>
              <div class="col2">
                <div class="col2i">
                  <img src="images/img2.png" />
                </div>
                <div class="col2i">
                  <img src="images/img3.png" />
                </div>
              </div>

              <div class="col2">
                <div class="col2i">
                  <img src="images/img4.png" />
                </div>
                <div class="col2i">
                  <img src="images/img56.png" />
                </div>
              </div>
            </div>

            <div class="rownamerow2">
              <div class="rowname2">
                <h2 class="sitetitle2">Book</h2>
                <p>Create a private match where you can invite your friends</p>
              </div>

              <div class="buttonsdets2">
                <a href="#" class="btn Openmatches">
                  {" "}
                  Open Matches
                </a>
              </div>
            </div>
          </div>
        </section>

        <section class="bookingsec">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-12">
                <div class="bokmenubox">
                  <h3 class="titleh3">Sports offered by venue</h3>
                  <div class="tabbutton">
                    <button class="tabsbutton">Golf</button>
                    <button class="tabsbutton active">Tennis</button>
                  </div>

                  <h3 class="titleh3">Sports offered by venue</h3>
                  <div class="tabbutton2">
                    <button class="tabsbutton2 active">Tennis Court 1</button>
                    <button class="tabsbutton2">Tennis Court 2</button>
                    <button class="tabsbutton2 ">Tennis Court 3</button>
                  </div>

                  <div class="durationboob">
                    <h3 class="titleh3">Duration</h3>
                    <div class="bookingdu">
                      <span class="bntad">
                        <svg
                          width="10"
                          height="1"
                          viewBox="0 0 10 1"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 0.497314H8.58334"
                            stroke="#1E1E1E"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                      <span>1 Hr</span>
                      <span class="bntad">
                        <svg
                          width="9"
                          height="10"
                          viewBox="0 0 9 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.50261 1.20557V8.7889M0.710938 4.99723H8.29427"
                            stroke="#1E1E1E"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-8 col-12">
                <div class="slotava">
                  <div class="calenderbox">
                    September , 2024 <i class="fa fa-angle-down"></i>
                  </div>

                  <div class="sliderslot">
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
                          slidesPerView: 3,
                          spaceBetween: 10,
                        },

                        480: {
                          slidesPerView: 3,
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
                        <div class="itemslider">
                          <span>Wed,</span> Aug 30
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <div class="itemslider">
                          <span>Wed,</span> Aug 30
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <div class="itemslider">
                          <span>Wed,</span> Aug 30
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <div class="itemslider active">
                          <span>Wed,</span> Aug 30
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <div class="itemslider">
                          <span>Wed,</span> Aug 30
                        </div>
                      </SwiperSlide>{" "}
                      <SwiperSlide>
                        <div class="itemslider">
                          <span>Wed,</span> Aug 30
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <div class="itemslider ">
                          <span>Wed,</span> Aug 30
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div class="itemslider ">
                          <span>Wed,</span> Aug 30
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <div class="itemslider ">
                          <span>Wed,</span> Aug 30
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>

                  <div class="totalslot">
                    <p class="totalitems">10 Slots</p>
                    <ul>
                      <li class="select">
                        <span>01:00</span> PM
                      </li>
                      <li>
                        <span>02:00</span> PM
                      </li>
                      <li>
                        <span>03:00</span> PM
                      </li>
                      <li>
                        <span>04:00</span> PM
                      </li>
                      <li>
                        <span>05:00</span> PM
                      </li>
                      <li>
                        <span>06:00</span> PM
                      </li>
                      <li>
                        <span>07:00</span> PM
                      </li>
                      <li>
                        <span>08:00</span> PM
                      </li>
                    </ul>
                  </div>
                  <div class="bookbuttonf">
                    <button
                      class="btn bookbutton"
                      onClick={() => setPopUpState(1)}
                    >
                      Book
                    </button>
                    <div class="netamt">Net Amount $14.29</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="description">
          <div class="container">
            <div class="descriptonb">
              <h4 class="sitetitle2">Venue Description</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                lorem aliquam sed lacinia quis. Nibh dictumst vulputate odio
                pellentesque sit quis ac, sit ipsum. Sit rhoncus velit in sed
                massa arcu sit eu. Vitae et vitae eget lorem non dui.
                Sollicitudin ut mi adipiscing duis. Convallis in semper laoreet
                nibh leo. Vivamus malesuada ipsum pulvinar non rutrum risus dui,
                risus. Purus massa velit iaculis tincidunt tortor, risus,
                scelerisque risus. In at lorem pellentesque orci aenean dictum
                dignissim in. Aenean pulvinar diam interdum ullamcorper. Vel
                urna, tortor, massa metus purus metus. Maecenas mollis in velit
                auctor cursus scelerisque eget.{" "}
              </p>
            </div>
          </div>
        </section>

        <section class="Amenitiessec">
          <div class="container">
            <div class="Amenities">
              <h4 class="sitetitle2">Venue Description</h4>
              <ul>
                <li>
                  <img src="images/Award%201.svg" /> Free delivery
                </li>
                <li>
                  <img src="images/Check%20double%202.svg" /> 7 days return
                </li>
                <li>
                  {" "}
                  <img src="images/F%20chat%201.svg" /> 7 days return
                </li>
                <li>
                  {" "}
                  <img src="images/F%20chat%201.svg" /> 7 days return
                </li>
                <li>
                  {" "}
                  <img src="images/Globe%201.svg" /> Made in USA
                </li>
                <li>
                  {" "}
                  <img src="images/Award%201.svg" /> 2 years guarantee
                </li>
                <li>
                  {" "}
                  <img src="images/Award%201.svg" /> 2 years guarantee
                </li>
                <li>
                  {" "}
                  <img src="images/Award%201.svg" /> 2 years guarantee
                </li>
                <li>
                  {" "}
                  <img src="images/Award%201.svg" /> 100% authentic
                </li>
                <li>
                  <img src="images/Check%20double%202.svg" /> 24/7 customer
                  support
                </li>
                <li>
                  <img src="images/Check%20double%202.svg" /> 24/7 customer
                  support
                </li>
                <li>
                  <img src="images/Check%20double%202.svg" /> 24/7 customer
                  support
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section class="locationsec">
          <div class="container">
            <div class="locationspage">
              <h4 class="sitetitle2">Venue Location</h4>
              <div>
                <iframe
                  width="100%"
                  height="400"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                >
                  <a href="#">Abc street, Noida, Uttar Pradesh</a>
                </iframe>
              </div>
            </div>
          </div>
        </section>
        <section class="Termscndsec">
          <div class="container">
            <div class="Termscnd">
              <h4 class="sitetitle2"> Terms & Conditions</h4>
              <button class="readmore">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 5.1001L17 28.9001"
                    stroke="#171A1F"
                    stroke-width="2.04"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                  />
                  <path
                    d="M28.9016 17L5.10156 17"
                    stroke="#171A1F"
                    stroke-width="2.04"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section class="Reviewssec">
          <div class="container">
            <div class="ratingusers">
              <h4 class="sitetitle2 d-flex">
                {" "}
                Reviews{" "}
                <div class="ratingpage">
                  <div class="ratingstar">
                    <i class="fa fa-star active"></i>
                  </div>
                  <span class="ratingno">4.2</span>
                  <span class="ratingreview">(99 reviews)</span>
                </div>
              </h4>
              <div class="row">
                <div class="col-md-6">
                  <div class="userratingbox">
                    <div class="userratinglist">
                      <div class="userimg">
                        <img src="images/Rectangle.png" />
                      </div>
                      <div class="ratingdata">
                        <h4>Jay Rutherford</h4>
                        <div class="ratingstar">
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                        </div>
                      </div>
                    </div>
                    <div class="usermsg">
                      Nulla laboris fugiat fugiat minim minim excepteur eiusmod
                      quis. Laborum est minim id cillum nostrud cillum
                      consectetur.
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="userratingbox">
                    <div class="userratinglist">
                      <div class="userimg">
                        <img src="images/Rectangle.png" />
                      </div>
                      <div class="ratingdata">
                        <h4>Jay Rutherford</h4>
                        <div class="ratingstar">
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                        </div>
                      </div>
                    </div>
                    <div class="usermsg">
                      Nulla laboris fugiat fugiat minim minim excepteur eiusmod
                      quis. Laborum est minim id cillum nostrud cillum
                      consectetur.
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="userratingbox">
                    <div class="userratinglist">
                      <div class="userimg">
                        <img src="images/Rectangle.png" />
                      </div>
                      <div class="ratingdata">
                        <h4>Jay Rutherford</h4>
                        <div class="ratingstar">
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                        </div>
                      </div>
                    </div>
                    <div class="usermsg">
                      Nulla laboris fugiat fugiat minim minim excepteur eiusmod
                      quis. Laborum est minim id cillum nostrud cillum
                      consectetur.
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="userratingbox">
                    <div class="userratinglist">
                      <div class="userimg">
                        <img src="images/Rectangle.png" />
                      </div>
                      <div class="ratingdata">
                        <h4>Jay Rutherford</h4>
                        <div class="ratingstar">
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                          <i class="fa fa-star active"></i>
                        </div>
                      </div>
                    </div>
                    <div class="usermsg">
                      Nulla laboris fugiat fugiat minim minim excepteur eiusmod
                      quis. Laborum est minim id cillum nostrud cillum
                      consectetur.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Pop for Single/Double Asking ... */}
      <PopUp
        popUpState={popUpState}
        setPopUpState={setPopUpState}
        data={popUpData}
      />
    </>
  );
};
export default DetailPage;
