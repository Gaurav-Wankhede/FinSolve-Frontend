import { CheckCircle } from "lucide-react";

export default function Requirements() {
  const requirements = [
    {
      title: "Authentication & Role Assignment",
      description: "Authenticate users and assign appropriate roles based on their department and position."
    },
    {
      title: "Contextual Data Handling",
      description: "Respond to queries based on department-specific data with references to source documents."
    },
    {
      title: "Natural Language Processing",
      description: "Process and understand natural language queries from various departments and contexts."
    },
    {
      title: "Role-Based Access Control",
      description: "Enforce strict role-based data access to maintain security and compliance."
    },
    {
      title: "Retrieval Augmented Generation",
      description: "Retrieve data, augment with relevant context, and generate clear, insightful responses."
    },
  ];
  
  return (
    <section id="requirements" className="py-16 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Key Requirements</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            The FinSolve Assistant needs to meet these critical requirements to effectively serve the organization's needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requirements.map((req, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-blue-600 flex-shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 text-lg mb-2">{req.title}</h3>
                  <p className="text-gray-600">{req.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
  