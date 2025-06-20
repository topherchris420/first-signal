
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, MessageCircle, Send } from 'lucide-react';
import { GroqService } from '@/services/groqService';

interface MirrorDialogueProps {
  groq: GroqService;
  biasProfile: Record<string, number>;
}

export const MirrorDialogue = ({ groq, biasProfile }: MirrorDialogueProps) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'mirror'; content: string}>>([]);
  const [isThinking, setIsThinking] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = { role: 'user' as const, content: message };
    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    setIsThinking(true);

    try {
      const mirrorResponse = await groq.mirrorDialogue(message, biasProfile);
      const mirrorMessage = { role: 'mirror' as const, content: mirrorResponse };
      setConversation(prev => [...prev, mirrorMessage]);
    } catch (error) {
      console.error('Mirror dialogue failed:', error);
      const errorMessage = { 
        role: 'mirror' as const, 
        content: 'I notice you might be avoiding this conversation. That itself is telling...' 
      };
      setConversation(prev => [...prev, errorMessage]);
    }
    setIsThinking(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-400">
            <Brain className="h-5 w-5" />
            <span>Mirror Mode</span>
          </CardTitle>
          <CardDescription className="text-gray-400">
            Dialogue with a cognitive mirror reflecting your biases and blind spots
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-64 overflow-y-auto bg-gray-800 rounded-lg p-4 space-y-3">
            {conversation.length === 0 && (
              <div className="text-center text-gray-500 text-sm">
                Start a conversation with your cognitive mirror...
              </div>
            )}
            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-purple-600/20 border border-purple-500/30 text-purple-300'
                }`}>
                  <div className="text-xs opacity-70 mb-1">
                    {msg.role === 'user' ? 'You' : 'Your Mirror'}
                  </div>
                  {msg.content}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-purple-600/20 border border-purple-500/30 text-purple-300 p-3 rounded-lg text-sm">
                  <div className="text-xs opacity-70 mb-1">Your Mirror</div>
                  <div className="animate-pulse">Reflecting on your patterns...</div>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <Textarea
              placeholder="Share your thoughts, decisions, or concerns..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-gray-800 border-gray-700 text-gray-100 resize-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <Button
              onClick={sendMessage}
              disabled={!message.trim() || isThinking}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
