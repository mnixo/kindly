'use client';

import { MessageType } from '@/types/messagingTypes';
import MessageCard from './MessageCard';
import MessageForm from './MessageForm';
import { useContext, useEffect, useState } from 'react';
import useConversation from '../../app/(dashboard)/conversations/useConversation';
import { createSupabaseClient as supabase } from '@/utils/supabase/createSupabaseClient';

const CurrentConversation: React.FC = () => {
  const { allConversations, currentConversation, setCurrentConversation } =
    useContext(useConversation);
  const [currentMessages, setCurrentMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    setCurrentConversation && setCurrentConversation(allConversations[0]);
  }, [allConversations, setCurrentConversation]);

  useEffect(() => {
    const fetchMessagesForCurrentConversation = async () => {
      try {
        const { data: fetchedMessages } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', currentConversation?.conversation_id);

        setCurrentMessages(fetchedMessages ?? []);
      } catch (error) {
        console.error(`Failed to fetch messages from database: ${error}`);
        throw error;
      }
    };

    fetchMessagesForCurrentConversation();
  }, [currentConversation, setCurrentMessages]);

  useEffect(() => {
    const channel = supabase
      .channel('realtime messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          setCurrentMessages((prevMessages) => [
            ...prevMessages,
            payload.new as MessageType,
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, currentMessages, setCurrentMessages]);

  return (
    <div className='mb-10 flex h-screen flex-1 flex-col justify-end'>
      <div className='relative flex flex-col overflow-y-auto bg-stone-50'>
        {currentMessages.map((message: MessageType, index: number) => (
          <div key={`${message.id}-${message.created_at}`}>
            {message.created_at.slice(0, 10) !==
              currentMessages[index - 1]?.created_at.slice(0, 10) && (
              <div className='sticky top-4 z-10 ml-[calc((100%_-_92px)/2)] w-[92px] rounded-xl bg-primaryGreen object-center p-1 text-center text-white'>
                {message.created_at.slice(0, 10)}
              </div>
            )}
            <MessageCard
              sender_id={message.sender_id}
              created_at={message.created_at}
              message_text={message.message_text}
              is_read={message.is_read}
              currentUser={currentConversation?.user_id}
            />
          </div>
        ))}
      </div>
      <MessageForm
        user_id={currentConversation?.user_id}
        conversation_id={currentConversation?.conversation_id}
      ></MessageForm>
    </div>
  );
};

export default CurrentConversation;
