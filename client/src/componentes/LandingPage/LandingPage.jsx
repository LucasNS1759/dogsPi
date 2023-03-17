import React from "react";
import { Link } from "react-router-dom";
import styles from "../LandingPage/LandingPage.module.css"

const LandingPage = () => {
  return (
    <div className={styles.divLanding} >
      <h1>welcome to app dogs</h1>
      <Link to={"Home"}>
      <button>Go Home</button>
      </Link>
      <div className={styles.image}>
      <img src="https://scontent.faep31-1.fna.fbcdn.net/v/t31.18172-8/19453252_1539582976116951_3734026076229248671_o.jpg?_nc_cat=104&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeEzGeY92lWCrIus-19P5hTQhe3BpayVgCKF7cGlrJWAIpn-FBSQLt2ZMBh3-jDSw7t7KKNifuDofsMkW1unAM2P&_nc_ohc=m5Xx55x0RiQAX-Gk5XD&_nc_ht=scontent.faep31-1.fna&oh=00_AfB561f_kKTZrG1HCSMtbYRk_3DbnbCPXgZERit_m4-CHQ&oe=64382B32" alt="" />
      </div>
    </div>
  );
};

export default LandingPage;
