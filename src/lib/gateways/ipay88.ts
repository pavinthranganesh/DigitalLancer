/**
 * Basic example of an iPay88 adapter.
 * NOTE: This is a skeleton and must be completed with real merchant details.
 * iPay88 typically requires building a POST form with signed params and redirecting the customer.
 */

export async function createIpay88Session(order) {
  // Example: return a redirect URL to a hosted payment page for iPay88
  // Replace the following with real integration code using merchant key/secret
  const fakeUrl = `https://ipay88.example/checkout?order=${order.id}`
  return { url: fakeUrl }
}

export async function verifyIpay88Response(body) {
  // TODO: verify signature from iPay88 and return payment status
  return { ok: true }
}
