import { FC } from "react";
import UserInfo from "./components/UserInfo";
import Header from "./components/Header";
import Charts from "./components/Charts";
import Psychology from "./components/Psychology";
import Features from "./components/Features";
import Professional from "./components/Professional";

const App: FC = () => {
  return (
    <div className="container mx-auto">
        <Header></Header>
        <UserInfo></UserInfo>
        <Charts></Charts>
        <Professional/>
        <Psychology></Psychology>
        <Features></Features>
    </div>
  )

}

export default App