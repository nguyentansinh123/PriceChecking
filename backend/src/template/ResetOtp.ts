import mjml2html from 'mjml';
export const ResetOtp = (otp: string) => `
<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="Roboto, Arial, sans-serif" />
      <mj-text font-size="16px" color="#333333" />
      <mj-button background-color="#03045E" color="#ffffff" border-radius="4px" font-weight="bold" />
    </mj-attributes>
    <mj-style>
      .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #03045E; }
      .footer-text { font-size: 12px; color: #888888; }
    </mj-style>
  </mj-head>
  <mj-body background-color="#f0f0f0">
    <mj-section padding="20px">
    </mj-section>
    <mj-section background-color="#ffffff" padding="20px" border-radius="8px">
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#03045E">Your Reset OTP Code</mj-text>
        <mj-text>Hi there,</mj-text>
        <mj-text>Use the following One-Time Password (OTP) to complete your verification. This code will expire in 5 minutes.</mj-text>
        <mj-text css-class="otp-code">${otp}</mj-text>
        <mj-button href="{{verification_link}}">Verify Now</mj-button>
        <mj-text>Didn't request this? If you didn't try to verify, please ignore this email.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding="20px">
      <mj-column>
        <mj-text css-class="footer-text">Need help? Contact our support at <a href="mailto:support@example.com">support@example.com</a></mj-text>
        <mj-text css-class="footer-text">© 2025 Your Company. All rights reserved.</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;