const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About JobPortal</h1>

      <div className="max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            JobPortal is dedicated to connecting talented job seekers with leading employers worldwide. 
            We believe that everyone deserves to find meaningful work that aligns with their skills, 
            passions, and career goals. Our platform simplifies the job search process while providing 
            employers with access to a diverse pool of qualified candidates.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">For Job Seekers</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Browse thousands of job listings</li>
                <li>• Apply to jobs with one click</li>
                <li>• Track application status in real-time</li>
                <li>• Get matched with relevant opportunities</li>
              </ul>
            </div>
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">For Employers</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Post job openings easily</li>
                <li>• Manage applications efficiently</li>
                <li>• Find qualified candidates quickly</li>
                <li>• Build your employer brand</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold mb-2">Focus</h3>
              <p className="text-gray-600 text-sm">We prioritize quality over quantity in every match.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold mb-2">Trust</h3>
              <p className="text-gray-600 text-sm">Building lasting relationships through transparency.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">Continuously improving our platform for better experiences.</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 border rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-700 mb-4">
            Have questions or feedback? We'd love to hear from you. Reach out to us through our 
            contact page or follow us on social media for the latest updates.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
