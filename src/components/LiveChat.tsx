
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, User, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const ChatMessage = ({ message, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`flex items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className={`h-8 w-8 ${isUser ? 'ml-2' : 'mr-2'}`}>
        <AvatarFallback className={isUser ? "bg-primary text-primary-foreground" : "bg-muted"}>
          {isUser ? 'U' : 'S'}
        </AvatarFallback>
      </Avatar>
      <div 
        className={`max-w-[75%] px-4 py-2 rounded-lg ${
          isUser 
            ? 'bg-primary text-primary-foreground rounded-tr-none' 
            : 'bg-muted rounded-tl-none'
        }`}
      >
        {message}
      </div>
    </div>
  </div>
);

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hi there! How can we help you today?", isUser: false }
  ]);
  const { user } = useAuth();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: message, isUser: true }]);
    setMessage('');
    
    // Simulate agent response
    setTimeout(() => {
      const responses = [
        "Thanks for your message! Our team will get back to you shortly.",
        "I'll check that for you and get back to you soon.",
        "We're working on addressing your question. Please allow us some time to look into it.",
        "Your request has been received. An agent will follow up with you shortly.",
        "Thanks for reaching out! We typically respond within 1-2 hours during business hours."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 z-50 w-80 sm:w-96"
          >
            <Card className="border shadow-lg overflow-hidden">
              {/* Chat header */}
              <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  <span className="font-medium">Live Support</span>
                </div>
                <Button variant="ghost" size="sm" onClick={toggleChat} className="text-primary-foreground hover:bg-primary/90 h-8 w-8 p-0">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Chat messages */}
              <div className="h-80 overflow-y-auto p-4 bg-background">
                {messages.map((msg, index) => (
                  <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
                ))}
              </div>
              
              {/* Chat input */}
              <form onSubmit={handleSendMessage} className="border-t p-3 flex">
                <Input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 mr-2"
                />
                <Button type="submit" size="sm" className="px-3">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 p-0 shadow-lg"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </Button>
    </>
  );
};

export default LiveChat;
