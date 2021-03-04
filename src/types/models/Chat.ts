interface Chat {
  body: string;
  timestamp: number;
}

export interface DirectChatProps extends Chat {
  which: string
}

export interface GroupChatProps extends Chat {
  uid: string
}