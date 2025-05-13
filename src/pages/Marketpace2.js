import React from "react";
import axios from "axios";
import Gameplacebox from "../components/gameplacebox";
const Marketplace2 = () => {
  //calling the Gamebox API
  const getGamebox = async () => {
    try {
      const response = await axios.get(
        "https:https://playapp.quancomp.net/venue/1"
      );
      const data = response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching gamebox data:", error);
    }
  };

  getGamebox();

  return (
    <div>
      <section class="midshop">
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <div class="sidebarfil">
                <a href="#" class="creategame btn">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.33203 10.334H7.66536L7.66536 7.66732L10.332 7.66732V6.33398L7.66536 6.33398L7.66536 3.66732L6.33203 3.66732L6.33203 6.33398L3.66536 6.33398L3.66536 7.66732L6.33203 7.66732L6.33203 10.334ZM6.9987 13.6673C6.07648 13.6673 5.20981 13.4951 4.3987 13.1507C3.58759 12.7951 2.88203 12.3173 2.28203 11.7173C1.68203 11.1173 1.20425 10.4118 0.848698 9.60065C0.504253 8.78954 0.332031 7.92287 0.332031 7.00065C0.332031 6.07843 0.504253 5.21176 0.848698 4.40065C1.20425 3.58954 1.68203 2.88398 2.28203 2.28398C2.88203 1.68398 3.58759 1.21176 4.3987 0.867317C5.20981 0.511762 6.07648 0.333984 6.9987 0.333984C7.92092 0.333984 8.78759 0.511762 9.5987 0.867317C10.4098 1.21176 11.1154 1.68398 11.7154 2.28398C12.3154 2.88398 12.7876 3.58954 13.132 4.40065C13.4876 5.21176 13.6654 6.07843 13.6654 7.00065C13.6654 7.92287 13.4876 8.78954 13.132 9.60065C12.7876 10.4118 12.3154 11.1173 11.7154 11.7173C11.1154 12.3173 10.4098 12.7951 9.5987 13.1507C8.78759 13.4951 7.92092 13.6673 6.9987 13.6673ZM6.9987 12.334C8.48759 12.334 9.7487 11.8173 10.782 10.784C11.8154 9.75065 12.332 8.48954 12.332 7.00065C12.332 5.51176 11.8154 4.25065 10.782 3.21732C9.7487 2.18398 8.48759 1.66732 6.9987 1.66732C5.50981 1.66732 4.2487 2.18398 3.21536 3.21732C2.18203 4.25065 1.66536 5.51176 1.66536 7.00065C1.66536 8.48954 2.18203 9.75065 3.21536 10.784C4.2487 11.8173 5.50981 12.334 6.9987 12.334Z"
                      fill="white"
                    />
                  </svg>
                  Create Game
                </a>
              </div>
              <div class="filterbox">
                <div class="filterboxw">
                  <div class="filtertitle">
                    <span>Check Avalibility</span>
                  </div>
                  <div class="dropdownsearch">
                    <div class="dropdown1s">
                      Location <i class="fa fa-angle-down"></i>
                    </div>
                    <div class="dropdown1s">
                      Date{" "}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.999512 6.49332C0.999512 6.07525 1.33843 5.73633 1.7565 5.73633H12.2425C12.6606 5.73633 12.9995 6.07524 12.9995 6.49332V12.3679C12.9995 12.7167 12.7168 12.9995 12.3679 12.9995H1.63109C1.28228 12.9995 0.999512 12.7167 0.999512 12.3679V6.49332Z"
                          stroke="#47464A"
                          stroke-width="0.756992"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M0.999512 2.57884C0.999512 2.23003 1.28228 1.94727 1.63109 1.94727H12.3679C12.7168 1.94727 12.9995 2.23003 12.9995 2.57884V4.97975C12.9995 5.39782 12.6606 5.73674 12.2425 5.73674H1.7565C1.33843 5.73674 0.999512 5.39782 0.999512 4.97975V2.57884Z"
                          stroke="#47464A"
                          stroke-width="0.756992"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.47607 1V3.52632"
                          stroke="#47464A"
                          stroke-width="0.756992"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.52295 1V3.52632"
                          stroke="#47464A"
                          stroke-width="0.756992"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.26514 10.4736H10.1599"
                          stroke="#47464A"
                          stroke-width="0.756992"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M3.84326 10.4736H5.738"
                          stroke="#47464A"
                          stroke-width="0.756992"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.26514 7.94727H10.1599"
                          stroke="#47464A"
                          stroke-width="0.756992"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M3.84326 7.94727H5.738"
                          stroke="#47464A"
                          stroke-width="0.756992"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="btny text-center">
                    <a href="#" class="creatCheck btn">
                      Check
                    </a>
                  </div>
                </div>
              </div>
              <div class="filterbox">
                <div class="filtertitle">
                  <span>Categories</span>
                </div>

                <ul>
                  <li>
                    <label class="containerchj">
                      All
                      <input type="checkbox" checked="checked" />
                      <span class="checkmark"></span>
                    </label>
                    <span class="numberc">(23)</span>{" "}
                  </li>

                  <li>
                    <label class="containerchj">
                      Football
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                    <span class="numberc">(12)</span>{" "}
                  </li>

                  <li>
                    <label class="containerchj">
                      Badminton
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                    <span class="numberc">(12)</span>{" "}
                  </li>

                  <li>
                    <label class="containerchj">
                      Rugby
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                    <span class="numberc">(45)</span>{" "}
                  </li>
                  <li>
                    <label class="containerchj">
                      Golf
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>{" "}
                    <span class="numberc">(43)</span>
                  </li>
                  <li>
                    <label class="containerchj">
                      Tennis
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>{" "}
                    <span class="numberc">(23)</span>
                  </li>
                  <li>
                    <label class="containerchj">
                      Golf
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                    <span class="numberc">(23)</span>{" "}
                  </li>
                  <li class="viewmore">Show 22 more</li>
                </ul>
              </div>
              <div class="filterbox">
                <div class="filtertitle">
                  <span>Rating</span>
                </div>

                <ul>
                  <li>
                    <label class="containerchj">
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>{" "}
                    <span class="ratingcheck">
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </span>{" "}
                  </li>

                  <li>
                    <label class="containerchj">
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                    <span class="ratingcheck">
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </span>{" "}
                  </li>

                  <li>
                    <label class="containerchj">
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                    <span class="ratingcheck">
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </span>{" "}
                  </li>

                  <li>
                    <label class="containerchj">
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                    <span class="ratingcheck">
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </span>{" "}
                  </li>
                  <li>
                    <label class="containerchj">
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>{" "}
                    <span class="ratingcheck">
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </span>
                  </li>
                  <li>
                    <label class="containerchj">
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>{" "}
                    <span class="ratingcheck">
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star"></i>
                    </span>
                  </li>
                  <li>
                    <label class="containerchj">
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                    <span class="ratingcheck">
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                    </span>{" "}
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-9">
              <div class="elementlist">
                <div class="resutcount">
                  <div class="ressult">
                    Showing 1-12 of 90 result | <a href="#">Near Me</a>
                  </div>
                  <div class="sercressult">
                    <div class="subsforms">
                      <input
                        type="text"
                        placeholder="Search..."
                        class="form-control"
                      />
                      <span class="submitnew">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.9996 14L11.5996 11.6"
                            stroke="#171A1F"
                            stroke-width="0.8"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.8 11.6C9.45097 11.6 11.6 9.45097 11.6 6.8C11.6 4.14903 9.45097 2 6.8 2C4.14903 2 2 4.14903 2 6.8C2 9.45097 4.14903 11.6 6.8 11.6Z"
                            stroke="#171A1F"
                            stroke-width="0.8"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <Gameplacebox />
                  <Gameplacebox />
                  <Gameplacebox />
                  <Gameplacebox />
                  <Gameplacebox />
                  <Gameplacebox />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketplace2;
