import React from "react"

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">Privacy Policy</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">1. Introduction</h2>
                        <p>Welcome to idokans.com. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">2. Data We Collect</h2>
                        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">3. How We Use Your Data</h2>
                        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">4. Data Security</h2>
                        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">5. Contact Us</h2>
                        <p>If you have any questions about this privacy policy, please contact us at support@idokans.com.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
