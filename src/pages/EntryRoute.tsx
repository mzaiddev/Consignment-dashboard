import { Link } from "react-router-dom";


export default function EntryRoute() {
  return (
    <div className="text-2xl flex  items-center justify-center  flex-col">
    <div className=" text-blue-900" >Admin</div>
    <Link to={"/consigner"}>Consigner</Link>
    <Link to={"/consignee"}>Consignee
    </Link>
    </div>
  )
}
