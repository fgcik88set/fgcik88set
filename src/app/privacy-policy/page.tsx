// import { NextSeo } from 'next-seo'; // Optional

export default function PrivacyPolicy() {
  const sections = [
    {
      title: 'Personal data we collect',
      content: (
        <>
          <p>Depending on how you use the platform, we collect:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-gray-700">
            <li>
              <strong>Account & profile data:</strong> name, maiden name (if applicable), class set, email, phone, avatar/photo, location (city/country), biography, employment/education history, interests, links to social profiles.
            </li>
            <li>
              <strong>Alumni activity data:</strong> directory preferences, event RSVPs, donations/dues status, and any content you upload to memories or profile sections.
            </li>
            <li>
              <strong>Technical data:</strong> device/browser type, IP address, pages viewed, referral URLs, session identifiers, cookies and similar technologies.
            </li>
            <li>
              <strong>Payment data (if applicable):</strong> amounts, timestamps and limited payment metadata. Card/bank details are handled by our payment provider; we do not store full card numbers.
            </li>
            <li>
              <strong>Special category/sensitive data:</strong> We generally do not request sensitive data (e.g., health, religion, ethnicity). Please avoid posting such data. If ever needed for a defined purpose, we will ask for explicit consent or rely on another lawful basis.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'How we obtain data',
      content: (
        <ul className="list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>
            <strong>Directly from you:</strong> when you sign up, complete your profile, register for events or contact support.
          </li>
          <li>
            <strong>Automatically:</strong> via cookies, logs and analytics when you use the site.
          </li>
          <li>
            <strong>From third parties (where lawful):</strong> payment processors, email service providers, event tools, or social sign-in providers (with your action/permission).
          </li>
        </ul>
      ),
    },
    {
      title: 'Why we process your data (purposes & lawful bases)',
      content: (
        <ul className="list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>Provide and operate the alumni platform — contract/legitimate interests.</li>
          <li>Personalise your experience — legitimate interests/consent for non-essential cookies.</li>
          <li>Administer communications — legitimate interests/consent where required.</li>
          <li>Process payments/donations/dues — contract/legal obligation.</li>
          <li>Ensure security and prevent abuse — legitimate interests/legal obligation.</li>
          <li>Comply with law, respond to lawful requests, and enforce our Terms — legal obligation/legitimate interests.</li>
        </ul>
      ),
    },
    {
      title: 'Cookies and similar technologies',
      content: (
        <p>
          We use essential cookies to keep you signed in and operate core features, and (optionally) analytics cookies to understand usage and improve the service. You can manage non-essential cookies through our banner or your browser settings.
        </p>
      ),
    },
    {
      title: 'When we share your data',
      content: (
        <ul className="list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>We do not sell personal data.</li>
          <li>
            <strong>Service providers/Processors:</strong> hosting, analytics, email/SMS, payment processing and customer support—bound by data-processing agreements.
          </li>
          <li>
            <strong>Other members:</strong> your profile fields as you configure them (e.g., name, class set, photo), directory visibility and any content you publish.
          </li>
          <li>
            <strong>Legal/disclosure:</strong> to comply with law, enforce our terms, protect users, investigate security incidents, or in connection with a reorganisation/transition of the association.
          </li>
        </ul>
      ),
    },
    {
      title: 'International (cross-border) transfers',
      content: (
        <p>
          If we transfer personal data outside Nigeria (e.g., to cloud or email providers), we will use a lawful transfer mechanism permitted by the NDPA, such as adequacy decisions, binding corporate rules, standard contractual clauses, approved codes of conduct, or certified mechanisms, and we will document transfer assessments.
        </p>
      ),
    },
    {
      title: 'Data retention',
      content: (
        <p>
          We retain alumni account data for as long as you maintain an account or as necessary to provide services. You may request deletion at any time (see “Your rights”). We may retain minimal records where required by law (e.g., transaction records) or to resolve disputes and enforce agreements.
        </p>
      ),
    },
    {
      title: 'Your rights',
      content: (
        <ul className="list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>Access your personal data and receive a copy.</li>
          <li>Rectify inaccurate or incomplete data.</li>
          <li>Erasure in certain circumstances.</li>
          <li>Object to processing or withdraw consent where relied upon.</li>
          <li>Restrict processing in certain cases.</li>
          <li>Data portability of data you provided in a structured, commonly used format.</li>
          <li>Not be subject to solely automated decisions that have legal or similarly significant effects.</li>
          <li>Complain to the Nigeria Data Protection Commission (NDPC) or your local regulator.</li>
        </ul>
      ),
    },
    {
      title: 'Children’s data',
      content: (
        <p>
          This service is intended for adults (alumni and invited community members). We do not knowingly collect personal data from children under 18 without appropriate consent. If you believe a child has provided data, please contact us to delete it.
        </p>
      ),
    },
    {
      title: 'Security',
      content: (
        <p>
          We employ administrative, technical and physical safeguards appropriate to the risks, including access controls, encryption in transit, hardened configurations, monitoring and staff awareness. No system is perfectly secure; we encourage you to use strong, unique passwords and manage your visibility settings.
        </p>
      ),
    },
    {
      title: 'Data breaches',
      content: (
        <p>
          If a personal data breach occurs, we will assess the impact and notify you and regulators when required by law, and take steps to mitigate harm and prevent recurrence, consistent with NDPA breach obligations.
        </p>
      ),
    },
    {
      title: 'Your choices & controls',
      content: (
        <ul className="list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>Profile & directory visibility: choose which fields appear to other members.</li>
          <li>Communication preferences: opt in/out of non-essential emails or SMS.</li>
          <li>Cookies: manage non-essential cookies via the banner or browser settings.</li>
          <li>Account deletion: request deletion of your account and content (subject to legal/legitimate retention).</li>
        </ul>
      ),
    },
    {
      title: 'Third-party links and public areas',
      content: (
        <p>
          Public profile fields and any memories or listings visible to other members may be copied by others. Exercise caution when sharing personal data in any public or member-visible areas. We are not responsible for the privacy practices of third-party sites linked from our platform.
        </p>
      ),
    },
    {
      title: 'Legal bases summary (NDPA/GDPR mapping)',
      content: (
        <ul className="list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>Contract necessity: to provide the alumni platform.</li>
          <li>Legitimate interests: community networking, platform safety, proportionate analytics (subject to your rights).</li>
          <li>Consent: non-essential cookies, certain communications, any special-category data.</li>
          <li>Legal obligation: tax/financial recordkeeping, lawful requests.</li>
          <li>Public interest/vital interests: only if applicable and as defined by law.</li>
        </ul>
      ),
    },
    {
      title: 'Data controller & DPO/contact',
      content: (
        <>
          <p>
            <strong>Controller:</strong> Federal Government College Ikot Ekpene ’88 Alumni.
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:fgcik88set@gmail.com" className="text-blue-600 underline hover:text-blue-800">
              fgcik88set@gmail.com
            </a>
          </p>
          <p>We will cooperate with the Nigeria Data Protection Commission (NDPC) where required.</p>
        </>
      ),
    },
    {
      title: 'Changes to this policy',
      content: (
        <p>
          We may update this notice to reflect changes to our practices or the law. We will post the updated version with a new effective date and, where appropriate, notify you by email or in-app.
        </p>
      ),
    },
    {
      title: 'Complaints',
      content: (
        <p>
          If you have concerns, please contact us first. You may also lodge a complaint with the Nigeria Data Protection Commission (NDPC) or your local supervisory authority (if outside Nigeria).
        </p>
      ),
    },
    {
      title: 'U.S. State Privacy Rights (California and others)',
      content: (
        <ul className="list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>
            <strong>Right to Know:</strong> request details about the categories and specific pieces of personal information we have collected about you in the last 12 months.
          </li>
          <li>
            <strong>Right to Delete:</strong> request that we delete personal information we hold about you, subject to certain exceptions (e.g., completing a transaction, complying with law).
          </li>
          <li>
            <strong>Right to Correct:</strong> request corrections to inaccurate personal information.
          </li>
          <li>
            <strong>Right to Opt-Out of Sale/Sharing:</strong> We do not sell or share personal information for monetary value. If our practices change, you will be notified and given an opportunity to opt out.
          </li>
          <li>
            <strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.
          </li>
        </ul>
      ),
    },
    {
      title: 'Terms of Use',
      content: (
        <div>
          <p>
            <strong>Effective Date: 1 September 2025</strong>
          </p>
          <p>
            By registering, accessing or using this platform, you agree to be bound by these Terms of Use. If you do not agree, you must not use the platform.
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-gray-700">
            <li>
              <strong>Eligibility:</strong> Membership is primarily open to alumni of Federal Government College, Ikot Ekpene, Class of 1988, and such other categories as approved by the Alumni Executives.
            </li>
            <li>
              <strong>Accounts & Registration:</strong> Provide accurate and complete information; you are responsible for your credentials.
            </li>
            <li>
              <strong>Acceptable Use:</strong> No unlawful, harmful, defamatory, abusive, harassing, fraudulent or misleading purposes.
            </li>
            <li>
              <strong>Content & Intellectual Property:</strong> You retain rights to your content; grant us a worldwide, non-exclusive, royalty-free licence to host and share it.
            </li>
            <li>
              <strong>Privacy:</strong> Our collection and use of personal data is governed by this Privacy Policy.
            </li>
            <li>
              <strong>Events, Payments & Donations:</strong> Processed via third-party providers; we do not store full card details.
            </li>
            <li>
              <strong>Termination:</strong> We may suspend or terminate accounts that violate these Terms.
            </li>
            <li>
              <strong>Governing Law & Dispute Resolution:</strong> Nigerian law; disputes resolved in Nigerian courts.
            </li>
          </ul>
          <p className="mt-4">
            <strong>Contact:</strong>{' '}
            <a href="mailto:fgcik88set@gmail.com" className="text-blue-600 underline hover:text-blue-800">
              fgcik88set@gmail.com
            </a>
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* <NextSeo
        title="Privacy Policy - FGCIK '88 Alumni"
        description="Privacy Policy for the FGCIK '88 Alumni Network, effective September 1, 2025."
        canonical="https://www.fgcik1988set.org/privacy-policy"
      /> */}

      <main className="min-h-screen bg-gray-50 px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl bg-white p-8 shadow-lg sm:rounded-lg">
          {/* Title */}
          <header className="mb-10 text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">FGCIK ’88 ALUMNI</h1>
            <h2 className="mb-2 text-xl font-semibold text-blue-700">Privacy Policy</h2>
            <p className="text-lg text-gray-600">Effective Date: 1 September 2025</p>
          </header>

          {/* Who We Are */}
          <section className="mb-8 text-sm">
            <h3 className="mb-4 text-xl font-semibold text-blue-700">Who we are</h3>
            <p className="text-gray-700">
              <strong>Federal Government College Ikot Ekpene ’88 Alumni</strong> (“we”, “us”, “our”) operates the FGCIK ’88 Alumni Network at{' '}
              <a
                href="https://www.fgcik1988set.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                www.fgcik1988set.org
              </a>
              .
            </p>
            <p className="mt-2 text-gray-700">
              We are committed to protecting your privacy and handling your personal data in a lawful, fair, and transparent way. This notice explains what we collect, why, how long we keep it, who we share it with, how we protect it, and the rights available to you. It is designed to meet the requirements of the{' '}
              <strong>Nigeria Data Protection Act, 2023 (NDPA)</strong> and the NDPR/Implementation Framework, and reflects good practice under the <strong>EU GDPR</strong>.
            </p>
          </section>

          {/* Numbered Sections */}
          <div className="space-y-3">
            {sections.map((section, index) => (
              <section
                key={index}
                className="rounded-md bg-white p-5 text-sm"
              >
                <h3 className="mb-2 text-lg font-semibold text-blue-700">
                  {index + 1}) {section.title}
                </h3>
                <div className="prose text-gray-700">{section.content}</div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}