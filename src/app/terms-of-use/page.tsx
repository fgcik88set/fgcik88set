// import { NextSeo } from 'next-seo'; // Optional

export default function TermsOfUse() {
  const sections = [
    {
      title: 'Eligibility',
      content: (
        <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>
            Membership is primarily open to alumni of Federal Government College, Ikot Ekpene, Class of 1988, and such other categories as approved by the Alumni Executives.
          </li>
          <li>
            By using this site, you represent that you are at least 18 years old and legally competent to enter into this agreement.
          </li>
          <li>
            We reserve the right to verify eligibility and deny or revoke access if requirements are not met.
          </li>
        </ul>
      ),
    },
    {
      title: 'Accounts & Registration',
      content: (
        <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>
            Provide accurate and complete information during registration and keep it updated.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.
          </li>
          <li>
            Notify us immediately at{' '}
            <a
              href="mailto:fgcik88set@gmail.com"
              className="text-blue-600 underline hover:text-blue-800"
            >
              fgcik88set@gmail.com
            </a>{' '}
            of any unauthorised use or suspected breach.
          </li>
        </ul>
      ),
    },
    {
      title: 'Acceptable Use',
      content: (
        <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>
            Do not use the platform for unlawful, harmful, defamatory, abusive, harassing, fraudulent or misleading purposes.
          </li>
          <li>
            Do not post or share content that infringes intellectual property rights, violates privacy, promotes hate speech or incites violence.
          </li>
          <li>
            Do not collect, scrape or harvest user data without consent.
          </li>
          <li>
            Do not interfere with the operation or security of the platform (e.g., hacking, spamming, malware).
          </li>
          <li>
            Do not impersonate any other person or misrepresent your affiliation.
          </li>
        </ul>
      ),
    },
    {
      title: 'Content & Intellectual Property',
      content: (
        <>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-gray-700">
            <li>
              <strong>Your content:</strong> you retain rights to content you provide (e.g., photos submitted to memories). By providing content, you grant us a worldwide, non-exclusive, royalty-free licence to host, display and share it within the alumni community in line with your settings.
            </li>
            <li>
              <strong>Our content:</strong> the platform, design, logos, trademarks and content we provide remain our intellectual property. You may not copy, distribute, modify, or exploit them without prior written consent.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Privacy',
      content: (
        <p>
          Our collection and use of personal data is governed by our{' '}
          <a
            href="/privacy-policy"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Privacy Policy
          </a>
          , which forms part of these Terms.
        </p>
      ),
    },
    {
      title: 'Communications',
      content: (
        <p>
          By registering, you consent to receive administrative messages and important service announcements. You may opt out of promotional communications at any time.
        </p>
      ),
    },
    {
      title: 'Events, Payments & Donations',
      content: (
        <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>
            Event registration, membership dues or donations (if enabled) may be processed via third-party payment providers.
          </li>
          <li>
            We do not store your full card details.
          </li>
          <li>
            Payments are non-refundable unless otherwise stated in event-specific terms.
          </li>
        </ul>
      ),
    },
    {
      title: 'Disclaimers',
      content: (
        <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>
            The alumni network is provided “as is” without warranties of any kind.
          </li>
          <li>
            We do not guarantee uninterrupted service, accuracy of information, or outcomes of networking opportunities.
          </li>
          <li>
            Users are responsible for their interactions and should exercise caution when sharing information.
          </li>
        </ul>
      ),
    },
    {
      title: 'Limitation of Liability',
      content: (
        <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>
            To the maximum extent permitted by law, we are not liable for indirect, incidental, special or consequential damages arising from your use of the platform.
          </li>
          <li>
            Our total liability for any claim shall not exceed the amount (if any) you paid to use the service in the last 12 months.
          </li>
        </ul>
      ),
    },
    {
      title: 'Termination',
      content: (
        <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>
            We may suspend or terminate accounts that violate these Terms, pose a security risk, or where required by law.
          </li>
          <li>
            You may close your account at any time by contacting us. Certain data may be retained as required by law.
          </li>
        </ul>
      ),
    },
    {
      title: 'Changes to Terms',
      content: (
        <p>
          We may revise these Terms from time to time. The updated version will be posted with a new effective date. Continued use after changes indicates your acceptance.
        </p>
      ),
    },
    {
      title: 'Governing Law & Dispute Resolution',
      content: (
        <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-gray-700">
          <li>
            These Terms are governed by the laws of the Federal Republic of Nigeria.
          </li>
          <li>
            Disputes shall be resolved amicably where possible; otherwise, they shall be subject to the jurisdiction of the courts of Nigeria.
          </li>
        </ul>
      ),
    },
    {
      title: 'Contact',
      content: (
        <p>
          <strong>Email:</strong>{' '}
          <a
            href="mailto:fgcik88set@gmail.com"
            className="text-blue-600 underline hover:text-blue-800"
          >
            fgcik88set@gmail.com
          </a>
        </p>
      ),
    },
  ];

  return (
    <>
      {/* <NextSeo
        title="Terms of Use - FGCIK '88 Alumni"
        description="Terms of Use for the FGCIK '88 Alumni Network, effective September 1, 2025."
        canonical="https://www.fgcik1988set.org/terms-of-use"
      /> */}

      <main className="min-h-screen bg-gray-50 px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl bg-white p-8 shadow-lg sm:rounded-lg">
          {/* Title */}
          <header className="mb-10 text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">FGCIK ’88 ALUMNI</h1>
            <h2 className="mb-2 text-xl font-semibold text-blue-700">Terms of Use</h2>
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
              By registering, accessing or using this platform, you agree to be bound by these Terms of Use. If you do not agree, you must not use the platform.
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