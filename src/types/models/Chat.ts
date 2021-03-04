interface ChatProps {
  body: string;
  timestamp: number;
}

export interface DirectChatProps extends ChatProps {
  which: string
}

export interface GroupChatProps extends ChatProps {
  uid: string
}