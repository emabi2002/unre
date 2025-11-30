// src/lib/emailTemplates.ts

interface RequestEmailData {
  requestNumber: string;
  requestTitle: string;
  requesterName: string;
  requesterEmail: string;
  costCentre: string;
  amount: number;
  description?: string;
  approverName?: string;
  rejectionReason?: string;
  systemUrl?: string;
}

interface PaymentEmailData {
  requestNumber: string;
  voucherNumber: string;
  amount: number;
  payeeName: string;
  requestTitle: string;
  systemUrl?: string;
}

const BASE_STYLE = `
  <style>
    body { font-family: Arial, sans-serif; color: #1e293b; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #166534; color: white; padding: 20px; text-align: center; }
    .content { background-color: #ffffff; padding: 30px; border: 1px solid #e2e8f0; }
    .details { background-color: #f8fafc; padding: 15px; margin: 20px 0; border-left: 4px solid #166534; }
    .detail-row { margin: 10px 0; }
    .detail-label { font-weight: bold; color: #475569; }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #166534;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      color: #64748b;
      font-size: 12px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
    }
  </style>
`;

/**
 * Email sent when a new GE request is submitted
 */
export function newRequestSubmittedEmail(data: RequestEmailData): string {
  const systemUrl = data.systemUrl || "https://unre-bursary.netlify.app";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      ${BASE_STYLE}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New GE Request Submitted</h1>
        </div>
        <div class="content">
          <p>Dear Approver,</p>

          <p>A new General Expenses (GE) request has been submitted for your review and approval.</p>

          <div class="details">
            <div class="detail-row">
              <span class="detail-label">Request Number:</span> ${data.requestNumber}
            </div>
            <div class="detail-row">
              <span class="detail-label">Title:</span> ${data.requestTitle}
            </div>
            <div class="detail-row">
              <span class="detail-label">Requested By:</span> ${data.requesterName} (${data.requesterEmail})
            </div>
            <div class="detail-row">
              <span class="detail-label">Cost Centre:</span> ${data.costCentre}
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount:</span> PGK ${data.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            ${data.description ? `
            <div class="detail-row">
              <span class="detail-label">Description:</span><br/>
              ${data.description}
            </div>
            ` : ""}
          </div>

          <p>Please log into the UNRE Bursary System to review and process this request.</p>

          <a href="${systemUrl}/dashboard/approvals" class="button">View Request</a>

          <p style="margin-top: 30px; font-size: 14px; color: #64748b;">
            This is an automated message from the UNRE GE Request & Budget Control System.
          </p>
        </div>
        <div class="footer">
          <p>University of Natural Resources & Environment of PNG</p>
          <p>GE Request & Budget Control System v1.0</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Email sent when a GE request is approved
 */
export function requestApprovedEmail(data: RequestEmailData): string {
  const systemUrl = data.systemUrl || "https://unre-bursary.netlify.app";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      ${BASE_STYLE}
    </head>
    <body>
      <div class="container">
        <div class="header" style="background-color: #16a34a;">
          <h1>✓ GE Request Approved</h1>
        </div>
        <div class="content">
          <p>Dear ${data.requesterName},</p>

          <p>Good news! Your GE request has been approved${data.approverName ? ` by ${data.approverName}` : ""}.</p>

          <div class="details" style="border-left-color: #16a34a;">
            <div class="detail-row">
              <span class="detail-label">Request Number:</span> ${data.requestNumber}
            </div>
            <div class="detail-row">
              <span class="detail-label">Title:</span> ${data.requestTitle}
            </div>
            <div class="detail-row">
              <span class="detail-label">Cost Centre:</span> ${data.costCentre}
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount:</span> PGK ${data.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <p>Your request will now proceed to the next stage of processing.</p>

          <a href="${systemUrl}/dashboard/requests" class="button" style="background-color: #16a34a;">View Request Status</a>

          <p style="margin-top: 30px; font-size: 14px; color: #64748b;">
            This is an automated message from the UNRE GE Request & Budget Control System.
          </p>
        </div>
        <div class="footer">
          <p>University of Natural Resources & Environment of PNG</p>
          <p>GE Request & Budget Control System v1.0</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Email sent when a GE request is rejected
 */
export function requestRejectedEmail(data: RequestEmailData): string {
  const systemUrl = data.systemUrl || "https://unre-bursary.netlify.app";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      ${BASE_STYLE}
    </head>
    <body>
      <div class="container">
        <div class="header" style="background-color: #dc2626;">
          <h1>GE Request Not Approved</h1>
        </div>
        <div class="content">
          <p>Dear ${data.requesterName},</p>

          <p>Your GE request has not been approved${data.approverName ? ` by ${data.approverName}` : ""}.</p>

          <div class="details" style="border-left-color: #dc2626;">
            <div class="detail-row">
              <span class="detail-label">Request Number:</span> ${data.requestNumber}
            </div>
            <div class="detail-row">
              <span class="detail-label">Title:</span> ${data.requestTitle}
            </div>
            <div class="detail-row">
              <span class="detail-label">Cost Centre:</span> ${data.costCentre}
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount:</span> PGK ${data.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            ${data.rejectionReason ? `
            <div class="detail-row">
              <span class="detail-label">Reason:</span><br/>
              ${data.rejectionReason}
            </div>
            ` : ""}
          </div>

          <p>Please review the feedback and resubmit your request if necessary.</p>

          <a href="${systemUrl}/dashboard/requests" class="button" style="background-color: #dc2626;">View Request</a>

          <p style="margin-top: 30px; font-size: 14px; color: #64748b;">
            This is an automated message from the UNRE GE Request & Budget Control System.
          </p>
        </div>
        <div class="footer">
          <p>University of Natural Resources & Environment of PNG</p>
          <p>GE Request & Budget Control System v1.0</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Email sent when a payment voucher is created
 */
export function paymentVoucherCreatedEmail(data: PaymentEmailData): string {
  const systemUrl = data.systemUrl || "https://unre-bursary.netlify.app";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      ${BASE_STYLE}
    </head>
    <body>
      <div class="container">
        <div class="header" style="background-color: #0891b2;">
          <h1>Payment Voucher Created</h1>
        </div>
        <div class="content">
          <p>Dear Finance Team,</p>

          <p>A payment voucher has been created and is ready for processing.</p>

          <div class="details" style="border-left-color: #0891b2;">
            <div class="detail-row">
              <span class="detail-label">Voucher Number:</span> ${data.voucherNumber}
            </div>
            <div class="detail-row">
              <span class="detail-label">Request Number:</span> ${data.requestNumber}
            </div>
            <div class="detail-row">
              <span class="detail-label">Request Title:</span> ${data.requestTitle}
            </div>
            <div class="detail-row">
              <span class="detail-label">Payee Name:</span> ${data.payeeName}
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount:</span> PGK ${data.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <p>Please log into the system to review and process this payment.</p>

          <a href="${systemUrl}/dashboard/payments" class="button" style="background-color: #0891b2;">View Payment</a>

          <p style="margin-top: 30px; font-size: 14px; color: #64748b;">
            This is an automated message from the UNRE GE Request & Budget Control System.
          </p>
        </div>
        <div class="footer">
          <p>University of Natural Resources & Environment of PNG</p>
          <p>GE Request & Budget Control System v1.0</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Email sent when a payment is processed
 */
export function paymentProcessedEmail(data: PaymentEmailData): string {
  const systemUrl = data.systemUrl || "https://unre-bursary.netlify.app";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      ${BASE_STYLE}
    </head>
    <body>
      <div class="container">
        <div class="header" style="background-color: #16a34a;">
          <h1>✓ Payment Processed</h1>
        </div>
        <div class="content">
          <p>Dear Requestor,</p>

          <p>Your payment has been processed successfully.</p>

          <div class="details" style="border-left-color: #16a34a;">
            <div class="detail-row">
              <span class="detail-label">Voucher Number:</span> ${data.voucherNumber}
            </div>
            <div class="detail-row">
              <span class="detail-label">Request Number:</span> ${data.requestNumber}
            </div>
            <div class="detail-row">
              <span class="detail-label">Payee Name:</span> ${data.payeeName}
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount:</span> PGK ${data.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <p>The payment has been completed and recorded in the system.</p>

          <a href="${systemUrl}/dashboard/requests" class="button" style="background-color: #16a34a;">View Request</a>

          <p style="margin-top: 30px; font-size: 14px; color: #64748b;">
            This is an automated message from the UNRE GE Request & Budget Control System.
          </p>
        </div>
        <div class="footer">
          <p>University of Natural Resources & Environment of PNG</p>
          <p>GE Request & Budget Control System v1.0</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
