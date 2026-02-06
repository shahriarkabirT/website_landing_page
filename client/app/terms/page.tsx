import React from "react"

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">Terms & Conditions</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">1. Agreement to Terms</h2>
                        <p>These Terms, govern your use of idokans.com and provide information about the idokans.com Service, outlined below. When you create an idokans.com account or use idokans.com, you agree to these terms.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">2. Our Services</h2>
                        <p>idokans.com provides an e-commerce platform that allows merchants to build online stores and sell products and services to customers.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">3. User Accounts</h2>
                        <p>You are responsible for maintaining the security of your account and password. idokans.com cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">4. Payment and Renewal</h2>
                        <p>By selecting a product or service, you agree to pay idokans.com the one-time and/or monthly or annual subscription fees indicated (additional payment terms may be included in other communications).</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">5. Limitation of Liability</h2>
                        <p>In no event will idokans.com, or its suppliers or licensors, be liable with respect to any subject matter of this agreement under any contract, negligence, strict liability or other legal or equitable theory for: (i) any special, incidental or consequential damages; (ii) the cost of procurement for substitute products or services; (iii) for interruption of use or loss or corruption of data.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
