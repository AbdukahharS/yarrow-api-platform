export interface Message {
  id: string
  sender: 'user' | 'support'
  content: string
  timestamp: string
}

export type TicketStatus = 'open' | 'closed' | 'in-progress'
export type TicketPriority = 'low' | 'medium' | 'high'

export interface Ticket {
  id: string
  ticketNumber: string
  title: string
  status: TicketStatus
  priority: TicketPriority
  messageCount: number
  updatedAt: string
  messages: Message[]
}

export interface NewTicketData {
  title: string
  message: string
  priority: TicketPriority
}
