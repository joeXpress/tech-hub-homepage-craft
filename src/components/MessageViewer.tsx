
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Clock, User, Phone, Mail } from 'lucide-react';

interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: 'new' | 'read' | 'replied';
}

const MessageViewer = ({ isDarkMode }: { isDarkMode: boolean }) => {
  // Mock messages - in a real app, these would come from a database
  const [messages] = useState<ContactMessage[]>([
    {
      id: '1',
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      subject: 'Inquiry about Software Development Course',
      message: 'Hi, I am interested in learning more about your software development program. Could you please provide more details about the curriculum and duration?',
      createdAt: new Date('2024-01-15T10:30:00'),
      status: 'new'
    },
    {
      id: '2',
      fullName: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+0987654321',
      subject: 'UI/UX Design Course Question',
      message: 'Hello, I would like to know if the UI/UX design course includes hands-on projects and if you provide certificates upon completion.',
      createdAt: new Date('2024-01-14T14:20:00'),
      status: 'read'
    },
    {
      id: '3',
      fullName: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+1122334455',
      subject: 'Delivery Service Inquiry',
      message: 'I need to know more about your delivery services. What are the rates for door-to-door delivery within the city?',
      createdAt: new Date('2024-01-13T09:15:00'),
      status: 'replied'
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'read': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'replied': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                <MessageSquare className="h-5 w-5 text-orange-500" />
                Contact Messages ({messages.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedMessage?.id === message.id
                        ? isDarkMode ? 'border-orange-500 bg-slate-700' : 'border-orange-500 bg-orange-50'
                        : isDarkMode ? 'border-slate-600 bg-slate-700 hover:bg-slate-600' : 'border-gray-200 bg-gray-50 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {message.fullName}
                      </h4>
                      <Badge className={`text-xs ${getStatusColor(message.status)}`}>
                        {message.status}
                      </Badge>
                    </div>
                    <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {message.subject}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {message.message.substring(0, 60)}...
                    </p>
                    <div className={`flex items-center gap-1 mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Clock className="h-3 w-3" />
                      {formatDate(message.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {selectedMessage ? 'Message Details' : 'Select a message to view'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedMessage ? (
                <div className="space-y-6">
                  {/* Message Header */}
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {selectedMessage.subject}
                        </h3>
                        <Badge className={`mt-2 ${getStatusColor(selectedMessage.status)}`}>
                          {selectedMessage.status}
                        </Badge>
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatDate(selectedMessage.createdAt)}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-orange-500" />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {selectedMessage.fullName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-orange-500" />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {selectedMessage.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-orange-500" />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {selectedMessage.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div>
                    <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Message:
                    </h4>
                    <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {selectedMessage.message}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-600">
                    <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                      Reply
                    </Button>
                    <Button variant="outline" className={isDarkMode ? 'border-slate-600 text-gray-300 hover:bg-slate-700' : ''}>
                      Mark as Read
                    </Button>
                    <Button variant="outline" className={isDarkMode ? 'border-slate-600 text-gray-300 hover:bg-slate-700' : ''}>
                      Archive
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a message from the list to view its details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MessageViewer;
