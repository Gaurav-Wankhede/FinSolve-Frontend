import Link from "next/link";
import Image from "next/image";
import Challenges from "./_components/Challenges";
import Requirements from "./_components/Requirements";
import Roles from "./_components/Roles";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-20 py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
            Codebasics Challenge: <span className="text-yellow-500">RAG-RBAC Chatbot</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-xl">
            Build a secure, AI-powered chatbot for FinSolve Technologies, enabling every department to access the right data at the right time—securely and efficiently. Join the challenge and showcase your AI engineering skills!
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/login" className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition">Try Demo</Link>
            <Link href="/challenge" className="px-6 py-3 border border-blue-700 text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition">Learn More</Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <Image 
            src="https://images.codebasics.io/filters:format(webp)/fit-in/600x600/upload/challengeSection/bannerThumbnail/Role-Based_Chatbot.jpg" 
            alt="AI Chatbot Illustration" 
            width={500} 
            height={500} 
            className="rounded-xl shadow-lg" 
          />
        </div>
      </section>

      {/* Main Content Sections */}
      <Challenges />
      <Requirements />
      <Roles />

      {/* CTA Section */}
      <section className="py-16 px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Building?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Demonstrate your AI engineering skills by creating a secure, efficient chatbot that empowers FinSolve Technologies with role-based information access.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login" className="px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold shadow-lg hover:bg-blue-50 transition">
              Try the Demo
            </Link>
            <Link href="/github" className="px-8 py-4 border border-white text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              View on GitHub
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
