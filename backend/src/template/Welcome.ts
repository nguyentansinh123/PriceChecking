import mjml2html from 'mjml';
export const welcomeEmailTemplate = (name: string) => `
<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="Roboto, Arial, sans-serif" />
      <mj-button border-radius="30px" padding="15px 30px" />
      <mj-class name="section-title" font-size="20px" font-weight="600" color="#03045E" padding-bottom="10px" />
      <mj-class name="feature-box" background-color="#ffffff" border-radius="12px" box-shadow="0 4px 10px rgba(0,0,0,0.05)" padding="20px" font-size="16px" color="#343a40" />
      <mj-class name="feature-icon" font-size="24px" padding-right="10px" />
    </mj-attributes>
        <mj-style inline="inline">
      .gradient-title {
        font-size: 32px;
        font-weight: bold;
        color: #ffffff;
        line-height: 1.4;
      }
      .faded-subtitle {
        font-size: 15px;
        font-weight: bold;
        color: #ffffff;
        letter-spacing: 0.6px;
        text-transform: uppercase;
      }
    </mj-style>
  </mj-head>

  <mj-body background-color="#f1f5f9">

    <!-- Header -->
    <mj-section background-color="#0077b6" padding="50px 0" border-radius="0 0 20px 20px">
      <mj-column>
        <mj-text align="center" css-class="gradient-title">👋 Welcome to PriceCompare</mj-text>
        <mj-text align="center" css-class="faded-subtitle">Scan. Track. Compare. Save more every day.</mj-text>
      </mj-column>
    </mj-section>

    <!-- Content Wrapper -->
    <mj-wrapper background-color="#ffffff" border-radius="16px" padding="40px">

      <!-- Intro -->
      <mj-section>
        <mj-column>
          <mj-text font-size="18px" color="#03045E">Hi ${name},</mj-text>
          <mj-text font-size="16px" color="#343a40" padding-bottom="20px">
            You’ve just joined a community of smart shoppers. Here’s what you can do with <strong>PriceCompare</strong>:
          </mj-text>
        </mj-column>
      </mj-section>

      <!-- Features -->
      <mj-section>
        <mj-column width="33%">
          <mj-text css-class="feature-box">
            <span css-class="feature-icon">🔍</span><strong>Compare</strong> prices across Coles, Woolies & ALDI.
          </mj-text>
        </mj-column>
        <mj-column width="33%">
          <mj-text css-class="feature-box">
            <span css-class="feature-icon">📦</span><strong>Scan</strong> product barcodes for instant checks.
          </mj-text>
        </mj-column>
        <mj-column width="33%">
          <mj-text css-class="feature-box">
            <span css-class="feature-icon">📈</span><strong>Track</strong> price changes and get notified fast.
          </mj-text>
        </mj-column>
      </mj-section>

      <!-- CTA -->
      <mj-section padding-top="30px">
        <mj-column>
          <mj-button background="linear-gradient(to right, #00b4d8, #03045e)" color="#ffffff" font-size="16px">
            🚀 Start Exploring
          </mj-button>
        </mj-column>
      </mj-section>

      <!-- Pro Tip -->
      <mj-section background-color="#e0f7fa" padding="20px" border-radius="12px" text-align="center">
        <mj-column>
          <mj-text font-size="16px" color="#0077b6">
            💡 Pro Tip: Add items to your watchlist to get price drop alerts instantly!
          </mj-text>
        </mj-column>
      </mj-section>

    </mj-wrapper>

    <!-- Footer -->
    <mj-section padding="20px">
      <mj-column>
        <mj-divider border-color="#dddddd" />
        <mj-social font-size="12px" icon-size="20px" mode="horizontal" padding="10px 0">
          <mj-social-element name="facebook" href="#" />
          <mj-social-element name="twitter" href="#" />
          <mj-social-element name="instagram" href="#" />
        </mj-social>
        <mj-text font-size="12px" color="#888888" align="center">
          Need help? <a href="https://yourapp.com/support" style="color:#0077b6;">Contact support</a> · 
          <a href="https://yourapp.com/unsubscribe" style="color:#888888;">Unsubscribe</a><br/>
          © 2025 PriceCompare. All rights reserved.
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>

`;