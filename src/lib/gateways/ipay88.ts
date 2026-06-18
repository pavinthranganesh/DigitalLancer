// iPay88 adapter stub for future integration

export async function createIpay88Session(order) {
  // TODO: implement iPay88 server-side session creation
  // Return a redirect URL to the iPay88 payment page
  return { url: 'https://ipay88.example/checkout?order=' + order.id }
}
