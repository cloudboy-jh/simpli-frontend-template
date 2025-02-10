"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Search, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  sender: "user" | "customer";
  timestamp: string;
};

type Conversation = {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: Message[];
};

const initialConversations: Conversation[] = [
  {
    id: "1",
    customer: {
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "AJ",
    },
    lastMessage: "Thank you for your help!",
    timestamp: "2 min ago",
    unread: true,
    messages: [
      {
        id: "1",
        content: "Hi, I need help with my recent order",
        sender: "customer",
        timestamp: "10:30 AM",
      },
      {
        id: "2",
        content: "Of course! I'd be happy to help. Could you please provide your order number?",
        sender: "user",
        timestamp: "10:31 AM",
      },
      {
        id: "3",
        content: "It's #12345",
        sender: "customer",
        timestamp: "10:32 AM",
      },
      {
        id: "4",
        content: "Thank you for your help!",
        sender: "customer",
        timestamp: "10:33 AM",
      },
    ],
  },
  {
    id: "2",
    customer: {
      name: "Bob Smith",
      email: "bob@example.com",
      avatar: "BS",
    },
    lastMessage: "When will my order arrive?",
    timestamp: "1 hour ago",
    unread: false,
    messages: [
      {
        id: "1",
        content: "When will my order arrive?",
        sender: "customer",
        timestamp: "9:30 AM",
      },
    ],
  },
  {
    id: "3",
    customer: {
      name: "Carol Williams",
      email: "carol@example.com",
      avatar: "CW",
    },
    lastMessage: "Perfect, thanks!",
    timestamp: "2 hours ago",
    unread: false,
    messages: [
      {
        id: "1",
        content: "Do you offer international shipping?",
        sender: "customer",
        timestamp: "8:30 AM",
      },
      {
        id: "2",
        content: "Yes, we ship to most countries worldwide. Shipping costs vary by location.",
        sender: "user",
        timestamp: "8:32 AM",
      },
      {
        id: "3",
        content: "Perfect, thanks!",
        sender: "customer",
        timestamp: "8:33 AM",
      },
    ],
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Math.random().toString(36).substring(7),
      content: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedConversations = conversations.map(conv =>
      conv.id === selectedConversation.id
        ? {
            ...conv,
            messages: [...conv.messages, message],
            lastMessage: newMessage,
            timestamp: "Just now",
          }
        : conv
    );

    setConversations(updatedConversations);
    setSelectedConversation(updatedConversations.find(c => c.id === selectedConversation.id) || null);
    setNewMessage("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">
          Chat with your customers
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-12rem)]">
        <Card className="col-span-4 flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-8" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "p-4 cursor-pointer hover:bg-muted/50",
                    selectedConversation?.id === conversation.id && "bg-muted"
                  )}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <div className="flex h-full w-full items-center justify-center bg-primary">
                        <span className="text-primary-foreground font-medium">
                          {conversation.customer.avatar}
                        </span>
                      </div>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conversation.customer.name}</p>
                        <span className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread && (
                          <span className="flex-shrink-0 h-2 w-2 bg-primary rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="col-span-8 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <div className="flex h-full w-full items-center justify-center bg-primary">
                      <span className="text-primary-foreground font-medium">
                        {selectedConversation.customer.avatar}
                      </span>
                    </div>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedConversation.customer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.customer.email}
                    </p>
                  </div>
                </div>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-lg px-4 py-2 max-w-[70%]",
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}