import { Users, BarChart, UserCog, Code, Crown, User } from "lucide-react";

export default function Roles() {
  const roles = [
    { 
      icon: <BarChart className="h-8 w-8 text-blue-700" />,
      title: "Finance Team", 
      description: "Access to financial reports, marketing expenses, equipment costs, reimbursements, etc.",
      bgColor: "from-blue-50 to-white"
    },
    { 
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Marketing Team", 
      description: "Access to campaign performance data, customer feedback, and sales metrics.",
      bgColor: "from-purple-50 to-white"
    },
    { 
      icon: <UserCog className="h-8 w-8 text-green-600" />,
      title: "HR Team", 
      description: "Access employee data, attendance records, payroll, and performance reviews.",
      bgColor: "from-green-50 to-white"
    },
    { 
      icon: <Code className="h-8 w-8 text-orange-600" />,
      title: "Engineering Department", 
      description: "Access to technical architecture, development processes, and operational guidelines.",
      bgColor: "from-orange-50 to-white"
    },
    { 
      icon: <Crown className="h-8 w-8 text-yellow-600" />,
      title: "C-Level Executives", 
      description: "Full access to all company data.",
      bgColor: "from-yellow-50 to-white"
    },
    { 
      icon: <User className="h-8 w-8 text-gray-600" />,
      title: "Employee Level", 
      description: "Access only to general company information such as policies, events, and FAQs.",
      bgColor: "from-gray-50 to-white"
    },
  ];

  return (
    <section id="roles" className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Roles & Permissions</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            The FinSolve Assistant enforces role-based access to ensure users can only access information relevant to their position.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role.title} className={`rounded-xl shadow-md p-6 bg-gradient-to-br ${role.bgColor} hover:shadow-lg transition-shadow`}>
              <div className="flex flex-col gap-4">
                <div className="rounded-full bg-white p-2 w-fit shadow-sm">
                  {role.icon}
                </div>
                <h3 className="text-xl font-semibold text-blue-900">{role.title}</h3>
                <p className="text-gray-700">{role.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
  