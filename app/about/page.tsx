import { BookOpen, FlaskRoundIcon as Flask, GraduationCap, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Vlabs</h1>
            <p className="text-xl text-blue-100">
              Revolutionizing physics education through interactive virtual experiments
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-800">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At Vlabs, we believe that practical experimentation is essential for understanding physics concepts. Our
                mission is to make high-quality physics experiments accessible to everyone, regardless of their location
                or access to physical laboratory equipment.
              </p>
              <p className="text-gray-700 mb-4">
                Through our virtual laboratory, students can perform experiments, collect data, analyze results, and
                develop a deeper understanding of physics principles in an engaging and interactive environment.
              </p>
              <p className="text-gray-700">
                We are committed to supporting educators and students by providing comprehensive learning resources that
                complement traditional classroom instruction and foster a love for scientific inquiry.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-400 to-blue-300 opacity-75 blur"></div>
              <div className="relative bg-white rounded-lg overflow-hidden shadow-xl">
                <img src="/placeholder.svg?height=400&width=600" alt="Students using Vlabs" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <ValueCard
              icon={<BookOpen className="h-10 w-10 text-blue-600" />}
              title="Education"
              description="We believe in making quality education accessible to all students regardless of their background or resources."
            />
            <ValueCard
              icon={<Flask className="h-10 w-10 text-blue-600" />}
              title="Innovation"
              description="We continuously improve our virtual experiments to provide the most realistic and educational experience possible."
            />
            <ValueCard
              icon={<GraduationCap className="h-10 w-10 text-blue-600" />}
              title="Excellence"
              description="We strive for excellence in all aspects of our platform, from scientific accuracy to user experience."
            />
            <ValueCard
              icon={<Users className="h-10 w-10 text-blue-600" />}
              title="Community"
              description="We foster a collaborative community of educators and learners who share a passion for physics."
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TeamMember
              name="Dr. Jane Smith"
              role="Founder & Physics Professor"
              image="/placeholder.svg?height=300&width=300"
              description="Dr. Smith has over 20 years of experience teaching physics and developing educational technology."
            />
            <TeamMember
              name="Prof. Michael Johnson"
              role="Educational Content Director"
              image="/placeholder.svg?height=300&width=300"
              description="Prof. Johnson specializes in creating engaging physics curriculum and interactive learning materials."
            />
            <TeamMember
              name="Sarah Williams"
              role="Lead Software Engineer"
              image="/placeholder.svg?height=300&width=300"
              description="Sarah brings 15 years of experience in educational software development and simulation design."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-blue-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
}

function TeamMember({ name, role, image, description }: TeamMemberProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="aspect-square overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-800">{name}</h3>
        <p className="text-blue-600 mb-3">{role}</p>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

