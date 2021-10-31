import City from "../static/landing/City.svg"
import LeftGrass from "../static/landing/Left Grass.svg"
import RightGrass from "../static/landing/Right Grass.svg"
import "./Cityscape.scss"


export function Cityscape() {
  return (
      <div className={"cityscape"}>
        <img id={"LeftGrass"} src={LeftGrass} />
        <img id={"City"} src={City} />
        <img id={"RightGrass"} src={RightGrass} />
      </div>
  )
}
