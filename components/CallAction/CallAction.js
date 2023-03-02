import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "next-i18next";
import link from "~/public/text/link";
import useStyles from "./action-style";
import { BsFillXCircleFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

function CallAction() {
  const router = useRouter();

  const premiumInitial = 9999;
  const monthpremiumInitial=2999;

  const [premium, setpremium] = useState(premiumInitial);
  const [monthpremium, setmonthpremium] = useState(monthpremiumInitial);
  const [Six, setSix] = useState(6);
  const [One, setOne] = useState(1);
  const [showPrice, setshowPrice] = useState(false);
  const [dprice, setdprice] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");
  // const [amt, setAmt] = useState(0);
  const [payOpen, setPayOpen] = useState(0);
  const [couponApplied, setCouponApplied] = useState("green-500");
  const [open1, setOpen1] = useState(false);
  const [apiData, setApiData] = useState({
    mobile: "",
    offerID: "",
    plan: 0,
    totalCount: 0,
    callback_url: "",
    payment_reason: "",
  });

  let data = JSON.stringify({
    mobile: apiData.mobile,
    plan_id: apiData.plan,
    offer_name: apiData.offerID,
    total_count: apiData.totalCount,
    payment_source: "BabyNama Landing Page",
    callback_url: apiData.callback_url,
    payment_reason: apiData.payment_reason,
  });

  let config = {
    method: "post",
    url: "https://api6.gagahealth.com/payments/create-subscription/",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const payNow = () => {
    setAlert("");

    console.log(apiData);
    console.log(data);
    if (!apiData.mobile || apiData.mobile.length <= 10) {
      setAlert("Please Enter Correct Mobile Number (10 digits)");
      return;
    }
    setOpen1(true);
    axios(config)
      .then((response) => {
        console.log(response.data);
        if (response?.data?.BAD_Coupon) {
          setAlert(response?.data?.BAD_Coupon);
        } else {
          router.push(response.data.url);
          setOpen(false);
          setPayOpen(true);
        }
        setOpen1(false);
      })
      .catch((error) => {
        console.log(error);
        setOpen(false);
        setOpen1(false);
        setPayOpen(true);
      });
  };

  const monthPremiumCoupons = [];
  const sixmonthPremiumCoupons = [7999,8999];

  const validateCoupon = () => {
    console.log(coupon.toUpperCase());

    // if ((coupon.toUpperCase() === 'GET30') && payOpen === 1  && togglebasicprice === false) {
    //   setCouponApplied('green-500')
    //   setAmt(699)
    //   // {togglebasicprice?setAmt(159):setAmt(799)}
    //   setApiData({ ...apiData, offerID:coupon.toUpperCase() })
    // } else if ((coupon.toUpperCase() === 'GET30') && payOpen === 3  && dprice === false) {
    //   setAmt(1749)
    //   // {dprice?setAmt(719):setAmt(1999)}
    //   setCouponApplied('green-500')
    //   setApiData({ ...apiData, offerID: coupon.toUpperCase() })
    // }else

    if (coupon.toUpperCase() === "GET20" && payOpen === 3 && dprice === false) {
      // setAmt(1999);
      setpremium(7999);
      // {dprice?setAmt(719):setAmt(1999)}
      setCouponApplied("green-500");
      setApiData({ ...apiData, offerID: coupon.toUpperCase() });
    } else if (
      coupon.toUpperCase() === "GET10" &&
      payOpen === 3 &&
      dprice === false
    ) {
      // setAmt(2249);
      setpremium(8999)
      // {dprice?setAmt(719):setAmt(1999)}
      setCouponApplied("green-500");
      setApiData({ ...apiData, offerID: coupon.toUpperCase() });
    } else if (
      (coupon.toUpperCase() === "BABY" || coupon.toUpperCase() === "LOHRI") &&
      payOpen === 3 && dprice === false
    ) {
      // setAmt(1999)
      {
        setpremium(7999);
      }
      setCouponApplied("green-500");
      setApiData({ ...apiData, offerID: coupon.toUpperCase() });
    } else if (
      coupon.toUpperCase() !== "BABY" ||
      coupon.toUpperCase() !== "LOHRI" ||
      coupon.toUpperCase() !== "GET20" ||
      coupon.toUpperCase() !== "GET10"
    ) {
      setCouponApplied("red-500");
      setApiData({ ...apiData, offerID: "" });
      if (payOpen === 3) {
        // setAmt(() => {
        //   return dprice ? monthpremium : premium;
        // });
        dprice?setmonthpremium(monthpremiumInitial):setpremium(premiumInitial);
      }
    }
    // setApiData({ ...apiData, offerID: coupons })
    setCoupon('');
    // console.log(amt);
  };

  // Theme breakpoints
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Translation Function
  const { t } = useTranslation("common");

  const classes = useStyles();

  const showPremiumCross = () =>{

    return (payOpen === 3 && (
      dprice ? <>
      <p className='text-base text-[#0035a6] relative pl-3 mb-2' style={{left:"-9px"}}>
        {( monthPremiumCoupons.includes(monthpremium))  && (
          <span className='text-md line-through decoration-red-500 font-semibold'>
          ₹{monthpremiumInitial}
          </span>
        )}
        <span className='text-2xl font-semibold'>
          {' '}
          {` ₹ ${monthpremium} `}
        </span>
      </p>
      </> : <>
      <p className='text-base text-[#0035a6] relative pl-3 mb-2' style={{left:"-9px"}}>
        {(sixmonthPremiumCoupons.includes(premium)) && (
          <span className='text-md line-through decoration-red-500 font-semibold'>
            ₹ {premiumInitial}
          </span>
        )}
        <span className='text-2xl font-semibold'>
          {' '}
          {` ₹ ${premium} `}
        </span>
      </p>
      </>
    ))

  }

  return (
    <>
      <Link href="https://babynama.in/plans">
        <div className="cursor-pointer animate-fadeIn z-[100] flex items-center fixed bottom-2 pl-[4px] sm:pl-2 bg-green-200 hover:bg-green-300 transition-colors duration-[200ms] rounded right-[-20px]">
          <h1 className="font-[500] text-[12px] sm:text-[16px] block sm:mr-[-24px] mr-[-16px] transition-all duration-[200ms]">
            Chat with an Agent Now
          </h1>
          <img className="w-[80px] sm:w-[100px]" src="/images/whatsapp.webp" />
        </div>
      </Link>

      <Container fixed={isDesktop}>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container alignItems="center">
              <Grid item lg={8} md={7} xs={12}>
                <Typography variant="h4" gutterBottom display="block">
                  {t("medical-landing.cta_title")}
                </Typography>
                <Typography
                  variant="h4"
                  gutterBottom
                  display="block"
                  style={{ color: "#03ACF2" }}
                >
                  {/* {t('medical-landing.cta_subtitle')} */}
                  Plans Starts @{dprice ? monthpremium : premium} Rs/{" "}
                  {dprice ? One : Six} Months
                </Typography>
              </Grid>
              <Grid item lg={4} md={5} xs={12}>
                <Grid
                  container
                  className="d-flex justify-content-center align-items-center"
                >
                  <div className="col-12 col-md-4 text-center d-flex justify-content-center align-items-center flex-column">
                    <div className="slide-price mb-2">
                      <div onClick={() => setdprice(true)}>
                        <p
                          className={`point ${
                            dprice ? "bord_price" : "bord_color"
                          } p-2 p-md-2`}
                          style={{ width: "132px" }}
                        >
                          <strong
                            className="d-flex justify-content-center align-items-center font_mobile_button"
                            style={{ fontSize: "18px" }}
                          >
                            {dprice ? (
                              <BsFillCheckCircleFill
                                style={{ width: "20px", height: "20px" }}
                                className="mr-2"
                              />
                            ) : (
                              ""
                            )}
                            1 Month
                          </strong>
                        </p>
                      </div>
                      <div onClick={() => setdprice(false)}>
                        <p
                          className={`point ${
                            dprice ? "bord_color" : "bord_price"
                          } p-2 p-md-2`}
                          style={{ width: "132px" }}
                        >
                          <strong
                            className="d-flex justify-content-center align-items-center font_mobile_button"
                            style={{ fontSize: "18px" }}
                          >
                            {dprice ? (
                              ""
                            ) : (
                              <BsFillCheckCircleFill
                                style={{ width: "20px", height: "20px" }}
                                className="mr-2"
                              />
                            )}
                            6 Months
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => {setshowPrice(true);setPayOpen(3);setCouponApplied('tranparent')}}
                  >
                    {t("medical-landing.cta_btn")}
                  </Button>
                  <h3 className="mt-3">
                    <strong style={{ color: "#3286b3" }}>
                      {dprice ? "" : "10 Days Refund Policy Applicable"}
                    </strong>
                  </h3>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>

        {showPrice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, duration: 1 }}
            className="fixed z-[99] top-0 bottom-0 backdrop-blur-sm left-0 right-0 bg-black/20 flex justify-center items-center overflow-auto"
          >
            <div
              onClick={() => {setshowPrice(false); dprice?setmonthpremium(monthpremiumInitial):setpremium(premiumInitial);}}
              className="fixed top-0 bottom-0 left-0 right-0"
            ></div>
            <motion.div
              className="d-flex justify-content-center align-items-center flex-column relative bg-white mx-2 max-w-[450px] w-full rounded change-color mt-4 overflow-auto"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <h4 className="text-2xl text-[#0035a6] text-center font-semibold pb-2 text-color mt-2 mb-2">
              Holistic Care
              </h4>
              <div>
                <BsFillXCircleFill
                  className="cross_mark"
                  onClick={() => {setshowPrice(false);dprice?setmonthpremium(monthpremiumInitial):setpremium(premiumInitial);}}
                />
              </div>
              <div className="container">
                      <ul className='flex flex-col'>
                        <li className='flex items-center mb-2.5'>
                          <img
                            src='https://cdn.tuk.dev/assets/templates/weCare/checkMark.png'
                            className='mr-4 bg-green-400 rounded-full text-white'
                            alt='check-mark'
                          />
                          <p className='text-gray-800 text-base font-normal'>
                            <strong>WhatsApp Group:  8 am - 11 pm</strong>
                          </p>
                        </li>
                        <li className='flex items-center mb-2.5'>
                          <img
                            src='https://cdn.tuk.dev/assets/templates/weCare/checkMark.png'
                            className='mr-4 bg-green-400 rounded-full'
                            alt='check-mark'
                          />
                          <p className='text-gray-800 text-base font-normal'>
                            <strong>Unlimited Basic Medical Queries</strong> 
                          </p>
                        </li>
                        <li className='flex items-center mb-2.5'>
                          <img
                            src='https://cdn.tuk.dev/assets/templates/weCare/checkMark.png'
                            className='mr-4 bg-green-400 rounded-full'
                            alt='check-mark'
                          />
                          <p className='text-gray-800 text-base font-normal'>
                            <strong>Private Chat</strong> 
                          </p>
                        </li>
                        <li className='flex items-center mb-2.5'>
                          <img
                            src='https://cdn.tuk.dev/assets/templates/weCare/checkMark.png'
                            className='mr-4 bg-green-400 rounded-full'
                            alt='check-mark'
                          />
                          <p className='text-gray-800 text-base font-normal'>
                            <strong>All Consultations Free (Pediatrician/ Nutritionists/ Lactation/ Gynecologist/ Dietician/ Dermatologist)</strong>
                          </p>
                        </li>
                        <li className='flex items-center mb-2.5'>
                          <img
                            src='https://cdn.tuk.dev/assets/templates/weCare/checkMark.png'
                            className='mr-4 bg-green-400 rounded-full'
                            alt='check-mark'
                          />
                          <p className='text-gray-800 text-base font-normal'>
                            <strong>Gyne Group Access</strong>
                          </p>
                        </li>
                        <li className='flex items-center mb-2.5'>
                          <img
                            src='https://cdn.tuk.dev/assets/templates/weCare/checkMark.png'
                            className='mr-4 bg-green-400 rounded-full'
                            alt='check-mark'
                          />
                          <p className='text-gray-800 text-base font-normal'>
                            <strong>Live Yoga Sessions</strong>
                          </p>
                        </li>

                        <li className='flex items-center mb-2.5'>
                          <img
                            src='https://cdn.tuk.dev/assets/templates/weCare/checkMark.png'
                            className='mr-4 bg-green-400 rounded-full'
                            alt='check-mark'
                          />
                          <p className='text-gray-800 text-base font-normal'>
                            <strong>Monthly Growth Tracking For Baby</strong>
                          </p>
                        </li>
                        {/* <li className='flex items-center mb-2.5'>
                          <img
                            src='https://cdn.tuk.dev/assets/templates/weCare/checkMark.png'
                            className='mr-4 bg-green-400 rounded-full'
                            alt='check-mark'
                          />
                          <p className='text-gray-800 text-base font-normal'>
                            <strong>Additional Consultations:</strong> 20%
                            Discount
                          </p>
                        </li> */}
                      </ul>
                      </div>
              <h3 className="mt-3">
                <strong style={{ color: "#3286b3" }}>
                  {dprice ? "" : "10 Days Refund Policy Applicable"}
                </strong>
              </h3>
              <div className="d-flex justify-content-center align-items-center flex-column mt-3 btn-color w-75">
                {/* <p className="text-base text-[#0035a6] relative pl-3 mt-2"> */}
                  {/* <span className='text-md line-through decoration-red-500 mr-2 font-semibold'>
                          ₹ 1999
                        </span> */}
                  {/* <span className="text-2xl font-semibold text-color">
                    Rs {dprice ? monthpremium : premium}/-
                  </span>
                </p> */}
                {showPremiumCross()}
                <div className='w-full flex gap-2'>
                <p
                  onClick={validateCoupon}
                  className='cursor-pointer text-md font-medium order-2 text-white text-center w-[170px] hover:bg-[#2f4a85] bg-[#0035a6] rounded py-2 px-1 bg-[]' style={{fontSize:"12px"}}
                >
                  Apply Coupon
                </p>
                <input
                  onChange={e => setCoupon(e.target.value)}
                  value={coupon}
                  style={{fontSize:"12px"}}
                  className={`border-2 ${
                    couponApplied === 'green-500' ? 'border-green-500' : ''
                  } ${couponApplied === 'red-500' ? 'border-red-500' : ''} ${
                    couponApplied === 'transparent' ? 'border-transparent' : ''
                  } bg-[#0035a6]/20 placeholder:text-gray-500 p-2 rounded w-full outline-none`}
                  type='text'
                  placeholder='Have any Coupon? Use it here'
                />
              </div>
                <p className="mt-2" style={{color:"red"}}>{couponApplied === 'red-500' ?"Coupon is Invalid":''}</p>

                <div
                  className="w-75 cursor-pointer p-2 mt-2 mx-2 text-center font-semibold rounded bg-color mb-2"
                  onClick={() => {
                    setApiData({
                      ...apiData,
                      // offerID: "",
                      plan: dprice ? 11:10,
                      totalCount: 6,
                      callback_url: "https://babynama.com/payment-premium",
                      payment_reason: dprice
                        ? "Subscription - Holistic (1)"
                        : "Subscription - Holistic (6)",
                    });
                    // setCoupon('BABYNAMA_PREMIUM')
                    setCoupon("");
                    setOpen(true);
                    setshowPrice(false);
                    setAlert("");
                    // setAmt(() => {
                    //   return dprice ? monthpremium : premium;
                    // });
                    // setPayOpen(3);
                    setCouponApplied("tranparent");
                  }}
                >
                  Pay Now
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, duration: 1 }}
            className="fixed z-[99] top-0 bottom-0 backdrop-blur-sm left-0 right-0 bg-black/20 flex justify-center items-center"
          >
            <div
              onClick={() => {setOpen(false);dprice?setmonthpremium(monthpremiumInitial):setpremium(premiumInitial);}}
              className="fixed top-0 bottom-0 left-0 right-0"
            >
              {/* <Lottie options={defaultOptions} /> */}
            </div>
            <motion.div
              className="relative bg-white mx-2 p-4 max-w-[450px] w-full rounded"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* <div className='relative bg-white mx-2 p-4 max-w-[350px] w-full rounded'> */}
              <div className="flex flex-col items-center gap-4">
                {/* {payOpen === 3 &&
                  (dprice ? (
                    <>
                      <p className="text-base text-[#0035a6] relative pl-3">
                        {amt === 719 && (
                          <span className="text-md line-through decoration-red-500 font-semibold">
                            ₹ 899
                          </span>
                        )}
                        <span className="text-2xl font-semibold">
                          {" "}
                          {` ₹ ${amt} `}
                        </span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-base text-[#0035a6] relative pl-3">
                        {(amt === 1999 || amt === 2249) && (
                          <span className="text-md line-through decoration-red-500 font-semibold">
                            ₹ 2499
                          </span>
                        )}
                        <span className="text-2xl font-semibold">
                          {" "}
                          {` ₹ ${amt} `}
                        </span>
                      </p>
                    </>
                  ))} */}
                  {showPremiumCross()}

                <div className="w-full flex flex-col gap-2">
                  <p className="text-lg font-medium text-black text-left w-full">
                    Enter Your Mobile Number{" "}
                    <span className="text-red-600 font-bold text-md">*</span> :
                  </p>
                  <PhoneInput
                    onChange={(phone) =>
                      setApiData({ ...apiData, mobile: phone })
                    }
                    containerClass="w-full border-none focus:outline-none focus:border-none outline-none"
                    inputClass="!w-full bg-transparent border-none focus:outline-none focus:border-none outline-none"
                    country={"in"}
                    value={apiData.mobile}
                    className="border-none bg-[#0035a6]/20 placeholder:text-gray-500 p-2 w-full rounded outline-none"
                    type="text"
                    placeholder="Enter Your Mobile No."
                  />
                </div>
                {/* <div className="w-full flex gap-2">
                  <p
                    onClick={validateCoupon}
                    className="cursor-pointer text-md font-medium order-2 text-white text-center w-[170px] hover:bg-[#2f4a85] bg-[#0035a6] rounded py-2 px-1 bg-[]"
                  >
                    Apply Coupon
                  </p>
                  <input
                    onChange={(e) => setCoupon(e.target.value)}
                    value={coupon}
                    className={`border-2 ${
                      couponApplied === "green-500" ? "border-green-500" : ""
                    } ${couponApplied === "red-500" ? "border-red-500" : ""} ${
                      couponApplied === "transparent"
                        ? "border-transparent"
                        : ""
                    } bg-[#0035a6]/20 placeholder:text-gray-500 p-2 rounded w-full outline-none`}
                    type="text"
                    placeholder="Have any Coupon? Use it here"
                  />
                </div>
                <p style={{ color: "red" }}>
                  {couponApplied === "red-500" ? "Coupon is Invalid" : ""}
                </p> */}
                {!open1 && (
                  <div
                    className="!w-full cursor-pointer p-2 bg-[#0035a6] hover:bg-[#2f4a85] text-white font-semibold text-center rounded"
                    onClick={payNow}
                  >
                    Pay Now
                  </div>
                )}
              </div>
              <p className="text-red-500 text-[12px] mt-2">{alert}</p>

              {open1 && (
                <p className="text-red-500 text-[12px] mt-4">
                  Please Wait, Your Transaction is Processing
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </Container>
    </>
  );
}

export default CallAction;
