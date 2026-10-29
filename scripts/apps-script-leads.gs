/**
 * Beats16 lead sink for a Google Sheet.
 * Paste into Extensions → Apps Script on the spreadsheet, then Deploy → Web app.
 * Execute as: Me. Who has access: Anyone.
 *
 * Script properties:
 *   WEBHOOK_SECRET  same value as LEADS_WEBHOOK_SECRET
 *   ALERT_TO        comma-separated inboxes for MailApp alerts
 *
 * Apps Script does not pass custom headers into doPost. Put the secret on the
 * deployed URL as ?secret=... and use that full URL as LEADS_WEBHOOK_URL.
 * The site also sends X-Beats16-Secret; this script checks that header when
 * the runtime exposes it, and the secret query parameter otherwise.
 */
var LEAD_COLUMNS = [
  "kind",
  "at",
  "name",
  "phone",
  "email",
  "eventType",
  "eventDate",
  "city",
  "functions",
  "interest",
  "guestCount",
  "organisation",
  "message",
  "heardAbout",
  "source",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "band",
];

function doPost(e) {
  try {
    var props = PropertiesService.getScriptProperties();
    var expected = props.getProperty("WEBHOOK_SECRET") || "";
    var provided = readSecret_(e);
    if (!expected || provided !== expected) {
      return json_({ ok: false, error: "unauthorized" });
    }
    if (!e.postData || !e.postData.contents) {
      return json_({ ok: false, error: "empty body" });
    }
    var lead = JSON.parse(e.postData.contents);
    appendLead_(lead);
    try {
      sendAlert_(props.getProperty("ALERT_TO") || "", lead);
    } catch (mailError) {
      console.error(mailError);
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function readSecret_(e) {
  var headers = e.headers || {};
  var fromHeader = headers["X-Beats16-Secret"] || headers["x-beats16-secret"] || "";
  if (fromHeader) return String(fromHeader);
  if (e.parameter && e.parameter.secret) return String(e.parameter.secret);
  return "";
}

function appendLead_(lead) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Leads");
  if (!sheet) sheet = spreadsheet.insertSheet("Leads");
  if (sheet.getLastRow() === 0) sheet.appendRow(LEAD_COLUMNS);
  var row = LEAD_COLUMNS.map(function (key) {
    var value = lead[key];
    return value == null ? "" : String(value);
  });
  sheet.appendRow(row);
}

function sendAlert_(alertTo, lead) {
  if (!alertTo) return;
  var subject =
    lead.kind === "showreel"
      ? "Beats16 showreel: " + (lead.name || "")
      : "Beats16 inquiry: " + (lead.name || "") + " — " + (lead.city || "");
  var lines = LEAD_COLUMNS.map(function (key) {
    return key + ": " + (lead[key] == null ? "" : lead[key]);
  });
  MailApp.sendEmail(alertTo, subject, lines.join("\n"));
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
