import { useSelector } from "react-redux";
import EventManagement from "../components/EventManagement";

export default function Notes() {;

  const count = useSelector(
      state => state.counter.count
  )

  return(
    <>
      hello { count }

      <EventManagement />
    </>
  )
}