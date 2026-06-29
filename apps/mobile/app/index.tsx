import { Redirect } from "expo-router";

// Single-route state machine: README.md section 7 describes screen as a 0..4
// index rather than distinct URLs, so every screen "lives" at /screen and the
// AppContext.screen value decides what renders. This entry just forwards there.
export default function Index() {
  return <Redirect href="/screen" />;
}
