import Link from "next/link";

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <main className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Get Started</h1>
        <p className="mb-4 text-gray-700">
          Ready to take on the challenge? Fork the starter repo, read the problem statement, and start building your RAG-RBAC chatbot for FinSolve Technologies!
        </p>
        <p className="mb-8 text-gray-700">
          For full details, resources, and submission instructions, visit the official Codebasics challenge page.
        </p>
        <Link href="https://codebasics.io/challenge/codebasics-gen-ai-data-science-resume-project-challenge" target="_blank" className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition">Go to Challenge Page</Link>
      </main>
    </div>
  );
}
