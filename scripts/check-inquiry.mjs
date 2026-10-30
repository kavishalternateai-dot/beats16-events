/**
 * A valid inquiry with no delivery sink must be refused.
 * Usage: BASE_URL=http://127.0.0.1:3000 node scripts/check-inquiry.mjs
 */
const base = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const response = await fetch(`${base}/api/inquiry`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Origin: base,
  },
  body: JSON.stringify({
    name: "QA Tester",
    phone: "9820133078",
    email: "qa@example.com",
    eventType: "Wedding",
    eventDate: "",
    city: "Mumbai",
    functions: [],
    interest: "",
    guestCount: "",
    organisation: "",
    message: "Delivery check",
    heardAbout: "Directory listing",
    source: "delivery-check",
    companyWebsite: "",
  }),
});
const body = await response.json();
if (response.status !== 503 || body.ok !== false) {
  console.error(`Expected 503, received ${response.status}`, body);
  process.exit(1);
}
console.log("Inquiry with no delivery sink returned 503.");
