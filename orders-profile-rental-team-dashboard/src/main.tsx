import React from "react";
import ReactDOM from "react-dom/client";
import JoyOrderDashboardTemplate from "./templates/order-dashboard/App";
import MyProfile from "./templates/profile-dashboard/components/MyProfile";
import RentalDashboard from "./templates/rental-dashboard/App";
import { Stack } from "@mui/joy";
import TeamExample from "./templates/team/App";
import EmailExample from "./templates/email/App";
import FilesExample from "./templates/files/App";
// import JoySignInSideTemplate from "./templates/sign-in-side/App";
// import JoyMessagesTemplate from "./templates/messages/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Stack spacing={10}>
      <MyProfile />
      <JoyOrderDashboardTemplate />
      <RentalDashboard />
      <TeamExample />
      <FilesExample />
      <EmailExample />
      {/* <JoySignInSideTemplate /> */}
      {/* <JoyMessagesTemplate /> */}
    </Stack>
  </React.StrictMode>
);
