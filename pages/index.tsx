import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Globe, MapPin, Image, Link, Plus, Lock } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BusinessCardEditor = () => {
  const [activeTab, setActiveTab] = useState("card-view");
  const [businessInfo, setBusinessInfo] = useState({
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

  const handleInputChange = (e) => {
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
          <a href="#" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            My Cards
          </a>
          <a href="#" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Team Cards
          </a>
          <a href="#" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Live Templates
          </a>
          <a href="#" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Contacts
          </a>
          <a href="#" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Accessories
          </a>
          <a href="#" className="block p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Admin
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div></div>
          <div className="space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-red-500 hover:bg-red-600">Save Changes</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Card Preview */}
          <div>
            <Tabs defaultValue="card-view" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="card-view"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent"
                >
                  Card View
                </TabsTrigger>
                <TabsTrigger
                  value="qr-code"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent"
                >
                  QR Code
                </TabsTrigger>
                <TabsTrigger
                  value="email-signature"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent"
                >
                  Email Signature
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card-view" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden relative">
                  {/* Lock Icon */}
                  <div className="absolute top-2 right-2">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>

                  {/* Cover Photo */}
                  <div className="relative h-40 bg-gray-100">
                    <img
                      src={businessInfo.coverPhoto}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="ghost"
                      className="absolute top-2 right-2 bg-white/80"
                      size="sm"
                    >
                      <Image className="h-4 w-4 mr-2" />
                      Update Cover Photo
                    </Button>
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
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Mail className="h-5 w-5" />
                        <span>{businessInfo.email}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Globe className="h-5 w-5" />
                        <span>{businessInfo.website}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Link className="h-5 w-5" />
                        <span>{businessInfo.social}</span>
                      </div>
                    </div>

                    {/* Save Contact Button */}
                    <div className="mt-6">
                      <Button
                        onClick={generateVCard}
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white rounded-full h-12"
                      >
                        Save Contact
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                  Click any part of the card to start editing or add new fields using the buttons below. No changes to the card will be persisted until you click the Save Changes button.
                </div>
              </TabsContent>

              <TabsContent value="qr-code">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  QR Code view coming soon...
                </div>
              </TabsContent>

              <TabsContent value="email-signature">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  Email signature view coming soon...
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Editor Panel */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Card Owner</h3>
              <Input
                value={businessInfo.email}
                onChange={handleInputChange}
                name="email"
                className="w-full"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Use a Live Template</h3>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="No Live Template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Live Template</SelectItem>
                </SelectContent>
              </Select>
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
                <Button variant="outline" className="flex flex-col items-center p-4">
                  <Mail className="h-5 w-5 mb-1" />
                  <span className="text-xs">Email</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4">
                  <Phone className="h-5 w-5 mb-1" />
                  <span className="text-xs">Phone</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4">
                  <Globe className="h-5 w-5 mb-1" />
                  <span className="text-xs">URL</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4">
                  <Link className="h-5 w-5 mb-1" />
                  <span className="text-xs">Link</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4">
                  <MapPin className="h-5 w-5 mb-1" />
                  <span className="text-xs">Address</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardEditor;
