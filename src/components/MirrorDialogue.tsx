
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
        content: 'I notice you might be avoiding this conversation. That itself is telling... (Error: Please check your Groq API connection)' 
      };
      setConversation(prev => [...prev, errorMessage]);
    }
    setIsThinking(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-purple-400">
            <Brain className="h-5 w-5" />
            <span>Cognitive Mirror</span>
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Dialogue with a cognitive mirror reflecting your biases and blind spots
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-64 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
            {conversation.length === 0 && (
              <div className="text-center text-gray-500 text-sm">
                Start a conversation with your cognitive mirror...
              </div>
            )}
            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-purple-100 dark:bg-purple-600/20 border border-purple-200 dark:border-purple-500/30 text-purple-900 dark:text-purple-300'
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
                <div className="bg-purple-100 dark:bg-purple-600/20 border border-purple-200 dark:border-purple-500/30 text-purple-900 dark:text-purple-300 p-3 rounded-lg text-sm">
                  <div className="text-xs opacity-70 mb-1">Your Mirror</div>
                  <div className="animate-pulse">Reflecting on your patterns...</div>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <Textarea
              placeholder="Share your thoughts, decisions, or concerns... (Enter to send, Shift+Enter for new line)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-purple-500"
              rows={2}
            />
            <Button
              onClick={sendMessage}
              disabled={!message.trim() || isThinking}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
