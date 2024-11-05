import React, { useState } from 'react';

// Define TypeScript interface for business info
interface BusinessInfo {
  name: string;
  title: string;
  company: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  social: string;
  coverPhoto: string;
  logo: string;
}

export default function BusinessCardEditor() {
  const [activeTab, setActiveTab] = useState<string>("card-view");
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: "Riley Hodgetts",
    title: "CEO",
    company: "Rileys Real Estate",
    description: "A boutique real estate agency that specialises in residential sales and off the plan projects",
    email: "riley@rileysrealestate.com.au",
    phone: "",
    website: "rileysrealestate.com.au",
    social: "twitter.com/rileysrealestate",
    coverPhoto: "/api/placeholder/400/200",
    logo: "/api/placeholder/100/100"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateVCard = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${businessInfo.name}
ORG:${businessInfo.company}
TITLE:${businessInfo.title}
TEL:${businessInfo.phone}
EMAIL:${businessInfo.email}
URL:${businessInfo.website}
NOTE:${businessInfo.description}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4 space-y-4">
        <div className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100">
          <span className="w-8 h-8 flex items-center justify-center bg-red-200 text-red-700 rounded">
            B
          </span>
          <span>Bling</span>
        </div>

        <nav className="space-y-2">
          {['My Cards', 'Team Cards', 'Live Templates', 'Contacts', 'Accessories', 'Admin'].map((item) => (
            <a
              key={item}
              href="#"
              className="block p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div></div>
          <div className="space-x-2">
            <button className="px-4 py-2 border rounded-lg">
              Cancel
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Card Preview */}
          <div>
            <div className="flex space-x-4 mb-4 border-b">
              {['Card View', 'QR Code', 'Email Signature'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
                  className={`py-2 px-4 ${
                    activeTab === tab.toLowerCase().replace(' ', '-')
                      ? 'border-b-2 border-red-500'
                      : ''
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Cover Photo */}
              <div className="relative h-40 bg-gray-100">
                <img
                  src={businessInfo.coverPhoto}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-2 right-2 px-3 py-1 bg-white/80 rounded-lg text-sm">
                  Update Cover Photo
                </button>
              </div>

              {/* Profile Section */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{businessInfo.name}</h2>
                    <p className="text-gray-600">{businessInfo.title}</p>
                    <p className="text-gray-600">{businessInfo.company}</p>
                  </div>
                  <img
                    src={businessInfo.logo}
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                  />
                </div>

                <p className="mt-4 text-gray-600">
                  {businessInfo.description}
                </p>

                <div className="mt-6 space-y-3">
                  {businessInfo.email && (
                    <div className="flex items-center space-x-3 text-gray-600">
                      <span>📧</span>
                      <span>{businessInfo.email}</span>
                    </div>
                  )}
                  {businessInfo.website && (
                    <div className="flex items-center space-x-3 text-gray-600">
                      <span>🌐</span>
                      <span>{businessInfo.website}</span>
                    </div>
                  )}
                  {businessInfo.social && (
                    <div className="flex items-center space-x-3 text-gray-600">
                      <span>🔗</span>
                      <span>{businessInfo.social}</span>
                    </div>
                  )}
                </div>

                {/* Save Contact Button */}
                <div className="mt-6">
                  <button
                    onClick={generateVCard}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white rounded-full py-3"
                  >
                    Save Contact
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Editor Panel */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Card Owner</h3>
              <input
                type="email"
                value={businessInfo.email}
                onChange={handleInputChange}
                name="email"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Use a Live Template</h3>
              <select className="w-full p-2 border rounded-lg">
                <option>No Live Template</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Selecting a template replaces the company details and card fields with the values in the template
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Choose a theme</h3>
              <div className="flex space-x-2">
                {['red', 'blue', 'green', 'yellow', 'purple', 'pink'].map(color => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full bg-${color}-500`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Add a new field</h3>
              <div className="grid grid-cols-5 gap-4">
                {[
                  { icon: '📧', label: 'Email' },
                  { icon: '📱', label: 'Phone' },
                  { icon: '🌐', label: 'URL' },
                  { icon: '🔗', label: 'Link' },
                  { icon: '📍', label: 'Address' }
                ].map(field => (
                  <button
                    key={field.label}
                    className="p-4 border rounded-lg flex flex-col items-center"
                  >
                    <span className="text-xl mb-1">{field.icon}</span>
                    <span className="text-xs">{field.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
