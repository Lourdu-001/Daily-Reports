
import react from 'react'

export function tool(tablename) {

  let a;

  if(tablename == "sector5") {
    a = "sector5 successfully intiallized";
  } else {
    a = "failed to connect sector5";
  }

  return a;
}

export default function Notes() {
  return (
    <>
      <div className="bg-[url(/assets/images/pattern-cover.webp)]  bg-cover"></div>
    </>
  )
}