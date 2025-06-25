import { useSelector } from 'react-redux';
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { RootState } from '../store/store';

export default function ContactPage() {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <Linkedin size={24} />,
      url: 'https://www.linkedin.com',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Twitter',
      icon: <Twitter size={24} />,
      url: 'https://twitter.com',
      color: 'bg-sky-500 hover:bg-sky-600',
    },
    {
      name: 'GitHub',
      icon: <Github size={24} />,
      url: 'https://github.com',
      color: 'bg-gray-800 hover:bg-gray-900',
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'contact@devnotes.com',
    },
    {
      icon: <Phone size={20} />,
      label: 'Phone',
      value: '+1 (123) 456-7890',
    },
    {
      icon: <MapPin size={20} />,
      label: 'Address',
      value: '123 Developer Lane, Tech City, CA 94043',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Have questions or want to get in touch? We'd love to hear from you!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          
          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className={`p-2 rounded-full mr-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium">{item.label}</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Connect with Us</h2>
          
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full text-white ${link.color}`}
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Location</h2>
          <div 
            className={`aspect-video rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-gray-200'
            } flex items-center justify-center`}
          >
            <p className="text-center px-4">Map Embed Placeholder</p>
          </div>
          <p className="mt-4 text-sm">
            Our office is located in the heart of Tech City, easily accessible by public transportation.
          </p>
        </div>
      </div>
    </div>
  );
}
