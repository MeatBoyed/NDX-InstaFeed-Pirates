async function worker() {
  // Get from any API
  const res = await fetch(
    "https://rcjwq7cdtld6.share.zrok.io/api/framer/home/1"
  )
  const status = await res.json()

  console.log("Status: ", status)

  /* Adjust, filter, or manipulate the data */

  const data = JSON.stringify(status)
  console.log("Data: ", data)
  //   return new Response(data)
  return data
}

worker()
