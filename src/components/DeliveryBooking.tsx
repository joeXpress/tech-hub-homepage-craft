
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, MapPin, Clock, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DeliveryBooking {
  id: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  packageDescription: string;
  serviceType: string;
  urgency: string;
  status: 'pending' | 'picked-up' | 'in-transit' | 'delivered';
  createdAt: Date;
  trackingNumber: string;
}

const DeliveryBooking = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<DeliveryBooking[]>([]);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [activeTab, setActiveTab] = useState<'book' | 'track'>('book');
  
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    recipientName: '',
    recipientPhone: '',
    pickupAddress: '',
    deliveryAddress: '',
    packageDescription: '',
    serviceType: '',
    urgency: 'standard'
  });

  const generateTrackingNumber = () => {
    return 'JE' + Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBooking: DeliveryBooking = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'pending',
      createdAt: new Date(),
      trackingNumber: generateTrackingNumber()
    };
    
    setBookings([...bookings, newBooking]);
    
    toast({
      title: "Booking Successful!",
      description: `Your tracking number is: ${newBooking.trackingNumber}`,
    });
    
    // Reset form
    setFormData({
      senderName: '',
      senderPhone: '',
      recipientName: '',
      recipientPhone: '',
      pickupAddress: '',
      deliveryAddress: '',
      packageDescription: '',
      serviceType: '',
      urgency: 'standard'
    });
  };

  const trackDelivery = () => {
    const booking = bookings.find(b => b.trackingNumber === trackingNumber);
    if (booking) {
      toast({
        title: "Package Found!",
        description: `Status: ${booking.status}. From: ${booking.pickupAddress} To: ${booking.deliveryAddress}`,
      });
    } else {
      toast({
        title: "Package Not Found",
        description: "Please check your tracking number and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Booking Form */}
        <Card className={`flex-1 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              <Package className="h-5 w-5 text-orange-500" />
              Book Delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Sender Name</Label>
                  <Input
                    required
                    value={formData.senderName}
                    onChange={(e) => setFormData({...formData, senderName: e.target.value})}
                    className={isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                  />
                </div>
                <div>
                  <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Sender Phone</Label>
                  <Input
                    required
                    type="tel"
                    value={formData.senderPhone}
                    onChange={(e) => setFormData({...formData, senderPhone: e.target.value})}
                    className={isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Recipient Name</Label>
                  <Input
                    required
                    value={formData.recipientName}
                    onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                    className={isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                  />
                </div>
                <div>
                  <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Recipient Phone</Label>
                  <Input
                    required
                    type="tel"
                    value={formData.recipientPhone}
                    onChange={(e) => setFormData({...formData, recipientPhone: e.target.value})}
                    className={isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                  />
                </div>
              </div>

              <div>
                <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Pickup Address</Label>
                <Textarea
                  required
                  value={formData.pickupAddress}
                  onChange={(e) => setFormData({...formData, pickupAddress: e.target.value})}
                  className={isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                />
              </div>

              <div>
                <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Delivery Address</Label>
                <Textarea
                  required
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
                  className={isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                />
              </div>

              <div>
                <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Package Description</Label>
                <Textarea
                  required
                  value={formData.packageDescription}
                  onChange={(e) => setFormData({...formData, packageDescription: e.target.value})}
                  className={isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Service Type</Label>
                  <Select required onValueChange={(value) => setFormData({...formData, serviceType: value})}>
                    <SelectTrigger className={isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="door-to-door">Door-To-Door Delivery</SelectItem>
                      <SelectItem value="office">Office Delivery</SelectItem>
                      <SelectItem value="food">Food Delivery</SelectItem>
                      <SelectItem value="pickup">Motor Park Pickup</SelectItem>
                      <SelectItem value="dropoff">Motor Park Dropoff</SelectItem>
                      <SelectItem value="mail">Mail Pockets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Urgency</Label>
                  <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
                    <SelectTrigger className={isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="express">Express</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                Book Delivery
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tracking Section */}
        <Card className={`flex-1 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              <MapPin className="h-5 w-5 text-orange-500" />
              Track Package
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Tracking Number</Label>
                <Input
                  placeholder="Enter tracking number (e.g., JE12345678)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className={isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                />
              </div>
              <Button 
                onClick={trackDelivery}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                Track Package
              </Button>
            </div>

            {/* Recent Bookings */}
            {bookings.length > 0 && (
              <div className="mt-6">
                <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Bookings</h3>
                <div className="space-y-3">
                  {bookings.slice(-3).map((booking) => (
                    <div key={booking.id} className={`p-3 rounded-lg border ${isDarkMode ? 'border-slate-600 bg-slate-700' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {booking.trackingNumber}
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {booking.recipientName}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          booking.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          booking.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'picked-up' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryBooking;
