import { Typography } from "@mui/joy";
import ThreeScene from "./ThreeScene";

function Home() {

return (
  <div style={{width: '100vw', height: '100vh', position: "relative" }}>  
    <div style={{ position: "relative", zIndex: 1, padding: '2em' }}>
      <Typography level="h1">
        Code and Chill
      </Typography>
    </div>
    <ThreeScene />
  </div>
)
}

export default Home;