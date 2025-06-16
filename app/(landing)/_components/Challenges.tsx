import { ArrowRight } from "lucide-react";

export default function Challenges() {
  return (
    <section id="challenges" className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Challenge Overview</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 md:p-10">
          <div className="flex flex-col gap-6">
            <div className="inline-flex gap-3 items-center">
              <span className="bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded">Domain: FinTech</span>
              <span className="bg-yellow-500 text-blue-900 text-xs font-semibold px-2.5 py-1 rounded">Function: AI Engineering</span>
            </div>
            
            <h3 className="text-xl font-semibold text-blue-900">FinSolve Technologies</h3>
            <p className="text-gray-700 leading-relaxed">
              A leading FinTech company providing innovative financial solutions and services to individuals, businesses, and enterprises. Recently, teams have been facing delays in communication and difficulty accessing the right data at the right time, leading to inefficiencies and data silos between departments.
            </p>
            
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">The Challenge</h3>
              <p className="text-gray-700 leading-relaxed">
                Build a RAG-based role-based access control (RBAC) chatbot to reduce communication delays, address data access barriers, and offer secure, department-specific insights on demand. The chatbot should process queries, retrieve data, and generate context-rich responses based on user roles.
              </p>
            </div>
            
            <div className="mt-4 flex justify-end">
              <a href="https://codebasics.io/challenge/codebasics-gen-ai-data-science-resume-project-challenge" className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition">
                Learn more about the challenge
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
