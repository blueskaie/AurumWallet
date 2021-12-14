import React from 'react'

import Layout from "../../components/layout";
import { useTheme, Box } from '@material-ui/core';
import ARUCard from '../../components/card';
import useStyles from "./style";

export default function PrivacyPolicy() {
  const classes = useStyles(useTheme());

  return (
    <Layout isShownNetworkSelector = {false} isShownBackButton = {true} isShownWallet={false} >
      <Box className={classes.root}>
        <Box>
          <Box className={classes.subtitle}>Privacy Policy</Box>
          <ARUCard className={classes.content}>
            <Box style={{height: '100%', overflow: 'auto', paddingRight: 20}}>
              <span style={{fontWeight: 700}}>OVERVIEW</span>
              <br /><br />
              Your privacy is important to us. At Aurum, we follow a few fundamental principles: We don’t ask you for personally identifiable information (defined below). That being said, your contact information, such as your phone number, social media handle, or email address (depending on how you contact us), may be collected when you communicate with us or if you report a bug or other error related to the Aurum Wallet. We don’t share your information with third parties except to deliver you our Services and products, comply with the law, make the Aurum wallet better, protect our rights, or effectuate a business transfer. We’re not a huge, faceless corporation. We’re just developers trying to deliver an incredible product. If you have any questions or concerns about this policy, please reach out to us at support@aurofficial.com. 
              <br /><br />
              <span style={{fontWeight: 700}}>HOW YOU ACCEPT THIS POLICY</span>
              <br /><br />
              By using the Aurum Wallet, including downloading one of our mobile applications, visiting our website, you agree to the use, disclosure, and procedures outlined in this Privacy Policy.
              <br /><br />
              <span style={{fontWeight: 700}}>WHAT PERSONAL INFORMATION DO WE COLLECT FROM OUR USERS?</span>
              <br /><br />
              The information we collect from you falls into two categories: (i) personally identifiable information (i.e., data that could potentially identify you as an individual) (“Personal Information”), and (ii) non-personally identifiable information (i.e., information that cannot be used to identify who you are) (“Non-Personal Information”). This Privacy Policy covers both categories and will tell you how we might collect and use each type. We do our best not to collect any Personal Information from Aurum Wallet users. That being said, when using our Services, we do collect PUBLIC wallet addresses that you generate through Aurum Wallet. Further, we may collect some Personal Information from you when you communicate with us, including your contact information, such as your phone number, social media handle, or email address (depending on how you reach out). Like other online services, we also collect a variety of Non-Personal Information, including: Information you create through the Aurum Wallet website or mobile applications, including public wallet addresses. Various analytics data, such as: (i) the IP address of the computer you use to access Aurum Wallet; (ii) the type of browser software you are using; (iii) the operating system you are using; (iv) the date and time you access or use Aurum Wallet; (v) the website address, if any, that linked you to Aurum Wallet; (vi) the website address, if any, you leave our website and travel to; and (vii) other non-personally identifiable traffic data.
              <br /><br />
              <span style={{fontWeight: 700}}>HOW WE COLLECT INFORMATION</span>
              <br /><br />
              When You Contact Us. We may collect certain information if you choose to contact us, if you use our Services or if you report a bug or other error with Aurum Wallet. This may include contact information such as your name, email address, phone number, and public wallet address. We, or companies that provide services on our behalf, may also collect certain Non-Personal Information from you, such as your locally hosted public wallet (a “Wallet”) addresses.
              <br /><br />
              <span style={{fontWeight: 700}}>PROTECTION OF US AND OTHERS</span>
              <br /><br />
              We reserve the right to access, read, preserve, and disclose any information that we reasonably believe is necessary to: comply with the law or a court order; cooperate with law enforcement; enforce or apply our Terms of Use and other agreements; or protect the rights, property, or safety of Aurum Wallet, our employees, our users, or others.
              <br /><br />
              <span style={{fontWeight: 700}}>CHANGES AND UPDATES TO PRIVACY POLICY</span>
              <br /><br />
              CHANGES AND UPDATES TO PRIVACY POLICY
              We reserve the right to update and revise this privacy policy at any time. We occasionally review this Privacy Policy to make sure it complies with applicable laws and conforms to changes in our business. We may need to update this Privacy Policy, and we reserve the right to do so at any time. Please review this Privacy Policy regularly to ensure that you are aware of its terms. Any use of Aurum Wallet after an amendment to our Privacy Policy constitutes your acceptance to the revised or amended agreement.
              <br /><br />
              <span style={{fontWeight: 700}}>QUESTIONS</span>
              <br /><br />
              We’d be happy to answer them. Shoot us an email or send us a note: Email: support@Aurofficial.com
            </Box>
          </ARUCard>
        </Box>
      </Box>
    </Layout>
  )
}